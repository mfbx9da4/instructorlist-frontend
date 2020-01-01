import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import Payment from '../payment/Payment'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString } from '../../constants'
import isDev from '../../utils/is-dev'
import Directions from '../directions/Directions'

export default class ClassDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.data.state.classes[props.matches.id],
      showPayment: false,
    }
  }

  async componentDidMount() {
    let res = await this.props.data.getClass(this.props.matches.id)
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
    if (!item)
      return (
        <div column flex jc="center" ai="center" style={{ marginTop: '120px' }}>
          <img
            width="85"
            height="119"
            src="/assets/images/dancing.gif"
            alt="loading"
          />
          <div>Loading</div>
        </div>
      )
    const instructor = item.instructors[0]
    const profile = instructor.profile || { bio: '' }
    const day =
      dayToDayString[item.day] && dayToDayString[item.day].toUpperCase()
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
                {day} {item.start_time} - {item.end_time}
              </div>
            </div>
          </div>
          <div className={style.main}>
            <div className={style.mainTitle}>{item.title}</div>
            <div className={style.address}>
              {item.venue.name} {item.venue.area}
            </div>
            <Directions venue={item.venue}></Directions>
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
          <div>
            £{item.price} <div className={style.priceLabel}>Book now</div>
          </div>
        </FooterButton>
      </div>
    )
  }
}
