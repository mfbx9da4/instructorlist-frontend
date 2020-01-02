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

class MainTemplate extends Component {
  componentDidMount() {
    document.body.style.fontSize = '10px'
    document.documentElement.style.fontSize = '10px'
  }
  render() {
    const props = this.props
    return (
      <div className="main-app">
        <Header />

        <props.Page data={props.data} {...props} />

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
  }
}

const withMainTemplate = Page => props => (
  <MainTemplate Page={Page} {...props}></MainTemplate>
)

class LandingPageTemplate extends Component {
  componentDidMount() {
    document.body.style.fontSize = 'unset'
    document.documentElement.style.fontSize = 'unset'
  }
  render() {
    return (
      <div className="landing-page">
        <this.props.Page {...this.props} />
      </div>
    )
  }
}

const withLandingPageTemplate = Page => props => (
  <LandingPageTemplate Page={Page} {...props} />
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
    path: '/:slug',
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
        <div
          style="justify-content: center; align-items: center; flex: 1; height: 100vh;"
          default
        >
          404 Not Found
        </div>
      </Router>
    )
  }
}

App.pages = pages
