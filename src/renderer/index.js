import addProxy from '../proxy'
import Element from '../Element'
import setAccessor from './setAccessor'
import diff from '../diff'

const ELM = Symbol('Element')
export default (node, dom, data = {}) => {
  var subscribers = { current: null, listener: {}, actions: {} }
  var elms = {}
  data = addProxy(data, subscribe, subscribers)
  var result = gen(node)
  subscribers.current = null
  if (dom.appendChild) render(result, dom)
  return data

  function getValue (array, id, i = 0) {
    return Array.isArray(array) && id.length - 1 > i ? getValue(array[id[i++]], id, i) : array
  }
  function subscribe (name) {
    if (!subscribers.actions[name]) return
    subscribers.actions[name].forEach(symbol => {
      var dom = getValue(result, elms[symbol].split(','))
      diff(dom, dom[ELM].render()) // TODO
    })
  }

  function render (node, parent) {
    if (node !== null && parent) {
      switch (typeof node) {
        case 'string':
          return document.createTextNode(node)
        case 'object':
          if (Array.isArray(node)) return node.forEach(node => parent.appendChild(render(node, parent)))
          var { type = 'div', children, ...props } = node
          type = type.toLowerCase()
          var isSvg = type === 'svg'
          var elm = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(type)
          Object.entries(props).forEach(([key, value]) => setAccessor(elm, key, elm[key], value, isSvg))
          if (Array.isArray(children)) children.forEach(node => (node = render(node, elm)) && elm.appendChild(node))
          return elm
      }
    }
    return document.createComment('empty')
  }

  function format (node) {
    switch (typeof node) {
      case 'number':
        node = node.toString()
      case 'string': // eslint-disable-line
        return node
      case 'object':
        if (node instanceof Element) return node.render()
        if (node) return node
    }
    return null
  }
  function formatArray (array) {
    var parent = []
    array.forEach(node => {
      if (Array.isArray(node = format(node))) {
        node.forEach(node => parent.push(format(node)))
      } else parent.push(node)
    })
    return parent
  }
  function gen (node, id = '0') {
    var value = node
    if (node instanceof Element && node.render) {
      var symbol
      if (node.__connected && !node.store) {
        symbol = node.__symbol
        subscribers.current = symbol
        subscribers.listener[symbol] = []
        node.store = data
        node.state = {}
      }
      node = node.render()
      if (symbol) {
        var array = subscribers.listener[symbol]
        var actions = []
        var unless = array.reduce((prev, key) => (++prev[key] || (prev[key] = 1)) && prev, {})
        array.forEach((key, i) => (unless[key] > 1 || !array[++i] || !array[i].includes(key)) &&
          !actions.includes(key) && actions.push(key))
        subscribers.listener[symbol] = actions
        actions.forEach(action => subscribers.actions[action]
          ? subscribers.actions[action].push(symbol) : (subscribers.actions[action] = [symbol]))
        elms[symbol] = id
      }
    } else node = format(node)
    if (node === null) return null
    if (Array.isArray(node)) node = formatArray(node).map((node, i) => gen(node, id + ',' + i))
    else if (Array.isArray(node.children)) node.children = formatArray(node.children).map((node, i) => gen(node, id + ',' + i))
    if (Array.isArray(node)) Object.defineProperty(node, ELM, { value, enumerable: false })
    return node
  }
}
