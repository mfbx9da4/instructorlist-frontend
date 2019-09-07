import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString } from '../../constants'
import scriptjs from 'scriptjs'
import StripeForm from '../stripeform/StripeForm'

async function loadStripe() {
  await new Promise(resolve => scriptjs('https://js.stripe.com/v3/', resolve))
}

export default class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formIsValid: false,
      stripeToken: null,
    }
  }

  onChange = () => () => {}
  onSubmit = async e => {
    e.preventDefault()
    e.stopPropagation()
    console.log('onsubmit')
    if (!this.state.stripeToken) {
      let res = await this.stripeSubmit(e)
      console.log('res2', res)
      if (res.error) {
        this.setState({ error: res.error.message })
      }
      // TODO: set valid stripe token
    }
  }

  render({ item, show }, {}) {
    if (!item) return <div>Class not found</div>
    return (
      <div>
        <form
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
                <div className={style.extra}>
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
              {this.state.error && (
                <div className="errorContainer">
                  <div className="errorContainer_message">
                    {this.state.error}
                  </div>
                </div>
              )}

              <div className={style.paymentForm}>
                <div className={style.inputContainer}>
                  <input
                    type="text"
                    className={style.input}
                    placeholder={'Phone number'}
                    onChange={this.onChange('phone')}
                  />
                </div>

                {show && (
                  <StripeForm
                    amount={item.price}
                    onSubmit={onStripeSubmit => {
                      this.stripeSubmit = onStripeSubmit
                    }}
                  ></StripeForm>
                )}
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
