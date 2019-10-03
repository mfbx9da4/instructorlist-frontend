import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Header from './header'

// Code-splitting is automated for routes
import Home from '../routes/home'
import Search from '../routes/search'
import ClassPage from '../routes/class.page'
import Profile from '../routes/profile'
import isSSR from '../utils/is-ssr'
import DataService from '../DataService'
import Redirect from './redirect/Redirect'

const pages = [
  {
    component: Redirect,
    path: '/',
    to: '/search',
  },
  {
    component: Search,
    path: '/search',
  },
  {
    component: Search,
    path: '/search/:date/map/',
  },
  {
    component: Search,
    path: '/search/:date/filters/',
  },
  {
    component: Search,
    path: '/search/:date/',
  },
  {
    component: ClassPage,
    path: '/classes/:id',
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
  constructor(props) {
    super(props)
    this.state = {
      data: new DataService(props.ssrData),
    }
  }

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
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
            return (
              <Component data={this.state.data} {...rest} {...this.props} />
            )
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
            <details style={{ padding: '2rem' }}>
              <summary>ssrData</summary>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(this.props.ssrData, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    )
  }
}

App.pages = pages
