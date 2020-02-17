import { h, Component } from 'preact'
import Header from './header/header'
import isSSR from '../utils/is-ssr'

class MainTemplate extends Component {
  componentDidMount() {
    document.body.style.fontSize = '10px'
    document.documentElement.style.fontSize = '10px'
  }
  render() {
    const props = this.props
    const stringified = JSON.stringify(props.ssrData)
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
            <script
              dangerouslySetInnerHTML={{
                __html: `window.ssrData = JSON.parse('${stringified}')`,
              }}
            ></script>
          </div>
        )}
      </div>
    )
  }
}

export const withMainTemplate = Page => {
  const Wrapped = props => <MainTemplate Page={Page} {...props}></MainTemplate>
  Wrapped.getInitialProps = Page.getInitialProps
  return Wrapped
}
