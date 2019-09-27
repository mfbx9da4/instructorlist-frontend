import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString, STRIPE_KEY } from '../../constants'
import loadjs from 'loadjs'
import { BASE_URL } from '../../DataService'

async function loadStripe() {
  await new Promise(resolve => loadjs('https://js.stripe.com/v3/', resolve))
}

class StripeElement extends Component {
  shouldComponentUpdate() {
    // Important so that Stripe elements can be found by stripe Lib
    return false
  }

  componentDidMount() {
    this.props.card.mount('#cc-form')
  }

  render() {
    return <div id="cc-form"></div>
  }
}

class StripePaymentRequestButton extends Component {
  mount = async () => {
    // Check the availability of the Payment Request API first.
    const result = await this.props.paymentRequest.canMakePayment()
    if (result) {
      this.props.prButton.mount('#payment-request-button')
    } else {
      document.getElementById('payment-request-button').style.display = 'none'
    }
    this.props.paymentRequest.on('paymentmethod', this.props.onPaymentMethod)
  }

  componentDidMount() {
    this.mount()
  }

  shouldComponentUpdate() {
    // Important so that Stripe elements can be found by stripe Lib
    return false
  }

  render() {
    return <div id="payment-request-button"></div>
  }
}

export default class StripeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingStripe: true,
      responses: [],
    }
    this.props.onSubmit(this.onSubmit)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Important so that Stripe elements can be found by stripe Lib
    return (
      nextState.loadingStripe === false && this.state.loadingStripe === true
    )
  }

  registerStripeElements = async () => {
    if (!('Stripe' in window)) {
      this.setState({ loadingStripe: true })
      await loadStripe()
    }
    this.setState({ loadingStripe: false })
    // TODO: get from env
    this.stripe = window.Stripe(STRIPE_KEY)
    this.elements = this.stripe.elements()
    const card = this.elements.create('card', { hidePostalCode: true })
    let prButton, paymentRequest
    // const paymentRequest = this.stripe.paymentRequest({
    //   country: 'GB',
    //   currency: 'gbp',
    //   total: {
    //     label: 'Class price',
    //     amount: this.getAmount(),
    //   },
    //   requestPayerName: true,
    //   requestPayerEmail: true,
    // })
    // const prButton = this.elements.create('paymentRequestButton', {
    //   paymentRequest,
    // })
    this.setState({ card, prButton, paymentRequest })
  }

  async componentWillUnmount() {
    if (this.state.card) {
      this.state.card.destroy()
    }
  }

  async componentDidMount() {
    await this.registerStripeElements()
  }

  onSubmit = async e => {
    return this.onSubmitCard(e)
  }

  onSubmitCard = async e => {
    const res = await this.stripe.createPaymentMethod('card', this.state.card)
    if (res.error) return res
    const { billingDetails } = res
    this.setState({ billingDetails })
    let response = await this.confirm('method', {
      payment_method_id: res.paymentMethod.id,
      amount: this.getAmount(),
    })

    if (response.requires_action) {
      await this.handleAction(response)
    }
    return res
  }

  handleAction = async response => {
    const res = await this.stripe.handleCardAction(
      response.payment_intent_client_secret,
    )

    if (res.error) {
      // Show error from Stripe.js in payment form
      return res
    }
    const body = {
      payment_intent_id: res.paymentIntent.id,
      amount: this.getAmount(),
    }
    const confirmationRes = await this.confirm('intent', body)
    return res
  }

  confirm = async (type, body) => {
    const response = await fetch(`${BASE_URL}/api/payment-${type}/confirm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    let confirmed = await response.json()
    return confirmed
  }

  getAmount = () => parseFloat(this.props.amount) * 100

  onError = err => {
    this.props.onError(err)
  }

  getClientSecret = async () => {
    let res = await fetch(`${BASE_URL}/api/intent/${this.getAmount()}/`)
    if (res.ok) {
      return res.json()
    }
    return res
  }

  onPaymentMethod = async ev => {
    const { client_secret } = await this.getClientSecret()
    const {
      error: confirmError,
      paymentIntent,
    } = await this.stripe.confirmPaymentIntent(client_secret, {
      payment_method: ev.paymentMethod.id,
    })

    if (confirmError) {
      // Report to the browser that the payment failed, prompting it to
      // re-show the payment interface, or show an error message and close
      // the payment interface.
      ev.complete('fail')
    } else {
      // Report to the browser that the confirmation was successful, prompting
      // it to close the browser payment method collection interface.
      ev.complete('success')
      // Let Stripe.js handle the rest of the payment flow.
      const { error } = await this.stripe.handleCardPayment(client_secret)
      if (error) {
        // The payment failed -- ask your customer for a new payment method.
      } else {
        // The payment has succeeded.
      }
    }
  }

  render({}, { res, loadingStripe }) {
    return (
      <div>
        {loadingStripe ? (
          <div>Loading stripe</div>
        ) : (
          <div key="formContainer" className={style.formContainer}>
            {/* <StripePaymentRequestButton
              paymentRequest={this.state.paymentRequest}
              prButton={this.state.prButton}
              onPaymentMethod={this.onPaymentMethod}
            /> */}
            <StripeElement key="card" card={this.state.card} />
            <pre>{JSON.stringify(res, null, 2)}</pre>
          </div>
        )}
      </div>
    )
  }
}
