import render from './render'

export default ({
  node,
  document = window.document,
  root = document.getElementById('root'),
  data = {},
  models
}) => {
  if (typeof data !== 'object' ||
    Array.isArray(data)) throw new TypeError('Data must be a Object ant not be an Array!')
  if (typeof root === 'string') root = document.querySelector(root)
  if (!root || typeof root.appendChild !== 'function') throw new TypeError('Root must be a html element!')
  if (typeof models === 'function') {
    models = models
      .keys()
      .map(model => {
        model = models(model)
        const type = typeof model
        return type === 'function' ? model : type === 'object' && model.default
      })
  }
  return render(
    document,
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
