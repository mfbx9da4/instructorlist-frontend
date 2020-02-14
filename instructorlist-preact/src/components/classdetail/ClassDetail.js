import { h, Component } from 'preact'
import { route, Link } from 'preact-router'
import style from './style'
import Payment from '../payment/Payment'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString } from '../../constants'
import isDev from '../../utils/is-dev'
import Directions from '../directions/Directions'
import DancingGif from '../dancing-gif/DancingGif'

export default class ClassDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.data.state.classes[props.matches.id],
      showPayment: false,
    }
  }

  async componentDidMount() {
    const { item } = this.state
    // We have all the data we need
    if (
      item &&
      item.venue &&
      item.instructors &&
      item.instructors.length ===
        item.instructors.filter(x => !!x.profile).length
    )
      return
    this.setState({
      loading: true,
    })
    let res = await this.props.data.getClass(this.props.matches.id)
    this.setState({
      item: res,
      loading: false,
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

  render({}, { item, showPayment, isLoading }) {
    if (!item || isLoading)
      return (
        <div style={{ marginTop: '120px' }}>
          <DancingGif></DancingGif>
        </div>
      )
    const instructor = item.instructors[0]
    const profile = instructor.profile || { bio: '' }
    const day =
      dayToDayString[item.day] && dayToDayString[item.day].toUpperCase()

    const { venue } = item
    return (
      <div>
        <Payment
          show={showPayment}
          onClose={this.hidePayment}
          item={item}
          venue={venue}
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
                {day} {item.start_time} - {item.end_time}
              </div>
            </div>
          </div>
          <div className={style.main}>
            <div className={style.mainTitle}>{item.title}</div>
            <div className={style.address}>
              {venue.name} {venue.area}
            </div>
            <Directions venue={venue}></Directions>
            <Link className={style.well} href={`/${profile.slug}`}>
              <div className={style.wellIcon}>
                <img
                  className={style.instructorAvatar}
                  src={
                    profile.profile_image_url ||
                    `https://api.adorable.io/avatars/60/${instructor.id}.png`
                  }
                  alt={instructor.name}
                />
              </div>
              <div className={style.wellMain}>
                <div className={style.wellName}>{instructor.name}</div>
                <div className={style.wellDescription}>
                  {profile.bio && (
                    <>
                      {profile.bio.substring(0, 50)}{' '}
                      {profile.bio.length > 50 ? '...' : ''}
                    </>
                  )}
                </div>
              </div>
              <div className={style.wellAction}>
                <div className="rightArrow"></div>
              </div>
            </Link>
            {item.description && (
              <div className={style.section}>
                <div className={style.title}>About</div>
                <div className={style.description}>{item.description}</div>
              </div>
            )}
          </div>
        </div>
        <FooterButton onClick={() => this.setState({ showPayment: true })}>
          <div>
            £{item.price} <div className={style.priceLabel}>Book now</div>
          </div>
        </FooterButton>
      </div>
    )
  }
}
