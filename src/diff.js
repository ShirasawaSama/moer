import Element from './Element'
import getRender from './render/render'
import setAccessor from './render/setAccessor'
import getElementRender from './render/renderElement'

export default (subscribers, store, models, elms, document) => {
  const renderNew = getRender(document)
  const renderElm = getElementRender(subscribers, store, models, elms)
  return function diff (a, b, dom, id = 0, index, parent) {
    if (b instanceof Element) b = renderElm(b, id)
    const t = getType(b)
    if (t !== 3 && getType(a) !== t) return renderNew(b) // 类型不同直接重新渲染
    switch (t) {
      case 1: return a !== b && document.createTextNode(b)
      case 2:
        const { t: type, c: children, a: attr } = b
        if (a.t === type) { // 若元素类型没改变
          if (type === 'if') {
            const at = !!a.t
            const bt = !!b.t
            if (at === bt && (at ? (a.a == null) === (b.a == null)
              : (a.b == null) === (b.b == null))) {
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
          if (a.a && a.a.once) return
          if (a.a || attr) setAccessor(dom, attr, a.a, type === 'svg') // 比较元素attr
          if (Array.isArray(children) && (!attr || !('innerHTML' in attr))) {
            let index = 0
            children.forEach((node, i) => {
              index++
              const child = dom && dom.childNodes[i]
              const elm = diff(a.c[i], node, child, id + ',' + i, index, dom)
              if (!elm) return
              if (a.c[i] && child) dom.replaceChild(elm, child)
              else dom.appendChild(elm)
            })
            const len = children.reduce((p, v) => Array.isArray(v)
              ? p - 1 + v.length : p, children.length)
            if (len) clearElm(dom, len)
            else dom.textContent = ''
            a.c = children
          }
        } else return renderNew(b) // 若元素类型改变, 则重新渲染元素
        break
      case 3:
        index--
        if (!b.length) return
        const pre = a.k || {}
        let j = 0
        const clear = {}
        const post = {}
        for (const v of b) {
          if (v && v.a) post[v.a.key] = j
          j++
        }
        j = 0
        if (a.k) {
          for (const key in pre) {
            if (!(key in post)) clear[j] = null
            j++
          }
        }
        j = 0
        const cn = parent.childNodes
        const times = Math.max(a.length, b.length)
        let len = cn.length
        for (let k = 0; k < times; k++) {
          const pid = k + index - j
          const child = len > pid ? cn[pid] : null
          if (k in clear && child) {
            j++
            parent.removeChild(child)
          }
          const node = b[k]
          let i = k
          if (getType(node) === 2 && node.a) {
            if (node.a.key in pre) i = pre[node.a.key]
            else if (a[i] && a[i].a && a[i].a.key in post) {
              const elm = renderNew(node)
              if (child) parent.insertBefore(elm, child)
              else parent.appendChild(elm)
              continue
            }
          }
          const elm = diff(a[i], node, child, id + ',' + pid)
          if (!elm) continue
          if (a[i] && child) parent.replaceChild(elm, child)
          else parent.appendChild(elm)
        }
        b.k = post
        index += b.length
    }
  }
}
function clearElm (elm, start) {
  const children = elm.childNodes
  let len = children.length
  const times = len - start
  for (let i = times; i > 0; i--) {
    elm.removeChild(children[--len])
  }
}
function getType (obj) {
  const t = typeof obj
  return t === 'string' || t === 'number'
    ? 1
    : t === 'object'
      ? Array.isArray(obj) ? 3 : 2
      : 0
}
