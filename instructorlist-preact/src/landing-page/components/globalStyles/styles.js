import styled from 'styled-components'

export const SectionHeader = styled.h1`
  font-size: 30px;
  line-height: 1.3;
  font-weight: 900;
  color: ${props => (props.secundary ? `white` : `black`)};
  ${props => props.theme.media.lg} {
    font-size: 45px;
  }
`

export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LogoSpan = styled.span`
  display: none;
  ${props => props.theme.media.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const PaddingContainer = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const StyledText = styled.p`
  font-weight: ${props => (props.secundary ? `600` : `300`)};
  text-transform: ${props => (props.uppercase ? `uppercase` : ``)};
  letter-spacing: ${props => (props.spacing ? `1.49px` : `0.8px`)};
  font-size: ${props => (props.margin ? `14px` : `16px`)};
  line-height: 1.5;
  color: ${props => (props.secundary ? `white` : `black`)};
  margin-right: ${props => (props.margin ? `10px` : `0`)};
`

export const SectionMargin = styled.div`
  padding-bottom: 2rem;
  margin-top: 5rem;
  padding-top: ${props => (props.footer ? `6rem` : `0`)};
  ${props => props.theme.media.md} {
    margin-top: ${props => (props.margin ? `10rem` : `5rem`)};
    padding-bottom: ${props => (props.footer ? `2rem` : `5rem`)};
  }
`

export const SectionMarginTop = styled.div`
  padding-bottom: 4rem;
  padding-top: 8rem;
`

export const StyledSpan = styled.span`
  color: ${props => props.theme.accent};
`
