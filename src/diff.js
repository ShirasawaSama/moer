import Element from './Element'
import getRender from './render/render'
import setAccessor from './render/setAccessor'
import getElementRender from './render/renderElement'

export default (subscribers, store, models, elms, document) => {
  const renderNew = getRender(document)
  const renderElm = getElementRender(subscribers, store, models, elms)
  return function diff (a, b, dom, id = 0, index = { i: 0 }, parent) {
    if (b instanceof Element) b = renderElm(b, id)
    const t = getType(b)
    if (t !== 3 && getType(a) !== t) { // 类型不同直接重新渲染
      const d = renderNew(b)
      if (d) index.i++
      return { b, d }
    }
    switch (t) {
      case 1:
        const bn = b != null
        if (bn) index.i++
        return { b, d: bn && a !== b && document.createTextNode(b) }
      case 2:
        const { t: type, c: children, a: attr } = b
        if (a.t === type) { // 若元素类型没改变
          if (type === 'if') {
            const at = !!a.e
            const bt = !!b.e
            const pre = at ? a.a : a.b
            const post = bt ? b.a : b.b
            const pn = post == null
            const rn = pre == null
            if (at === bt && dom && pn === rn) { // 若前后表达式没变则直接diff
              const elm = diff(pre, post, dom, id, index, dom)
              if (elm.d) parent.replaceChild(elm.d, dom) // 如果发现更新则直接替换
            } else { // 如果改变了
              if (pn) { // 如果后者不存在
                if (!rn && dom) parent.removeChild(dom) // 如果前者已被渲染则直接删除
              } else { // 如果后者存在
                const elm = renderNew(post)
                if (elm) {
                  index.i++
                  if (rn || !dom) parent.insertBefore(elm, dom) // 如果前者不存在则直接插入
                  else parent.replaceChild(elm, dom) // 如果前者存在则直接替换
                }
              }
            }
            return { b }
          }
          index.i++
          if (a.a && a.a.once) return { b: a }
          if (a.a || attr) setAccessor(dom, attr, a.a, type === 'svg') // 比较元素attr
          if (Array.isArray(children) && (!attr || !('innerHTML' in attr))) {
            const index = { i: 0 }
            const lclen = a.c ? a.c.length : 0
            children.forEach((node, i) => {
              const achild = lclen > i && a.c[i]
              const child = dom && dom.childNodes[index.i]
              const elm = diff(achild, node, child, id + ',' + i, index, dom)
              a.c[i] = elm.b
              if (elm.d) {
                if (achild && child) dom.replaceChild(elm.d, child)
                else dom.appendChild(elm.d)
              }
            })
            if (index.i > 0) clearElm(dom, index.i)
            else dom.textContent = ''
          }
          return { b }
        } else { // 若元素类型改变, 则重新渲染元素
          const d = renderNew(b)
          if (d) index.i++
          return { b, d }
        }
      case 3:
        const blen = b.length
        if (!blen) return { b: [] }
        const ai = index.i
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
              const pid = index.i + i
              const k = pre[key]
              if (i === k) { // 元素位置没变化
                const child = cn[pid]
                const elm = diff(a[i], node, child, id + ',' + pid)
                if (elm.d) parent.replaceChild(elm.d, child)
              } else { // 元素位置改变
                const p = ai + k
                move[i] = { p, k, c: cn[p] }
              }
            }
          }
        }
        let clen = cn.length
        const alen = a.filter(v => v != null).length
        if (!notEqual && alen === clen) {
          parent.textContent = ''
          renderNew(b, parent)
          index.i = parent.childElementCount
          return { b: [] }
        }
        let j = 0
        clen = clen - index.i
        const times = Math.max(alen, blen)
        for (let i = 0; i < times; i++) { // 元素的 '增', '删', '移' 操作
          let child = clen + j < 0 ? null : cn[index.i]
          let old = a[i]
          if (child && old && old.a &&
            !(old.a.key in post)) { // 如果旧元素不在新元素树中, '删'
            parent.removeChild(child)
            j--
            old = null
            child = clen + j < 0 ? null : cn[index.i]
          }
          if (i in move) { // 如果元素位置移动, '移'
            const { c, k, p } = move[i]
            if (p === index.i + (old != null) + 1) index.i++
            else {
              const node = c.cloneNode(true)
              const elm = diff(a[k], b[i], node, id + ',' + index.i, index, parent)
              parent.insertBefore(elm.d || node, child)
              parent.removeChild(c)
              b[i] = elm.b
            }
            continue
          }
          const elm = diff(old, b[i], child, id + ',' + index.i, index, parent)
          b[i] = elm.b
          if (elm.d) { // 如果数据被插入, '增'
            parent.insertBefore(elm.d, child)
            j++
          }
        }
        b.k = post
        return { b }
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
