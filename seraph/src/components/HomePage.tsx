import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Footer from './Footer'
import TrustBadges from './TrustBadges'
import TrendingScams from './TrendingScams'
import CTA from './CTA'
import HowItWorks from './HowItWorks'
import '../index.css'

const HomePage = () => {
  return (
    <div className="grid-bg min-h-screen">
      <Header />
      <Hero />
      {/* <TrustBadges /> */}
      <TrendingScams />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  )
}

export default HomePage