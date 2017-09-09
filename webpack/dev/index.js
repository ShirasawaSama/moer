import moer, { Element, connect } from '../..'
class Button extends Element {
  render (d) {
    return () => {
      d.div({ className: 'btn' }); {
        d.button({ onClick: this.props.click }); {
          d.div(); {
            d.div(); {
              d.span({ className: this.props.clazz }); `${this.props.text}`
            }
          }
        }
      }
    }
  }
}
@connect
class Index extends Element {
  render (d) {
    const arr = ['第一个元素', '第二个元素', '第三个元素']
    return () => {
      d.div({ className: 'test' }); {
        `已+: ${this.store.test}s`
        Button({
          text: this.store.text.first.second,
          clazz: this.store.text.pp,
          click: () => this.models.home.addNumber(4)
        }); {}
        `Text: ${this.store.text.kk}`
        if (this.store.show) {
          ' ShowText'
        }
        for (const i of arr) {
          d.p({ className: 'red' }); {
            `${i}`
          }
        }
      }
    }
  }
}
const data = {
  show: false,
  text: { first: { second: '+1s' }, kk: 'before', pp: '' }
}
window.d = moer({ node: new Index(), data, models: require.context('./models', false, /\.(j|t)s$/) })
window.c = t => (window.d.text.kk = t || 'after')
window.s = t => (window.d.text.pp = t || 'red')
window.o = () => (window.d.show = !window.d.show)
window.c()
window.s()
