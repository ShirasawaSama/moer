// This code is from the Preact project.

const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *  If `value` is `null`, the attribute/handler will be removed.
 *  @param {Element} node  An element to mutate
 *  @param {string} name  The name/key to set, such as an event or attribute name
 *  @param {const} old  The last value that was set for this name/node pair
 *  @param {const} value  An attribute value, such as a function to be used as an event handler
 *  @param {Boolean} isSvg  Are we currently diffing inside an svg?
 *  @private
 */
export default (node, name, old, value, isSvg) => {
  if (name === 'className' && !isSvg) {
    node.className = value || ''
  } else if (name === 'style') {
    if (!value || typeof value === 'string' || typeof old === 'string') {
      node.style.cssText = value || ''
    }
    if (value && typeof value === 'object') {
      if (typeof old !== 'string') {
        Object.keys(old).forEach(i => !(i in value) && (node.style[i] = ''))
      }
      for (let i in value) {
        node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? (value[i] + 'px') : value[i]
      }
    }
  } else if (name === 'innerHTML') {
    if (value) node.innerHTML = value || ''
  } else if (name[0] === 'o' && name[1] === 'n') {
    let useCapture = name !== (name = name.replace(/Capture$/, ''))
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
    let ns = isSvg && (name !== (name = name.replace(/^xlink:?/, '')))
    if (value == null || value === false) {
      if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase())
      else node.removeAttribute(name)
    } else if (typeof value !== 'function') {
      if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value)
      else node.setAttribute(name, value)
    }
  }
}

function eventProxy (e) {
  return this._listeners[e.type](e)
}
