import React from 'react'
import { motion } from 'framer-motion'

const specs = [
  { title: '8-GPU nodes & multi-node clusters', sub: 'NVIDIA HGX platforms', icon: '◧' },
  { title: 'NVLink / NVSwitch', sub: 'Full GPU-to-GPU bandwidth', icon: '⇄' },
  { title: 'InfiniBand networking', sub: '200 / 400 / 800 Gbps fabric', icon: '⚡' },
  { title: 'High-performance storage', sub: 'Training and checkpoint throughput', icon: '⬡' },
  { title: 'Cluster orchestration', sub: 'Kubernetes & Slurm', icon: '⎔' },
  { title: 'Containerized AI environments', sub: 'Reproducible, portable stacks', icon: '⬔' },
]

const useCases = ['Model Training', 'Fine-Tuning', 'Inference', 'GenAI', 'LLM', 'Computer Vision', 'Research', 'HPC']

export default function DedicatedClusters() {
  return (
    <section id="sol-clusters" className="py-20 lg:py-28 bg-surface/50 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-[0.08]" />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" /> Dedicated AI Clusters
          </div>
          <h2 className="font-display font-bold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em]">
            Complete GPU clusters, designed and sourced for large AI workloads.
          </h2>
          <p className="text-[16px] leading-[1.6] text-muted mt-4">
            From a single 8-GPU node to multi-node HGX clusters — we design the architecture and source the infrastructure behind it. No false inventory claims; every configuration is verified at time of mandate.
          </p>
        </div>

        <div className="mt-12 rounded-[20px] border border-border overflow-hidden bg-bg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border lg:divide-y-0 border-b border-border">
            {specs.slice(0,3).map((s) => (
              <div key={s.title} className="p-6 lg:p-7 bg-surface hover:bg-surface2 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-surface3 border border-border flex items-center justify-center text-faint group-hover:text-accent group-hover:border-accent/20 transition-colors">{s.icon}</div>
                  <div>
                    <div className="font-medium text-[14.5px] leading-tight">{s.title}</div>
                    <div className="font-mono text-[12px] text-faint mt-1">{s.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {specs.slice(3).map((s) => (
              <div key={s.title} className="p-6 lg:p-7 bg-surface hover:bg-surface2 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-surface3 border border-border flex items-center justify-center text-faint group-hover:text-accent group-hover:border-accent/20 transition-colors">{s.icon}</div>
                  <div>
                    <div className="font-medium text-[14.5px] leading-tight">{s.title}</div>
                    <div className="font-mono text-[12px] text-faint mt-1">{s.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint">Use Cases</div>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="flex flex-wrap gap-2.5">
            {useCases.map((uc, i) => (
              <motion.span
                key={uc}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2.5 rounded-xl bg-surface border border-border font-display font-medium text-[14px] hover:border-accent/30 hover:text-accent transition-colors"
              >
                {uc}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
