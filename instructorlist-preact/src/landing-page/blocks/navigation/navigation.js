import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Flex, Box } from '../../components/grid/index'
import { SectionHeader, StyledLink, StyledButton, StickyDiv } from './styles'
import { PaddingContainer } from '../../components/globalStyles/styles'
import { Container } from '../../components/grid/index'
import { Link } from 'preact-router'

const ColBreakPoints = {
  xs: 1 / 2,
  sm: 3 / 4,
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
  const { logo, primaryButton, secondaryButton } = props
  return (
    <StickyDiv>
      <Container>
        <SectionHeader>Navigation</SectionHeader>
        <PaddingContainer>
          <Flex
            pt="40px"
            pb={Padding}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <StyledLink to="/">{logo}</StyledLink>
            </Box>
            <Box>
              <Row>
                <StyledButton primary>
                  <a href="mailto:instructors@instructorlist.org?Subject=I'm%20a%20teacher">
                    {primaryButton}
                  </a>
                </StyledButton>
                <StyledButton>
                  <Link href="/search">{secondaryButton}</Link>
                </StyledButton>
              </Row>
            </Box>
          </Flex>
        </PaddingContainer>
      </Container>
    </StickyDiv>
  )
}

Navigation.propTypes = {
  logo: PropTypes.element,
  primaryButton: PropTypes.string,
  secondaryButton: PropTypes.string,
}

Navigation.defaultProps = {
  logo: <span>instructorlist</span>,
  primaryButton: `Join as a teacher`,
  secondaryButton: `Browse classes`,
}

export default Navigation
