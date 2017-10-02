import equal from 'lodash/isequal'
import Element from './Element'
import getRender from './render/render'
import setAccessor from './render/setAccessor'
import getElementRender from './render/renderElement'

export default (subscribers, store, models, elms, document) => {
  const renderNew = getRender(document)
  const renderElm = getElementRender(subscribers, store, models, elms)
  function diff (a, b, dom, id = 0, index, parent) {
    if (b instanceof Element) b = renderElm(b, id)
    const t = getType(b)
    if (t !== 3 && getType(a) !== t) return renderNew(b) // 类型不同直接重新渲染
    switch (t) {
      case 1: return a !== b && document.createTextNode(b)
      case 2:
        const { type, children, args } = b
        if (a.type === type) { // 若元素类型没改变
          if (type === 'if') {
            const at = !!a.t
            const bt = !!b.t
            if (at === bt && (at ? isNull(a.a) === isNull(b.a)
              : isNull(a.b) === isNull(b.b))) {
              diff(bt ? a.a : a.b, bt ? b.a : b.b, dom, id, index, dom)
            } else {
              if (at) {
                if (dom) parent.removeChild(dom)
              } else {
                const elm = renderNew(bt ? b.a : b.b)
                if (dom) parent.insertBefore(elm, dom)
                else parent.appendChild(elm)
              }
            }
            return
          }
          const aargs = a.args || {}
          const isSvg = type === 'svg'
          const [diffs, not] = difference(aargs, args) // 比较元素args
          if (diffs.length) diffs.forEach(([k, v]) => setAccessor(dom, k, aargs[k], v, isSvg))
          if (not.length) not.forEach(([k, v]) => setAccessor(dom, k, v, null, isSvg))
          if (Array.isArray(children)) {
            let index = 0
            children.forEach((node, i) => {
              index++
              const child = dom && dom.childNodes[i]
              const elm = diff(a.children[i], node, child, id + ',' + i, index, dom)
              if (!elm) return
              if (a.children[i] && child) dom.replaceChild(elm, child)
              else dom.appendChild(elm)
              a.children[i] = node
            })
            if (!parent) {
              clearElm(dom, children.reduce((p, v) => Array.isArray(v)
                ? p - 1 + v.length : p, children.length))
              a.children.splice(children.length)
            }
          }
        } else return renderNew(b) // 若元素类型改变, 则重新渲染元素
        break
      case 3:
        index--
        if (!b.length) return
        const post = b.reduce((p, v, i) => {
          if (v && v.args && !isNull(v.args.key)) p[v.args.key] = i
          return p
        }, {})
        const pre = a.filter((v, i) => {
          if (v.args.key in post) return true
          const child = parent.childNodes[i + index]
          if (child) parent.removeChild(child)
        }).reduce((p, v, i) => {
          if (v && v.args && !isNull(v.args.key)) p[v.args.key] = i
          return p
        }, {})
        b.forEach((node, i) => {
          const pid = i + index
          const child = parent.childNodes[pid]
          if (getType(node) === 2 && node.args && !isNull(node.args.key)) {
            if (node.args.key in pre) i = pre[node.args.key]
            else if (a[i].args && a[i].args.key in post) {
              const elm = renderNew(node)
              if (child) parent.insertBefore(elm, child)
              else parent.appendChild(elm)
              a[i] = node
              return
            }
          }
          const elm = diff(a[i], node, child, id + ',' + pid, index, parent)
          if (!elm) return
          if (a[i] && child) parent.replaceChild(elm, child)
          else parent.appendChild(elm)
          a[i] = node
        })
        index += b.length
    }
  }
  return diff
}
function isNull (obj) {
  return obj === null || typeof obj === 'undefined'
}
function clearElm (elm, start) {
  const children = elm.childNodes
  for (let i = children.length - start; i > 0; i--) {
    elm.removeChild(children[children.length - 1])
  }
}

function difference (a = {}, b = {}) {
  return [
    Object.entries(b).filter(n => !equal(n[1], a[n[0]])),
    Object.entries(a).filter(c => !(c[0] in b))
  ]
}
function getType (obj) {
  const t = typeof obj
  return t === 'string' || t === 'number'
    ? 1
    : t === 'object'
      ? Array.isArray(obj) ? 3 : 2
      : 0
}
