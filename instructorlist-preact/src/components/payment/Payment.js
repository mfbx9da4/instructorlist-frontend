import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString } from '../../constants'
import StripeForm from '../stripeform/StripeForm'
import PaymentSuccess from '../paymentsuccess/PaymentSuccess'
import { BASE_URL } from '../../DataService'
import dayjs from 'dayjs'
import Loading from '../loading/Loading'

export default class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      formIsValid: false,
      paymentMethod: null,
      errors: {},
      values: {},
    }
  }

  componentDidMount() {
    this.setState({ date: dayjs() })
  }

  onChange = name => e => {
    this.setState(
      {
        values: {
          [name]: e.target.value,
        },
      },
      () => {
        const errors = this.validateValues()
        const error = errors.phone_number
        const isShowingError = Object.keys(this.state.errors).length > 0
        if (errors.phone_number || isShowingError)
          return this.setState({ errors, error })
      },
    )
  }

  validateValues = () => {
    const { values } = this.state
    if (!('phone_number' in values)) {
      return { phone_number: 'Phone is not valid' }
    }
    const phone = values['phone_number']
    const split = phone.split('+')
    let rest = split[0]
    if (split.length > 1) {
      rest = split[1]
      if (split.length > 2) {
        return { phone_number: 'Phone number must have only one "+"' }
      }
    }
    const isOnlyNumbers = /^\d+$/.test(rest)
    if (!isOnlyNumbers) {
      return { phone_number: 'Phone number must be made only of numbers' }
    }
    if (rest.length < 8) {
      return { phone_number: 'Phone number is too short' }
    }
    return {}
  }

  onSubmit = async e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isSubmitting: true })
    this.setState({ errors: {}, error: false })

    const errors = this.validateValues()
    const error = errors.phone_number
    if (errors.phone_number)
      return this.setState({ isSubmitting: false, errors, error })

    let { paymentMethod } = this.state
    if (!paymentMethod) {
      let res = await this.stripeSubmit(e)
      paymentMethod = res.paymentMethod
      if (res.error) {
        return this.setState({ isSubmitting: false, error: res.error.message })
      }
      this.setState({ paymentMethod })
    }
    let data = {
      payment_method_id: paymentMethod.id,
      date: this.state.date.format('YYYY-MM-DD'),
      start_time: this.props.item.start_time,
      end_time: this.props.item.end_time,
      class_attended: this.props.item.id,
      venue: this.props.venue.id,
      email: `${this.state.values.phone_number}@example.com`,
      ...this.state.values,
    }
    let res = await this.postBooking(data)
    if (res.error) {
      return this.setState({
        isSubmitting: false,
        error: res.error.message || 'Issue making booking',
      })
    }
    return this.setState({ isSubmitting: false, success: true, booking: res })
  }

  postBooking = async data => {
    let res = await fetch(`${BASE_URL}/api/bookings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res.json()
  }

  render(
    { item, show, onClose, venue },
    { error, values, booking, isSubmitting, paymentMethod, success },
  ) {
    if (!item) return <div>Class not found</div>
    if (success)
      return (
        <PaymentSuccess
          onClose={onClose}
          show={show && success}
          booking={booking}
        />
      )
    return (
      <div>
        <form
          onSubmit={this.onSubmit}
          className={classNames({
            [style.paymentWrapper]: true,
            [style.close]: !show,
          })}
        >
          <div className={style.paymentMain}>
            <div className={style.paymentHeader}>
              <div
                style={{ flexBasis: '3rem' }}
                className={`leftArrow ${style.back}`}
                onClick={onClose}
              ></div>
              <div className={style.title}>Checkout</div>
              <div style={{ flexBasis: '3rem', height: '1rem' }}></div>
            </div>

            <div className={'hr'} />

            <div className={style.section}>
              <div className={style.classTitle}>{item.title}</div>
              <div className={style.time}>
                {dayToDayString[item.day]} {item.start_time} - {item.end_time}
              </div>
              <div className={style.location}>
                {venue.name} - {venue.area}
              </div>
            </div>

            <div className={'hr'} />

            <div className={style.section}>
              <div className={style.titleContainer}>
                <div className={style.title}>Total</div>
                <div className={style.titleAside}>
                  £{parseFloat(item.price).toFixed(2)}
                </div>
              </div>
              {venue.entry_fee && (
                <span key="entry_fee" className={style.extra}>
                  Please note this studio will charge you an additional
                  <strong className={style.strong}>
                    {` £${(venue.entry_fee / 100).toFixed(
                      2,
                    )} studio entry fee `}
                  </strong>
                  upon arrival.
                </span>
              )}
            </div>

            <div className={'hr'} />

            <div className={style.section}>
              <div className={style.titleContainer}>
                <div className={style.title}>Payment</div>
              </div>
              <div className={`errorContainer ${error || 'hide'}`}>
                <div className={`errorContainer_message`}>{error}</div>
              </div>

              <div className={style.paymentForm}>
                <div column className={style.inputContainer}>
                  <input
                    type="text"
                    className={style.input}
                    placeholder={'Phone number'}
                    name="phone_number"
                    key="phone_number"
                    value={values['phone_number']}
                    onChange={this.onChange('phone_number')}
                  />
                </div>

                <div
                  key="paid"
                  style={{
                    margin: paymentMethod ? '1rem 0' : 0,
                    height: paymentMethod ? 'auto' : 0,
                  }}
                >
                  <div className="tick"></div> Paid!
                </div>

                <StripeForm
                  key="StripeForm"
                  amount={item.price}
                  onSubmit={onStripeSubmit => {
                    this.stripeSubmit = onStripeSubmit
                  }}
                ></StripeForm>
              </div>
            </div>
            <div className="bottom"></div>
          </div>

          <FooterButton
            hide={!show}
            // disabled={!this.state.formIsValid}
            onClick={this.onSubmit}
          >
            <div>{isSubmitting ? <Loading></Loading> : 'Confirm booking'}</div>
          </FooterButton>
        </form>
      </div>
    )
  }
}
