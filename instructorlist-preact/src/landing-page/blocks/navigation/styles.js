import styled from 'styled-components'

import { Link } from 'preact-router/match'

export const SectionHeader = styled.h1`
  display: none;
`

export const StickyDiv = styled.div`
  position: fixed;
  z-index: 99;
  background-color: white;
  width: 100%;
`

export const StyledLink = styled(Link)`
  color: ${props => props.theme.accent};

  font-size: 35px;
  letter-spacing: 0.7px;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  @media ${props => props.theme.media.sm} {
    font-size: 22px;
  }
  @media ${props => props.theme.media.md} {
    font-size: 30px;
  }
`

export const StyledButton = styled.button`
  color: ${props => (props.primary ? `#1848FF` : `white`)};
  background-color: ${props => (props.primary ? `white` : `#1848FF`)};
  border: 1px solid ${props => (props.primary ? `#1848FF` : `white`)};
  margin-right: ${props => (props.primary ? `10px` : `15px`)};
  border-radius: 8rem;
  padding: 9.6rem 2.08rem;

  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  outline: none;
  display: ${props => (props.primary ? `none` : `flex`)};
  transition: transform 0.3s ease-in-out;

  @media ${props => props.theme.media.sm} {
    display: flex;
    flex-flow: row;
    padding: 9.6rem 3.68rem;
  }
  :hover {
    transform: scale(1.06);
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: ${props => (props.primary ? `#1848FF` : `white`)};
  }
`
