class RouteNavigationListener {
  constructor() {
    this.listeners = {}
    if (typeof addEventListener === 'function') {
      addEventListener('popstate', x => {
        this.emit(x)
      })
      addEventListener('pushstate', x => {
        this.emit(x)
      })
    }
  }
  addListener = listener => {
    this.listeners[listener] = listener
  }

  emit = (...args) => {
    Object.values(this.listeners).map(x => x(...args))
  }

  removeListener = listener => {
    delete this.listeners[listener]
  }
}
