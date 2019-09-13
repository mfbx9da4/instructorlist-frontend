import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString } from '../../constants'
import StripeForm from '../stripeform/StripeForm'
import { BASE_URL } from '../../api'
import dayjs from 'dayjs'

export default class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.setState({
      values: {
        [name]: e.target.value,
      },
    })
  }

  validateValues = () => {
    const { values } = this.state
    if (!('phone_number' in values)) {
      return { phone_number: 'Phone is not valid' }
    }
    const phone = values['phone_number']
    const split = phone.split('+')
    if (split.length > 1) {
      return { phone_number: 'Phone number must have only one "+"' }
    }
    const rest = split[0]
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
    console.log('onsubmit')
    this.setState({ isSubmitting: true })
    this.setState({ errors: {}, error: false })

    const errors = this.validateValues()
    const error = errors.phone
    if (errors.phone)
      return this.setState({ isSubmitting: false, errors, error })

    if (!this.state.paymentMethod) {
      let res = await this.stripeSubmit(e)
      console.log('res2', res)
      if (res.error) {
        return this.setState({ isSubmitting: false, error: res.error.message })
      }
      this.setState({ paymentMethod: res.paymentMethod })
    }
    let data = {
      payment_method_id: this.state.paymentMethod.id,
      date: this.state.date.format('YYYY-MM-DD'),
      start_time: this.props.item.start_time,
      end_time: this.props.item.end_time,
      class_attended: this.props.item.id,
      venue: this.props.item.venue.id,
      email: `${this.state.values.phone_number}@example.com`,
      ...this.state.values,
    }
    console.log('data', data)
    let res = await this.postBooking(data)
    console.log('res', res)
    if (res.error) {
      return this.setState({
        isSubmitting: false,
        error: res.error.message || 'Issue making booking',
      })
    }
    alert(res.code)
    return this.setState({ isSubmitting: false, success: true, code: res.code })
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

  render({ item, show }, { errors, values }) {
    if (!item) return <div>Class not found</div>
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
                className={`leftArrow ${style.back}`}
                onClick={this.props.onClose}
              ></div>
              <div className={style.title}>Checkout</div>
              <div></div>
            </div>

            <div className={'hr'} />

            <div className={style.section}>
              <div className={style.classTitle}>{item.title}</div>
              <div className={style.time}>
                {dayToDayString[item.day]} {item.start_time} - {item.end_time}
              </div>
              <div className={style.location}>
                {item.venue.name} - {item.venue.area}
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
              {item.extra_fee && (
                <div key="extra_fee" className={style.extra}>
                  Please note this studio will charge you an additional
                  <div className={style.strong}>
                    £{item.extra_fee} studio entry fee
                  </div>
                  upon arrival.
                </div>
              )}
            </div>

            <div className={'hr'} />

            <div className={style.section}>
              <div className={style.titleContainer}>
                <div className={style.title}>Payment</div>
              </div>
              <div className={`errorContainer ${this.state.error || 'hide'}`}>
                <div className={`errorContainer_message`}>
                  {this.state.error}
                </div>
              </div>

              <div className={style.paymentForm}>
                <div column className={style.inputContainer}>
                  {/* <div
                  // style={{}}
                  // className={classNames({
                  //   [style.hide]: !errors['phone'],
                  // })}
                  >
                    {errors['phone'] || ''}
                  </div> */}
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
            <div>Pay now</div>
          </FooterButton>
        </form>
      </div>
    )
  }
}
