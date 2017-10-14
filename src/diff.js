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
              } else parent.insertBefore(renderNew(bt ? b.a : b.b), dom)
            }
            return
          }
          if (a.a && a.a.once) return
          if (a.a || attr) setAccessor(dom, attr, a.a, type === 'svg') // 比较元素attr
          if (Array.isArray(children) && (!attr || !('innerHTML' in attr))) {
            let index = 0
            const lclen = a.c ? a.c.length : 0
            children.forEach((node, i) => {
              index++
              const achild = lclen > i && a.c[i]
              const child = dom && dom.childNodes[i]
              const elm = diff(achild, node, child, id + ',' + i, index, dom)
              if (elm) {
                if (achild && child) dom.replaceChild(elm, child)
                else dom.appendChild(elm)
              }
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
        const blen = b.length
        if (!blen) return
        const move = {}
        const post = {}
        const pre = a.k || {}
        const cn = parent.childNodes
        let notEqual
        for (let i = 0; i < blen; i++) { // 元素位置跟踪 (元素的 '改' 操作)
          const node = b[i]
          if (node && node.a) {
            const key = node.a.key
            post[key] = i
            if (key in pre) { // 元素已存在
              notEqual = true
              const pid = index + i
              if (i === pre[key]) { // 元素位置没变化
                const child = cn[pid]
                const elm = diff(a[i], node, child, id + ',' + pid)
                if (elm) parent.replaceChild(elm, child)
              } else move[i] = { p: i, c: cn[index + pre[key]] } // 元素位置改变
            }
          }
        }
        let clen = cn.length
        const alen = a.length
        if (!notEqual && alen === clen) {
          parent.textContent = ''
          renderNew(b, parent)
          return
        }
        let j = 0
        clen = clen - index
        const times = Math.max(alen, blen)
        for (let i = 0; i < times; i++) { // 元素的 '增', '删', '移' 操作
          let pid = index + i + j
          let child = clen + j < 0 ? null : cn[pid]
          let old = a[i]
          if (child && old && old.a &&
            !(old.a.key in post)) { // 如果旧元素不在新元素树中, '删'
            parent.removeChild(child)
            j--
            old = false
            child = clen + j < 0 ? null : cn[pid]
          }
          if (i in move) { // 如果元素位置移动, '移'
            const { c, p } = move[i]
            if (p !== pid + (old !== false)) {
              let elm = c.cloneNode(true)
              parent.insertBefore(diff(a[i], b[i], elm, id + ',' + pid) || elm, child)
              parent.removeChild(c)
            }
            continue
          }
          if (old !== false) {
            const elm = diff(old, b[i], child, id + ',' + pid)
            if (elm) { // 如果数据被插入, '增'
              parent.insertBefore(elm, child)
              j++
            }
          }
        }
        b.k = post
        index += blen
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
  if (obj == null) return 0
  const t = typeof obj
  return t === 'string' || t === 'number'
    ? 1
    : t === 'object'
      ? Array.isArray(obj) ? 3 : 2
      : 0
}
