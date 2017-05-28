export default class Element {
  __symbol = Symbol('moer#Element')
  constructor (props = {}) {
    this.props = props
  }
  render () {
    return null
  }
}
