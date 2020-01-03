import moment from 'moment-timezone'
import fetch from 'isomorphic-fetch'
const oneMinute = 1000 * 60
const isOffPeak = (date = moment()) =>
  date.tz('Europe/London').hour() < 12 || date.tz('Europe/London').hour() > 21

export function keepAlive() {
  return setInterval(() => {
    if (isOffPeak()) return
    console.log('KEEP_ALIVE')
    for (let i = 0; i < 10; i++) {
      fetch('https://instructorlist-django.herokuapp.com/api/')
      fetch(`https://instructorlist-frontend.herokuapp.com/`)
      fetch(`https://brightpath.herokuapp.com/`)
    }
  }, oneMinute * 2)
}
