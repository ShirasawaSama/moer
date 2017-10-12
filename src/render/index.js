import addProxy from '../proxy'
import Element from '../Element'
import render from './render'
import getDiff from '../diff'
import getElementRender from './renderElement'
import { ELEMENT, STATE, keySplit } from '../symbols'

export default (document, node, dom, data, models) => {
  const subscribers = { current: null, listener: {}, actions: {} }
  const elms = {}
  let postRenders = []
  const actions = new Set()
  const actionAdd = actions.add.bind(actions)
  data[STATE] = {}
  data.models = models.reduce((p, m) => (p[m.name] = typeof m.state === 'object' ? m.state : {}) && p, {})
  data = addProxy(data, subscribe, subscribers)
  models = models.reduce((p, m) => (m.store = data) && (m.state = data.models[m.name]) && (p[m.name] = m) && p, {})
  Object.values(models).forEach(m => (m.models = models))
  const renderElm = getElementRender(subscribers, data, models, elms, postRenders)
  const result = gen(node)
  subscribers.current = null
  if (result) {
    const child = render(document)(result, dom)
    if (child) dom.appendChild(child)
  }
  postRenders.forEach(fn => fn())
  postRenders = null
  const diff = getDiff(subscribers, data, models, elms, document)
  return data

  function subscribe (name) {
    if (!subscribers.actions[name]) return
    if (!actions.size) {
      setTimeout(() => {
        actions.forEach(symbol => {
          const id = elms[symbol]
          const ids = id.split(keySplit)
          const vdom = getValue(result, ids)
          diff(vdom, vdom[ELEMENT].render(), getElement(dom, ids), id)
        })
        actions.clear()
      }, 0)
    }
    subscribers.current = null
    subscribers.actions[name].forEach(actionAdd)
  }
  function gen (node, id = '0') {
    if (!node) return
    const value = node
    if (node instanceof Element) {
      node = renderElm(node, id)
      if (!node) return
      node[ELEMENT] = value
    }
    if (Array.isArray(node.c)) {
      node.c = node.c.map((node, i) => gen(node, id + ',' + i))
    }
    return node
  }
}

function getValue (array, id, i = 0) {
  return Array.isArray(array) && id.length - 1 > i ? getValue(array[id[i++]], id, i) : array
}
function getElement (elm, id, i = 0) {
  return elm.childNodes.length && id.length - 1 > i
    ? getElement(elm.childNodes[id[i++]], id, i) : elm.childNodes[0]
}
