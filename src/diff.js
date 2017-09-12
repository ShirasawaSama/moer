import equal from 'lodash/isEqual'
import Element from './Element'
import renderNew from './render/render'
import setAccessor from './render/setAccessor'

export default function diff (a, b, dom) {
  if (b instanceof Element) {
    if (typeof b.preRender === 'function') b.preRender()
    const result = b.render()
    if (Array.isArray(result)) diff(a, result, dom)
    if (typeof b.postRender === 'function') b.postRender()
    return
  }
  const t = type(b)
  if (t !== 3 && type(a) !== t) { // 类型不同直接重新渲染
    if (t === 1) return document.createTextNode(b)
    else return renderElm(b.type, b.args, b.children, b.type === 'svg')
  }
  switch (t) {
    case 1:
      if (a !== b) return document.createTextNode(b)
      break
    case 2:
      const { type, children, args } = b
      const isSvg = type === 'svg'
      if (a.type === type) { // 若元素类型没改变
        const aargs = a.args || {}
        const [diffs, not] = difference(aargs, args) // 比较元素args
        if (diffs.length) diffs.forEach(([k, v]) => setAccessor(dom, k, aargs[k], v, isSvg))
        if (not.length) not.forEach(([k, v]) => setAccessor(dom, k, v, null, isSvg))
        if (Array.isArray(children)) {
          clearElm(dom, children.length, a.children)
          children.forEach((node, i) => {
            const result = update(node, i, a.children[i], dom)
            if (result) a.children[i] = result
          })
        }
      } else { // 若元素类型改变, 则重新渲染元素
        return renderElm(type, args, children, isSvg)
      }
      return
    case 3: // 若为数组
      clearElm(dom, b.length, a)
      return b.forEach((node, i) => {
        const result = update(node, i, a[i], dom)
        if (result) a[i] = result
      })
  }
}

function renderElm (type = 'div', args, children, isSvg) {
  const elm = isSvg
    ? document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    : document.createElement(type)
  if (args) Object.entries(args).forEach(([k, v]) => setAccessor(elm, k, elm[k], v, isSvg))
  if (Array.isArray(children) && children.length) renderNew(children, elm)
  return elm
}

function clearElm (elm, start, a) {
  const children = elm.childNodes
  if (children.length > start) {
    for (let i = start; i < children.length; i++) elm.removeChild(children[i])
    a.splice(start)
  }
}

function update (node, i, a, dom) {
  const child = dom && dom.childNodes[i]
  const elm = diff(a, node, child)
  if (!elm) return
  if (a && child) dom.replaceChild(elm, child)
  else dom.appendChild(elm)
  return elm
}

function difference (a = {}, b = {}) {
  return [
    Object.entries(b).filter(n => !equal(n[1], a[n[0]])),
    Object.entries(a).filter(c => !b[c[0]])
  ]
}

function type (obj) {
  const t = typeof obj
  return t === 'string'
    ? 1
    : t === 'object'
      ? Array.isArray(obj) ? 3 : 2
      : 0
}
