import styled from "styled-components"
import { SectionHeader } from "../../components/globalStyles/styles"

export const StyledSection = styled.section`
  background-color: ${props => props.theme.grey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledSectionHeader = styled(SectionHeader)`
  padding-bottom:6.4rem;
`
