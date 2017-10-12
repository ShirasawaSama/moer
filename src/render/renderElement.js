import Element from '../Element'
import { CONNECTED, ELEMENT_ID } from '../symbols'

export default (subscribers, data, models, elms, postRenders) => function renderElement (node, id) {
  let symbol
  if (!node.store) {
    if (node[CONNECTED]) {
      symbol = node[ELEMENT_ID]
      subscribers.current = symbol
      subscribers.listener[symbol] = []
      node.set(data, models)
    } else if (typeof node.state === 'object') {
      symbol = node[ELEMENT_ID]
      subscribers.current = symbol
      subscribers.listener[symbol] = []
      node.sets(data)
    }
  }
  if (typeof node.preRender === 'function') node.preRender()
  const result = node.render()
  if (typeof node.postRender === 'function') {
    postRenders ? postRenders.push(node.postRender.bind(node)) : node.postRender()
  }
  node = result
  if (symbol) {
    const array = subscribers.listener[symbol]
    const unless = {}
    const actions = new Set()
    const len = array.length
    if (len) actions.add(array[len - 1])
    for (let i = 0; i < len - 1; i++) {
      const key = array[i]
      if (key in unless || !array[i + 1].startsWith(key)) actions.add(key)
      else unless[key] = null
    }
    const result = new Array(actions.size)
    actions.forEach((v, i) => {
      result[i] = v
      if (subscribers.actions[v]) subscribers.actions[v].push(symbol)
      else subscribers.actions[v] = [symbol]
    })
    subscribers.listener[symbol] = result
    elms[symbol] = id
  }
  if (node instanceof Element) return renderElement(node, id)
  return node
}
