import 'moer'
import test from 'ava'
import start from '../src'
import connect from '../src/connect'
import Element from '../src/Element'
import sa from '../src/render/setAccessor'
import { JSDOM } from 'jsdom'

const d = new JSDOM('<div></div>').window.document

test('style', t => {
  let e = d.createElement('div')

  sa()(e, { style: 'color: red' })
  t.is(e.style.color, 'red', 'String')

  e = d.createElement('div')
  sa()(e, { style: { fontSize: 20 } })
  t.is(e.style.fontSize, '20px', 'IntAddPx')
  sa()(e, {}, { style: { fontSize: 20 } })
  t.false(!!e.style.fontSize, 'Delete')
})

test('event', async t => {
  const dom = new JSDOM('<div id="root"></div>')

  @connect
  class Test extends Element {
    render (d) {
      return () => {
        d.div({ onClick: () => {} }); {
          d.div({ onClick: () => {} }); {}
          for (let key = 0; key < 2; key++) {
            d.div({ key, id: 'btn', onClick: this.store.click, onClickCapture: () => {} }); {}
          }
        }
      }
    }
  }

  let store
  try {
    await new Promise(resolve => {
      store = start({
        node: new Test(),
        document: dom.window.document,
        data: { click: resolve }
      })
      dom.window.document.getElementById('btn').click()
    })
    t.pass('click')
  } catch (e) {
    t.ifError(e, 'click')
  }

  t.notThrows(() => (store.click = null), 'update')
})

test('other', t => {
  const e = d.createElement('div')

  sa()(e, { className: 'red' })
  t.is(e.getAttribute('class'), 'red', 'ClassName')

  @connect
  class Test extends Element {
    render (d) {
      return () => {
        d.div({ id: this.store.y ? 'a' : null }); {
          d.svg({ viewBox: this.store.y ? '0 0 360 360' : null }); {
            d.path({
              stroke: 'white',
              fill: 'black',
              d: 'M 347.1 357.9 L 183.3 256.5'
            }); {}
            d.image({ 'xlink:href': this.store.y ? './a.png' : null }); {}
          }
        }
      }
    }
  }

  let dom = new JSDOM('<div id="root"></div>')
  t.notThrows(() => (start({
    node: new Test(),
    document: dom.window.document,
    data: { y: true }
  }).y = false), 'update')

  class Test2 extends Element {
    render (d) {
      return () => {
        d.div({ innerHTML: '<p>test</p>', id: 'inner' }); {}
      }
    }
  }
  dom = new JSDOM('<div id="root"></div>')
  start({ node: new Test2(), document: dom.window.document })
  t.is(dom.window.document.getElementById('inner').innerHTML, '<p>test</p>', 'innerHTML')
})
