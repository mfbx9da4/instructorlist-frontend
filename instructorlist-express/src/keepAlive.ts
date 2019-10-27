import moment from 'moment'
const oneMinute = 1000 * 60
const isOutsidePeakHours = () =>
  moment()
    .tz('Europe/London')
    .hour() < 12 ||
  moment()
    .tz('Europe/London')
    .hour() > 21

export function keepAlive() {
  return setInterval(() => {
    if (isOutsidePeakHours()) return
    fetch('https://instructorlist-django.herokuapp.com/api/')
    fetch(`https://instructorlist-frontend.herokuapp.com/`)
    fetch(`https://brightpath.herokuapp.com/`)
  }, oneMinute * 4)
}