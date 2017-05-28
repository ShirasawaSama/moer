export default (data, subscribe, handler) => {
  if (typeof data !== 'object') throw new TypeError('必须传入一个Object')
  return addProxy(data)
  function addProxy (data, name = '#ROOT') {
    if (typeof data !== 'object') return data
    if (Array.isArray(data)) {
      return data
    }
    Object.entries(data).forEach(([key, value]) => (data[key] = addProxy(value, name + '.' + key)))
    return new Proxy(data, {
      set (self, key, value) {
        subscribe(name)
        return (self[key] = value)
      },
      get (self, key) {
        if (handler.current) {
          handler.listener[handler.current].push(name)
        }
        return self[key]
      }
    })
  }
}
