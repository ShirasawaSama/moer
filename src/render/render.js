import setAccessor from './setAccessor'

export default function render (node, parent) {
  if (node !== null && parent) {
    switch (typeof node) {
      case 'string':
        return document.createTextNode(node)
      case 'object':
        if (Array.isArray(node)) return node.forEach(node => parent.appendChild(render(node, parent)))
        let { type = 'div', children, args } = node
        type = type.toLowerCase()
        const isSvg = type === 'svg'
        const elm = isSvg
          ? document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          : document.createElement(type)
        args && Object.entries(args).forEach(([key, value]) => setAccessor(elm, key, null, value, isSvg))
        if (Array.isArray(children)) children.forEach(node => (node = render(node, elm)) && elm.appendChild(node))
        return elm
    }
  }
  return document.createComment('empty')
}
