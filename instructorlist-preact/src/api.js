const isDev =
  typeof window !== 'undefined' && location.href.indexOf('localhost') > -1
const endpoint = false
  ? 'http://localhost:8000'
  : 'https://instructorlist-django.herokuapp.com'

const initial = {
  classes: [],
  search: null,
}

export default class DataService {
  constructor(initialState = initial) {
    this.state = initialState
  }

  getSearch = async (filters = {}) => {
    if (this.state.search) return this.state.search
    const url = `${endpoint}/api/search/?i=${JSON.stringify(filters)}`
    let res
    console.log('start')
    try {
      res = await fetch(url)
    } catch (e) {
      res = {
        ok: false,
        data: { message: 'You are offline' },
      }
    }
    console.log('fetched')
    if (res.ok) {
      const json = await res.json()
      this.state.search = json
      this.state.classes = json.results
      this.state.categories = json.categories
      this.state.venues = json.venues
      return json
    }
    return res
  }

  getClass = async id => {
    if (id in this.state.classes) {
      return this.state.classes[id]
    }
    let res = await fetch(`${endpoint}/api/classes/${id}`)
    if (res.ok) {
      const json = await res.json()
      this.state.classes[id] = json
      return json
    }
    return res
  }
}
