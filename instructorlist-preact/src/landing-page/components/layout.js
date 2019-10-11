import React from 'react'
import PropTypes from 'prop-types'

import './layout.css'

import { withTheme } from 'styled-components'
import theme from '../theme'
import { ThemeProvider } from 'styled-components'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>{children}</div>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

// export default withTheme(Layout)
export default Layout
