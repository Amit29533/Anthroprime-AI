import React from 'react'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GPUMarquee from './components/GPUMarquee'
import GPUAggregation from './components/GPUAggregation'
import DedicatedClusters from './components/DedicatedClusters'
import HowItWorks from './components/HowItWorks'
import GlobalNetwork from './components/GlobalNetwork'
import Marketplace from './components/Marketplace'
import FindCapacity from './components/FindCapacity'
import Services from './components/Services'
import WhoWeServe from './components/WhoWeServe'
import WhyUs from './components/WhyUs'
import Solutions from './components/Solutions'
import Resources from './components/Resources'
import Company from './components/Company'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

/**
 * Homepage order (per website brief):
 * Hero → GPU strip → GPU Capacity Aggregation → Dedicated AI Clusters →
 * How It Works → Global Infrastructure Network → [Marketplace + Find Capacity form] →
 * AI Infrastructure Services → Who We Serve (use cases) → Why Us →
 * [Solutions · Resources · Company] → Final CTA
 */
export default function App() {
  return (
    <div className="min-h-screen bg-bg relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 dot-pattern opacity-[0.15]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-0 w-[800px] h-[800px] bg-[#7C3AED]/5 rounded-full blur-[120px]" />
      </div>

      <ScrollProgress />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <GPUMarquee />
          <GPUAggregation />
          <DedicatedClusters />
          <HowItWorks />
          <GlobalNetwork />
          <Marketplace />
          <FindCapacity />
          <Services />
          <WhoWeServe />
          <WhyUs />
          <Solutions />
          <Resources />
          <Company />
          <FinalCTA />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </div>
  )
}
