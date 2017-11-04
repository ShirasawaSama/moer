/* eslint-disable no-constant-condition */
import 'moer'
import moer, { Element, connect } from '../index'

@connect
class Button extends Element {
  render = d => {
    d.button({ key: this.children, dataI: this.store.b, onClick: () => console.log(this.children) }); `${this.children}`
  }
}
@connect
class Index extends Element {
  render = d => {
    d.div({ onClick: () => console.log(1) }); {
      d.div(); {
        d.div(); {
          d.button({ onClick: e => console.log(233) || e.stopPropagation() }); 'fuck'
        }
        for (let i = 0; i < this.store.a; i++) {
          new Button(); `${i}`
        }
      }
    }
  }
}

moer({ node: new Index(), data: { a: 20, b: 'a' } })
