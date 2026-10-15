import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './ui'
export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="cta-orbit" aria-hidden="true">
        <i />
      </div>
      <Reveal className="wrap">
        <div className="mono eyebrow">Your next breakthrough</div>
        <h2>
          Big ambition.
          <br />
          <em>Let’s find its infrastructure.</em>
        </h2>
        <p>
          From your first 8 GPUs to your next dedicated cluster. One
          requirement. The right people to make it happen.
        </p>
        <div className="cta-buttons">
          <Link to="/find-capacity" className="btn btn-gold">
            Find GPU Capacity
            <ArrowUpRight />
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Talk to an Expert
            <ArrowUpRight />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
