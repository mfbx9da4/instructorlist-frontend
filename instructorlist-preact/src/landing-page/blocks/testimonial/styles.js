import styled from "styled-components"
import { Col } from "../../components/grid/index"
import breakpoint from "styled-components-breakpoint"

export const StyledSection = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export const StyledTeacher = styled.p`

  font-size: 17px;
  letter-spacing: 1.29px;
  font-weight: 300;
  color: ${props => props.theme.accent};
  text-transform: uppercase;
`

export const StyledQuote = styled.p`

  font-size: 40px;
  line-height: 1.5;
  font-weight: 300;
  ${breakpoint(`sm`)`
      font-size: 20px;
  `};
  ${breakpoint(`lg`)`
      font-size: 40px;
  `};
`

export const StyledDt = styled(Col)`

  font-size: 14px;
  letter-spacing: 1.9px;
  font-weight: 700;
  text-transform: uppercase;
  ${breakpoint(`sm`)`
    font-size: 11px;
  `};
  ${breakpoint(`xl`)`
    font-size: 14px;
  `};
`

export const StyledDd = styled(Col)`

  font-size: 15px;
  letter-spacing: 0.75px;
  font-weight: 300;
`
export const StyledHr = styled.hr`
  margin-top: 1rem;
  border: 0;
  height: 0;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
`
