import { h, Component } from 'preact'
import classNames from '../../utils/classNames'

export default class Loading extends Component {
  render({}, {}) {
    return (
      <div column flex jc="center" ai="center">
        <img
          width="85"
          height="119"
          src="/assets/images/dancing.gif"
          alt="loading"
        />
        <div>Loading</div>
      </div>
    )
  }
}
