import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import isSSR from '../../utils/is-ssr'
// const isSSR = () => true
console.log('header')

const Header = () => {
  return (
    <header className={`${style.header} `}>
      <h1>
        <Link activeClassName={style.active} href="/">
          instructorlist {isSSR() && '⚡'}
        </Link>
      </h1>
      <nav>
        <Link
          className={style.menuIcon}
          activeClassName={style.active}
          href="/menu"
        />
      </nav>
    </header>
  )
}

export default Header
