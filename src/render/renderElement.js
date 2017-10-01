import union from 'lodash/union'
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
    const unless = array.reduce((prev, key) => (++prev[key] || (prev[key] = 1)) && prev, {})
    const actions = union(array.filter((key, i) => unless[key] > 1 || !array[++i] ||
      !array[i].startsWith(key)))
    subscribers.listener[symbol] = actions
    actions.forEach(action => subscribers.actions[action]
      ? subscribers.actions[action].push(symbol) : (subscribers.actions[action] = [symbol]))
    elms[symbol] = id
  }
  if (node instanceof Element) return renderElement(node, id)
  return node
}
