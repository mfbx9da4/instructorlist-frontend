import styled from 'styled-components'
import { Col } from '../../components/grid/index'

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
  ${props => props.theme.media.sm} {
    font-size: 20px;
  }
  ${props => props.theme.media.lg} {
    font-size: 40px;
  }
`

export const StyledDt = styled(Col)`
  font-size: 14px;
  letter-spacing: 1.9px;
  font-weight: 700;
  text-transform: uppercase;
  ${props => props.theme.media.sm} {
    font-size: 11px;
  }
  ${props => props.theme.media.xl} {
    font-size: 14px;
  }
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
