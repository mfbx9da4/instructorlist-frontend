import styled from 'styled-components'
import { Col } from '../../components/grid/index'

export const SectionHeader = styled.h1`
  display: none;
`

export const PaddingBetween = styled.div`
  width: 100%;
  height: 6.4rem;

  @media ${props => props.theme.media.md} {
    height: 16rem;
  }
`

export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledSection = styled.section`
  background-color: ${props => props.theme.accent};
`
export const StyledForm = styled.form`
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
  @media ${props => props.theme.media.sm} {
    flex-direction: column;
    width: 100%;
  }
  @media ${props => props.theme.media.md} {
    flex-direction: column;
  }
  @media ${props => props.theme.media.lg} {
    flex-direction: row;
  }
`

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledButton = styled.button`
  color: ${props => props.theme.accent};
  background-color: white;
  border: none;
  margin-left: 5px;
  border-radius: 8rem;
  padding: 9.6rem 3.2rem;

  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  outline: none;
  width: 100%;
  margin-top: 10px;

  @media ${props => props.theme.media.sm} {
    padding: 9.6rem 3.2rem;
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
  border: 1px solid ${props => props.theme.inputBlue};
  background-color: ${props => props.theme.inputBlue};
  color: white;
  padding: 8rem6.4rem;

  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.8px;
  outline: none;
  margin-right: 8rem;
  text-align: center;
  width: 100%;
  margin-top: 10px;

  @media ${props => props.theme.media.sm} {
    padding: 8rem4.8rem;
    width: 25.6rem;
    margin-top: 0;
    text-align: left;
  }
`

export const StyledImg = styled.img`
  margin-right: 10px;
  transition: transform 0.3s ease-in-out;
  :hover {
    transform: translate(0px, -5px);
    cursor: pointer;
  }
`
