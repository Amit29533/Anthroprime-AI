import React from 'react'
import { motion } from 'framer-motion'
import { Search, Compass, Rocket, Settings2, ShieldCheck } from 'lucide-react'

const serviceTiles = [
  { id: 'svc-sourcing', icon: Search, title: 'GPU Capacity Sourcing', desc: 'Requirement in → verified shortlist out. The desk searches the network across providers and geographies.' },
  { id: null, icon: Compass, title: 'AI Infrastructure Advisory', desc: 'Architecture, TCO and provider selection before a dollar is committed.', href: '#svc-advisory' },
  { id: 'svc-deployment', icon: Rocket, title: 'Cluster Deployment', desc: 'Kubernetes / Slurm, GPU drivers and CUDA stack — deployed production-ready.' },
  { id: null, icon: Settings2, title: 'Managed AI Infrastructure', desc: 'Monitoring, optimization, hardening and support once clusters are live.', href: '#svc-managed' },
  { id: 'svc-security', icon: ShieldCheck, title: 'AI Infrastructure Security', desc: 'Hardening, isolation and controlled disclosure for sensitive workloads.' },
]

const advisory = [
  'GPU workload assessment & capacity planning',
  'GPU architecture selection',
  'Cloud vs dedicated infrastructure assessment',
  'TCO optimization',
  'Infrastructure benchmarking',
  'Data-center / location selection',
  'Network and storage architecture',
  'Migration planning',
  'AI infrastructure security',
  'FinOps / GPU cost optimization',
]

const managed = [
  'Cluster deployment & configuration',
  'Kubernetes / Slurm setup',
  'GPU driver and CUDA stack',
  'Monitoring & observability',
  'Infrastructure management',
  'Performance optimization',
  'Security hardening',
  'Backup and resilience',
  'Technical support & SLA',
]

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 border-t border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="max-w-[760px]">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" /> AI Infrastructure Services
          </div>
          <h2 className="font-display font-bold text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.02em]">
            From GPU sourcing to production-ready AI infrastructure.
          </h2>
          <p className="text-[16px] leading-[1.6] text-muted mt-4">
            We don't just provide GPUs — we help determine the right architecture, then keep it running. This is what differentiates us from a simple GPU reseller.
          </p>
        </div>

        {/* Five services at a glance (anchor targets for the Services nav) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-12">
          {serviceTiles.map((t, i) => {
            const inner = (
              <>
                <t.icon className="w-5 h-5 text-faint group-hover:text-accent transition-colors mb-3" />
                <div className="font-display font-semibold text-[13.5px] leading-tight group-hover:text-accent transition-colors">{t.title}</div>
                <div className="text-[12px] leading-[1.5] text-muted mt-1.5">{t.desc}</div>
              </>
            )
            return t.href ? (
              <motion.a
                key={t.title}
                href={t.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl bg-surface border border-border p-4 hover:border-accent/30 hover:bg-surface2 hover:-translate-y-1 transition-all"
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div
                key={t.title}
                id={t.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl bg-surface border border-border p-4 hover:border-accent/30 hover:bg-surface2 hover:-translate-y-1 transition-all scroll-mt-28"
              >
                {inner}
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="svc-advisory"
            className="rounded-[20px] bg-surface border border-border p-7 lg:p-8 scroll-mt-28"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display font-bold text-[20px]">AI Infrastructure Advisory</h3>
                <p className="font-mono text-[12px] text-faint mt-1">Determining the right architecture before a dollar is committed.</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accentDim border border-accent/20 flex items-center justify-center text-accent">◈</div>
            </div>
            <ul className="space-y-3">
              {advisory.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-[1.4] text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            id="svc-managed"
            className="rounded-[20px] bg-surface border border-border p-7 lg:p-8 scroll-mt-28"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display font-bold text-[20px]">Managed AI Infrastructure</h3>
                <p className="font-mono text-[12px] text-faint mt-1">Services around the infrastructure, once it's live.</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface3 border border-border flex items-center justify-center text-faint">⬡</div>
            </div>
            <ul className="space-y-3">
              {managed.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-[1.4] text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-faint mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-bg border border-border p-4">
              <div className="font-mono text-[11px] uppercase tracking-wide text-faint">Message</div>
              <div className="font-display font-medium text-[14px] mt-1">From GPU sourcing to production-ready AI infrastructure — with monitoring, hardening and support.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
