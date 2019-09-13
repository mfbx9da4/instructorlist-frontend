import { h, Component } from 'preact'
import style from './style'
import dayjs from 'dayjs'
import Filters from '../filters/Filters'
import { route } from 'preact-router'
import isSSR from '../../utils/is-ssr'
import { getFiltersFromUrl } from '../../utils/getFiltersFromUrl'
import { classNames } from '../../utils/classNames'

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
      console.log('year, month, date', year, month, date)
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
    console.log('constructor_props', props.date)
    const filters = getFiltersFromUrl(props.url || location.href) || {}
    const filterCount = this.getFilterCount(filters)
    // || dayjs().format('YYYY-MM-DD')
    const day = parseDate(props.date)
    console.log('url day', props.date, day.format('dddd D MMM'))
    const allClasses = props.data.state.classes
    console.log('constructed with filters', filters)
    this.state = {
      day,
      filters,
      filterCount,
      allClasses,
      classes: this.doLocalSearch(allClasses, day),
    }
  }

  async componentDidMount() {
    await this.doSearch()
  }

  getFilterCount = filters =>
    typeof filters === 'object'
      ? Object.keys(filters).filter(key => key !== 'day').length
      : 0

  doSearch = async () => {
    console.log('do searc')
    let { filters, day } = this.state
    await this.setState({ isLoading: true })
    let res = await this.props.data.getSearch(filters)
    await this.setState({ isLoading: false })
    console.log('gotSearch', res.results)
    this.setState(
      {
        day: day || parseDate(this.props.date),
        allClasses: res.results,
      },
      this.doLocalSearch,
    )
  }

  doLocalSearch = (
    allClasses = this.state.allClasses,
    day = this.state.day,
  ) => {
    if (!day.isValid()) console.error('Invalid Date')
    const dayFilter = day.day()
    const classes = Object.values(allClasses).filter(item => {
      if (item.day !== dayFilter) return false
      let matchedACategory = false
      let hasCategories = false

      // Basic search
      for (const key in this.state.filters) {
        if (this.state.filters.hasOwnProperty(key)) {
          const filter = this.state.filters[key]
          if (filter.type === 'time') {
            const start = timeToMinutes(item.start_time)
            const fStart = parseInt(key) * 60
            const filterDuration = 3 * 60
            const fEnd = fStart + filterDuration
            console.log('start, fStart, fEnd', start, fStart, fEnd)
            if (start < fStart || start > fEnd) return false
          } else if (filter.type === 'category' && !matchedACategory) {
            hasCategories = true
            for (let i = 0; i < item.categories.length; i++) {
              const category = item.categories[i]
              console.log('category', category, filter)
              if (category.name.toLowerCase() === key.toLowerCase()) {
                matchedACategory = true
              }
            }
          }
        }
      }

      console.log(
        'matchedACategory , hasCategories',
        matchedACategory,
        hasCategories,
      )
      if (!matchedACategory && hasCategories) return false
      return true
    })
    console.log('classes', classes)
    this.setState({ classes })
    return classes
  }

  simulateToFiltersUrl = () => {
    // a = '/search/8392-23-4/'
    // const split = a.split('/')
    // if (split.length)
    // a = '/search?'
    // a = '/search'

    // "/search".replace(new RegExp(`(\/search\/?(${day})?)`), `/search/2019-09-08/filters`)

    // https://localhost:8080/search/2019-09-23/?i={}
    const day = this.state.day.format('YYYY-MM-DD')
    const rgx = new RegExp(`(\/search\/?(${day})?)\/?`)
    'https://localhost:8080/search/2019-09-23/?i={}'.replace(
      new RegExp(`(\/search\/?(${day})?)\/?`),
      `/search/2019-09-08/filters`,
    )
    const newPath = `/search/${day}/filters`
    if (isSSR()) {
      return this.props.url.replace(rgx, newPath)
    }
    console.log(
      'location.pathname.replace(rgx, newPath) + location.search',
      location.pathname,
      newPath,
      location.pathname.replace(rgx, newPath) + location.search,
    )
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

  routeToFilters = event => {
    event.preventDefault()
    event.stopPropagation()
    return route(this.simulateToFiltersUrl())
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

  formatSelectedDay = () => {
    const { day } = this.state
    const diff = dayjs().diff('day', day)
    if (diff === 0) {
      return 'TODAY'
    } else if (diff === 1) {
      return 'TOMORROW'
    } else if (diff === -1) {
      return 'YESTERDAY'
    }
    return day.format('dddd D MMM').toUpperCase()
  }

  render({}, { day, filters, filterCount }) {
    return (
      <div className={style.search}>
        <div className={style.dayWrapper}>
          <a
            href={this.simulateAddDayUrl(-1, day, filters).url}
            onClick={this.addDay(-1)}
            className="leftArrow"
          />
          <div>{this.formatSelectedDay()}</div>
          <a
            href={(this.simulateAddDayUrl(1), day, filters).url}
            onClick={this.addDay(1)}
            className="rightArrow"
          />
        </div>
        <div
          className={classNames({
            [style.infoWrapper]: true,
            hide: this.state.isLoading || this.state.classes.length !== 0,
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
            hide: !this.state.isLoading || this.state.classes.length !== 0,
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
        <div className={style.listItems}>
          {this.state.classes &&
            this.state.classes.map(item => (
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
                          href={`/search/category/${x}`}
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
                            item.instructors[0].avatar ||
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
              href={this.simulateToFiltersUrl()}
              onClick={this.routeToFilters}
              className={style.filtersButton}
            >
              <div className={style.filterIcon} />
              Filters
              {filterCount > 0 && (
                <div className={style.filterCount}>{filterCount}</div>
              )}
            </a>
            <a href={`/search/map-view`} className={style.filtersButton}>
              <div className={`${style.filterIcon} ${style.mapIcon}`} />
              Map View
            </a>
          </div>
        </div>
      </div>
    )
  }
}
