import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Zap, Lock, Sigma, Landmark, Network } from 'lucide-react'

const solutions = [
  { id: 'sol-training', title: 'AI Training Infrastructure', desc: 'Multi-node clusters sized for foundation and domain-model pre-training and continued training runs. From 8 to thousands of GPUs.', icon: Rocket },
  { id: 'sol-inference', title: 'AI Inference Infrastructure', desc: 'Latency- and throughput-optimized capacity for production inference at scale. Autoscaling and cost-optimized.', icon: Zap },
  { id: 'sol-private-cloud', title: 'Private AI Cloud', desc: 'Dedicated, single-tenant AI infrastructure for organizations that cannot share capacity. Sovereign options.', icon: Lock },
  { id: 'sol-hpc', title: 'HPC', desc: 'High-performance computing infrastructure for simulation, research and scientific workloads with InfiniBand.', icon: Sigma },
  { id: 'sol-sovereign', title: 'Sovereign AI Infrastructure', desc: 'Locally hosted, India-resident and regionally compliant AI infrastructure for regulated buyers and government.', icon: Landmark },
  { id: 'sol-dedicated', title: 'Dedicated GPU Clusters', desc: 'See Dedicated AI Clusters for full architecture detail: HGX, NVLink, 200/400/800G, storage, K8s/Slurm.', icon: Network, link: '#sol-clusters' },
]

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-surface/50 border-y border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="max-w-[640px]">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" /> Solutions
          </div>
          <h2 className="font-display font-bold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em]">
            Built around the workload, not one GPU generation.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {solutions.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-bg border border-border p-6 lg:p-7 hover:border-accent/25 hover:bg-surface2 hover:-translate-y-1 transition-all group scroll-mt-24 relative overflow-hidden"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(240px circle at 70% 15%, rgba(47,242,210,0.06), transparent 65%)' }} />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-surface3 border border-border flex items-center justify-center text-faint group-hover:text-accent group-hover:border-accent/20 transition-colors mb-4">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-[17px] leading-tight">{s.title}</h3>
                <p className="text-[14px] leading-[1.5] text-muted mt-2.5">
                  {s.desc}
                  {s.link && <a href={s.link} className="text-accent hover:underline ml-1">View details →</a>}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
