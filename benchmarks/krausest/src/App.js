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

  handleClick (e) {
    const { action, id } = e.target.dataset
    if (action && id) {
      this[action](Number(id))
    }
  }
  handleAdd () {
    startMeasure('add')
    store.add()
    this.sync()
    stopMeasure()
  }
  handleRemove (id) {
    startMeasure('remove')
    store.delete(id)
    this.sync()
    stopMeasure()
  }
  handleSelect (id) {
    startMeasure('select')
    store.select(id)
    this.sync()
    stopMeasure()
  }
  handleRun () {
    startMeasure('run')
    store.run()
    this.sync()
    stopMeasure()
  }
  handleUpdate () {
    startMeasure('update')
    store.update()
    this.sync()
    stopMeasure()
  }
  handleRunLots () {
    startMeasure('runLots')
    store.runLots()
    this.sync()
    stopMeasure()
  }
  handleClear () {
    startMeasure('clear')
    store.clear()
    this.sync()
    stopMeasure()
  }
  handleSwapRows () {
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
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'run', onClick: this.handleRun }); 'Create 1,000 rows'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'runlots', onClick: this.handleRunLots }); 'Create 10,000 rows'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'add', onClick: this.handleAdd }); 'Append 1,000 rows'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'update', onClick: this.handleUpdate }); 'Update every 10th row'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'clear', onClick: this.handleClear }); 'Clear'
                  d.button({ type: 'button', className: 'btn btn-primary btn-block', id: 'swaprows', onClick: this.handleSwapRows }); 'Swap Rows'
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
                  d.a({ dataAction: 'select', dataId: item.id }); `${item.label}`
                }
                d.td({ className: 'col-md-1' }); {
                  d.a(); {
                    d.span({
                      className: 'glyphicon glyphicon-remove',
                      ariaHidden: true,
                      dataAction: 'remove',
                      dataId: item.id
                    }); {}
                  }
                }
              }
              d.td({ className: 'col-md-6' }); {}
            }
          }
        }
        d.span({ className: 'preloadicon glyphicon glyphicon-remove', ariaHidden: true }); {}
      }
    }
  }
}
