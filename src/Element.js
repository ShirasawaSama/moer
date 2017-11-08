import { ELEMENT_ID } from './symbols'

export default class Element {
  constructor (props = {}) { this.props = props }
  render () { return null }
  init (id, children) {
    if (children != null) this.children = children.length > 1 ? children : children[0]
    this[ELEMENT_ID] = id
    return this
  }
}
