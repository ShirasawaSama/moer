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
          node.forEach((node, i) => {
            const dom = render(node, parent)
            if (dom) {
              parent.appendChild(dom)
              if (node.a && typeof node.a.key !== 'undefined') keys[node.a.key] = i
            }
          })
          node.k = keys
        }
        let { t: type = 'div', c: children, a: args } = node
        if (type === 'if') return render(node.e ? node.a : node.b, parent)
        type = type.toLowerCase()
        const isSvg = type === 'svg'
        const elm = isSvg
          ? document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          : document.createElement(type)
        if (args) Object.entries(args).forEach(([key, value]) => key !== 'key' && setAccessor(elm, key, null, value, isSvg))
        if (Array.isArray(children)) children.forEach(node => (node = render(node, elm)) && elm.appendChild(node))
        return elm
    }
  }
}
