import getDiff from './diff'
import addProxy from './proxy'
import Element from './Element'
import getRender from './render/render'
import getSetAccessor from './render/setAccessor'
import getElementRender from './render/renderElement'
import { ELEMENT, STATE } from './symbols'

// const getValue = (elm, path) => path.reduce((e, i) => Array.isArray(e)
//   ? e[i] : e && e.c && e.c[i], elm)
// const getElement = (elm, path) => path.reduce((e, i) => e.childNodes[i], elm)
export default (document, node, dom, data, models) => {
  const subscribers = { current: null, listener: {}, actions: {} }
  const ids = {}
  let postRenders = []
  const actions = new Set()
  const actionAdd = actions.add.bind(actions)
  data[STATE] = {}
  data.models = models.reduce((p, m) => (p[m.name] = typeof m.state === 'object' ? m.state : {}) && p, {})
  data = addProxy(data, subscribe, subscribers)
  const mods = {}
  for (const model of models) {
    const name = model.name
    model.store = data
    model.state = data.models[name]
    model.models = mods
    mods[name] = model
  }
  models = null
  const renderElm = getElementRender(subscribers, data, mods, ids, postRenders)
  const tree = gen(node)
  subscribers.current = null
  const setAccessor = getSetAccessor(dom, tree)
  const render = getRender(document, setAccessor)
  if (tree) {
    const child = render(tree, dom)
    if (child) dom.appendChild(child)
  }
  postRenders.forEach(f => f.f.call(f.o))
  postRenders = null
  const diff = getDiff(setAccessor, renderElm, render, document)
  return data

  function active () {
    actions.forEach(symbol => {
      const id = ids[symbol]
      let d = dom.childNodes[0]
      let e = tree
      if (id) {
        const result = getElement(d, e, id.split(','))
        d = result.d
        e = result.e
      }
      diff(e, e[ELEMENT].render(), d, id)
    })
    actions.clear()
  }
  function subscribe (name) {
    if (!subscribers.actions[name]) return
    if (!actions.size) setTimeout(active, 0)
    subscribers.current = null
    subscribers.actions[name].forEach(actionAdd)
  }
  function gen (node, id) {
    const value = node
    if (id == null) {
      if (!(node instanceof Element)) return
      node = renderElm(node)
      if (!node) return node
      node[ELEMENT] = value
      if (!node.c) return node
      node.c = node.c.map(gen)
      return node
    }
    if (Array.isArray(node)) return node.map((node, i) => gen(node, id + ',' + i))
    if (node instanceof Element) {
      node = renderElm(node, id)
      if (!node) return
      node[ELEMENT] = value
    }
    if (node.c) node.c = node.c.map((node, i) => gen(node, id + ',' + i))
    return node
  }
}
function getElement (dom, elm, path) {
  for (let i = 0; i < path.length; i++) {
    if (elm != null) {
      let id = path[i]
      const child = elm.c[id]
      if (Array.isArray(child)) {
        let index = id
        while (--id > 0) {
          const e = elm.c[id]
          if (e != null && (e.t !== 'if' || (e.e ? e.a : e.b))) index++
          else if (Array.isArray(e)) index += e.length
        }
        elm = child[path[++i]]
        dom = dom.childNodes[index]
      } else {
        elm = child
        dom = dom.childNodes[id]
      }
    }
  }
  return { e: elm, d: dom }
}
