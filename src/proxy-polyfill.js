export default (Proxy && BaseProxy) || PolyfillProxy

export function PolyfillProxy (obj, handler) {
  if (!(this instanceof PolyfillProxy)) {
    throw new TypeError('Constructor Proxy requires \'new\'')
  }
  if (typeof obj !== 'object' || typeof handler !== 'object') {
    throw new TypeError('Cannot create proxy with a non-object as target or handler')
  }
  const target = Object.assign({}, obj)
  const proxied = {}
  const set = typeof handler.set === 'function'
  const get = typeof handler.get === 'function'
  return Object.defineProperties(
    proxied,
    Object
      .entries(target)
      .reduce(
        (p, [key, value]) => (p[key] = getHandler(get, set, key, handler, target)) && p,
        { setProp: { value: (key, value) => {
          const after = !!target[key]
          target[key] = value
          return after ? proxied
            : Object.defineProperty(proxied, key, getHandler(get, set, key, handler, target))
        } } }
      )
  )
}

export function BaseProxy (target, handler) {
  if (!(this instanceof BaseProxy)) {
    throw new TypeError('Constructor Proxy requires \'new\'')
  }
  const get = typeof handler.get === 'function' && handler.get
  handler.get = (target, key, receiver) => key === 'setProp'
    ? (key, value) => {
      receiver[key] = value
      return receiver
    } : get ? get.call(handler, target, key, receiver) : Reflect.get(target, key, receiver)
  const proxied = new Proxy(target, handler)
  return proxied
}

function getHandler (get, set, key, handler, target) {
  return {
    enumerable: true,
    configurable: true,
    get: get ? () => handler.get(target, key, target) : () => Reflect.get(target, key, target),
    set: set
      ? value => handler.set(target, key, value, target) && value
      : value => Reflect.set(target, key, value, target) && value
  }
}
