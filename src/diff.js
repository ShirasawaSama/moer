import equal from 'lodash/isEqual'
import Element from './Element'
import renderNew from './render/render'
import setAccessor from './render/setAccessor'

export default function diff (a, b, dom) {
  if (b instanceof Element) return b.render().forEach((node, i) => diff(a, node, dom))
  const t = type(b)
  if (t !== 3 && type(a) !== t) { // 类型不同直接重新渲染
    // dom.innerHTML = ''
    return // renderNew(b, dom)
  }
  switch (t) {
    case 1:
      if (a !== b) return document.createTextNode(b)
      break
    case 2:
      const { type, children, args } = b
      const isSvg = type === 'svg'
      if (a.type === type) { // 若元素类型没改变
        const [diffs, not] = difference(a.args, args) // 比较元素args
        if (diffs.length) diffs.forEach(([k, v]) => setAccessor(dom, k, dom[k], v, isSvg))
        if (not.length) not.forEach(k => setAccessor(dom, k, dom[k], null, isSvg))
        if (Array.isArray(children)) children.forEach((node, i) => update(node, i, a.children[i], dom))
      } else { // 若元素类型改变, 则重新渲染元素
        const elm = isSvg
          ? document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          : document.createElement(type)
        if (args) Object.entries(args).forEach(([k, v]) => setAccessor(elm, k, elm[k], v, isSvg))
        if (Array.isArray(children) && children.length) renderNew(children, elm)
        return elm
      }
      return
    case 3: // 若为数组
      return b.forEach((node, i) => update(node, i, a[i], dom))
  }
}

function update (node, i, a, dom) {
  const child = dom && dom.childNodes[i]
  const elm = diff(a, node, child)
  if (!elm || !child) return
  dom.replaceChild(elm, child)
}

function difference (a = {}, b = {}) {
  return [
    Object.entries(b).filter(n => !equal(n[1], a[n[0]])),
    Object.keys(a).filter(c => !b[c])
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
