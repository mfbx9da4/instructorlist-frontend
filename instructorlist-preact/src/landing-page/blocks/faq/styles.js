import styled from "styled-components"
import Question from "./questions/question"

export const StyledHr = styled.hr`
  margin-top: 1.6davrem;
  border: 0;
  height: 0;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
`
export const StyledQuestion = styled(Question)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
