import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GPUMarquee from './components/GPUMarquee'
import GPUAggregation from './components/GPUAggregation'
import DedicatedClusters from './components/DedicatedClusters'
import HowItWorks from './components/HowItWorks'
import Marketplace from './components/Marketplace'
import FindCapacity from './components/FindCapacity'
import GlobalNetwork from './components/GlobalNetwork'
import WhoWeServe from './components/WhoWeServe'
import Services from './components/Services'
import Solutions from './components/Solutions'
import WhyUs from './components/WhyUs'
import Resources from './components/Resources'
import Company from './components/Company'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    // Smooth reveal on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view')
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bg relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 dot-pattern opacity-[0.15]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-0 w-[800px] h-[800px] bg-[#7C3AED]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <GPUMarquee />
          <GPUAggregation />
          <DedicatedClusters />
          <Solutions />
          <HowItWorks />
          <Marketplace />
          <FindCapacity />
          <GlobalNetwork />
          <WhoWeServe />
          <Services />
          <WhyUs />
          <Resources />
          <Company />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
