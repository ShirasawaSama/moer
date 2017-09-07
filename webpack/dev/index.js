import { render, Element, connect } from '../../src'
class Button extends Element {
  render (d) {
    return () => {
      d.div({ class: 'btn' }); {
        d.button(); {
          d.div(); {
            d.div(); {
              d.span({ class: this.props.clazz }); `${this.props.text}`
            }
          }
        }
      }
    }
  }
}
@connect(['index.aaa'])
class Index extends Element {
  render (d) {
    return () => {
      d.div({ class: 'test' }); {
        666
        Button({
          text: this.store.text.first.second,
          clazz: this.store.text.pp
        }); {}
        `Text: ${this.store.text.kk}`
      }
    }
  }
}
const data = {
  text: { first: { second: '按钮2333' }, kk: 'before', pp: '' }
}
window.d = render(new Index(), document.getElementById('app'), data)
window.c = t => (window.d.text.kk = t || 'after')
window.s = t => (window.d.text.pp = t || 'red')
window.c()
window.s()
