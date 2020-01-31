import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const BalletImage = () => (
  <StaticQuery
    query={graphql`
      query {
        HiphopImage: file(relativePath: { eq: "dancer-2.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Img alt="Ballet image" fluid={data.BalletImage.childImageSharp.fluid} />
    )}
  />
)
export default BalletImage
