import { renderer, Element, connect, subscriber } from '../../src'

@subscriber
class Button extends Element {
  render () {
    return [{
      type: 'div',
      class: 'btn',
      children: [{
        type: 'button',
        children: [{
          type: 'div',
          children: [{
            type: 'div',
            children: [{
              type: 'span',
              children: [this.props.text]
            }]
          }]
        }]
      }]
    }]
  }
}
@connect(['index.aaa'])
class Index extends Element {
  render () {
    return [{
      type: 'div',
      children: ['666', new Button({ text: this.store.text.first.second })]
    }]
  }
}

const data = {
  text: { first: { second: '按钮2333' } }
}
window.d = renderer(new Index(), document.getElementById('app'), data)
window.c = t => (window.d.text.first.second = t || 'sss')
