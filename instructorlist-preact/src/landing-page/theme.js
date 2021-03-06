const breakpoints = [576, 768, 992, 1200]
// aliases

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const theme = {
  //   // font: 'proximanova', 'Helvetica Neue', arial,
  accent: `#1848FF`,
  grey: `#F9F9F9`,
  grey2: `#C0C0C0`,
  inputBlue: `#7473FF`,
  space: [0, 6, 12, 18, 24],
  breakpoints: breakpoints,
  media: {
    sm: `only screen and (min-width: ${breakpoints['sm']}px)`,
    md: `only screen and (min-width: ${breakpoints['md']}px)`,
    lg: `only screen and (min-width: ${breakpoints['lg']}px)`,
    xl: `only screen and (min-width: ${breakpoints['xl']}px)`,
  },
  paddingsm: `2rem 0`,
  paddingmd: `4rem 0`,
  paddinglg: `8rem 0`,
}

export default theme
