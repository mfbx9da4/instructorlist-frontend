import path from 'path'
import { h } from 'preact'
import { render } from 'preact-render-to-string'

var moduleAlias = require('module-alias')

moduleAlias.addAliases({
  react: 'preact/compat',
  'react-dom': 'preact/compat',
  'create-react-class': path.resolve(__dirname, './create-preact-class'),
})

// import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

// @ts-ignore
import App from '../frontend-build-copy/ssr-build/ssr-bundle'

export function getCriticalCssStyledComponents() {
  const sheet = new ServerStyleSheet()
  try {
    const inner = h(App, { url: '/', ssrData: {} })
    const html = render(sheet.collectStyles(inner))
    const styleTags = sheet.getStyleTags()
    return styleTags
  } catch (error) {
    // handle error
    console.error(error)
  } finally {
    sheet.seal()
  }
  return ''
}
