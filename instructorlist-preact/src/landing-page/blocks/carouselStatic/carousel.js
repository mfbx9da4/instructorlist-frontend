import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from '../../components/grid/index'
import Item from '../carousel/item/item'
import Info from '../carousel/item/info'

import left from '../../../assets/images/landing-page/left.png'
import right from '../../../assets/images/landing-page/right.png'
import dancer1 from '../../../assets/images/landing-page/dancer-1.jpg'
import dancer2 from '../../../assets/images/landing-page/dancer-2.jpg'
import dancer3 from '../../../assets/images/landing-page/capoeira.jpg'

import {
  SectionMargin,
  SectionHeader,
  PaddingContainer,
} from '../../components/globalStyles/styles'
import { StyledSection } from './styles'
import { Container } from '../../components/grid/index'

const CarouselStatic = props => {
  const { title } = props
  return (
    <div>
      <StyledSection>
        <SectionMargin>
          <PaddingContainer>
            <Container>
              <Row justifyContent="center" pt="100px" pb="60px" px="20px">
                <SectionHeader secundary>{title}</SectionHeader>
              </Row>

              <Row justifyContent="space-around" pb="60px">
                <Item
                  image={dancer1}
                  flag="🇺🇸"
                  title="Hip Hop"
                  description="Hip-hop is characterized by a high level of playfulness and exploration through `move-meant` concepts and techniques."
                />

                <Item
                  image={dancer2}
                  flag="🇮🇹🇫🇷"
                  title="Ballet"
                  description="Ballet uses precise and highly formalized set steps and gestures, characterized by light, graceful movements."
                />

                <Item
                  image={dancer3}
                  flag="🇧🇷"
                  title="Capoeira"
                  description="A movement discipline combining martial art and dance, which originated among African slaves in 19th-century Brazil"
                />
                <Info
                  flags="🇪🇬🇬🇷🇲🇽🇦🇷🇪🇸"
                  title="Hundreds more…"
                  description={
                    <a href="/search" style={{ color: 'white' }}>
                      Salsa, Bachata, Commercial, Gwoka, Indian dance, African
                      dance, Tap …
                    </a>
                  }
                />
              </Row>
            </Container>
          </PaddingContainer>
        </SectionMargin>
      </StyledSection>
    </div>
  )
}

CarouselStatic.propTypes = {
  title: PropTypes.string,
}

CarouselStatic.defaultProps = {
  title: `Learn from different cultures`,
}

export default CarouselStatic
