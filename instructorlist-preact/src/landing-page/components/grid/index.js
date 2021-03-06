import styled, { css } from 'styled-components'
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
  maxWidth,
} from 'styled-system'

export const Box = styled('div')(
  {
    boxSizing: 'border-box',
  },
  space,
  color,
  width,
  fontSize,
  flex,
  order,
  alignSelf,
  display,
  maxWidth,
  props => props.css,
)

Box.displayName = 'Box'

Box.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
}

export const Flex = styled(Box)(
  {
    display: 'flex',
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  space,
)

Flex.displayName = 'Flex'

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...space.propTypes,
  ...justifyContent.propTypes,
}

export const Container = styled(Box).attrs(props => ({
  boxSizing: 'border-box',
  md: props.theme.media.md,
  lg: props.theme.media.lg,
  xl: props.theme.media.xl,
  width: {
    xs: `100%`,
    sm: `100%`,
    md: `750px`,
    lg: `960px`,
    xl: `1200px`,
  },
}))`
  max-width: 100%;
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  @media ${props => props.md} {
    max-width: 720px;
  }
  @media ${props => props.lg} {
    max-width: 960px;
  }
  @media ${props => props.xl} {
    max-width: 1190px;
  }
`

// Layout engine
export const Row = styled(Flex).attrs({
  mx: -15,
  flexWrap: 'wrap',
})``

export const Col = styled(Box).attrs({
  px: 15,
})``
