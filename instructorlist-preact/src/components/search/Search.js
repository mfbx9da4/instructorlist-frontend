import { h, Component } from 'preact'
import style from './style'
import dayjs from 'dayjs'
import Filters from '../filters/Filters'
import Map from '../map/Map'
import { route } from 'preact-router'
import isSSR from '../../utils/is-ssr'
import { getFiltersFromUrl } from '../../utils/getFiltersFromUrl'
import { classNames } from '../../utils/classNames'
import { loadMapBox } from '../../lazyLoaders'

if (!isSSR()) setTimeout(loadMapBox, 6000)

const timeToMinutes = time => {
  const [a, b] = time.split(':')
  return parseInt(a) * 60 + parseInt(b)
}

if (!isSSR()) window.dayjs = dayjs

function parseDate(day) {
  // Required as parsing date is different on server
  if (day && day.length) {
    const split = day.split('-')
    if (split.length === 3) {
      const year = parseInt(split[0])
      const month = parseInt(split[1]) - 1
      const date = parseInt(split[2])
      return dayjs()
        .set('date', date)
        .set('month', month)
        .set('year', year)
    }
  }
  return dayjs()
}

export default class Search extends Component {
  constructor(props) {
    super(props)
    const filters = getFiltersFromUrl(props.url || location.href) || {}
    const filterCount = this.getFilterCount(filters)
    const day = parseDate(props.date)
    const allClasses = props.data.state.classes
    const state = {
      day,
      filters,
      filterCount,
      allClasses,
      isOffline: false,
      classes: this.doLocalSearchInner(allClasses, day, filters),
    }
    this.state = state
  }

  async componentDidMount() {
    await this.doSearch()
  }

  getFilterCount = filters =>
    typeof filters === 'object'
      ? Object.keys(filters).filter(key => key !== 'day').length
      : 0

  doSearch = async () => {
    let { filters, day } = this.state
    await this.setState({ isLoading: true })
    let res
    try {
      res = await this.props.data.getSearch(filters)
    } catch (err) {
      this.setState({ isOffline: true })
    }
    this.setState(
      {
        isLoading: false,
        day: day || parseDate(this.props.date),
        allClasses: res.results,
      },
      () => res.results && this.doLocalSearch(),
    )
  }

  doLocalSearchInner = (allClasses, day, filters) => {
    if (!day.isValid()) console.error('Invalid Date')
    const dayFilter = day.day()
    let classes = []
    if (allClasses) {
      classes = Object.values(allClasses).filter(item => {
        if (item.day !== dayFilter) return false
        let matchedACategory = false
        let hasCategories = false
        let hasTimes = false

        // Basic search
        for (const key in filters) {
          if (filters.hasOwnProperty(key)) {
            const filter = filters[key]
            if (filter.type === 'time') {
              hasTimes = true
              const start = timeToMinutes(item.start_time)
              const fStart = parseInt(key) * 60
              const filterDuration = 3 * 60
              const fEnd = fStart + filterDuration
              if (start >= fStart && start <= fEnd) return true
            } else if (filter.type === 'category' && !matchedACategory) {
              hasCategories = true
              for (let i = 0; i < item.categories.length; i++) {
                const category = item.categories[i]
                if (category.name.toLowerCase() === key.toLowerCase()) {
                  return true
                }
              }
            }
          }
        }

        if (hasTimes || hasCategories) return false
        return true
      })
    }
    return classes
  }

  doLocalSearch = () => {
    const classes = this.doLocalSearchInner(
      this.state.allClasses,
      this.state.day,
      this.state.filters,
    )
    this.setState({ classes })
    return classes
  }

  /*
     RGX to replace
     https://instructorlist.org/search/2019-09-23/?i={}
     to become
     https://instructorlist.org/search/2019-09-23/filters?i={}
     And keeping the search part of the url
  */
  simulateToUrl = to => {
    // 'https://instructorlist.org/search/2019-09-23/?i={}'.replace(
    //   new RegExp(`(\/search\/?(${day})?)\/?`),
    //   `/search/2019-09-08/filters`,
    // )
    const day = this.state.day.format('YYYY-MM-DD')
    const rgx = new RegExp(`(\/search\/?(${day})?)\/?`)
    const newPath = `/search/${day}${to}`
    if (isSSR()) {
      return this.props.url.replace(rgx, newPath)
    }
    return location.pathname.replace(rgx, newPath) + location.search
  }

  onDone = filters => {
    this.setState(
      {
        filters,
        filterCount: this.getFilterCount(filters),
      },
      this.doLocalSearch,
    )
  }

  isFilterView = () => this.props.path.indexOf('/search/:date/filters') === 0

  toggleMapView = () => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ isMapView: !this.state.isMapView })
  }

  toggleFilters = event => {
    event.preventDefault()
    event.stopPropagation()
    if (this.isFilterView()) {
      return route(this.props.url.replace('/filters', ''))
    }
    return route(this.simulateToUrl('/filters'))
  }

  routeToFilters = event => {
    event.preventDefault()
    event.stopPropagation()
    return route(this.simulateToUrl('/filters'))
  }

  addDay = x => e => {
    e.preventDefault()
    e.stopPropagation()
    let { day: _day, filters: _filters } = this.state
    const { day, filters, url } = this.simulateAddDayUrl(x, _day, _filters)
    this.setState({ day, filters }, this.doLocalSearch)
    route(url)
  }

  simulateAddDayUrl = (x, day, filters = {}) => {
    day = dayjs(day).add(x, 'day')
    const dayString = dayjs(day).format('YYYY-MM-DD')
    const url = `/search/${dayString}/?i=${JSON.stringify(filters)}`
    return { day, filters, url }
  }

  formatCurrentDay = () => {
    const { day } = this.state
    const now = dayjs()
      .set('hour', day.hour())
      .set('minute', day.minute())
      .set('second', day.second())
      .set('millisecond', day.millisecond())
    const diff = day.diff(now, 'day')
    if (diff === 0) {
      return 'TODAY'
    } else if (diff === 1) {
      return 'TOMORROW'
    } else if (diff === -1) {
      return 'YESTERDAY'
    }
    return day.format('dddd D MMM').toUpperCase()
  }

  render({}, { day, filters, filterCount, classes }) {
    return (
      <div className={style.search}>
        <div className={style.dayWrapper}>
          <a
            href={this.simulateAddDayUrl(-1, day, filters).url}
            onClick={this.addDay(-1)}
            className="leftArrow"
          />
          <div>{this.formatCurrentDay()}</div>
          <a
            href={(this.simulateAddDayUrl(1), day, filters).url}
            onClick={this.addDay(1)}
            className="rightArrow"
          />
        </div>
        <div
          className={classNames({
            [style.infoWrapper]: true,
            hide:
              this.state.isLoading ||
              classes.length !== 0 ||
              this.state.isOffline,
          })}
        >
          <div className={style.infoMessage}>
            <div className={`shrug ${style.infoIcon}`}></div>
            <div className={style.title}>No classes found</div>
          </div>
        </div>
        <div
          className={classNames({
            [style.infoWrapper]: true,
            hide: !this.state.isOffline,
          })}
        >
          <div className={style.infoMessage}>
            <div className={`shrug ${style.infoIcon}`}></div>
            <div className={style.title}>You are offline</div>
          </div>
        </div>
        <div
          className={classNames({
            [style.infoWrapper]: true,
            hide: !this.state.isLoading || classes.length !== 0,
          })}
        >
          <img
            width="85"
            height="119"
            src="/assets/images/dancing.gif"
            alt="loading"
          />
          <div>Loading</div>
        </div>
        <Map
          key="Map"
          items={classes}
          onDone={this.onDone}
          active={this.state.isMapView}
        />
        <div
          style={{ display: this.state.isMapView ? 'none' : 'flex' }}
          // style={{ display: 'none' }}
          className={classNames({ [style.listItems]: true })}
        >
          {classes &&
            classes.map(item => (
              <div
                onClick={() => route(`/classes/${item.id}?i=1`)}
                className={style.listItemWrapper}
              >
                {isSSR() && (
                  <a
                    className={style.listItemLink}
                    href={`/classes/${item.id}?i=1`}
                  ></a>
                )}
                <div className={style.listItem}>
                  <div className={style.listItemAside}>
                    <div className={style.startTime}>{item.start_time}</div>
                    <div className={style.price}>£{item.price}</div>
                  </div>
                  <div className={style.listItemMain}>
                    <div className={style.categories}>
                      {item.categories.map((x, i) => (
                        <a
                          className={style.category}
                          key={i}
                          // href={`/search/category/${x.normalized_name}`}
                          href={`#`}
                        >
                          #{x.name.toLowerCase()}
                        </a>
                      ))}
                    </div>
                    <div className={style.title}>{item.title}</div>
                    <div className={style.venue}>
                      <div>{item.venue.name}</div>
                      <div>{item.venue.area}</div>
                    </div>
                    {item.instructors[0] && (
                      <div className={style.instructor}>
                        <img
                          className={style.instructorAvatar}
                          alt={item.instructors[0].name}
                          src={
                            item.instructors[0].profile.profile_image_url ||
                            `https://api.adorable.io/avatars/60/${item.instructors[0].email}.png`
                          }
                        />
                        <div className={style.instructorName}>
                          {item.instructors[0].name}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={style.listItemAction}>
                    <a
                      className={style.itemActionLink}
                      href={`/classes/${item.id}`}
                    >
                      <span className="rightArrow" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Filters
          {...this.props}
          onDone={this.onDone}
          active={this.props.path.indexOf('/search/:date/filters') === 0}
        />
        <div className={style.filtersButtonWrapper}>
          <div className={style.filtersButtonContainer}>
            <a
              href={this.simulateToUrl('/filters')}
              onClick={this.toggleFilters}
              className={style.filtersButton}
            >
              <div className={style.filterIcon} />
              Filters
              {filterCount > 0 && (
                <div className={style.filterCount}>{filterCount}</div>
              )}
            </a>
            <a
              onClick={() => route(this.simulateToUrl('/map'))}
              className={style.filtersButton}
              onClick={this.toggleMapView}
            >
              <div
                className={`${style.filterIcon} ${
                  this.state.isMapView ? style.listIcon : style.mapIcon
                }`}
              />
              {this.state.isMapView ? 'List View' : 'Map View'}
            </a>
          </div>
        </div>
      </div>
    )
  }
}
