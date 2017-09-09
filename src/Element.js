import { ELEMENT_ID } from './symbols'
export default class Element {
  [ELEMENT_ID] = Symbol('moer#Element')
  constructor (props = {}) {
    this.props = props
  }
  render () {
    return null
  }
  setChildren (children) {
    this.children = children
    return this
  }
}
