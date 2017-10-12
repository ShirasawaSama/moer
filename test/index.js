import 'moer'
import test from 'ava'
import { JSDOM } from 'jsdom'
import start from '../src/start'
import addProxy from '../src/proxy'
import Element from '../src/Element'
import connect from '../src/connect'
import { PolyfillProxy, BaseProxy } from '../src/proxy-polyfill'
import { CONNECTED, keySplit } from '../src/symbols'

test('connect', t => {
  @connect
  class Test { }

  t.true(new Test()[CONNECTED])
  t.throws(() => {
    class Test1 {
      @connect
      fn1 () { }
    }
    new Test1()
  })
})

test('BaseProxy', async t => {
  t.throws(() => PolyfillProxy({}, {}), null, '无New调用Base.Proxy')
  t.throws(() => new PolyfillProxy(), null, '参数为空调用Base.Proxy')
  t.throws(() => new PolyfillProxy('test'), null, '非Object调用Ployfill.Proxy')

  t.is(new PolyfillProxy({ test: 2 }, {
    get: (target, key, receiver) => Reflect.get(target, key, receiver) + 1
  }).test, 3, 'Getter')

  let result = new PolyfillProxy({ test: 3 }, {
    set: (target, key, value, receiver) => Reflect.set(target, key, value + 'A', receiver)
  })
  result.test = 'test'
  t.is(result.test, 'testA', 'Setter1')

  result = new PolyfillProxy({ test: 3 }, {})
  result.test = 'test'
  t.is(result.test, 'test', 'Setter2')

  t.is(new PolyfillProxy({}, {
    get: (target, key, receiver) => Reflect.get(target, key, receiver) + 1
  }).setProp('test', 2).test, 3, 'Ployfill.setProp1')
  t.is(new PolyfillProxy({ test: 1 }, {
    get: (target, key, receiver) => Reflect.get(target, key, receiver) + 1
  }).setProp('test', 2).test, 3, 'Ployfill.setProp2')

  t.throws(() => BaseProxy({}, {}), null, '无New调用Base.Proxy')
  t.is(new BaseProxy({}, {
    get: (target, key, receiver) => Reflect.get(target, key, receiver) + 1
  }).setProp('test', 2).test, 3, 'Base.setProp1')
  t.is(new BaseProxy({}, {}).setProp('test', 2).test, 2, 'Base.setProp2')
})

test('store', t => {
  t.throws(() => addProxy('test'), null, '非Object调用addProxy')

  const handler = { current: '0', listener: { '0': [] }, actions: {} }

  let name
  function subscribe (n) { name = n }

  const store = addProxy({ a: { b: 'test' }, arr: [] }, subscribe, handler)

  store.a.b
  t.deepEqual(handler.listener[handler.current], [
    ['#ROOT#', 'a'].join(keySplit),
    ['#ROOT#', 'a', 'b'].join(keySplit)
  ], 'Getter')
  handler.current = null

  store.a.b = 'qwq'
  t.is(name, ['#ROOT#', 'a', 'b'].join(keySplit), 'Setter')

  store.arr.push(2)
  t.is(name, ['#ROOT#', 'arr'].join(keySplit), 'Setter.Array')

  store.e = { c: 9 }
  store.e.c = 5
  t.is(name, ['#ROOT#', 'e', 'c'].join(keySplit), 'Setter.newProp')

  store.arr.set(0, 4)
  t.is(store.arr[0], 4, 'Setter.Array.set')
})

test('index', t => t.notThrows(() => require('../index'), '引入index.js'))

test('start', t => {
  t.notThrows(init)
  t.notThrows(() => init({ root: '#app', rootName: 'app' }))
  t.throws(() => init({ root: 'test' }))
  t.throws(() => init({ data: 'test' }))
  t.throws(() => start({ node: new Test() }))

  t.notThrows(() => {
    function models (pkg) {
      if (pkg === 'test.js') return class { name = 'test' }
    }
    models.keys = () => ['test.js']
    init({ models })
  })
  t.notThrows(() => {
    function models (pkg) {
      if (pkg === 'test.js') return { default: class { name = 'test' } }
    }
    models.keys = () => ['test.js']
    class Test2 extends Element {}
    init({ models, node: new Test2() })
  })
})

function init (args = {}) {
  const dom = new JSDOM(`<div id="${args.rootName || 'root'}"></div>`)
  return start({ node: new Test(), document: dom.window.document, ...args })
}

class Test extends Element {
  render (d) {
    return () => {
      d.div(); {
        d.div(); {
          d.span({ className: 'red' }); {
            233
            'Hello World'
          }
        }
      }
    }
  }
}
