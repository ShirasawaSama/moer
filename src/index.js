import render from './core'
import { ELEMENT_ID, STATE } from './symbols'

export default ({
  node,
  document = window.document,
  root = document.getElementById('root'),
  data = {},
  plugins = [],
  models
}) => {
  if (!('Symbol' in (typeof window === 'undefined'
    ? typeof global !== 'undefined' && global : window) || {}) ||
    !('entries' in Object)) throw new Error('The current browser does not support Moer.js')
  if (!data || typeof data !== 'object' ||
    Array.isArray(data)) throw new TypeError('Data must be a Object ant not be an Array')
  if (typeof root === 'string') root = document.querySelector(root)
  if (!root || typeof root.appendChild !== 'function') throw new TypeError('Root must be a html element')
  if (typeof models === 'function') {
    models = models
      .keys()
      .map(model => {
        model = models(model)
        const type = typeof model
        return type === 'function' ? model : type === 'object' && model.default
      })
  }
  if (!node[ELEMENT_ID]) node.init((new Date().getTime() + Math.random()) * 100000)
  data[STATE] = {}
  data.plugins = {}
  return render(
    document,
    node,
    root,
    data,
    plugins,
    Array.isArray(models)
      ? models.filter(model => typeof model === 'function')
      : []
  )
}
