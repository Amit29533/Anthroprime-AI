import React from 'react'
import { motion } from 'framer-motion'

const expectations = [
  { k: 'First response', v: 'Within 24 hours' },
  { k: 'Feasibility read', v: '2–5 days' },
  { k: 'Disclosure', v: 'NDA on request' },
]

export default function Company() {
  return (
    <section id="company" className="py-20 lg:py-28 bg-surface/50 border-y border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div id="about" className="scroll-mt-24">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" /> Company
          </div>
          <h2 className="font-display font-bold text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.02em]">
            About Anthroprime AI Infrastructure Advisory
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-[1.6] text-muted">
            <p>
              Anthroprime AI Infrastructure Advisory is the AI infrastructure practice of Anthroprime Technology — India-led and globally connected. GPU Capacity Desk, our first commercial offering, represents qualified enterprise buyers end-to-end: translating a workload into a comparable specification, finding and verifying supply, negotiating commercial terms, and governing deployment after contract.
            </p>
            <p className="text-text font-medium">
              We sell verified execution, not a list of GPU suppliers. We source dedicated GPU infrastructure across multiple providers and regions. Our team helps enterprises identify and deploy suitable GPU infrastructure.
            </p>
          </div>

          <div id="partners" className="mt-12 scroll-mt-24 rounded-2xl bg-bg border border-border p-6">
            <h3 className="font-display font-semibold text-[16px]">Partners</h3>
            <p className="text-[14px] leading-[1.6] text-muted mt-3">
              We work with a vetted panel of infrastructure operators, cloud providers and data-centre partners across India, Southeast Asia, the Middle East, Europe and North America. Partner identities are disclosed to qualified buyers under NDA as part of an active sourcing mandate — we don't publish partner names without permission.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Hyperscalers', 'Neoclouds', 'Colo & DC Operators', 'OEM & Finance', 'Network & Storage'].map(t => (
                <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-surface3 border border-border text-faint">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div id="contact" className="scroll-mt-24">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" /> Contact
          </div>
          <h2 className="font-display font-bold text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.02em]">
            Talk to the desk.
          </h2>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 rounded-2xl bg-bg border border-border overflow-hidden divide-y divide-border">
            <div className="flex items-center justify-between p-5">
              <span className="font-mono text-[11px] uppercase tracking-wide text-faint">Entity</span>
              <span className="text-[14px] font-medium">Anthroprime Technology Private Limited</span>
            </div>
            <div className="flex items-center justify-between p-5">
              <span className="font-mono text-[11px] uppercase tracking-wide text-faint">Based in</span>
              <span className="text-[14px] text-muted">Gurugram, India — serving globally</span>
            </div>
            <div className="flex items-center justify-between p-5">
              <span className="font-mono text-[11px] uppercase tracking-wide text-faint">WhatsApp</span>
              <a href="https://wa.me/919711554410" target="_blank" rel="noopener" className="font-mono text-[13px] text-accent hover:underline">+91 97115 54410</a>
            </div>
            <div className="flex items-center justify-between p-5">
              <span className="font-mono text-[11px] uppercase tracking-wide text-faint">Email</span>
              <a href="mailto:desk@anthroprime.ai" className="font-mono text-[13px] text-muted hover:text-accent transition-colors">desk@anthroprime.ai</a>
            </div>
          </motion.div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {expectations.map(x => (
              <div key={x.k} className="rounded-xl bg-bg border border-border p-3.5 text-center hover:border-accent/20 transition-colors">
                <div className="font-display font-semibold text-[13px] leading-tight">{x.v}</div>
                <div className="font-mono text-[10px] text-faint uppercase mt-1">{x.k}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <a href="https://wa.me/919711554410?text=Hi%20AnthroPrime%2C%20I%27d%20like%20to%20talk%20to%20an%20AI%20infrastructure%20expert." target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-accent text-bg font-semibold text-[14px] hover:bg-accent2 transition-colors glow">
              Message the Desk on WhatsApp →
            </a>
            <a href="mailto:desk@anthroprime.ai?subject=AI%20infrastructure%20enquiry" className="inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-surface border border-border text-text font-medium text-[14px] hover:border-border2 hover:bg-surface2 transition-all">
              Email the Desk
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
