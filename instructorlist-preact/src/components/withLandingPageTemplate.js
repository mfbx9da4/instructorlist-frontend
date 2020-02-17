import { h, Component } from 'preact'

class LandingPageTemplate extends Component {
  componentDidMount() {
    document.body.style.fontSize = 'unset'
    document.documentElement.style.fontSize = 'unset'
    this.props.data.getSearch()
  }
  render() {
    return (
      <div className="landing-page">
        <this.props.Page {...this.props} />
      </div>
    )
  }
}

export const withLandingPageTemplate = Page => props => (
  <LandingPageTemplate Page={Page} {...props} />
)
