import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Footer from './Footer'
import TrustBadges from './TrustBadges'
import TrendingScams from './TrendingScams'
import CTA from './CTA'
import HowItWorks from './HowItWorks'

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <TrustBadges />
      <TrendingScams />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  )
}

export default HomePage