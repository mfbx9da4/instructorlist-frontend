import React from 'react'
import PropTypes from 'prop-types'

import './layout.css'

import { withTheme } from 'styled-components'
import theme from '../theme'
import { ThemeProvider } from 'styled-components'

const Layout = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <div>{children}</div>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
}

Layout.defaultProps = {
  theme: theme,
}

export default withTheme(Layout)
