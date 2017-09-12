import { STATE, ELEMENT_ID } from './symbols'

export default class Element {
  constructor (props = {}) {
    this.props = props
  }
  render () {
    return null
  }
  init (children) {
    this.children = children
    if (typeof this.store === 'object' && typeof this.state === 'object') {
      const id = this[ELEMENT_ID]
      if (!this.store[STATE][id]) this.store[STATE][id] = this.state
      this.state = this.store[STATE][id]
    }
    return this
  }
}
