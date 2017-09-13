import merge from 'lodash/merge'
import addProxy from '../proxy'
import Element from '../Element'
import render from './render'
import getDiff from '../diff'
import getElementRender from './renderElement'
import { ELEMENT, STATE, keySplit } from '../symbols'

export default (node, dom, data, models) => {
  const subscribers = { current: null, listener: {}, actions: {} }
  const elms = {}
  let postRenders = []
  data[STATE] = {}
  data = addProxy(
    models.reduce((p, m) => typeof m.init === 'object' ? merge(p, m.init) : p, data),
    subscribe,
    subscribers
  )
  models = models.reduce((p, m) => (m.store = data) && (p[m.name] = m) && p, {})
  Object.values(models).forEach(m => (m.models = models))
  const renderElm = getElementRender(subscribers, data, models, elms, postRenders)
  const result = gen(node)
  subscribers.current = null
  dom.appendChild(render(result, dom))
  postRenders.forEach(fn => fn())
  postRenders = null
  const diff = getDiff(subscribers, data, models, elms)
  return data

  function subscribe (name) {
    if (!subscribers.actions[name]) return
    subscribers.actions[name].forEach(symbol => {
      const id = elms[symbol]
      const ids = id.split(keySplit)
      const vdom = getValue(result, ids)
      diff(vdom, vdom[ELEMENT].render(), getElement(dom, ids), id)
      subscribers.current = null
    })
  }
  function gen (node, id = '0') {
    const value = node
    if (node instanceof Element) {
      node = renderElm(node, id)
      if (!node) return
      node[ELEMENT] = value
    }
    if (Array.isArray(node.children)) {
      node.children = node.children.map((node, i) => gen(node, id + ',' + i))
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
