import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import isSSR from '../../utils/is-ssr'
import { getFiltersFromUrl } from '../../utils/getFiltersFromUrl'
import { routeWithQuery } from '../../utils/routeWithQuery'

let activities = {
  capoeira: {
    name: 'capoeira',
    label: 'Capoeira',
    type: 'category',
  },
  ballet: {
    name: 'ballet',
    label: 'Ballet',
    type: 'category',
  },
  hip_hop: {
    name: 'hip_hop',
    label: 'Hip Hop',
    type: 'category',
  },
  break_dance: {
    name: 'break_dance',
    label: 'Break Dance',
    type: 'category',
  },
  salsa: {
    name: 'salsa',
    label: 'Salsa',
    type: 'category',
  },
  tap: {
    name: 'tap',
    label: 'Tap',
    type: 'category',
  },
}

// TODO: fix day
// Needs to redirect correctly - add as param to routing
// Remove day from filters
// On done just replace filters
// Search doesn't update filters?
// What about Location? - shared state between all three components
// Keep filters state in search - update from any other
//

export default class Filters extends Component {
  constructor(props) {
    super(props)

    const url = isSSR() ? props.url : location.href
    const filters = getFiltersFromUrl(url)

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

  onRoute = event => {}

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
    if (this.props.onDone) {
      this.props.onDone(this.state.filters)
    }
    route(path)
  }

  onReset = event => {
    event.preventDefault()
    event.stopPropagation()
    const path = '/search'
    this.setState({ filters: {} })
    if (this.props.onDone) {
      this.props.onDone({})
    }
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
            <a href={'/search'} onClick={this.onReset} className={style.button}>
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
