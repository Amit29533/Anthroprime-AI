import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import GpuDetail from './pages/GpuDetail'
import { SolutionsIndex, SolutionDetail } from './pages/Solutions'
import Services from './pages/Services'
import Resources from './pages/Resources'
import About from './pages/About'
import Contact from './pages/Contact'
import FindCapacity from './pages/FindCapacity'
import NotFound from './pages/NotFound'

/**
 * Anthroprime.ai — multi-page site
 *
 * /                      Home (hero, aggregation, clusters, how-it-works,
 *                          global network, services, who-we-serve, why-us)
 * /marketplace           GPU capacity marketplace (configurations tracked across the network)
 * /gpu/:slug             GPU detail pages (h100 h200 b200 gb200 a100 l40s)
 * /solutions             Solutions index
 * /solutions/:slug       Solution detail pages
 * /services              Services (sourcing, advisory, deployment, managed, security)
 * /resources             GPU comparison + network coverage + guides
 * /about                 About + Partners
 * /contact               Contact
 * /find-capacity         Find GPU Capacity form (primary CTA destination)
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/gpu/:slug" element={<GpuDetail />} />
        <Route path="/solutions" element={<SolutionsIndex />} />
        <Route path="/solutions/:slug" element={<SolutionDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-capacity" element={<FindCapacity />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
