import { keySplit } from './symbols'
import PolyfillProxy from './proxy-polyfill'

export default (data, subscribe, handler) => {
  if (typeof data !== 'object') throw new TypeError('必须传入一个Object')
  return addProxy(data)
  function addProxy (data, name = '#ROOT#') {
    if (typeof data !== 'object') return data
    if (Array.isArray(data)) {
      return Object.setPrototypeOf(data, ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
        .reduce((p, k) => (p[k] = function (...args) {
          const result = Array.prototype[k].apply(this, args)
          subscribe(name)
          return result
        }) && p, {
          ...Array.prototype,
          set (i, v) {
            this[i] = v
            subscribe(name)
            return this
          }
        }))
    }
    Object.entries(data).forEach(([key, value]) =>
      (data[key] = addProxy(value, name + keySplit + key)))
    return new PolyfillProxy(data, {
      set (target, key, value, receiver) {
        const n = name + keySplit + key
        if (typeof value === 'object' && value !== null) value = addProxy(value, n)
        const result = Reflect.set(target, key, value, receiver)
        subscribe(n)
        return result
      },
      get (target, key, receiver) {
        if (handler.current) {
          handler.listener[handler.current].push(name + keySplit + key)
        }
        return Reflect.get(target, key, receiver)
      }
    })
  }
}
