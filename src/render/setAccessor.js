// This code is from the Preact project.

const XLINK = /^xlink:?/
const CAP = /Capture$/
const NON_DIM = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i
const n = 'http://www.w3.org/1999/xlink'

export default (node, b = {}, a = {}, isSvg) => {
  for (let name in a) {
    if (!(name in b) && name !== 'key' && name !== 'once') {
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
            for (const i in old) if (!(i in value)) node.style[i] = ''
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
        const useCapture = name !== (name = name.replace(CAP, ''))
        name = name.toLowerCase().substring(2)
        if (value) {
          if (!old) node.addEventListener(name, eventProxy, useCapture)
        } else node.removeEventListener(name, eventProxy, useCapture)
        if (!node._listeners) node._listeners = {}
        node._listeners[name] = value
      } else if (name === 'innerHTML') node.innerHTML = value || ''
      else if (!isSvg && name !== 'list' && name !== 'type' && name in node) {
        node[name] = value == null ? '' : value
        if (value == null || value === false) node.removeAttribute(name)
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

function eventProxy (e) {
  return this._listeners[e.type](e)
}
