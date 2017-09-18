import equal from 'lodash.isequal'
import Element from './Element'
import getRender from './render/render'
import setAccessor from './render/setAccessor'
import getElementRender from './render/renderElement'

export default (subscribers, store, models, elms, document) => {
  const renderNew = getRender(document)
  const renderElm = getElementRender(subscribers, store, models, elms)
  function diff (a, b, dom, id = 0) {
    if (b instanceof Element) b = renderElm(b, id)
    const t = type(b)
    if (t !== 3 && type(a) !== t) return renderNew(b) // 类型不同直接重新渲染
    switch (t) {
      case 1: return a !== b && document.createTextNode(b)
      case 2:
        const { type, children, args } = b
        if (a.type === type) { // 若元素类型没改变
          const aargs = a.args || {}
          const isSvg = type === 'svg'
          const [diffs, not] = difference(aargs, args) // 比较元素args
          if (diffs.length) diffs.forEach(([k, v]) => setAccessor(dom, k, aargs[k], v, isSvg))
          if (not.length) not.forEach(([k, v]) => setAccessor(dom, k, v, null, isSvg))
          if (Array.isArray(children)) {
            clearElm(dom, children.length, a.children)
            children.forEach((node, i) => {
              const result = update(node, i, a.children[i], dom, id + ',' + i)
              if (result) a.children[i] = result
            })
          }
        } else return renderNew(b) // 若元素类型改变, 则重新渲染元素
    }
  }
  function update (node, i, a, dom, id) {
    const child = dom && dom.childNodes[i]
    const elm = diff(a, node, child, id)
    if (!elm) return
    if (a && child) dom.replaceChild(elm, child)
    else dom.appendChild(elm)
    return node
  }
  return diff
}
function clearElm (elm, start, a) {
  const children = elm.childNodes
  if (children.length > start) {
    for (let i = start; i < children.length; i++) elm.removeChild(children[i])
    a.splice(start)
  }
}

function difference (a = {}, b = {}) {
  return [
    Object.entries(b).filter(n => !equal(n[1], a[n[0]])),
    Object.entries(a).filter(c => !(c[0] in b))
  ]
}
function type (obj) {
  const t = typeof obj
  return t === 'string' || t === 'number'
    ? 1
    : t === 'object' && !Array.isArray(obj) ? 2 : 0
}
