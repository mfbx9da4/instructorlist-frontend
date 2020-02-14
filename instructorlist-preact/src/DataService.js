import { convertArrayToObject } from './utils/convertArrayToObject'
import isDev from './utils/is-dev'
import isSSR from './utils/is-ssr'

// ? 'https://instructorlist-django.herokuapp.com'
export const BASE_URL = isDev()
  ? 'http://localhost:8000'
  : 'https://instructorlist-django.herokuapp.com'

const defaultClass = {
  id: 1,
  instructors: [
    {
      full_name: 'Alexander Smith',
      profile_image_url:
        'https://api.adorable.io/avatars/60/alexander@smith.png',
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
  profiles: {},
}

export default class DataService {
  constructor(initialState) {
    console.log('initialize data', initialState ? 'supplied data' : 'no data')
    // TODO: include flag for is this prerendered data or not
    // add data fetch time
    if (initialState) {
      this.state = initialState
    } else if (!isSSR() && window.ssrData) {
      this.state = window.ssrData
    } else {
      this.hasPrerenderData = true
      this.state = prerenderState
    }
  }

  getProfile = async slug => {
    if (
      !this.hasPrerenderData &&
      this.state.profiles &&
      slug in this.state.profiles
    )
      return this.state.profiles[slug]
    const url = `${BASE_URL}/api/profiles/?slug=${slug}`
    let res
    try {
      res = await fetch(url)
    } catch (e) {
      res = {
        ok: false,
        data: { message: 'You are offline' },
      }
    }
    const [json] = await res.json()
    if (res.ok) {
      this.state.profiles[slug] = json
      return json
    }
    return json
  }

  getAllClasses = async () => {
    const { classes } = this.state
    if (classes) return classes
    await this.getSearch()
    return this.state.classes
  }

  getSearch = async (filters = {}) => {
    if (!this.hasPrerenderData && this.state.search) return this.state.search
    const url = `${BASE_URL}/api/search/?i=${JSON.stringify(filters)}`
    let res
    res = await fetch(url)
    if (res.ok) {
      const json = await res.json()
      console.log('json', json)
      this.state.search = json
      this.state.classes = convertArrayToObject(json.classes, 'id')
      this.state.categories = json.categories
      this.state.venues = json.venues
      this.state.profiles = json.profiles
      this.hasPrerenderData = false
      return { ok: true, data: json }
    }
    return res
  }

  getClass = async id => {
    console.log('id', id)
    if (id in this.state.classes && !this.hasPrerenderData) {
      console.log('hit class')
      return this.state.classes[id]
    }
    let res = await fetch(`${BASE_URL}/api/classes/${id}`)
    console.log('got class')
    if (res.ok) {
      const json = await res.json()
      this.state.classes[id] = json
      return json
    }
    return res
  }
}
