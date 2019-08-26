import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import isSSR from '../../utils/is-ssr'
import Menu from '../menu/Menu'

class Header extends Component {
  toggleMenu = () => this.setState({ isOpen: !this.state.isOpen })

  render = ({}, { isOpen }) => {
    return (
      <header className={`${style.header} `}>
        <h1>
          <Link activeClassName={style.active} href="/">
            instructorlist {isSSR() && '⚡'}
          </Link>
        </h1>
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
