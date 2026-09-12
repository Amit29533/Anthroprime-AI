import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[24px] bg-surface2 border border-border overflow-hidden p-10 lg:p-16 text-center"
        >
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent" />
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
            />
            <div className="absolute inset-0 dot-pattern opacity-20" />
          </div>

          <div className="relative">
            <h2 className="font-display font-bold text-[32px] lg:text-[48px] leading-[0.95] tracking-[-0.02em] text-text">
              Need 8 GPUs or 8,000?
            </h2>
            <p className="text-[16px] lg:text-[18px] leading-[1.5] text-muted max-w-[560px] mx-auto mt-4">
              Tell us what you need. We'll identify the right infrastructure, location and commercial model.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/find-capacity" className="px-7 py-3.5 rounded-xl bg-accent text-bg font-semibold text-[14.5px] hover:bg-accent2 transition-colors glow-strong">
                Find GPU Capacity →
              </Link>
              <Link to="/contact" className="px-7 py-3.5 rounded-xl bg-bg/40 border border-border2 text-text font-medium text-[14.5px] hover:bg-bg/70 transition-colors">
                Talk to an Expert
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] text-faint">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> No lock-in</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> NDA-controlled disclosure</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Provider-agnostic</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
