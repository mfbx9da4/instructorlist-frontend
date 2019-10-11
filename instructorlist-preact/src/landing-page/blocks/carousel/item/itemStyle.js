import styled from "styled-components"
import { StyledText } from "../../../components/globalStyles/styles"

export const ExtraStyledText = styled(StyledText)`
  font-weight: 300;
`

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  /* width: 100%; */
  /* RESET WIDTH TO 100% FOR DYNAMIC CAROUSEL */
  width: 15rem;
`

export const StyledBlock = styled.div`
  display: flex;
  flex-flow: column;
  /* width: 100%; */
  /* RESET WIDTH TO 100% FOR DYNAMIC CAROUSEL */
  width: 15rem;
`

export const DottedBlock = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 15rem;
  border: 5px dashed white;
  border-radius: 1rem;
  padding: 1rem;
`

export const StyledTitle = styled.h2`
  color: white;

  font-size: 24px;
  font-weight: 500;
`

export const StyledFlag = styled.p`
  font-size: 30px;
`
