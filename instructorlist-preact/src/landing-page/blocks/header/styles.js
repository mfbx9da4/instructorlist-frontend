import styled from 'styled-components'

import HeaderImage from '../../components/imageComponents/headerImage'

export const StyledAlert = styled.p`
  color: ${props => props.theme.accent};
  letter-spacing: 1.6px;

  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  width: 95%;
  @media ${props => props.theme.media.sm} {
    flex-direction: column;
    width: 100%;
  }
  @media ${props => props.theme.media.md} {
    flex-direction: column;
  }
  @media ${props => props.theme.media.lg} {
    flex-direction: row;
    justify-content: unset;
  }
`

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => (props.primary ? `white` : `#1848FF`)};
  border: 1px solid ${props => (props.primary ? `#1848FF` : `white`)};
  margin-right: ${props => (props.primary ? `10px` : `0`)};
  border-radius: 5rem;
  padding: 0.6rem 1.3rem;

  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  width: 100%;

  @media ${props => props.theme.media.sm} {
    display: none;
  }
  transition: transform 0.3s ease-in-out;
  :hover {
    transform: scale(1.06);
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: ${props => (props.primary ? `#1848FF` : `white`)};
  }
`

export const StyledButton = styled.button`
  color: ${props => (props.primary ? `#1848FF` : `white`)};
  background-color: ${props => (props.primary ? `white` : `#1848FF`)};
  border: 1px solid ${props => (props.primary ? `#1848FF` : `white`)};
  margin-right: ${props => (props.primary ? `10px` : `0`)};
  border-radius: 5rem;
  padding: 0.6rem 1.3rem;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  outline: none;
  width: 100%;
  margin-top: 10px;

  @media ${props => props.theme.media.sm} {
    padding: 0.6rem 2.3rem;
    width: 11rem;
    width: 15rem;
    margin-top: 0;
  }

  transition: transform 0.3s ease-in-out;
  :hover {
    transform: scale(1.06);
    cursor: pointer;
  }
`

export const StyledInput = styled.input`
  border-radius: 5rem;
  text-align: center;
  border: 1px solid #cfcdcd;
  padding: 0.5rem 1rem;

  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.8px;
  outline: none;
  margin-right: 0.5rem;

  width: 100%;
  margin-top: 10px;

  @media ${props => props.theme.media.sm} {
    padding: 0.5rem 3rem;
    width: 16rem;
    margin-top: 0;
    text-align: left;
  }
`

export const StyledImage = styled(HeaderImage)``
