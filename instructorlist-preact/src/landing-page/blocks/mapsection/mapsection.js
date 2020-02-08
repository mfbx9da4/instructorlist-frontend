import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'preact-router'

import { Row, Col } from '../../components/grid/index'
import {
  SectionHeader,
  StyledText,
  SectionMargin,
  PaddingContainer,
} from '../../components/globalStyles/styles'
import MapImage from '../../components/imageComponents/mapImage'
import { StyledButton } from '../header/styles'

import { Container } from '../../components/grid/index'

const ColBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2,
}

const Mapsection = props => {
  const { title, subtext } = props
  return (
    <SectionMargin>
      <Container>
        <Row justifyContent="center" alignItems="center">
          <Col width={ColBreakPoints}>
            <PaddingContainer>
              <SectionHeader>{title}</SectionHeader>
              <StyledText>{subtext}</StyledText>
            </PaddingContainer>
          </Col>

          <Col width={ColBreakPoints}>
            <MapImage scr="/assets/images/landing-page/map.jpg" />
          </Col>
        </Row>
        <Row>
          <Link
            href="/search"
            style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
          >
            <StyledButton>Browse Classes</StyledButton>
          </Link>
        </Row>
      </Container>
    </SectionMargin>
  )
}

Mapsection.propTypes = {
  title: PropTypes.string,
  subtext: PropTypes.string,
}

Mapsection.defaultProps = {
  title: `Discover new classes all over the city`,
  subtext: `Our instructors have classes in locations all over the city. It’s up to you where you decide to attend.`,
}

export default Mapsection
