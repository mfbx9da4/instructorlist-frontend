import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Header from './header'

// Code-splitting is automated for routes
import Home from '../routes/home'
import Search from '../routes/search'
import Profile from '../routes/profile'

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   * /search
   * /search/map
   * /search/filters
   */
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render() {
    const { url } = this.props
    return (
      <div
        id="app"
        className={`${url && url.indexOf('filters') > -1 ? 'blur' : ''}`}
      >
        {url}
        <Header />
        <Router url={this.props.url} onChange={this.handleRoute}>
          <Home path="/" />
          <Search path="/search/" />
          <Search path="/search/map" />
          <Search path="/search/filters" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />

          <div
            style="justify-content: center; align-items: center; flex: 1; height: 100vh;"
            default
          >
            404 Not Found
          </div>
        </Router>
      </div>
    )
  }
}
