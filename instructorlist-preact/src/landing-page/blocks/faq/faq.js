import React from 'react'
import PropTypes from 'prop-types'

import { StyledHr, StyledQuestion } from './styles'
import {
  SectionHeader,
  SectionMargin,
  PaddingContainer,
} from '../../components/globalStyles/styles'
import { Container } from '../../components/grid/index'

const Faq = props => {
  const { title } = props
  return (
    <Container>
      <SectionMargin>
        <PaddingContainer faq>
          <SectionHeader>{title}</SectionHeader>
          <StyledQuestion
            question="About"
            answer="We are founded by a group of dancers and movers passionate about improving the quality of life of individuals. In these unprecedented times keeping active is super important."
          />
          <StyledHr />
          <StyledQuestion
            question="How can I sign up as an instructor?"
            answer="instructors@davidalbertoadler.com"
          />
          <StyledHr />
          <StyledQuestion
            question="What is a typical class like?"
            answer="Classes typically have between 5 and 20 users. Teachers will be able to see you and give you feedback on your movement directly. Generally best if you mute yourself during class unless you need to say something."
          />
          <StyledHr />
          <StyledQuestion
            question="Can I book one to one classes?"
            answer="Currently we only support group classes but one to one booking will be coming soon!"
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
