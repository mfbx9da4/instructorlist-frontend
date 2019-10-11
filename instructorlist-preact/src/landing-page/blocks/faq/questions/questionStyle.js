import styled, { keyframes } from "styled-components"
import breakpoint from "styled-components-breakpoint"

export const QuestionTitle = styled.h2`

  font-weight: 700;
  font-size: 16px;
  ${breakpoint(`sm`)`
      font-size: 22px;
  `};
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const PlusSign = styled.p`

  font-weight: 700;
  font-size: 30px;
  color: ${props => props.theme.grey2};
  transition: transform 0.4s ease-in-out;
  :hover {
    transform: rotate(45deg);
    cursor: pointer;
  }
`

export const ToggleState = styled.div`
  display: ${props => (props.toggle ? "flex" : "none")};
  animation: ${props => (props.toggle ? "(${fade}0.5s ease-in-out)" : "none")};
`

const fade = keyframes`
  from {
    opacity: 0;
		transform: translate(0px, -20px);
  }

  to {
    opacity: 1;
		transform: translate(0px, 0px);
  }
`
