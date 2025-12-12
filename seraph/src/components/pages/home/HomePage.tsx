// import React from 'react'
import Header from '../../Header'
import Hero from './Hero'
import Footer from '../../Footer'
// import TrustBadges from './TrustBadges'
import TrendingScams from '../../TrendingScams'
import CTA from '../../CTA'
import HowItWorks from '../../HowItWorks'
import '../../../index.css'
import AdBanner from '../../ads/AdBanner'

const HomePage = () => {
  return (
    <div className="grid-bg min-h-screen">
      <Header />
      <Hero />

      {/* Ad placement under hero */}
      <div className="my-8 flex justify-center">
        <AdBanner />
      </div>

      {/* <TrustBadges /> */}
      <TrendingScams />
      <HowItWorks />

      {/* Ad placement under hero */}
      <div className="my-8 flex justify-center">
        <AdBanner />
      </div>

      <CTA />
      <Footer />
    </div>
  )
}

export default HomePage