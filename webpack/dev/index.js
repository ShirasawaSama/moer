import moer, { Element, connect } from '../..'

class Button extends Element {
  render (d) {
    return () => {
      d.div({ className: 'btn' }); {
        d.button({ onClick: this.props.click, id: 'ggg' }); {
          d.div(); {
            d.div(); {
              d.span({ className: this.props.clazz }); this.children
            }
          }
        }
      }
    }
  }
}
@connect
class Text extends Element {
  render (d) {
    return () => {
      ` ${this.store.uu}`
    }
  }
}
@connect
class Index extends Element {
  render (d) {
    return () => {
      d.div({ className: 'test' }); {
        `已+: ${this.store.test}s`
        Button({
          text: this.store.text.first.second,
          clazz: this.store.text.pp,
          click: () => this.models.home.addNumber(4)
        }); { '+1s' }
        `Text: ${this.store.text.kk}`
        if (this.store.show) {
          new Text(); {}
        }
        d.input({ onInput: e => (this.store.input = e.target.value), value: this.store.input }); {}
        ` Input: ${this.store.input}`
        for (const i of this.store.arr) {
          d.p({ className: [this.store.input && 'red'] }); {
            `${i}`
          }
        }
      }
    }
  }
}
const data = {
  input: '',
  uu: 'before',
  show: false,
  arr: ['第一个元素', '第二个元素', '第三个元素'],
  text: { first: { second: '+1s' }, kk: 'before', pp: '' }
}
const node = new Index()
window.node = node
window.d = moer({ node, data, models: require.context('./models', false, /\.(j|t)s$/) })
window.c = t => (window.d.text.kk = t || 'after')
window.s = t => (window.d.text.pp = t || 'red')
window.o = () => (window.d.show = !window.d.show)
window.q = () => (window.d.uu = 'after')
// window.c()
// window.s()
