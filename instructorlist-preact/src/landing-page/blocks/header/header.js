import React from 'react'
import { Link } from 'preact-router'
import PropTypes from 'prop-types'

import { Row, Col } from '../../components/grid/index'
import {
  SectionHeader,
  StyledText,
  PaddingContainer,
  SectionMarginTop,
} from '../../components/globalStyles/styles'
import {
  StyledAlert,
  StyledButton,
  StyledInput,
  StyledImage,
  StyledDiv,
  StyledForm,
} from './styles'

import { Container } from '../../components/grid/index'

const ColBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2,
}

const Padding = {
  xs: `40px`,
  sm: `40px`,
  md: `0`,
  lg: `0`,
  xl: `0`,
}

const Header = props => {
  const { alert, title, subtext } = props
  return (
    <Container>
      <SectionMarginTop>
        <Row justifyContent="space-between" alignItems="center">
          <Col width={ColBreakPoints} order={-2}>
            <StyledImage scr="/assets/images/landing-page/header-image.jpg" />
          </Col>

          <Col width={ColBreakPoints} pt={Padding}>
            <PaddingContainer>
              <StyledAlert>{alert}</StyledAlert>
              <SectionHeader>{title}</SectionHeader>
              <StyledText>{subtext}</StyledText>
              {/* Begin Mailchimp Signup Form */}
              <Row>
                <Link href="/search" style={{ width: '100%' }}>
                  <StyledForm>
                    <StyledButton>Browse Classes</StyledButton>
                  </StyledForm>
                </Link>
              </Row>

              {/* End Mailchimp signup */}
              <a href="mailto:instructors@davidalbertoadler.com?Subject=I%20want%20to%20sign%20up%20as%20a%20teacher">
                <StyledDiv primary>Join as a teacher</StyledDiv>
              </a>
            </PaddingContainer>
          </Col>
        </Row>
      </SectionMarginTop>
    </Container>
  )
}

Header.propTypes = {
  alert: PropTypes.string,
  title: PropTypes.element,
  subtext: PropTypes.string,
}

Header.defaultProps = {
  title: `The Best Dance Teachers Across London. Handpicked.`,
  subtext: `Attend hundreds of dance classes from the best teachers across London with a single membership.`,
}

export default Header
