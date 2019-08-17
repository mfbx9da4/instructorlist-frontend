import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

const Header = () => {
  const isSSR = typeof window === 'undefined'

  return (
    <header class={style.header}>
      <h1>
        <Link activeClassName={style.active} href="/">
          instructorlist {isSSR && '⚡'}
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
