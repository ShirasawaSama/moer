import { STATE, ELEMENT_ID } from './symbols'

export default class Element {
  constructor (props = {}) { this.props = props }
  render () { return null }
  set (store, models) {
    const id = this[ELEMENT_ID]
    if (typeof this.state === 'object') {
      if (!store[STATE][id]) store[STATE][id] = this.state
      this.state = store[STATE][id]
    }
    this.store = store
    this.models = models
  }
  init (id, children) {
    this.children = children
    this[ELEMENT_ID] = id
    return this
  }
}
