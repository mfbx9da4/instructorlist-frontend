import { h, Component } from 'preact'
import style from './style'
import classNames from '../../utils/classNames'

export default class Loading extends Component {
  render({}, {}) {
    return (
      <div class={style.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}
