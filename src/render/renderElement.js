import Element from '../Element'
import { startsWith } from '../helpers'
import { CONNECTED, ELEMENT_ID } from '../symbols'

export default (subscribers, data, models, elms, state, postRenders, pluginsData) =>
  function renderElement (node, id) {
    let connected
    const symbol = node[ELEMENT_ID]
    if (!node.store) {
      if (node[CONNECTED]) {
        connected = true
        subscribers.current = symbol
        subscribers.listener[symbol] = []
        if (node.state) {
          if (!state[symbol]) state[symbol] = node.state
          node.state = state[symbol]
        }
        node.store = data
        node.models = models
        node.plugins = pluginsData
      } else if (node.state) {
        connected = true
        subscribers.current = symbol
        subscribers.listener[symbol] = []
        if (!state[symbol]) state[symbol] = node.state
        node.state = state[symbol]
      }
    }
    if (typeof node.preRender === 'function') node.preRender()
    const result = node.render()
    if (typeof node.postRender === 'function') {
      postRenders[symbol] = { o: node, f: node.postRender }
    }
    node = result
    if (connected) {
      const unless = {}
      const actions = new Set()
      const array = subscribers.listener[symbol]
      const len = array.length
      if (len) actions.add(array[len - 1])
      for (let i = 0; i < len - 1; i++) {
        const key = array[i]
        if (key in unless || !startsWith(array[i + 1], key)) actions.add(key)
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
