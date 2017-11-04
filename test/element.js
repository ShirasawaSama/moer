import 'moer'
import test from 'ava'
import { JSDOM } from 'jsdom'
import start from '../src'
import Element from '../src/Element'
import connect from '../src/connect'
import { ELEMENT_ID, STATE } from '../src/symbols'

test('base', async t => {
  const id = new Date().getTime()
  const children = ['test1', 'test2']
  const props = { className: 'test', id: 'test' }

  const elm = new Element(props).init(id, children)

  t.is(elm[ELEMENT_ID], id, '组件ID')
  t.is(elm.children, children, '组件Children')
  t.deepEqual(elm.props, props, '组件Props')

  class Test extends Element {
    state = { text: 'stateTest' }
    render (d) {
      return () => {
        d.div({ id: 'test' }); `${this.state.text}`
      }
    }
  }
  let dom = new JSDOM('<div id="root"></div>')
  const store = start({ node: new Test(), document: dom.window.document })
  t.true(dom
    .window
    .document
    .getElementById('test')
    .innerHTML
    .includes('stateTest'), 'state.noConnect')

  Object.values(store[STATE])[0].text = 'updated'
  await new Promise(resolve => setTimeout(() => resolve(
    t.true(dom
      .window
      .document
      .getElementById('test')
      .innerHTML
      .includes('updated'), 'state.update')
  ), 10))

  const Test2 = connect(Test)
  dom = new JSDOM('<div id="root"></div>')
  start({ node: new Test2(), document: dom.window.document })
  t.true(dom
    .window
    .document
    .getElementById('test')
    .innerHTML
    .includes('stateTest'), 'state.connectd')
})

test('renderEvent', t => {
  t.plan(2)
  class Test extends Element {
    preRender () { t.pass('preRender') }
    postRender () { t.pass('postRender') }
  }
  const dom = new JSDOM('<div id="root"></div>')
  start({ node: new Test(), document: dom.window.document })
})
