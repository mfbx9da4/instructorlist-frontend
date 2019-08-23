import { h, Component } from 'preact'
import style from './style'
import dayjs from 'dayjs'
import Filters from '../filters/Filters'
import { route } from 'preact-router'
console.log('search')
import isSSR from '../../utils/is-ssr'

export default class Search extends Component {
  state = {
    now: dayjs(),
    classes: [
      {
        id: 1,
        instructor: {
          name: 'Alexander Smith',
          avatar: 'https://api.adorable.io/avatars/60/alexander@smith.png',
        },
        title: 'Introduction to Bachata',
        price: 12,
        tags: ['bachata'],
        startTime: '07:30',
        duration: 'Alexander Smith',
        venue: {
          area: 'Covent Garden',
          name: 'Pineapple Dance Studios',
        },
      },
      {
        id: 2,
        instructor: {
          name: 'Alexander Smith',
          avatar: 'https://api.adorable.io/avatars/60/alexander@smith.png',
        },
        title: 'Introduction to Bachata',
        price: 12,
        tags: ['bachata'],
        startTime: '07:30',
        duration: 'Alexander Smith',
        venue: {
          area: 'Covent Garden',
          name: 'Pineapple Dance Studios',
        },
      },
    ],
  }

  constructor(props) {
    super(props)
    console.log('props', props)
  }

  componentDidMount() {
    this.setState({
      now: dayjs(),
    })
  }

  simulateToFiltersUrl = () => {
    if (isSSR()) {
      return this.props.url.replace('/search', '/search/filters')
    }
    return (
      location.pathname.replace('/search', '/search/filters') + location.search
    )
  }

  routeToFilters = event => {
    event.preventDefault()
    event.stopPropagation()
    route(this.simulateToFiltersUrl())
  }

  render() {
    return (
      <div className={style.search}>
        <div className={style.dayWrapper}>
          <div className={style.leftArrow} />
          <div>{this.state.now.format('dddd D MMM').toUpperCase()}</div>
          <div className={style.rightArrow} />
        </div>
        <div className={style.listItems}>
          {this.state.classes.map(item => (
            <div className={style.listItemWrapper}>
              <div className={style.listItem}>
                <div className={style.listItemAside}>
                  <div className={style.startTime}>{item.startTime}</div>
                  <div className={style.price}>£{item.price}</div>
                </div>
                <div className={style.listItemMain}>
                  <div className={style.tags}>
                    {item.tags.map((x, i) => (
                      <a
                        className={style.tag}
                        key={i}
                        href={`/search/tag/${x}`}
                      >
                        #{x}
                      </a>
                    ))}
                  </div>
                  <div className={style.title}>{item.title}</div>
                  <div className={style.venue}>
                    <div>{item.venue.name}</div>
                    <div>{item.venue.area}</div>
                  </div>
                  <div className={style.instructor}>
                    <img
                      className={style.instructorAvatar}
                      alt={item.instructor.name}
                      src={item.instructor.avatar}
                    />
                    <div className={style.instructorName}>
                      {item.instructor.name}
                    </div>
                  </div>
                </div>
                <div className={style.listItemAction}>
                  <a
                    className={style.itemActionLink}
                    href={`/classes/${item.id}`}
                  >
                    <span className={style.rightArrow} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Filters
          {...this.props}
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
