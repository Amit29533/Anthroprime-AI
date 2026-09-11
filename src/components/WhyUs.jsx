import React from 'react'
import { motion } from 'framer-motion'

const whys = [
  { n: '01', title: 'Provider-Agnostic', desc: "We aren't restricted to one cloud or infrastructure provider. We search across the market for your best fit." },
  { n: '02', title: 'Global Sourcing', desc: 'We search across multiple infrastructure partners and geographies — India, SEA, Middle East, Europe, North America.' },
  { n: '03', title: 'Enterprise Scale', desc: 'From individual GPU servers to hundreds/thousands of GPUs. 8 to 8,000+ handled with same rigor.' },
  { n: '04', title: 'Architecture Expertise', desc: 'We understand compute, networking, storage and AI workloads — not merely GPU pricing.' },
  { n: '05', title: 'Commercial Optimization', desc: 'We help customers compare different infrastructure and commitment models with TCO analysis.' },
  { n: '06', title: 'End-to-End Execution', desc: 'Sourcing → Architecture → Contracting → Deployment → Management. One partner, accountable.' },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-surface/50 border-y border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="max-w-[640px]">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" /> Why Us
          </div>
          <h2 className="font-display font-bold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em]">
            The difference isn't<br />"we have GPUs."
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-14">
          {whys.map((w, i) => (
            <motion.div
              key={w.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group"
            >
              <div className="flex gap-4">
                <div className="font-mono text-[13px] text-faint pt-1 group-hover:text-accent transition-colors">{w.n}</div>
                <div>
                  <h3 className="font-display font-semibold text-[17px]">{w.title}</h3>
                  <p className="text-[14px] leading-[1.5] text-muted mt-2">{w.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-accent/20 bg-accentDim p-[1px]">
          <div className="rounded-[15px] bg-bg px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="font-mono text-[12px] leading-[1.5] text-muted max-w-[600px]">
              <span className="text-text font-medium">Important Positioning Rule:</span> Until we own GPU infrastructure, we avoid inflated ownership claims. Instead: <span className="text-accent">"Access GPU capacity through our infrastructure network."</span>
            </div>
            <div className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-accent text-bg font-bold shrink-0">Credibility {'>'} Scale</div>
          </div>
        </div>
      </div>
    </section>
  )
}
