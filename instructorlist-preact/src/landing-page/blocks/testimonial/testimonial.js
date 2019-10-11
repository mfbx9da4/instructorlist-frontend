import React from "react"
import PropTypes from "prop-types"

import { Container } from "../../components/grid/index"
import { Row, Col } from "../../components/grid/index"
import {
  StyledTeacher,
  StyledQuote,
  StyledDt,
  StyledDd,
  StyledSection,
  StyledHr,
} from "./styles"
import {
  SectionHeader,
  StyledText,
  SectionMargin,
  PaddingContainer,
} from "../../components/globalStyles/styles"

import TeacherImage from "../../components/imageComponents/teacherImage"

const ColBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2,
}

const DtBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1 / 4,
  xl: 1 / 4,
}

const DdBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 3 / 4,
  xl: 3 / 4,
}

const Testimonial = props => {
  const {
    title,
    subtext,
    teacher,
    quote,
    dt1,
    dd1,
    dt2,
    dd2,
    dt3,
    dd3,
    dt4,
    dd4,
  } = props
  return (
    <SectionMargin>
      <PaddingContainer>
        <Container>
          <StyledSection>
            <SectionHeader>{title}</SectionHeader>
            <StyledText>{subtext}</StyledText>

            <Row pt="80px" justifyContent="space-around" alignItems="center">
              <Col width={ColBreakPoints}>
                <PaddingContainer>
                  <TeacherImage />
                </PaddingContainer>
              </Col>
              <Col width={ColBreakPoints}>
                <div>
                  <StyledTeacher>{teacher}</StyledTeacher>
                  <StyledQuote>{quote}</StyledQuote>
                  <div>
                    <Row>
                      <StyledDt width={DtBreakPoints}>{dt1}</StyledDt>
                      <StyledDd width={DdBreakPoints}>{dd1}</StyledDd>
                    </Row>
                    <StyledHr />
                    <Row>
                      <StyledDt width={DtBreakPoints}>{dt2}</StyledDt>
                      <StyledDd width={DdBreakPoints}>{dd2}</StyledDd>
                    </Row>
                    <StyledHr />
                    <Row>
                      <StyledDt width={DtBreakPoints}>{dt3}</StyledDt>
                      <StyledDd width={DdBreakPoints}>{dd3}</StyledDd>
                    </Row>
                    <StyledHr />
                    <Row>
                      <StyledDt width={DtBreakPoints}>{dt4}</StyledDt>
                      <StyledDd width={DdBreakPoints}>{dd4}</StyledDd>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </StyledSection>
        </Container>
      </PaddingContainer>
    </SectionMargin>
  )
}

Testimonial.propTypes = {
  title: PropTypes.string,
  subtext: PropTypes.string,
  teacher: PropTypes.string,
  quote: PropTypes.string,
  dt1: PropTypes.string,
  dd1: PropTypes.string,
  dt2: PropTypes.string,
  dd2: PropTypes.string,
  dt3: PropTypes.string,
  dd3: PropTypes.string,
  dt4: PropTypes.string,
  dd4: PropTypes.string,
}

Testimonial.defaultProps = {
  title: `Learn from the best`,
  subtext: `Learn from passionate individuals about their art form`,
  teacher: `Oliver V`,
  quote: `“Nobody cares if you can’t dance well. Just get up and dance.”`,
  dt1: `Teaches`,
  dd1: `Modern Dance, Contemporary, Hip Hop`,
  dt2: `Experience`,
  dd2: `11+ years`,
  dt3: `Location`,
  dd3: `Independent studio, Shoreditch`,
  dt4: `About`,
  dd4: `Attend hundreds of dance classes from the best teachers across
  London with a single membership. Attend hundreds of dance
  classes from the best teachers across London with a single
  membership.`,
}

export default Testimonial
