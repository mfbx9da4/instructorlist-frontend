import React from "react"
import PropTypes from "prop-types"

import {
  QuestionTitle,
  PlusSign,
  ToggleState,
  StyledContainer,
} from "./questionStyle"
import { StyledText } from "../../../components/globalStyles/styles"

import { Row, Col } from "../../../components/grid/index"

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
    }
    // this.handleAnswerToggle = this.handleAnswerToggle.bind(this)
  }
  handleAnswerToggle = event => {
    this.setState(state => ({
      toggle: !state.toggle,
    }))
  }

  render() {
    const { question, answer } = this.props
    return (
      <StyledContainer>
        <Row justifyContent="space-between" onClick={this.handleAnswerToggle}>
          <Col width={1 / 2}>
            <QuestionTitle>{question}</QuestionTitle>
          </Col>
          <Col width={1 / 2}>
            <Row
              justifyContent="flex-end"
              toggle={this.state.toggle ? true : false}
            >
              <PlusSign>+</PlusSign>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            <ToggleState toggle={this.state.toggle ? true : false}>
              <StyledText>{answer}</StyledText>
            </ToggleState>
          </Col>
        </Row>
      </StyledContainer>
    )
  }
}

Question.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
}

Question.defaultProps = {
  question: `About`,
  answer: `We are founded by a group of dancers and dance instructors passionate about improving the quality of life of individuals in London. We recognize that instructors are the backbone of a great class. We are committed to recognizing, supporting and celebrating these great instructors. Living in a big city can sometimes be overwhelming but there is a strong culture of dance and fun. We’re here to support that culture and connect people who would like to be part of it.`,
}

export default Question
