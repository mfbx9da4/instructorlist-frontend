import styled from 'styled-components'
import CounterNumber from '../../../images/CounterFigure.svg'

export const BulletTitle = styled.h2`
  font-weight: 700;
  color: ${props => props.theme.accent};
  letter-spacing: 1.6px;
  text-transform: uppercase;
  font-size: 21px;
`
export const StyledImg = styled.img`
  margin-top: 2.08davrem;
`

export const StyledBlock = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  width: 28.8davrem;
  height: 30.4davrem;
  text-align: center;
`

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
`

export const StyledCounterNumber = styled.div`
  position: absolute;
  background: url(${CounterNumber});
`

export const StyledNumber = styled.p`
  position: relative;
  color: white;
  font-weight: 700;
  font-size: 20px;

  padding-top: 22px;
`
