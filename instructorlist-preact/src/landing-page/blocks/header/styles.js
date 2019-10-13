import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import HeaderImage from '../../components/imageComponents/headerImage'

export const StyledAlert = styled.p`
  color: ${props => props.theme.accent};
  letter-spacing: 1.6px;

  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  /* ${breakpoint(`sm`)`
      display: none;
  `}; */
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  width: 95%;
  ${breakpoint(`sm`)`
      flex-direction: column;
      width: 100%;
  `};
  ${breakpoint(`md`)`
      flex-direction: column;
  `};
  ${breakpoint(`lg`)`
      flex-direction: row;
      margin-left: -30px;
  `};
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
  ${breakpoint(`xs`)`
      width: 100%;
  `};
  ${breakpoint(`sm`)`
      display: none;
  `};
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
  ${breakpoint(`sm`)`
      padding: 0.6rem 2.3rem;
      width: 11rem;
      margin-top: 0;
  `};
  ${breakpoint(`xs`)`
      width: 100%;
      margin-top: 10px;
  `};
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
  ${breakpoint(`xs`)`
      width: 100%;
      margin-top: 10px;
  `};
  ${breakpoint(`sm`)`
      padding: 0.5rem 3rem;
      width: 16rem;
      margin-top: 0;
      text-align: left;

  `};
`

export const StyledImage = styled(HeaderImage)``
