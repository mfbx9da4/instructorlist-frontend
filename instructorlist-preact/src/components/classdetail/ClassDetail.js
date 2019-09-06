import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import Payment from '../payment/Payment'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString } from '../../constants'

export default class ClassDetail extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      item: this.props.data.state.classes[props.matches.id],
      showPayment: true,
    }
  }

  async componentDidMount() {
    let res = await this.props.data.getClass(this.props.matches.id)
    console.log('res', res)
    this.setState({
      item: res,
    })
  }

  onBack = e => {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.i) {
      return window.history.back()
    }
    route('/search/')
  }

  hidePayment = e => {
    this.setState({ showPayment: false })
  }

  render({}, { item, showPayment }) {
    console.log('item', item)
    if (!item) return <div>Class not found</div>
    const instructor = item.instructors[0]
    const profile = instructor.profile || { bio: '' }
    return (
      <div>
        <Payment
          show={showPayment}
          onClose={this.hidePayment}
          item={item}
        ></Payment>
        <div className={style.classDetailWrapper}>
          <div className={style.classHero}>
            <div className={style.heroImage}>
              <img
                src={item.hero_image_url || '/assets/images/class.jpeg'}
                alt={item.title}
              />
              <a
                onClick={this.onBack}
                href="/search"
                className={`${style.back}`}
              >
                <div className="leftArrow"></div>
              </a>
              <div className={style.timeLabel}>
                {dayToDayString[item.day].toUpperCase()} {item.start_time} -{' '}
                {item.end_time}
              </div>
            </div>
          </div>
          <div className={style.main}>
            <div className={style.mainTitle}>{item.title}</div>
            <div className={style.address}>
              {item.venue.name} {item.venue.area}
            </div>
            <a
              href={
                item.venue.google_maps_url
                  ? item.venue.google_maps_url
                  : `https://www.google.co.uk/maps/dir//${item.venue.address_line_1} ${item.venue.postcode}`
              }
              target="_blank"
              className={style.well}
              style={{ borderTop: '1px solid var(--off-white)' }}
            >
              <div className={style.wellIcon}>
                <div className="directions"></div>
              </div>
              <div className={style.wellMain}>
                <div className={style.wellName}>{item.venue.name}</div>
                <div className={style.wellDescription}>
                  {item.venue.address_line_1}, {item.venue.postcode}
                </div>
              </div>
              <div className={style.wellAction}>
                <div className="rightArrow"></div>
              </div>
            </a>
            <a className={style.well} href={`${profile.slug}`}>
              <div className={style.wellIcon}>
                <img
                  className={style.instructorAvatar}
                  src={
                    profile.profile_image_url ||
                    `https://api.adorable.io/avatars/60/${instructor.email}.png`
                  }
                  alt={instructor.name}
                />
              </div>
              <div className={style.wellMain}>
                <div className={style.wellName}>{instructor.name}</div>
                <div className={style.wellDescription}>
                  {profile.bio.substring(0, 50)}
                </div>
              </div>
              <div className={style.wellAction}>
                <div className="rightArrow"></div>
              </div>
            </a>
            {item.description && (
              <div className={style.section}>
                <div className={style.title}>About</div>
                <div className={style.description}>{item.description}</div>
              </div>
            )}
          </div>
        </div>
        <FooterButton onClick={() => this.setState({ showPayment: true })}>
          <div>£{item.price}</div>
          <div className={style.priceLabel}>Book now</div>
        </FooterButton>
      </div>
    )
  }
}
