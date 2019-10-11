import React from "react"
import PropTypes from "prop-types"

import {
  StyledTitle,
  StyledFlag,
  ExtraStyledText,
  DottedBlock,
} from "./itemStyle"

const info = props => {
  const { flags, title, description } = props
  return (
    <DottedBlock>
      <StyledFlag>{flags}</StyledFlag>
      <StyledTitle>{title}</StyledTitle>
      <ExtraStyledText secundary weight>
        {description}
      </ExtraStyledText>
    </DottedBlock>
  )
}

info.propTypes = {
  flags: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

info.defaultProps = {
  flags: `🇺🇸`,
  title: `Hundreds more...`,
  description: `Salsa, Bachata, Commercial, Gwoka, Indian dance, African dance, Tap,…`,
}

export default info
