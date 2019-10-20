import React from 'react'
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
                <StyledForm
                  action="https://gmail.us20.list-manage.com/subscribe/post?u=0e7b5839a8abe9d0d2de31711&amp;id=f7e48cf5c0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  target="_blank"
                >
                  <StyledInput
                    type="email"
                    id="mce-EMAIL"
                    name="EMAIL"
                    placeholder="name@email.com"
                  />
                  {/* BEGIN--- This keeps the bots away!---BEGIN */}
                  <div id="mce-responses">
                    <div id="mce-error-response" style={{ display: `none` }} />
                    <div
                      id="mce-success-response"
                      style={{ display: `none` }}
                    />
                  </div>
                  <div
                    style={{ position: `absolute`, left: `-5000px` }}
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="b_0e7b5839a8abe9d0d2de31711_f7e48cf5c0"
                      value=""
                    />
                  </div>
                  {/* END--- This keeps the bots away!---END */}
                  <StyledButton
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="id="
                    mc-embedded-subscribe
                  >
                    Get a free class
                  </StyledButton>
                </StyledForm>
              </Row>

              {/* End Mailchimp signup */}
              <a href="mailto:instructors@davidalbertoadler.com?Subject=I%20want%20to%20sign%20up%20as%20a%20teacher">
                <StyledDiv primary>I&#39;m a teacher</StyledDiv>
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
  alert: `We&#39;re launching soon!`,
  title: `The Best Dance Teachers Across London.Handpicked.`,
  subtext: `Attend hundreds of dance classes from the best teachers across London with a single membership.`,
}

export default Header
