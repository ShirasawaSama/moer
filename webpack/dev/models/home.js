export default class Home {
  name = 'home'
  init = {
    test: 0
  }
  addNumber () {
    console.log(this.models)
    this.store.test = this.store.test + 1
  }
}
