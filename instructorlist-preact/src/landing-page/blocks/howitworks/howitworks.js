import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../../components/layout'
import { Row, Col } from '../../components/grid/index'
import { StyledSection, StyledDiv, StyledSectionHeader } from './styles'
import { SectionMargin } from '../../components/globalStyles/styles'
import { Container } from '../../components/grid/index'
import { Link } from 'preact-router'
import { StyledButton } from '../header/styles'

import Bullet from './bullet/bullet'
import Icon1 from '../../../assets/images/landing-page/icon-1.png'
import Icon2 from '../../../assets/images/landing-page/icon-2.png'
import Icon3 from '../../../assets/images/landing-page/icon3.png'

const justifyPlacement = {
  xs: 'center',
  sm: 'center',
  md: 'flex-start',
  lg: 'center',
  xl: 'center',
}

const Howitworks = props => {
  const { title } = props
  return (
    <StyledSection>
      <SectionMargin>
        <Container>
          <StyledDiv>
            <StyledSectionHeader>{title}</StyledSectionHeader>
            <Row justifyContent={justifyPlacement} alignItems="center">
              <Col pt="10px" pb="10px">
                <Bullet
                  number="01"
                  image={Icon1}
                  title="Discover"
                  description="Browse class times, videos and descriptions."
                />
              </Col>

              <Col pt="10px" pb="10px">
                <Bullet
                  number="02"
                  image={Icon2}
                  title="Pay"
                  description="Pay for the class directly on this website to reserve your place in the class."
                />
              </Col>

              <Col pt="10px" pb="10px">
                <Bullet
                  number="03"
                  image={Icon3}
                  title="Move"
                  description="You will receive a google hangouts link to the class. Login and move!"
                />
              </Col>
            </Row>
            <Row>
              <Link
                href="/search"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  marginTop: '2rem',
                }}
              >
                <StyledButton>Browse Classes</StyledButton>
              </Link>
            </Row>
          </StyledDiv>
        </Container>
      </SectionMargin>
    </StyledSection>
  )
}

Howitworks.propTypes = {
  title: PropTypes.string,
}

Howitworks.defaultProps = {
  title: `How It Works`,
}

export default Howitworks
