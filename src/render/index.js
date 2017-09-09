import merge from 'lodash/merge'
import addProxy from '../proxy'
import Element from '../Element'
import render from './render'
import diff from '../diff'
import { ELEMENT_ID, ELEMENT, CONNECTED } from '../symbols'

export default (node, dom, data, models) => {
  const subscribers = { current: null, listener: {}, actions: {} }
  const elms = {}
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
  render(result, dom)
  return data

  function getValue (array, id, i = 0) {
    return Array.isArray(array) && id.length - 1 > i ? getValue(array[id[i++]], id, i) : array
  }
  function subscribe (name) {
    if (!subscribers.actions[name]) return
    subscribers.actions[name].forEach(symbol => {
      const ids = elms[symbol].split(',')
      const vdom = getValue(result, ids)
      diff(vdom, vdom[ELEMENT].render(), dom, result)
    })
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
    const parent = []
    array.forEach(node => {
      if (Array.isArray(node = format(node))) {
        node.forEach(node => parent.push(format(node)))
      } else parent.push(node)
    })
    return parent
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
        node.state = {}
      }
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
    } else node = format(node)
    if (node === null) return null
    if (Array.isArray(node)) node = formatArray(node).map((node, i) => gen(node, id + ',' + i))
    else if (Array.isArray(node.children)) node.children = formatArray(node.children).map((node, i) => gen(node, id + ',' + i))
    if (Array.isArray(node)) Object.defineProperty(node, ELEMENT, { value, enumerable: false })
    return node
  }
}
