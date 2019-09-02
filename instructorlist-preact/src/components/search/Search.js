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
      const day = parseInt(split[2]) - 1
      return dayjs()
        .set('day', day)
        .set('month', month)
        .set('year', year)
    }
  }
  return dayjs()
}

export default class Search extends Component {
  constructor(props) {
    super(props)
    console.log('constructor_props', props)
    const filters = getFiltersFromUrl(props.url || location.href) || {}
    const filterCount = this.getFilterCount(filters)
    console.log('filters.day , dayjs().)', filters.day, dayjs())
    filters.day = filters.day || dayjs().format('YYYY-MM-DD')
    const day = parseDate(filters.day)
    const allClasses = props.data.state.classes
    console.log('constructed with filters', filters.day, day, filters)
    this.state = {
      day,
      filters,
      filterCount,
      allClasses: allClasses,
      classes: this.doLocalSearch(allClasses, day),
    }
  }

  componentDidMount() {
    this.doSearch()
  }

  getFilterCount = filters =>
    typeof filters === 'object'
      ? Object.keys(filters).filter(key => key !== 'day').length
      : 0

  doSearch = async () => {
    console.log('do searc')
    let { day, ...filters } = this.state.filters
    await this.setState({ isLoading: true })
    let res = await this.props.data.getSearch(filters)
    await this.setState({ isLoading: false })
    console.log('gotSearch', res.results)
    this.setState(
      {
        allClasses: res.results,
      },
      this.doLocalSearch,
    )
  }

  doLocalSearch = (
    allClasses = this.state.allClasses,
    day = this.state.day,
  ) => {
    console.log('dolocal search')
    const dayFilter = dayjs(day).day()
    console.log('day', day, this.state.day)
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
    if (isSSR()) {
      return this.props.url.replace('/search', '/search/filters')
    }
    return (
      location.pathname.replace('/search', '/search/filters') + location.search
    )
  }

  onDone = filters => {
    const { day } = filters
    this.setState(
      {
        filters,
        filterCount: this.getFilterCount(filters),
        day: dayjs(day),
      },
      this.doLocalSearch,
    )
  }

  routeToFilters = event => {
    event.preventDefault()
    event.stopPropagation()
    route(this.simulateToFiltersUrl())
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
    filters.day = dayjs(day).format('YYYY-MM-DD')
    const url = `/search/?i=${JSON.stringify(filters)}`
    return { day, filters, url }
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
          <div>{this.state.day.format('dddd D MMM').toUpperCase()}</div>
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
                onClick={() => route(`/classes/${item.id}`)}
                className={style.listItemWrapper}
              >
                {isSSR() && (
                  <a
                    className={style.listItemLink}
                    href={`/classes/${item.id}`}
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
          active={this.props.path === '/search/filters'}
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
