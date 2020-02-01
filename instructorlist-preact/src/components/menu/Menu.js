import { h, Component } from 'preact'
import { route, Link } from 'preact-router'
import style from './style'

export default class Menu extends Component {
  render({ active, onClose }, {}) {
    return (
      <div className={`${style.menuWrapper} ${active ? '' : style.close}`}>
        <div className={style.menu}>
          <div className={style.header}>
            <div className={style.button} onClick={onClose}>
              Close
            </div>
          </div>
          <div className={style.section}>
            <div className={style.sectionHeader}>
              <Link className={style.sectionTitle} onClick={onClose} href="/">
                HOME
              </Link>
            </div>
            <div className={style.sectionHeader}>
              <Link
                className={style.sectionTitle}
                onClick={onClose}
                href="/search"
              >
                CLASSES
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
