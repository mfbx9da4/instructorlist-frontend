import React from 'react'
import PropTypes from 'prop-types'

import {
  BulletTitle,
  StyledBlock,
  StyledCounterNumber,
  StyledNumber,
  StyledDiv,
  StyledImg,
} from './bulletStyle'
import { StyledText } from '../../../components/globalStyles/styles'

const Bullet = props => {
  const { number, image, title, description } = props
  return (
    <StyledBlock>
      <StyledDiv>
        <StyledCounterNumber />
        <StyledNumber>{number}</StyledNumber>
      </StyledDiv>
      <StyledImg src={image} width="150" height="117" alt="icon" />
      <BulletTitle>{title}</BulletTitle>
      <StyledText>{description}</StyledText>
    </StyledBlock>
  )
}

Bullet.propTypes = {
  number: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

Bullet.defaultProps = {
  number: `How It Works`,
  image: `How It Works`,
  title: `How It Works`,
  description: `How It Works`,
}

export default Bullet
