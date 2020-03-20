import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString } from '../../constants'
import Directions from '../directions/Directions'
import { BASE_URL } from '../../DataService'
import dayjs from 'dayjs'
import Loading from '../loading/Loading'

export default class PaymentSuccess extends Component {
  static defaultProps = {
    booking: {
      id: 34,
      code: 'GAKWL3',
      venue: {
        id: 1,
        name: 'Pineapple Studios',
        address_line_1: '7 Langley Street',
        area: 'Covent Gardem',
        postcode: 'WC2H 9JA',
      },
      class_attended: {
        id: 5,
        venue: {
          id: 1,
          name: 'Pineapple Studios',
          address_line_1: '7 Langley Street',
          area: 'Covent Gardem',
          postcode: 'WC2H 9JA',
        },
        day: 5,
        price: 13,
        start_time: '09:06',
        end_time: '11:00',
        title: 'Salsa',
        instructors: [
          {
            id: 3,
            profile: {
              bio: 'This is my bio. I am a great teacher.',
              instagram_url: '',
              facebook_url: '',
              youtube_url: '',
              website_url: '',
            },
            full_name: 'New Teacher Surname',
            name: 'New Teacher Surname',
            email: 'adf@gmail.com',
            phone_number: '07476996601',
            is_student: false,
            is_teacher: true,
          },
        ],
        categories: [
          {
            id: 7,
            name: 'Salsa',
          },
        ],
      },
      start_time: '09:06',
      end_time: '11:00',
      created: '2019-09-15T11:37:26.985220Z',
      modified: '2019-09-15T11:37:26.985328Z',
    },
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  formatDay = day => {
    return `${dayToDayString[day][0].toUpperCase()}${dayToDayString[day]
      .substr(1)
      .toLowerCase()}`
  }

  mainCategory = categories => {
    if (categories.length === 0) return 'Dance'
    const cat = categories[0].name
    return `${cat[0].toUpperCase()}${cat.substr(1).toLowerCase()}`
  }

  render({ booking, show, onClose }) {
    const { class_attended: item } = booking
    return (
      <div>
        <div
          className={classNames({
            [style.paymentSuccessWrapper]: true,
            [style.close]: !show,
          })}
        >
          <div className={style.paymentSuccessMain}>
            <div className={style.paymentSuccessHeader}>
              <div
                className={`leftArrow ${style.back}`}
                onClick={this.props.onClose}
              ></div>
              <div className={style.title}>Booking confirmed</div>
              <div style={{ width: '1rem', height: '1rem' }}></div>
            </div>
            <div className={style.classHero}>
              <div className={style.heroImage}>
                <img
                  src={item.hero_image_url || '/assets/images/class.jpeg'}
                  alt={item.title}
                />
                <a onClick={onClose} href="/search" className={`${style.back}`}>
                  <div className="leftArrow"></div>
                </a>
                <div className={style.shader}></div>
                <div className={style.label}>
                  Let's do some
                  <div className={style.title}>
                    {this.mainCategory(item.categories)}
                  </div>
                  <a
                    style={{ color: 'white', textDecoration: 'underline' }}
                    target="_blank"
                    href={booking.video_url}
                  >
                    {booking.video_url}
                  </a>
                </div>
              </div>
            </div>
            <div className={style.main}>
              {/* <Directions venue={item.venue}></Directions> */}
              <div className={style.mainTitle}>{item.title}</div>
              <div className={style.timeLabel}>
                {this.formatDay(item.day)} {item.start_time} - {item.end_time}
              </div>
              <div className={style.address}>
                {item.venue.name} {item.venue.area}
              </div>
              <div className="hr"></div>
              <div className={style.bookingCodeContainer}>
                <div className={style.bookingReceived}>
                  I didn't receive the confirmation message.
                </div>
                <div column className={style.bookingCode}>
                  <div>
                    Go to:{' '}
                    <strong>
                      <a target="_blank" href={booking.video_url}>
                        {booking.video_url}
                      </a>
                    </strong>
                  </div>
                  <div>
                    Booking ID: <strong>{booking.code}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
