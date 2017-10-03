import moer, { Element, connect } from '../../index'

const valuePoints = [
  'Daenerys', 'Jon', 'Sansa', 'Arya', 'Stannis', 'Gregor', 'Tyrion',
  'Theon', 'Joffrey', 'Ramsay', 'Cersei', 'Bran', 'Margaery',
  'Melisandre', 'Daario', 'Jamie', 'Eddard', 'Myrcella', 'Robb',
  'Jorah', 'Petyr', 'Tommen', 'Sandor', 'Oberyn', 'Drogo', 'Ygritte'
]

const ROWS = 1000
const COLS = 10
const grid = generateGrid(ROWS, COLS)
const s = window.performance.now()

@connect
class Index extends Element {
  state = {
    cols: COLS,
    rows: ROWS,
    grid: grid,
    dataPoints: grid.length * grid[0].items.length,
    filter: ''
  }
  matches (item) {
    return item.value.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
  }
  visibleCount () {
    let count = 0
    for (const items of this.stat.grid) {
      for (const item of items) {
        if (!this.state.filter || this.matches(item)) count++
      }
    }
    return count
  }
  unmount = () => {
    console.profile('unmount')
    const s = window.performance.now()
    this.state.grid = []
    setTimeout(() => {
      this.store.msg = 'umount took: ' + (window.performance.now() - s).toFixed(2) + 'ms'
      console.profileEnd('unmount')
    }, 0)
  }
  rerender = () => {
    const grid = generateGrid(1000, 10)
    const s = window.performance.now()
    console.profile('rerender')
    this.state.grid = grid
    setTimeout(() => {
      this.store.msg = 'rerender took: ' + (window.performance.now() - s).toFixed(2) + 'ms'
      console.profileEnd('rerender')
    }, 0)
  }
  render (d) {
    return () => {
      d.div(); {
        d.h1(); 'Rendering Dynamic Big Table'
        d.p(); {
          'Reference: '
          d.a({ href: 'http://insin.github.io/ui-lib-samples/large-datasets/index.html' }); 'insin/ui-lib-samples/large-datasets'
        }
        d.p(); {
          d.span(); `${this.state.rows} x ${this.state.cols}. ${this.store.msg}`
        }
        d.p(); {
          d.button({ onClick: this.unmount }); 'Unmount'
          d.button({ onClick: this.rerender }); 'Rerender with fresh data'
        }
        d.form(); {
          d.strong(); 'Filter Data:'
          d.input({ type: 'text', onInput: e => (this.state.filter = e.target.value) }); {}
          if (this.state.filter) {
            '&mdash; Filtering'
            d.strong(); `${this.state.filter}`
            ;`over ${this.state.dataPoints} data points, ${this.visibleCount()} found.`
          }
        }
        d.table({ width: '100%', cellspacing: '2', className: this.state.filter && 'filtered' }); {
          for (const row of this.state.grid) {
            d.tr({ key: row.id }); {
              d.th(); `${row.id}`
              for (const item of row.items) {
                d.td({ className: this.matches(item) ? 'item' : 'item hidden', key: item.id }); `${item.value}`
              }
            }
          }
        }
      }
    }
  }
}

console.profile('a')

const store = moer({ node: new Index(), data: { msg: 'loading...' } })

console.profileEnd('a')
setTimeout(() => (store.msg = 'initial render took: ' + (window.performance.now() - s).toFixed(2) + 'ms'), 0)

function generateGrid (rowCount, columnCount) {
  let valueIndex = 0
  const grid = []
  for (let r = 0; r < rowCount; r++) {
    const row = {
      id: r,
      items: []
    }
    for (let c = 0; c < columnCount; c++) {
      row.items.push({
        id: (r + '-' + c),
        value: valuePoints[valueIndex]
      })
      if (++valueIndex >= valuePoints.length) valueIndex = 0
    }
    grid.push(row)
  }
  return grid
}
