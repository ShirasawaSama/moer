export default class Element {
  constructor (props = {}) {
    this.props = props
  }
  render () {
    return null
  }
  init (children) {
    this.children = children
    return this
  }
}
