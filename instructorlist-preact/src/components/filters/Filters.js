import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
console.log('filters')
import isSSR from '../../utils/is-ssr'
// const isSSR = () => true

function routeWithQuery(newPath) {
  if (history.pushState) {
    let path = window.location.protocol + '//' + window.location.host + newPath
    window.history.pushState({ path }, '', path)
  }
}

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

function getUrlQueryParameters(url) {
  var question = url.indexOf('?')
  var hash = url.indexOf('#')
  if (hash === -1 && question === -1) return {}
  if (hash === -1) hash = url.length
  var query =
    question === -1 || hash === question + 1
      ? url.substring(hash)
      : url.substring(question + 1, hash)
  var result = {}
  query.split('&').forEach(function(part) {
    if (!part) return
    part = part.split('+').join(' ') // replace every + with space, regexp-free version
    var eq = part.indexOf('=')
    var key = eq > -1 ? part.substr(0, eq) : part
    var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : ''
    var from = key.indexOf('[')
    if (from === -1) result[decodeURIComponent(key)] = val
    else {
      var to = key.indexOf(']', from)
      var index = decodeURIComponent(key.substring(from + 1, to))
      key = decodeURIComponent(key.substring(0, from))
      if (!result[key]) result[key] = []
      if (!index) result[key].push(val)
      else result[key][index] = val
    }
  })
  return result
}

function getFiltersFromUrl(url) {
  let params = getUrlQueryParameters(url)
  let out = {}
  if (params.i) {
    try {
      out = JSON.parse(params.i)
    } catch (e) {
      console.error('Failed to parse query filters')
    }
  }
  return out
}

const listener = new RouteNavigationListener()

export default class Filters extends Component {
  constructor(props) {
    super(props)

    listener.addListener(this.onRoute)

    let activities = {
      capoeira: {
        name: 'capoeira',
        label: 'Capoeira',
        type: 'activity',
      },
      ballet: {
        name: 'ballet',
        label: 'Ballet',
        type: 'activity',
      },
      hip_hop: {
        name: 'hip_hop',
        label: 'Hip Hop',
        type: 'activity',
      },
      break_dance: {
        name: 'break_dance',
        label: 'Break Dance',
        type: 'activity',
      },
      salsa: {
        name: 'salsa',
        label: 'Salsa',
        type: 'activity',
      },
      tap: {
        name: 'tap',
        label: 'Tap',
        type: 'activity',
      },
    }

    const url = isSSR() ? props.url : location.href
    const filters = getFiltersFromUrl(url)
    console.log('filters', filters)

    const simulateToggle = {}
    for (const key in activities) {
      simulateToggle[key] = this.simulateToggleUrl(
        activities[key],
        filters,
      ).path
    }

    this.state = {
      filters,
      simulateToggle,
      activities,
      times: [
        {
          name: '06',
          label: '6am to 9am',
          type: 'time',
        },
        {
          name: '09',
          label: '9am to 12am',
          type: 'time',
        },
        {
          name: '12',
          label: '12am to 3pm',
          type: 'time',
        },
        {
          name: '15',
          label: '3pm to 6pm',
          type: 'time',
        },
        {
          name: '18',
          label: '6pm to 9pm',
          type: 'time',
        },
        {
          name: '21',
          label: '9pm to 12pm',
          type: 'time',
        },
      ],
    }
  }

  onRoute = event => {
    console.log('event', event)
  }

  componentDidMount() {}

  simulateToggleUrl = (x, _filters) => {
    const filters = JSON.parse(JSON.stringify(_filters))
    if (x.name in filters) {
      delete filters[x.name]
    } else {
      filters[x.name] = { type: x.type }
    }
    const params = Object.keys(filters).length
      ? `?i=${JSON.stringify(filters)}`
      : ''
    const path = `/search/filters${params}`
    return { path, filters }
  }

  toggle = x => event => {
    event.stopPropagation()
    event.preventDefault()
    let { filters: prevFilters } = this.state
    const { path, filters } = this.simulateToggleUrl(x, prevFilters)
    this.setState({ filters }, () => {
      return routeWithQuery(path)
    })
  }

  simulateBackToSearchUrl = () => {
    if (isSSR()) return this.props.url.replace('/filters', '')
    return location.pathname.replace('/filters', '') + location.search
  }

  onDone = event => {
    event.preventDefault()
    event.stopPropagation()
    const path = this.simulateBackToSearchUrl()
    console.log('path', path)
    route(path)
  }

  render({}, { filters, simulateToggle, activities }) {
    return (
      <div
        className={`${style.filtersWrapper} ${
          this.props.active ? '' : style.close
        }`}
      >
        <div className={style.filters}>
          <div className={style.header}>
            <a href={'/search'} className={style.button}>
              Reset
            </a>
            <div className={style.title}>FILTERS</div>
            <a
              href={this.simulateBackToSearchUrl()}
              onClick={this.onDone}
              className={style.button}
            >
              Done
            </a>
          </div>
          <div className={style.section}>
            <div className={style.sectionHeader}>
              <div className={style.sectionTitle}>TIME</div>
            </div>
            <div className={style.checkBoxesContainer}>
              {this.state.times.map(x => {
                return (
                  <div
                    onClick={this.toggle(x)}
                    className={`${style.checkBox} ${
                      x.name in filters ? style.active : ''
                    }`}
                  >
                    <div className={style.label}>{x.label}</div>
                    <div className={`${style.tick}`} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className={style.section}>
            <div className={style.sectionHeader}>
              <div className={style.sectionTitle}>ACTIVITIES</div>
            </div>
            <div className={style.checkBoxesContainer}>
              {Object.values(activities).map(x => {
                return (
                  <a
                    href={`${simulateToggle[x.name]}`}
                    onClick={this.toggle(x)}
                    className={`${style.checkBox} ${
                      x.name in filters ? style.active : ''
                    }`}
                  >
                    <div className={style.label}>{x.label} </div>
                    <div className={`${style.tick}`} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
