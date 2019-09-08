import isSSR from './utils/is-ssr'
import isDev from './utils/is-dev'

export const dayToDayString = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun',
}

export const STRIPE_KEY = isDev()
  ? 'pk_test_i0mT0MQhBYOTm3kcHw73xILH'
  : 'pk_test_i0mT0MQhBYOTm3kcHw73xILH'
