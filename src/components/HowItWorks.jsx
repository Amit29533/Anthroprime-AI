import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const steps = [
  { n: '01', title: 'Tell Us Your Requirement', desc: 'GPU type, quantity, geography, workload and duration. We translate your workload into a comparable spec.' },
  { n: '02', title: 'We Search Our Infrastructure Network', desc: 'We identify suitable capacity across cloud providers, GPU clouds, data centers and infrastructure partners.' },
  { n: '03', title: 'Compare Infrastructure & Options', desc: 'Availability, architecture, geography and deployment model compared side by side, with commercial terms quoted per mandate.' },
  { n: '04', title: 'Deploy', desc: 'We coordinate contracting, provisioning, deployment and ongoing infrastructure support. You contract directly with the provider.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-surface/50 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-[720px] mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            How the Aggregator Model Works
          </div>
          <h2 className="font-display font-bold text-[32px] lg:text-[44px] leading-[1.05] tracking-[-0.02em]">
            Why Anthroprime
          </h2>
          <p className="text-muted text-[16px] mt-4">
            One desk between you and the entire GPU market — requirement in, deployed infrastructure out.
          </p>
        </div>

        <div className="relative mt-16">
          {/* animated connecting line */}
          <div className="hidden lg:block absolute top-[28px] left-[12%] right-[12%] h-px bg-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
            className="hidden lg:block absolute top-[28px] left-[12%] right-[12%] h-px bg-gradient-to-r from-accent/60 via-accent/30 to-accent/60"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.15 }}
                className="relative group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-bg border border-border flex items-center justify-center font-mono text-[12px] font-bold text-accent group-hover:border-accent/40 group-hover:glow transition-all relative z-10">
                    {s.n}
                  </div>
                  <div className="h-px flex-1 bg-border lg:hidden" />
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex w-8 h-8 rounded-full bg-accent/10 border border-accent/20 items-center justify-center relative z-10">
                      <span className="text-accent text-[12px]">→</span>
                    </div>
                  )}
                </div>
                <h3 className="font-display font-semibold text-[16px] leading-tight group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="text-[13.5px] leading-[1.5] text-muted mt-2.5">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-bg border border-border p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div>
            <div className="font-display font-semibold text-[16px]">Access GPU capacity through our infrastructure network.</div>
            <div className="font-mono text-[12px] text-faint mt-1">Provider-agnostic • No lock-in • Enterprise-grade verification</div>
          </div>
          <Link to="/find-capacity" className="px-5 py-2.5 rounded-xl bg-accent text-bg font-semibold text-[13.5px] hover:bg-accent2 transition-colors shrink-0">
            Start a Sourcing Mandate →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
