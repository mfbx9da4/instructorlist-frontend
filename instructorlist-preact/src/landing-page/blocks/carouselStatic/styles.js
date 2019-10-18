import styled from 'styled-components'

export const StyledSection = styled.section`
  background-color: ${props => props.theme.accent};
`
export const StyledDiv = styled.div`
  border-radius: 8rem;
  width: 10.4rem;
  height: 4.48rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const StyledButtonPrev = styled.div`
  width: 23px;
  height: 15px;
  transition: transform 0.3s ease-in-out;
  opacity: 0.6;
  :hover {
    transform: scale(1.1);
    opacity: 1;
    cursor: pointer;
  }
`

export const StyledButtonNext = styled.div`
  width: 20px;
  height: 15px;
  transition: transform 0.3s ease-in-out;
  opacity: 0.6;
  :hover {
    transform: scale(1.1);
    opacity: 1;
    cursor: pointer;
  }
`
