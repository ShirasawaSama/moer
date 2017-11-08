import getDiff from './diff'
import addProxy from './proxy'
import Element from './Element'
import getRender from './render/render'
import getSetAccessor from './render/setAccessor'
import getElementRender from './render/renderElement'
import { STATE, ELEMENT } from './symbols'

export default (document, node, dom, data, plugins, models) => {
  const ids = {}
  const mods = {}
  const setup = {}
  let postRenders = []
  const pluginsData = {}
  const actions = new Set()
  const subscribers = { current: null, listener: {}, actions: {} }

  const actionAdd = actions.add.bind(actions)
  data = addProxy(data, subscribe, subscribers)
  plugins.forEach(p => p && typeof p.onSetup === 'function' &&
    p.onSetup(setup, data, pluginsData))
  models = models.map(Model => new Model(setup)).filter(model => model.name)
  data.models = models.reduce((p, m) => (p[m.name] = typeof m.state === 'object'
    ? m.state : {}) && p, {})
  for (const model of models) {
    const name = model.name
    model.store = data
    model.state = data.models[name]
    model.models = mods
    mods[name] = model
  }
  models = null
  const renderElm = getElementRender(subscribers, data, mods, ids,
    data[STATE], postRenders, pluginsData)
  const tree = gen(node)
  subscribers.current = null
  const setAccessor = getSetAccessor(dom, tree)
  const render = getRender(document, setAccessor)
  const diff = getDiff(setAccessor, renderElm, render, document)
  if (tree) {
    const child = render(tree, dom)
    if (child) dom.appendChild(child)
  }
  for (const i in postRenders) {
    const f = postRenders[i]
    f.f.call(f.o)
  }
  postRenders = {}
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
    for (const i in postRenders) {
      const f = postRenders[i]
      f.f.call(f.o)
    }
    postRenders = {}
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
