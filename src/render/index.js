import merge from 'lodash/merge'
import addProxy from '../proxy'
import Element from '../Element'
import render from './render'
import getDiff from '../diff'
import { ELEMENT_ID, ELEMENT, CONNECTED } from '../symbols'

export default (node, dom, data, models) => {
  const subscribers = { current: null, listener: {}, actions: {} }
  const elms = {}
  let postRenders = []
  data = addProxy(
    models.reduce((p, m) => typeof m.init === 'object' ? merge(p, m.init) : p, data),
    subscribe,
    subscribers
  )
  models = models.reduce((p, m) => {
    m.store = data
    p[m.name] = m
    return p
  }, {})
  Object.values(models).forEach(m => (m.models = models))
  const result = gen(node)
  subscribers.current = null
  dom.appendChild(render(result, dom))
  postRenders.forEach(fn => fn())
  postRenders = null
  const diff = getDiff(subscribers, data, models, elms)
  return data

  function getValue (array, id, i = 0) {
    return Array.isArray(array) && id.length - 1 > i ? getValue(array[id[i++]], id, i) : array
  }
  function getElement (elm, id, i = 0) {
    return elm.childNodes.length && id.length - 1 > i ? getElement(elm.childNodes[id[i++]], id, i) : elm.childNodes[0]
  }
  function subscribe (name) {
    if (!subscribers.actions[name]) return
    subscribers.actions[name].forEach(symbol => {
      const id = elms[symbol]
      const ids = id.split(',')
      const vdom = getValue(result, ids)
      diff(vdom, vdom[ELEMENT].render(), getElement(dom, ids), id)
      subscribers.current = null
    })
  }

  function format (node) {
    switch (typeof node) {
      case 'number':
        node = node.toString()
      case 'string': // eslint-disable-line
        return node
      case 'object':
        if (node) return node
    }
    return null
  }
  function gen (node, id = '0') {
    const value = node
    if (node instanceof Element) {
      let symbol
      if (node[CONNECTED] && !node.store) {
        symbol = node[ELEMENT_ID]
        subscribers.current = symbol
        subscribers.listener[symbol] = []
        node.store = data
        node.models = models
      }
      if (typeof node.preRender === 'function') node.preRender()
      if (typeof node.postRender === 'function') postRenders.push(node.postRender.bind(node))
      node = node.render()
      if (symbol) {
        const array = subscribers.listener[symbol]
        const actions = []
        const unless = array.reduce((prev, key) => (++prev[key] || (prev[key] = 1)) && prev, {})
        array.forEach((key, i) => (unless[key] > 1 || !array[++i] || !array[i].includes(key)) &&
          !actions.includes(key) && actions.push(key))
        subscribers.listener[symbol] = actions
        actions.forEach(action => subscribers.actions[action]
          ? subscribers.actions[action].push(symbol) : (subscribers.actions[action] = [symbol]))
        elms[symbol] = id
      }
      if (node === null) return null
      node[ELEMENT] = value
    } else {
      node = format(node)
      if (node === null) return null
    }
    if (Array.isArray(node.children)) {
      node.children = node.children.map((node, i) => gen(node, id + ',' + i))
    }
    return node
  }
}
