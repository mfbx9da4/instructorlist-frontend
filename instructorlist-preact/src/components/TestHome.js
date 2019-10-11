import { h, Component } from 'preact'
import styled, { ThemeProvider, withTheme } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { space } from 'styled-system'

const StyledDiv = styled.div`
  background: red;
  color: white;
  font-weight: 700;
  font-size: 16px;
  ${breakpoint(`sm`)`
      font-size: 22px;
  `};
`
const Box = styled(`div`)(
  {
    boxSizing: `border-box`,
  },
  space,
  props => props.css,
)

const theme = {
  space: [0, 6, '12rem', 18, 24],
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  paddingsm: `2rem 0`,
  paddingmd: `4rem 0`,
  paddinglg: `8rem 0`,
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
        </div>
      </ThemeProvider>
    )
  }
}

// export default withTheme(Home)
export default () => null
