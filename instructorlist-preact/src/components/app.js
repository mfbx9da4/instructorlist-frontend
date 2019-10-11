import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Header from './header'

// Code-splitting is automated for routes
import Search from '../routes/search'
import ClassPage from '../routes/class.page'
import Profile from '../routes/profile'
import isSSR from '../utils/is-ssr'
import DataService from '../DataService'
import Redirect from './redirect/Redirect'
import LandingPage from '../landing-page/pages/index'
import Home from './TestHome'

const withMainTemplate = Page => props => (
  <div className="main-app">
    <Header />

    <Page data={props.data} {...props} />

    <div
      style="justify-content: center; align-items: center; flex: 1; height: 100vh;"
      default
    >
      404 Not Found
    </div>
    {isSSR() && (
      <div>
        <details style={{ padding: '2rem' }}>
          <summary>ssrData</summary>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(props.ssrData, null, 2)}
          </pre>
        </details>
      </div>
    )}
  </div>
)

const withLandingPageTemplate = Page => props => (
  <div className="landing-page">
    <Page {...props} />
  </div>
)

const pages = [
  {
    component: withLandingPageTemplate(LandingPage),
    path: '/',
  },
  {
    component: withMainTemplate(Home),
    path: '/blah',
  },
  {
    component: withMainTemplate(Search),
    path: '/search',
  },
  {
    component: withMainTemplate(Search),
    path: '/search/:date/map/',
  },
  {
    component: withMainTemplate(Search),
    path: '/search/:date/filters/',
  },
  {
    component: withMainTemplate(Search),
    path: '/search/:date/',
  },
  {
    component: withMainTemplate(ClassPage),
    path: '/classes/:id',
  },
  {
    component: withMainTemplate(Profile),
    path: '/profile/',
    user: 'me',
  },
  {
    component: withMainTemplate(Profile),
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
      <Router url={url} onChange={this.handleRoute}>
        {pages.map(x => {
          const { component: Component, ...rest } = x
          return (
            <Component
              data={this.state.data}
              ssrData={this.props.ssrData}
              {...rest}
              {...this.props}
            />
          )
        })}
      </Router>
    )
  }
}

App.pages = pages
