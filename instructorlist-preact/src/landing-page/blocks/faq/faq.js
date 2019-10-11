import React from "react"
import PropTypes from "prop-types"

import { StyledHr, StyledQuestion } from "./styles"
import {
  SectionHeader,
  SectionMargin,
  PaddingContainer,
} from "../../components/globalStyles/styles"
import { Container } from "../../components/grid/index"

const Faq = props => {
  const { title } = props
  return (
    <Container>
      <SectionMargin>
        <PaddingContainer faq>
          <SectionHeader>{title}</SectionHeader>
          <StyledQuestion
            question="About"
            answer="We are founded by a group of dancers and dance instructors passionate about improving the quality of life of individuals in London. We recognize that instructors are the backbone of a great class. We are committed to recognizing, supporting and celebrating these great instructors. Living in a big city can sometimes be overwhelming but there is a strong culture of dance and fun. We’re here to support that culture and connect people who would like to be part of it."
          />
          <StyledHr />
          <StyledQuestion
            question="How can I sign up as an instructor?"
            answer="instructors@davidalbertoadler.com"
          />
          <StyledHr />
          <StyledQuestion
            question="Why not just pay the teacher directly?"
            answer="We negotiate fair discounts with instructors so that it works out cheaper to come through us."
          />
          <StyledHr />
          <StyledQuestion
            question="How do we make money?"
            answer="We take a fixed and fair fee on the class price so that instructors end up with more compared to other platforms. "
          />
        </PaddingContainer>
      </SectionMargin>
    </Container>
  )
}

Faq.propTypes = {
  title: PropTypes.string,
}

Faq.defaultProps = {
  title: `Frequently Asked Questions`,
}

export default Faq
