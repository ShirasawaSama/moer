// This code is from the Preact project.

const XLINK = /^xlink:?/
const NON_DIM = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i
const n = 'http://www.w3.org/1999/xlink'

export default (root, tree) => {
  const events = {}
  function eventProxy (e) {
    const path = []
    const domPath = []
    bubble(e.target, domPath, path)
    if (!path.t) return
    let elm = path[0] = tree
    const len = path.length
    let i = 0
    while (++i < len) {
      let index = path[i]
      let ci = 0
      const children = elm.c
      while (ci <= index) {
        elm = children[ci]
        if (elm == null) {
          ci++
          index++
        } else {
          if (Array.isArray(elm)) {
            const i = ci + elm.length
            if (i > index) elm = elm[index - ci]
            ci = i
          } else {
            ci++
            if (elm.t === 'if') {
              const child = elm.e ? elm.a : elm.b
              if (child) elm = child
              else index++
            }
          }
        }
      }
      path[i] = elm
    }
    const type = 'on' + e.type
    const typeCapture = type + 'capture'
    i = -1
    while (!e.cancelBubble && ++i < len) {
      const attr = path[i].a
      if (attr) for (const key in attr) if (key.toLowerCase() === typeCapture) attr[key].call(domPath[len], e)
    }
    while (!e.cancelBubble && i--) {
      const attr = path[i].a
      if (attr) for (const key in attr) if (key.toLowerCase() === type) attr[key].call(domPath[len], e)
    }
  }
  function bubble (e, path, pos) {
    const parent = e.parentNode
    if (!parent) return
    if (e === root) return (pos.t = true)
    const children = parent.childNodes
    const len = children.length
    bubble(parent, path, pos)
    for (let i = 0; i < len; i++) {
      if (children[i] === e) {
        path.push(e)
        pos.push(i)
        return
      }
    }
  }

  return (node, b = {}, a = {}, isSvg) => {
    for (let name in a) {
      if (b[name] == null && name !== 'key' && name !== 'once') {
        if (isSvg && (name !== (name = name.replace(XLINK, '')))) {
          node.removeAttributeNS(n, name.toLowerCase())
        } else node.removeAttribute(name)
      }
    }
    for (let name in b) {
      const old = a[name]
      const value = b[name]
      if (old !== value && name !== 'key' && name !== 'once') {
        if (name === 'style') {
          const type = typeof value
          const to = typeof old
          if (!value || type === 'string' || to === 'string') node.style.cssText = value || ''
          if (type === 'object') {
            if (to === 'object') {
              for (const i in old) if (value[i] == null || value[i] === false) node.style[i] = ''
              for (const i in value) {
                const v = value[i]
                if (v !== old[i]) {
                  node.style[i] = typeof v === 'number' && !NON_DIM.test(i) ? v + 'px' : v
                }
              }
            } else {
              for (const i in value) {
                const v = value[i]
                node.style[i] = typeof v === 'number' && !NON_DIM.test(i) ? v + 'px' : v
              }
            }
          }
        } else if (name.startsWith('on')) {
          const len = name.length
          name = name.toLowerCase().substring(2, name.endsWith('Capture') ? len - 7 : len)
          if (value && !(name in events)) {
            events[name] = true
            root.addEventListener(name, eventProxy, true)
          }
        } else if (name === 'innerHTML') node.innerHTML = value || ''
        else if (!isSvg && name !== 'list' && name !== 'type' && name in node) {
          node[name] = value == null ? '' : value
          if (value == null || value === false) {
            node.removeAttribute(name === 'className' ? 'class' : name)
          }
        } else {
          const ns = isSvg && (name !== (name = name.replace(XLINK, '')))
          if (value == null || value === false) {
            if (ns) node.removeAttributeNS(n, name.toLowerCase())
            else node.removeAttribute(name)
          } else if (typeof value !== 'function') {
            if (ns) node.setAttributeNS(n, name.toLowerCase(), value)
            else node.setAttribute(name, value)
          }
        }
      }
    }
  }
}
