const breakpoints = [0, 576, 768, 992, 1200]
// aliases
breakpoints.xs = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]
breakpoints.xl = breakpoints[4]

const theme = {
  //   // font: 'Mark Simonson - Proxima Nova Regular', 'Helvetica Neue', arial,
  accent: `#1848FF`,
  grey: `#F9F9F9`,
  grey2: `#C0C0C0`,
  inputBlue: `#7473FF`,
  space: [0, 6, 12, 18, 24],
  breakpoints,
  paddingsm: `2rem 0`,
  paddingmd: `4rem 0`,
  paddinglg: `8rem 0`,
}

export default theme
