/* eslint-disable no-constant-condition */
import 'moer'
import moer, { Element, connect } from '../index'

@connect
class Index extends Element {
  render (d) {
    return {
      a: { id: 'test' },
      c: [
        this.store.a ? { t: 'p', c: ['true'] } : { t: 'h1', c: ['false'] },
        this.store.a ? { c: ['test'] } : null
      ]
    }
  }
}

const store = moer({ node: new Index(), data: { a: true } })
const s = () => new Promise(resolve => setTimeout(resolve, 10))
async function u () {
  store.a = false
  await s()

  store.a = true
  await s()
}
u()
