import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const HiphopImage = () => (
  <StaticQuery
    query={graphql`
      query {
        HiphopImage: file(relativePath: { eq: "dancer-1.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Img alt="dancer" fluid={data.HiphopImage.childImageSharp.fluid} />
    )}
  />
)
export default HiphopImage
