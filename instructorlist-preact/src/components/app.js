import { h, Component } from 'preact'
import { Router, subscribers } from 'preact-router'

import Header from './header'

// Code-splitting is automated for routes
import Home from '../routes/home'
import Search from '../routes/search'
import Profile from '../routes/profile'
import isSSR from '../utils/is-ssr'

const listen = (...args) => console.log('listen', ...args)
subscribers.push(listen)

const pages = [
  {
    component: Home,
    path: '/',
  },
  {
    component: Search,
    path: '/search/',
  },
  {
    component: Search,
    path: '/search/map/',
  },
  {
    component: Search,
    path: '/search/filters',
  },
  {
    component: Profile,
    path: '/profile/',
    user: 'me',
  },
  {
    component: Profile,
    path: '/profile/:user',
  },
]

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

  render({ url }) {
    return (
      <div id="app">
        <Header />
        <Router url={url} onChange={this.handleRoute}>
          {pages.map(x => {
            const { component: Component, ...rest } = x
            return <Component {...rest} {...this.props} />
          })}
          <div
            style="justify-content: center; align-items: center; flex: 1; height: 100vh;"
            default
          >
            404 Not Found
          </div>
        </Router>
        {isSSR() && (
          <div>
            <pre>JSON.stringify(this.props.ssrData)</pre>
            <pre>{JSON.stringify(this.props.ssrData)}</pre>
          </div>
        )}
      </div>
    )
  }
}

App.pages = pages
App.Router = Router
