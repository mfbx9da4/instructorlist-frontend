import styled from 'styled-components'

import HeaderImage from '../../components/imageComponents/headerImage'

export const StyledAlert = styled.p`
  color: ${props => props.theme.accent};
  letter-spacing: 1.6px;

  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  /* @media ${props => props.theme.media.sm}{
      display: none;
  } */
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
    margin-left: -30px;
  }
`

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => (props.primary ? `white` : `#1848FF`)};
  border: 1px solid ${props => (props.primary ? `#1848FF` : `white`)};
  margin-right: ${props => (props.primary ? `10px` : `0`)};
  border-radius: 8rem;
  padding: 9.6rem 2.08rem;

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
  border-radius: 8rem;
  padding: 9.6rem 2.08rem;

  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  outline: none;
  width: 100%;
  margin-top: 10px;

  @media ${props => props.theme.media.sm} {
    padding: 9.6rem 3.68rem;
    width: 11.6rem;
    margin-top: 0;
  }

  transition: transform 0.3s ease-in-out;
  :hover {
    transform: scale(1.06);
    cursor: pointer;
  }
`

export const StyledInput = styled.input`
  border-radius: 8rem;
  text-align: center;
  border: 1px solid #cfcdcd;
  padding: 8rem 1.6rem;

  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.8px;
  outline: none;
  margin-right: 8rem;

  width: 100%;
  margin-top: 10px;

  @media ${props => props.theme.media.sm} {
    padding: 8rem4.8rem;
    width: 25.6rem;
    margin-top: 0;
    text-align: left;
  }
`

export const StyledImage = styled(HeaderImage)``
