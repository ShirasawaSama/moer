import { STATE, ELEMENT_ID } from './symbols'

export default class Element {
  constructor (props = {}) { this.props = props }
  render () { return null }
  set (store, models) {
    const id = this[ELEMENT_ID]
    if (this.state) {
      if (!store[STATE][id]) store[STATE][id] = this.state
      this.state = store[STATE][id]
    }
    this.store = store
    this.models = models
  }
  sets (store) {
    const id = this[ELEMENT_ID]
    if (!store[STATE][id]) store[STATE][id] = this.state
    this.state = store[STATE][id]
  }
  init (id, children) {
    this.children = children == null ? void 0 : children.length > 1 ? children : children[0]
    this[ELEMENT_ID] = id
    return this
  }
}
