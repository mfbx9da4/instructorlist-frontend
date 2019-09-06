import { h, Component } from 'preact'
import style from './style'
import classNames from '../../utils/classNames'

export default class FooterButton extends Component {
  onClick = e => {
    if (this.props.disabled) {
      return e.preventDefault()
    }
    this.props.onClick(e)
  }

  render({ children, disabled, hide }, {}) {
    return (
      <div
        className={classNames({
          [style.footer]: true,
          [style.disabled]: disabled,
          [style.hide]: hide,
        })}
      >
        <button className={style.button} onClick={this.onClick} type="submit">
          {children}
        </button>
      </div>
    )
  }
}
