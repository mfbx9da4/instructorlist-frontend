import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const CapImage = () => (
  <StaticQuery
    query={graphql`
      query {
        CapImage: file(relativePath: { eq: "dancer-3.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Img alt="dancer" fluid={data.CapImage.childImageSharp.fluid} />
    )}
  />
)
export default CapImage
