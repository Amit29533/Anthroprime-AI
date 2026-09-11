import React from 'react'
import { motion } from 'framer-motion'

const customers = [
  { title: 'Enterprises', desc: 'Private AI infrastructure and enterprise GenAI deployments with data residency and security controls.', icon: '◧' },
  { title: 'AI Companies', desc: 'Training and inference infrastructure for AI-native businesses scaling from prototype to production.', icon: '⚡' },
  { title: 'Research & Academia', desc: 'High-performance GPU clusters for advanced research, with grant-friendly commercial models.', icon: '◈' },
  { title: 'Government & Public Sector', desc: 'Sovereign and locally hosted AI infrastructure for regulated and public-sector mandates.', icon: '⬡' },
  { title: 'Cloud & SaaS Companies', desc: 'Additional GPU capacity without building new infrastructure. Burst and reserved models.', icon: '☁' },
  { title: 'System Integrators', desc: 'Backend GPU capacity and infrastructure expertise for their customer projects. White-label capable.', icon: '⎔' },
]

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" className="py-20 lg:py-28 bg-surface/50 border-y border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="max-w-[640px]">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" /> Who We Serve
          </div>
          <h2 className="font-display font-bold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em]">
            Six kinds of buyers.<br />One process.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {customers.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl bg-bg border border-border p-6 hover:border-accent/20 hover:bg-surface2 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-10 h-10 rounded-xl bg-surface3 border border-border flex items-center justify-center text-faint group-hover:text-accent group-hover:border-accent/20 transition-colors mb-4">
                {c.icon}
              </div>
              <h3 className="font-display font-semibold text-[16px]">{c.title}</h3>
              <p className="text-[13.5px] leading-[1.5] text-muted mt-2">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
