/* eslint-disable no-constant-condition */

import moer, { Element, connect } from '../index'

@connect
class Index extends Element {
  render (d) {
    return () => {
      d.div(); {
        for (const i of this.store.a) {
          d.p({ key: i }); `${i} `
        }
      }
    }
  }
}

moer({ node: new Index(), data: { a: ['a', 'b', 'c'] } }).a.splice(1, 1)
