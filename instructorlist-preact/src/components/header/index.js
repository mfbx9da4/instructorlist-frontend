import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import isSSR from '../../utils/is-ssr'
import Menu from '../menu/Menu'
import { config } from '../../config'

class Header extends Component {
  toggleMenu = () => this.setState({ isOpen: !this.state.isOpen })

  render = ({}, { isOpen }) => {
    return (
      <header className={`${style.header} `}>
        <h1>
          <Link activeClassName={style.active} href="/search">
            instructorlist {isSSR() && '⚡'}
          </Link>
        </h1>
        <small
          id="fe-version"
          style={{
            position: 'fixed',
            right: 0,
            bottom: 0,
            color: 'rgba(0,0,0,0.2)',
          }}
        >
          {config.Version}
        </small>
        <nav>
          <Link
            onClick={this.toggleMenu}
            className={style.menuIcon}
            activeClassName={style.active}
          />
        </nav>
        <Menu onClose={this.toggleMenu} active={isOpen}></Menu>
      </header>
    )
  }
}
export default Header
