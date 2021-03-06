import { h, Component } from 'preact'
import classNames from '../../utils/classNames'

export default class Loading extends Component {
  render({ text }, {}) {
    return (
      <div column flex jc="center" ai="center">
        <img
          width="85"
          height="119"
          src="/assets/images/dancing.gif"
          alt="loading"
        />
        <div>{text || 'Loading'}</div>
      </div>
    )
  }
}
