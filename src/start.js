/* eslint-disable no-proto */
import render from './render'
import { STATE } from './symbols'

export default ({ node, root = document.getElementById('root'), data = {}, models }) => {
  if (!''.__proto__ || !window.Proxy) throw new Error('The browser does not support Moer.js!')
  if (typeof data !== 'object' ||
    Array.isArray(data)) throw new Error('Data must be a Object ant not be an Array!')
  if (typeof root === 'string') root = document.querySelector(root)
  if (typeof root.appendChild !== 'function') throw new Error('Root must be a html element!')
  if (typeof models === 'function') {
    models = models
      .keys()
      .map(model => {
        model = models(model)
        const type = typeof model
        if (type === 'function') return model
        else if (type === 'object') return model.default
      })
  }
  data[STATE] = {}
  return render(
    node,
    root,
    data,
    Array.isArray(models)
      ? models
        .filter(model => typeof model === 'function')
        .map(Model => new Model())
        .filter(model => model.name)
      : []
  )
}
