import { h, Component } from 'preact'
import style from './style'
import dayjs from 'dayjs'

export default class Search extends Component {
  state = {
    now: dayjs(),
    classes: [],
  }

  componentDidMount() {
    this.setState({
      now: dayjs(),
      classes: [
        {
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
    })
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
            <div className={style.listItem}>
              <div className={style.listItemAside}>
                <div>{item.startTime}</div>
                <div>{item.price}</div>
              </div>
              <div className={style.listItemMain}>
                <div>{item.title}</div>
                <div>{item.instructor.name}</div>
              </div>
              <div className={style.listItemAction}>
                <div className={style.rightArrow} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
