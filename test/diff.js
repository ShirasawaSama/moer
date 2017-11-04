import 'moer'
import test from 'ava'
import { JSDOM } from 'jsdom'
import start from '../src'
import Element from '../src/Element'
import connect from '../src/connect'

const data = ['red', 'yellow', 'blue', 'green', 'pink', 'purple', 'brown', 'white', 'black', 'orange']
test('array', async t => {
  @connect
  class Test extends Element {
    render (d) {
      return () => {
        d.div({ id: 'test' }); {
          for (const key of this.store.a) {
            d.div({ key }); `${key}`
          }
        }
      }
    }
  }
  const dom = new JSDOM('<div id="root"></div>')
  const doc = dom.window.document
  const store = start({ node: new Test(), document: doc, data: { a: data.slice() } })

  store.a.push('hello')
  await new Promise(resolve => setTimeout(() => resolve(
    t.true(doc
      .getElementById('test')
      .innerHTML
      .includes('hello'), 'add')
  ), 50))

  store.a.set(2, 'world')
  await new Promise(resolve => setTimeout(() => resolve(
    t.true(doc
      .getElementById('test')
      .innerHTML
      .includes('world') && !doc
        .getElementById('test')
        .innerHTML
        .includes('blue'), 'set')
  ), 10))

  store.a.splice(2, 1)
  await new Promise(resolve => setTimeout(() => resolve(
    t.false(doc
      .getElementById('test')
      .innerHTML
      .includes('world'), 'delete')
  ), 10))

  t.notThrows(() => {
    const b = store.a[1]
    store.a[1] = store.a[2]
    store.a[2] = b
  }, 'move')
  await new Promise(resolve => setTimeout(resolve, 10))

  store.a = ['jsjsj']
  await new Promise(resolve => setTimeout(() => resolve(
    t.is(doc
      .getElementById('test')
      .childElementCount, 1, 'fullRender')
  ), 10))

  store.a = []
  await new Promise(resolve => setTimeout(() => resolve(
    t.is(doc
      .getElementById('test')
      .childElementCount, 0, 'clear')
  ), 10))
})

test('if', async t => {
  @connect
  class Test extends Element {
    render (d) {
      return () => {
        d.div({ id: 'test' }); {
          if (this.store.a) {
            `${this.store.a}`
          }
          if (this.store.a) {
            'true'
          } else {
            'false'
          }
        }
      }
    }
  }
  const dom = new JSDOM('<div id="root"></div>')
  const doc = dom.window.document
  const store = start({ node: new Test(), document: doc, data: { a: 'test' } })

  store.a = false
  await new Promise(resolve => setTimeout(() => resolve(
    t.is(doc
      .getElementById('test')
      .innerHTML, 'false', 'hidden')
  ), 50))

  store.a = 'iii'
  await new Promise(resolve => setTimeout(() => resolve(
    t.is(doc
      .getElementById('test')
      .innerHTML, 'iiitrue', 'show')
  ), 10))

  store.a = 'ggg'
  await new Promise(resolve => setTimeout(() => resolve(
    t.is(doc
      .getElementById('test')
      .innerHTML, 'gggtrue', 'update')
  ), 10))

  @connect
  class Test2 extends Element {
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
  const dom2 = new JSDOM('<div id="root"></div>')
  const doc2 = dom2.window.document
  const store2 = start({ node: new Test2(), document: doc2, data: { a: true } })

  store2.a = false
  await new Promise(resolve => setTimeout(() => resolve(
    t.is(doc2
      .getElementById('test')
      .innerHTML, '<h1>false</h1>', 'change')
  ), 50))

  store2.a = true
  await new Promise(resolve => setTimeout(() => resolve(
    t.is(doc2
      .getElementById('test')
      .innerHTML, '<p>true</p><div>test</div>', 'change')
  ), 50))
})
