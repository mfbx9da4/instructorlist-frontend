import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString } from '../../constants'

function loadStripe() {}

export default class Payment extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      formIsValid: false,
    }
  }

  async componentDidUpdate() {
    if (this.props.show) {
      loadStripe()
    }
  }

  onChange = () => () => {}
  onPay = () => {}

  render({ item, show }, {}) {
    if (!item) return <div>Class not found</div>
    return (
      <div>
        <div
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
              <div className={style.paymentForm}>
                <div className={style.inputContainer}>
                  <input
                    type="text"
                    className={style.input}
                    placeholder={'Phone number'}
                    onChange={this.onChange('phone')}
                  />
                </div>
              </div>
            </div>
          </div>
          <FooterButton
            hide={!show}
            disabled={!this.state.formIsValid}
            onClick={this.onPay}
          >
            <div>Pay now</div>
          </FooterButton>
        </div>
      </div>
    )
  }
}
