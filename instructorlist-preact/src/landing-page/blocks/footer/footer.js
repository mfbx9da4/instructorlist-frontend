import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from '../../components/grid/index'
import {
  SectionHeader,
  StyledText,
  SectionMargin,
  PaddingContainer,
} from '../../components/globalStyles/styles'
import {
  StyledSection,
  StyledButton,
  StyledInput,
  StyledDiv,
  StyledImg,
  StyledCol,
  StyledForm,
  PaddingBetween,
} from './styles'

// import Twitter from "../../../assets/images/landing-page/twitter.png"
import Instagram from '../../../assets/images/landing-page/instagram.png'
// import Facebook from "../../../assets/images/landing-page/facebook.png"

import { Container } from '../../components/grid/index'

const Footer = props => {
  const { title, copyright, email } = props
  return (
    <StyledSection id="section1">
      <SectionMargin footer>
        <Container>
          <PaddingContainer>
            <StyledDiv>
              <Row justifyContent="center" alignItems="center">
                <StyledCol>
                  <SectionHeader secundary>{title}</SectionHeader>
                  <StyledForm
                    action="https://gmail.us20.list-manage.com/subscribe/post?u=0e7b5839a8abe9d0d2de31711&amp;id=f7e48cf5c0"
                    method="post"
                    id="mc-embedded-subscribe-form-2"
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
                      <div
                        id="mce-error-response"
                        style={{ display: 'none' }}
                      />
                      <div
                        id="mce-success-response"
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div
                      style={{ position: 'absolute', left: '-5000px' }}
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
                  {/* End Mailchimp signup */}
                </StyledCol>
              </Row>
              <PaddingBetween />
              <Row justifyContent="space-around" alignItems="center">
                <Col>
                  <StyledText secundary>
                    © {new Date().getFullYear()}, <span>{copyright}</span>
                  </StyledText>
                </Col>
                <Col>
                  <StyledText secundary>{email}</StyledText>
                </Col>
                <Col>
                  <Row alignItems="center">
                    <StyledText secundary uppercase spacing margin>
                      Follow Us
                    </StyledText>
                    {/* <StyledImg
                      src={Twitter}
                      width="19"
                      height="15"
                      alt="twitter logo"
                    /> */}
                    <a href="https://www.instagram.com/instructorlist/">
                      <StyledImg
                        src={Instagram}
                        width="16"
                        height="16"
                        alt="instagramlogo"
                      />
                    </a>
                    {/* <StyledImg
                      src={Facebook}
                      width="11"
                      height="19"
                      alt="facebooklogo"
                    /> */}
                  </Row>
                </Col>
              </Row>
            </StyledDiv>
          </PaddingContainer>
        </Container>
      </SectionMargin>
    </StyledSection>
  )
}

Footer.propTypes = {
  title: PropTypes.string,
  copyright: PropTypes.string,
  email: PropTypes.string,
}

Footer.defaultProps = {
  title: `Sign up for a free class`,
  copyright: `instructorlist`,
  email: `instructors@davidalbertoadler.com`,
}

export default Footer
