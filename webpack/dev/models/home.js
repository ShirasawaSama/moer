export default class Home {
  name = 'home'
  init = {
    test: 0
  }
  addNumber () {
    this.store.test = this.store.test + 1
  }
}
