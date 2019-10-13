import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from '../../components/grid/index'
import { SectionHeader, StyledLink, StyledButton, StickyDiv } from './styles'
import { PaddingContainer } from '../../components/globalStyles/styles'
import { Container } from '../../components/grid/index'

const ColBreakPoints = {
  xs: 1 / 2,
  sm: 3 / 4,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2,
}

const ColBreakPoints2 = {
  xs: 1 / 2,
  sm: 1 / 4,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2,
}

const Padding = {
  xs: '20px',
  sm: '20px',
  md: '40px',
  lg: '40px',
  xl: '40px',
}

const Navigation = props => {
  const { logo, primaryButton, secundaryButton } = props
  return (
    <StickyDiv>
      <Container>
        <SectionHeader>Navigation</SectionHeader>
        <PaddingContainer>
          <Row pt="40px" pb={Padding} justifyContent="center">
            <Col
              width={ColBreakPoints2}
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <StyledLink to="/">{logo}</StyledLink>
            </Col>
            <Col width={ColBreakPoints}>
              <Row justifyContent="flex-end">
                <StyledButton primary>
                  <a href="mailto:instructors@instructorlist.org?Subject=I'm%20a%20teacher">
                    {primaryButton}
                  </a>
                </StyledButton>
                <StyledButton>{secundaryButton}</StyledButton>
              </Row>
            </Col>
          </Row>
        </PaddingContainer>
      </Container>
    </StickyDiv>
  )
}

Navigation.propTypes = {
  logo: PropTypes.element,
  primaryButton: PropTypes.string,
  secundaryButton: PropTypes.string,
}

Navigation.defaultProps = {
  logo: <span>instructorlist</span>,
  primaryButton: `I&#39;m a teacher`,
  secundaryButton: `Get a free class`,
}

export default Navigation
