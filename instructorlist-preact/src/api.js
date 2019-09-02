import { convertArrayToObject } from './utils/convertArrayToObject'
import { runInThisContext } from 'vm'

const isDev =
  typeof window !== 'undefined' && location.href.indexOf('localhost') > -1
const endpoint = false
  ? 'http://localhost:8000'
  : 'https://instructorlist-django.herokuapp.com'

const defaultClass = {
  id: 1,
  instructors: [
    {
      full_name: 'Alexander Smith',
      avatar: 'https://api.adorable.io/avatars/60/alexander@smith.png',
    },
  ],
  title: 'Introduction to Bachata',
  price: 12,
  categories: [{ name: 'bachata' }],
  start_time: '07:30',
  duration: 'Alexander Smith',
  venue: {
    area: 'Covent Garden',
    name: 'Pineapple Dance Studios',
  },
}

const prerenderState = {
  classes: { 1: defaultClass },
}

export default class DataService {
  constructor(initialState) {
    if (initialState) {
      this.state = initialState
    } else {
      this.hasPrerenderData = true
      this.state = prerenderState
    }
  }

  getAllClasses = async () => {
    const { classes } = this.state
    if (classes) return classes
    await this.getSearch()
    return this.state.classes
  }

  getSearch = async (filters = {}) => {
    if (!this.hasPrerenderData || this.state.search) return this.state.search
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
      this.state.classes = convertArrayToObject(json.results, 'id')
      this.state.categories = json.categories
      this.state.venues = json.venues
      this.hasPrerenderData = false
      return json
    }
    return res
  }

  getClass = async id => {
    if (id in this.state.classes && !this.hasPrerenderData) {
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
