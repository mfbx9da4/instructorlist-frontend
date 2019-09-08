import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import FooterButton from '../footerbutton/FooterButton'
import { dayToDayString, STRIPE_KEY } from '../../constants'
import loadjs from 'loadjs'
import { BASE_URL } from '../../api'

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
    console.log('construct')
    this.state = {
      loadingStripe: true,
      responses: [],
    }
    this.props.onSubmit(this.onSubmit)
  }

  componentDidUpdate() {
    console.log('did update')
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
    console.log('card', card)
    this.setState({ card, prButton, paymentRequest })
  }

  async componentWillUnmount() {
    console.log('willunmoutn')
    if (this.state.card) {
      this.state.card.destroy()
    }
  }

  async componentDidMount() {
    console.log('mount')
    await this.registerStripeElements()
  }

  onSubmit = async e => {
    console.log('onstripesubmit')
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

    console.log('actiionres', res)

    if (res.error) {
      // Show error from Stripe.js in payment form
      console.log('errorAction', res.error)
      return res
    }
    const body = {
      payment_intent_id: res.paymentIntent.id,
      amount: this.getAmount(),
    }
    const confirmationRes = await this.confirm('intent', body)
    console.log('confirmationRes', confirmationRes)
    return res
  }

  confirm = async (type, body) => {
    console.log('body', body)
    const response = await fetch(`${BASE_URL}/api/payment-${type}/confirm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    let confirmed = await response.json()
    console.log('confirmed', confirmed)
    return confirmed
  }

  getAmount = () => parseFloat(this.props.amount) * 100

  onError = err => {
    this.props.onError(err)
  }

  getClientSecret = async () => {
    let res = await fetch(`${BASE_URL}/api/intent/${this.getAmount()}/`)
    console.log('res', res)
    if (res.ok) {
      return res.json()
    }
    console.log('err', res)
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
        console.log(
          'The payment failed -- ask your customer for a new payment method.',
        )
      } else {
        // The payment has succeeded.
        console.log('The payment has succeeded.')
      }
    }
  }

  render({}, { res, loadingStripe }) {
    console.log('rednder, loadingStripe', loadingStripe)
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
