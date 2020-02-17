import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { withLandingPageTemplate } from './withLandingPageTemplate'
import { withMainTemplate } from './withMainTemplate'

// Code-splitting is automated for routes
import Search from '../routes/search'
import ClassPage from '../routes/class.page'
import Profile from '../routes/profile'
import Terms from '../routes/terms'
import Privacy from '../routes/privacy'
import DataService from '../DataService'
import LandingPage from '../landing-page/pages/index'
import Home from './TestHome'

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
    component: withMainTemplate(Terms),
    path: '/terms',
  },
  {
    component: withMainTemplate(Privacy),
    path: '/privacy',
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
