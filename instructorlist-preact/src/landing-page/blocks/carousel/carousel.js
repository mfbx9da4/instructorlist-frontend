import React, { useState } from "react"
import PropTypes from "prop-types"
import { Navigation } from "swiper/dist/js/swiper.esm"
import { Row, Col } from "../../components/grid/index"
import Swiper from "react-id-swiper"
import left from "../../images/left.png"
import right from "../../images/right.png"
import Item from "./item/item"

import dancer1 from "../../images/dancer-1.png"
import dancer2 from "../../images/dancer-2.png"
import dancer3 from "../../images/dancer-3.png"

import {
  SectionMargin,
  SectionHeader,
  PaddingContainer,
} from "../../components/globalStyles/styles"

import {
  StyledSection,
  StyledDiv,
  StyledButtonPrev,
  StyledButtonNext,
  StyledSwiper,
} from "./styles"
import { Container } from "../../components/grid/index"
import theme from "../../theme"

import "./styles.css"

const Carousel = props => {
  const { title } = props
  const [swiper, updateSwiper] = useState(null)
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }

  const params = {
    observer: true,
    slidesPerView: 3,
    // observeParents: true,
    breakpointsInverse: true,
    rebuildOnUpdate: true,
    breakpoints: {
      // when window width is >= 320px
      [theme.breakpoints.xs]: {
        slidesPerView: 1.8,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      [theme.breakpoints.sm]: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      [theme.breakpoints.lg]: {
        spaceBetween: 50,
        slidesPerView: 3,
      },
    },
  }

  // const ColBreakPoints = {
  //   xs: 1 / 2,
  //   sm: 1 / 2,
  //   md: 1 / 2,
  //   lg: 1,
  //   xl: 1,
  // }

  return (
    <div>
      <StyledSection>
        <SectionMargin>
          <PaddingContainer>
            <Container>
              <Row justifyContent="space-around">
                <Col>
                  <SectionHeader secundary>{title}</SectionHeader>
                </Col>

                <Col>
                  <StyledDiv>
                    <StyledButtonPrev onClick={goPrev}>
                      <img src={left} alt="arrow previous" />
                      <arrowPrev />
                    </StyledButtonPrev>
                    <StyledButtonNext onClick={goNext}>
                      <img src={right} alt="arrow next" />
                      <arrowNext />
                    </StyledButtonNext>
                  </StyledDiv>
                </Col>
              </Row>

              <Swiper
                getSwiper={updateSwiper}
                modules={[Navigation]}
                {...params}
              >
                <div>
                  <Item
                    image={dancer1}
                    flag="🇺🇸"
                    title="Hip Hop"
                    description="Hip-hop is characterized by a high level of playfulness and exploration through `move-meant` concepts and techniques."
                  />
                </div>
                <div>
                  <Item
                    image={dancer2}
                    flag="🇮🇹🇫🇷"
                    title="Ballet"
                    description="Ballet uses precise and highly formalized set steps and gestures, characterized by light, graceful movements."
                  />
                </div>
                <div>
                  <Item
                    image={dancer3}
                    flag="🇧🇷"
                    title="Capoeira"
                    description="A movement discipline combining martial art and dance, which originated among African slaves in 19th-century Brazil"
                  />
                </div>
                <div>
                  <Item
                    image={dancer3}
                    flag="🇧🇷"
                    title="Capoeira"
                    description="A movement discipline combining martial art and dance, which originated among African slaves in 19th-century Brazil"
                  />
                </div>
                <div>
                  <Item
                    image={dancer3}
                    flag="🇧🇷"
                    title="Capoeira"
                    description="A movement discipline combining martial art and dance, which originated among African slaves in 19th-century Brazil"
                  />
                </div>
              </Swiper>
            </Container>
          </PaddingContainer>
        </SectionMargin>
      </StyledSection>
    </div>
  )
}

Carousel.propTypes = {
  title: PropTypes.string,
}

Carousel.defaultProps = {
  title: `Learn from different cultures`,
}

export default Carousel
