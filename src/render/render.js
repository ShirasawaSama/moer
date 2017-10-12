import setAccessor from './setAccessor'

export default document => function render (node, parent) {
  if (!parent) parent = render(node, true)
  if (node !== null) {
    switch (typeof node) {
      case 'number':
      case 'string': return document.createTextNode(node)
      case 'object':
        if (Array.isArray(node)) {
          const keys = {}
          let i = 0
          for (const elm of node) {
            const dom = render(elm, parent)
            if (dom) {
              parent.appendChild(dom)
              if (elm.a) keys[elm.a.key] = i
            }
            i++
          }
          node.k = keys
        }
        let { t: type = 'div', c: children, a: attr } = node
        if (type === 'if') return render(node.e ? node.a : node.b, parent)
        type = type.toLowerCase()
        const isSvg = type === 'svg'
        const elm = isSvg
          ? document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          : document.createElement(type)
        if (attr) setAccessor(elm, attr, {}, isSvg)
        if (Array.isArray(children)) children.forEach(node => (node = render(node, elm)) && elm.appendChild(node))
        return elm
    }
  }
}
