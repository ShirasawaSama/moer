import 'moer'
import Store from './store'
import { Element } from '../../../index'

const store = new Store()
let startTime
let lastMeasure
function startMeasure (name) {
  startTime = window.performance.now()
  lastMeasure = name
}
function stopMeasure () {
  var last = lastMeasure
  if (lastMeasure) {
    window.setTimeout(() => {
      lastMeasure = null
      var stop = window.performance.now()
      console.log(last + ' took ' + (stop - startTime - 10))
    }, 10)
  }
}

export default class App extends Element {
  state = { rows: store.data, selected: store.selected }

  handleClick = e => {
    const { action, id } = e.target.dataset
    if (action && id) {
      this[action](Number(id))
    }
  }
  add = () => {
    startMeasure('add')
    store.add()
    this.sync()
    stopMeasure()
  }
  remove = id => {
    startMeasure('remove')
    store.delete(id)
    this.sync()
    stopMeasure()
  }
  select = id => {
    startMeasure('select')
    store.select(id)
    this.sync()
    stopMeasure()
  }
  run = () => {
    startMeasure('run')
    store.run()
    this.sync()
    stopMeasure()
  }
  update = () => {
    startMeasure('update')
    store.update()
    this.sync()
    stopMeasure()
  }
  runLots = () => {
    startMeasure('runLots')
    store.runLots()
    this.sync()
    stopMeasure()
  }
  clear = () => {
    startMeasure('clear')
    store.clear()
    this.sync()
    stopMeasure()
  }
  swapRows = () => {
    startMeasure('swapRows')
    store.swapRows()
    this.sync()
    stopMeasure()
  }
  sync () {
    this.state.rows = store.data
    this.state.selected = store.selected
  }
  render (d) {
    const { rows, selected } = this.state
    return () => {
      d.div({ className: 'container' }); {
        d.div({ className: 'jumbotron' }); {
          d.div({ className: 'row' }); {
            d.div({ className: 'col-md-6' }); { d.h1(); 'Moer.js' }
            d.div({ className: 'col-md-6' }); {
              d.div({ className: 'row' }); {
                d.div({ className: 'col-md-6 smallpad' }); {
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'run', onClick: this.run }); 'Create 1,000 rows'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'runlots', onClick: this.runLots }); 'Create 10,000 rows'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'add', onClick: this.add }); 'Append 1,000 rows'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'update', onClick: this.update }); 'Update every 10th row'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'clear', onClick: this.clear }); 'Clear'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'swaprows', onClick: this.swapRows }); 'Swap Rows'
                }
              }
            }
          }
        }
        d.table({ className: 'table table-hover table-striped test-data', onClick: this.handleClick }); {
          d.tbody(); {
            for (const item of rows) {
              d.tr({ key: item.id, className: item.id === selected ? 'danger' : void 0 }); {
                d.td({ className: 'col-md-1' }); `${item.id}`
                d.td({ className: 'col-md-4' }); {
                  d.a({ 'data-action': 'select', 'data-id': item.id }); `${item.label}`
                }
                d.td({ className: 'col-md-1' }); {
                  d.a(); {
                    d.span({
                      className: 'glyphicon glyphicon-remove',
                      'aria-hidden': true,
                      'data-action': 'remove',
                      'data-id': item.id
                    }); {}
                  }
                }
              }
              d.td({ className: 'col-md-6' }); {}
            }
          }
        }
        d.span({ className: 'preloadicon glyphicon glyphicon-remove', 'aria-hidden': true }); {}
      }
    }
  }
}
