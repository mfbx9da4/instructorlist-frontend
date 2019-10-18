import { h, Component } from 'preact'
import styled, { ThemeProvider, withTheme } from 'styled-components'

import { space } from 'styled-system'

const StyledDiv = styled.div`
  background: red;
  color: white;
  font-weight: 700;
  font-size: 16px;
  ${props => props.theme.media.sm} {
    font-size: 22px;
  }
`
const Box = styled(`div`)(
  {
    boxSizing: `border-box`,
  },
  space,

  props => props.css,
)

const breakpoints = [576, 768, 992, 1200]
// aliases

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const theme = {
  //   // font: 'Mark Simonson - Proxima Nova Regular', 'Helvetica Neue', arial,
  accent: `#1848FF`,
  grey: `#F9F9F9`,
  grey2: `#C0C0C0`,
  inputBlue: `#7473FF`,
  space: [0, 6, 12, 18, 24],
  breakpoints: breakpoints,
  media: {
    sm: `@media only screen and (min-width: ${breakpoints['sm']}px)`,
    md: `@media only screen and (min-width: ${breakpoints['md']}px)`,
    lg: `@media only screen and (min-width: ${breakpoints['lg']}px)`,
    xl: `@media only screen and (min-width: ${breakpoints['xl']}px)`,
  },
  paddingsm: `2rem 0`,
  paddingmd: `4rem 0`,
  paddinglg: `8rem 0`,
}

const est = {
  sm: '50px',
  md: '200px',
  lg: 1 / 2,
}

class Home extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ padding: '300px' }}>
          <div>somethrin Hey there</div>
          <Box mt={2}>
            <StyledDiv>somethrin Hey there</StyledDiv>
          </Box>
          <Box>
            <Box width={est}>
              <div
                style={{ background: 'blue', width: '100%', height: '200px' }}
              />
            </Box>
            <Box width={est}>
              <div
                style={{ background: 'red', width: '100%', height: '200px' }}
              />
            </Box>
          </Box>
        </div>
      </ThemeProvider>
    )
  }
}

export default withTheme(Home)
