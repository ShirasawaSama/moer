// This code is from the Preact project.

const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i
const n = 'http://www.w3.org/1999/xlink'

export default (node, name, old, value, isSvg) => {
  if ((name === 'className' || name === 'class') && !isSvg) {
    if (typeof value === 'object') {
      node.className = Array.isArray(value)
        ? value.filter(Boolean).join(' ')
        : Object.keys(value).filter(key => !!value[key]).join(' ')
    } else node.className = value || ''
  } else if (name === 'style') {
    const type = typeof value
    const to = typeof old
    if (!value || type === 'string' || to === 'string') node.style.cssText = value || ''
    if (value && type === 'object') {
      if (to === 'object' && old) {
        Object.keys(old).forEach(i => !(i in value) && (node.style[i] = ''))
      }
      for (const i in value) {
        node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? (value[i] + 'px') : value[i]
      }
    }
  } else if (name === 'innerHTML') {
    if (value) node.innerHTML = value || ''
  } else if (name.startsWith('on')) {
    const useCapture = name !== (name = name.replace(/Capture$/, ''))
    name = name.toLowerCase().substring(2)
    if (value) {
      if (!old) node.addEventListener(name, eventProxy, useCapture)
    } else {
      node.removeEventListener(name, eventProxy, useCapture)
    }
    (node._listeners || (node._listeners = {}))[name] = value
  } else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
    try { node[name] = value == null ? '' : value } catch (e) {}
    if (value == null || value === false) node.removeAttribute(name)
  } else {
    const ns = isSvg && (name !== (name = name.replace(/^xlink:?/, '')))
    if (value == null || value === false) {
      if (ns) node.removeAttributeNS(n, name.toLowerCase())
      else node.removeAttribute(name)
    } else if (typeof value !== 'function') {
      if (ns) node.setAttributeNS(n, name.toLowerCase(), value)
      else node.setAttribute(name, value)
    }
  }
}

function eventProxy (e) {
  return this._listeners[e.type](e)
}
