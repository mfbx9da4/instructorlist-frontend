import styled from 'styled-components'
import {
  space,
  color,
  width,
  fontSize,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  flex,
  order,
  alignSelf,
  display,
} from 'styled-system'

const Box = styled(`div`)(
  {
    boxSizing: `border-box`,
  },
  space,
  color,
  width,
  fontSize,
  flex,
  order,
  alignSelf,
  display,
  props => props.css,
)

Box.displayName = `Box`

Box.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
}

const Flex = styled(Box)(
  {
    display: `flex`,
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  space,
)

Flex.displayName = `Flex`

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...space.propTypes,
  ...justifyContent.propTypes,
}

export const Container = styled(Box).attrs(() => ({
  boxSizing: `border-box`,
  width: {
    xs: `100%`,
    sm: `100%`,
    md: `750px`,
    lg: `960px`,
    xl: `1200px`,
  },
  space,
}))``

Container.defaultProps = {
  mx: `auto`,
}

export const Panel = styled(Box)`
  background: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  margin-bottom: 2rem;
  padding: 2rem;
`

export const Hr = styled.hr`
  border: 0;
  border-top: 1px solid #e6e8eb;
  border-color: #edefed;
  margin: 2rem 0;
`

// Layout engine
export const Row = styled(Flex).attrs(() => ({
  mx: -15,
  flexWrap: `wrap`,
  space,
}))``

export const Col = styled(Box).attrs(() => ({
  px: 15,
  display,
}))``
