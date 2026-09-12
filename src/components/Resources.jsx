import React from 'react'
import { motion } from 'framer-motion'
import GPUComparison from './GPUComparison'

const resources = [
  { tag: 'In Progress', title: 'AI Infrastructure Guides', desc: 'How to choose between on-demand, reserved, bare-metal and private cloud.' },
  { tag: 'In Progress', title: 'GPU Pricing / Economics', desc: 'TCO models, FinOps for GPU, commitment vs flexibility tradeoffs.' },
  { tag: 'In Progress', title: 'Architecture Guides', desc: 'Network, storage and orchestration patterns for large-scale training and inference.' },
  { tag: 'Coming Soon', title: 'Blog', desc: 'Field notes from the capacity desk — sourcing, verification and deployment learnings.' },
]

export default function Resources() {
  return (
    <section id="resources" className="py-20 lg:py-28 border-t border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" /> Resources
            </div>
            <h2 className="font-display font-bold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em]">
              Compare first. Then decide.
            </h2>
            <p className="text-[15px] leading-[1.6] text-muted mt-3">
              Start with the interactive GPU comparison below. Our pricing and architecture guides are being built from live mandates — talk to us in the meantime; most of this knowledge already lives with our desk.
            </p>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border text-[13.5px] font-medium hover:border-border2 transition-colors shrink-0">
            Talk to an Expert →
          </a>
        </div>

        {/* Interactive GPU comparison */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <GPUComparison />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-surface border border-dashed border-border p-6 hover:border-border2 hover:bg-surface2 hover:-translate-y-0.5 transition-all"
            >
              <span className="inline-flex font-mono text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full bg-surface3 border border-border text-faint">{r.tag}</span>
              <h3 className="font-display font-semibold text-[16px] mt-4">{r.title}</h3>
              <p className="text-[13.5px] leading-[1.5] text-muted mt-2">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
