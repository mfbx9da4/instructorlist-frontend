import { convertArrayToObject } from './utils/convertArrayToObject'
import isDev from './utils/is-dev'

// ? 'http://localhost:8000'
export const BASE_URL = isDev()
  ? 'https://instructorlist-django.herokuapp.com'
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
    // TODO: include flag for is this prerendered data or not
    // add data fetch time
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
    const url = `${BASE_URL}/api/search/?i=${JSON.stringify(filters)}`
    let res
    try {
      res = await fetch(url)
    } catch (e) {
      res = {
        ok: false,
        data: { message: 'You are offline' },
      }
    }
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
    let res = await fetch(`${BASE_URL}/api/classes/${id}`)
    if (res.ok) {
      const json = await res.json()
      this.state.classes[id] = json
      return json
    }
    return res
  }
}
