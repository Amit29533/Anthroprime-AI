import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronRight, Mail } from 'lucide-react'
import CapacityTable from '../components/CapacityTable'

export default function Capacity() {
  return (
    <section className="capacity-page">
      <div className="capacity-crumb font-mono">
        <Link to="/">Home</Link>
        <ChevronRight size={12} aria-hidden="true" />
        <span>GPU capacity</span>
      </div>
      <header className="capacity-heading">
        <p className="font-mono text-faint uppercase tracking-[0.18em] text-[11px]">
          Direct from Anthroprime
        </p>
        <h1>
          GPU <em>capacity.</em>
        </h1>
        <p>
          Popular accelerators. One infrastructure partner.
          <br />
          Tell us your scale, region and timeline—we’ll confirm the right fit.
        </p>
        <a
          className="capacity-email"
          href="mailto:hello@anthroprime.com?subject=GPU%20capacity%20enquiry"
        >
          <Mail size={16} aria-hidden="true" />
          hello@anthroprime.com
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </header>

      <CapacityTable />
    </section>
  )
}
