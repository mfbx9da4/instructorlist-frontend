import React from "react"
import PropTypes from "prop-types"
// import HiphopImage from "../../../components/imageComponents/hiphopImage"
// import BalletImage from "../../../components/imageComponents/balletImage"
// import CapImage from "../../../components/imageComponents/capImage"

import {
  StyledBlock,
  StyledTitle,
  StyledFlag,
  ExtraStyledText,
  StyledDiv,
} from "./itemStyle"

const itemStyle = props => {
  const { flag, image, title, description } = props
  return (
    <StyledBlock>
      {/* <HiphopImage scr="dancer-1.png" /> */}
      <img src={image} width="400" height="auto" alt="people dancing" />
      <div>
        <StyledDiv>
          <StyledTitle>{title}</StyledTitle>
          <StyledFlag>{flag}</StyledFlag>
        </StyledDiv>
        <ExtraStyledText secundary weight>
          {description}
        </ExtraStyledText>
      </div>
    </StyledBlock>
  )
}

itemStyle.propTypes = {
  flag: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

itemStyle.defaultProps = {
  flag: `🇺🇸`,
  image: `dancer-1`,
  title: `Hip Hop`,
  description: `Hip-hop is characterized by a high level of playfulness and exploration through "move-meant" concepts and techniques.`,
}

export default itemStyle
