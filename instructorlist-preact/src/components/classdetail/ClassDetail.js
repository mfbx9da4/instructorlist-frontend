import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'

const dayToDayString = {
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
  7: 'SUN',
}

export default class ClassDetail extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      item: {
        title: 'hey',
        venue: {},
        instructors: [{ profile: { bio: '' } }],
      },
    }
  }

  async componentDidMount() {
    let res = await this.props.data.getClass(this.props.matches.id)
    console.log('res', res)
    this.setState({
      item: res,
    })
  }

  render({}, { item }) {
    const instructor = item.instructors[0]
    const profile = instructor.profile || { bio: '' }
    return (
      <div>
        <div className={style.classDetailWrapper}>
          {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
          <div className={style.classHero}>
            <div className={style.heroImage}>
              <img
                src={item.hero_image_url || '/assets/images/class.jpeg'}
                alt={item.title}
              />
              <div className={style.timeLabel}>
                {item.start_time} {item.date}
              </div>
            </div>
          </div>
          <div className={style.main}>
            <div className={style.mainTitle}>{item.title}</div>
            <div className={style.address}>
              {item.venue.name} {item.venue.area}
            </div>
            <div className={style.instructor}>
              <div className={style.instructorAvatar}>
                <img src={profile.profile_image_url} alt={instructor.name} />
              </div>
              <div className={style.instructorMain}>
                <div className={style.instructorName}>{instructor.name}</div>
                <div className={style.instructorDescription}>
                  {profile.bio.substring(0, 50)}
                </div>
              </div>
              <div className={style.instructorAction}>
                <div className="rightArrow"></div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.button}>
            <div className={style.price}>£{item.price}</div>
            <div className={style.priceLabel}>Book now</div>
          </div>
        </div>
      </div>
    )
  }
}
