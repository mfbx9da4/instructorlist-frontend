import React from 'react'

import { StyledSpan, LogoSpan, Span } from '../components/globalStyles/styles'
import { Link } from 'preact-router/match'
import SEO from '../components/seo'

import Navigation from '../blocks/navigation/navigation'
import Header from '../blocks/header/header'
import CarouselStatic from '../blocks/carouselStatic/carousel'
import Mapsection from '../blocks/mapsection/mapsection'
import Testimonial from '../blocks/testimonial/testimonial'
import Howitworks from '../blocks/howitworks/howitworks'
import Faq from '../blocks/faq/faq'
import Footer from '../blocks/footer/footer'
import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <SEO
      title="Instructorlist"
      description="The best dance teachers across London. Handpicked."
      keywords={[`instructorlist`, `dance teachers`, `london`]}
    />
    <Navigation
      logo={
        <Span>
          i<LogoSpan>nstructor</LogoSpan>l<LogoSpan>ist</LogoSpan>
        </Span>
      }
    />
    <Header
      alert="We&#39;re launching very soon!"
      title={
        <span>
          Online Video Classes with the
          <br />
          best dance and fitness teachers
          <br />
          <StyledSpan>around the world.</StyledSpan>
        </span>
      }
      subtext="Our instructors have local classes in locations all over the world. In these unprecedented times they are moving their classes online."
    />
    <CarouselStatic />
    <Mapsection
      title="Discover new classes all over the world."
      subtext="Our instructors are giving classes all over the world. It’s up to you where you decide to attend."
    />
    <Testimonial
      title="Learn from the best"
      subtext="Learn from passionate individuals about their art form"
      teacher="Oliver V"
      quote="“Find meaning in movement. Meaning will inspire you and bring you motivation and physically.”"
      dt1="Teaches"
      dd1="Commercial and Hip Hop Dance"
      dt2="Experience"
      dd2="11+ years"
      dt3="Location"
      dd3="Shoreditch, London"
      dt4="About"
      dd4="Oliver is a London native who got into contact with dancing
      at a very young age. His constant need for improvement has
      allowed him to turn his passion into a career.
      He has worked with brands such as Channel4, D&G and BBC and
      started teaching 11 years ago as a way to give back to the
      community and train the next generation of dancers."
    />
    <Howitworks title="How It Works" />
    <Faq title="Frequently Asked Questions" />
    <Footer
      title="Sign up for a free class"
      copyright="Instructorlist Ltd"
      email="instructors@instructorlist.org"
    />
  </Layout>
)

export default IndexPage
