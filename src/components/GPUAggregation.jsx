import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Server, Clock, Shield, Boxes, Cloud, Lock, ArrowUpRight } from 'lucide-react'

const gpus = [
  {
    id: 'h100',
    name: 'H100',
    marketFilter: 'H100',
    full: 'NVIDIA H100 Tensor Core',
    desc: 'The workhorse for large-scale training and high-throughput inference. SXM and PCIe form factors sourced across India, APAC, Europe and North America.',
    specs: ['80GB HBM3', '989 TFLOPS FP8', 'SXM5 / PCIe'],
    badge: 'Current Gen',
    accent: 'accent'
  },
  {
    id: 'h200',
    name: 'H200',
    marketFilter: 'H200',
    full: 'NVIDIA H200 Tensor Core',
    desc: '141GB HBM3e for larger context windows, memory-bound LLM workloads and extended training runs without sharding complexity.',
    specs: ['141GB HBM3e', '4.8 TB/s bandwidth', 'HGX H200'],
    badge: 'Higher Memory',
    accent: 'accent'
  },
  {
    id: 'b200',
    name: 'B200 / GB200',
    marketFilter: 'B200',
    full: 'NVIDIA Blackwell Platform',
    desc: 'Next-generation frontier training and inference capacity. We track availability as Blackwell ramps and source on behalf of qualified mandates.',
    specs: ['192GB HBM3e / 384GB', '20 PFLOPS FP4', 'NVLink 5.0'],
    badge: 'Blackwell',
    accent: 'gold'
  },
  {
    id: 'other-gpus',
    name: 'A100 · L40S',
    marketFilter: 'All',
    full: 'Enterprise Fleet',
    desc: 'Cost-efficient training, fine-tuning and inference, plus other enterprise AI accelerators available on request for specific price/performance targets.',
    specs: ['A100 40/80GB', 'L40S 48GB GDDR6', 'On Request'],
    badge: 'Broader Fleet',
    accent: 'faint'
  }
]

const deployments = [
  { icon: Clock, label: 'On-demand GPU' },
  { icon: Server, label: 'Reserved capacity' },
  { icon: Boxes, label: 'Dedicated GPU servers' },
  { icon: Boxes, label: 'Dedicated GPU clusters' },
  { icon: Shield, label: 'Bare-metal GPU' },
  { icon: Cloud, label: 'Private AI cloud' },
  { icon: Lock, label: 'Long-term reservation' },
]

function openMarketplace(filter) {
  window.dispatchEvent(new CustomEvent('ap:gpu-filter', { detail: filter }))
  document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })
}

function GPUCard({ gpu, index }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      key={gpu.id}
      id={gpu.id}
      ref={ref}
      onMouseMove={onMouseMove}
      role="button"
      tabIndex={0}
      aria-label={`${gpu.name} — view sourcing availability in the marketplace`}
      onClick={() => openMarketplace(gpu.marketFilter)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMarketplace(gpu.marketFilter) } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl bg-surface border border-border p-6 hover:border-accent/30 hover:bg-surface2 hover:-translate-y-1 transition-all scroll-mt-24 cursor-pointer"
    >
      {/* cursor spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(47,242,210,0.08), transparent 65%)' }} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className={`font-mono text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full border ${gpu.accent === 'accent' ? 'bg-accentDim text-accent border-accent/20' : gpu.accent === 'gold' ? 'bg-gold/10 text-gold border-gold/20' : 'bg-surface3 text-faint border-border'}`}>
            {gpu.badge}
          </span>
          <span className="font-mono text-[11px] text-faint">{gpu.full}</span>
        </div>
        <div className="font-display font-bold text-[28px] tracking-tight">{gpu.name}</div>
        <p className="text-[14px] leading-[1.5] text-muted mt-3 min-h-[66px]">{gpu.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {gpu.specs.map(s => (
            <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-surface3 border border-border text-muted">{s}</span>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="font-mono text-[11px] text-faint group-hover:text-accent transition-colors">Check sourcing availability</span>
          <ArrowUpRight className="w-4 h-4 text-faint group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </motion.div>
  )
}

export default function GPUAggregation() {
  return (
    <section id="gpu-cloud" className="py-20 lg:py-28 border-t border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="max-w-[760px]">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" /> GPU Capacity Aggregation
          </div>
          <h2 className="font-display font-bold text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.02em]">
            One requirement. A global search across our infrastructure network.
          </h2>
          <p className="text-[17px] leading-[1.6] text-muted mt-4 max-w-[640px]">
            Tell us the GPU, quantity, geography and duration you need. We search across our network of infrastructure and cloud partners and identify suitable options and commercial terms — you evaluate and choose. <span className="text-text font-medium">We source dedicated GPU infrastructure across multiple providers and regions.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {gpus.map((gpu, i) => <GPUCard key={gpu.id} gpu={gpu} index={i} />)}
        </div>

        <div className="mt-10">
          <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-3">Deployment models</div>
          <div className="flex flex-wrap gap-2.5">
            {deployments.map((d) => (
              <div key={d.label} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-[13.5px] text-text hover:border-accent/30 hover:bg-surface2 hover:-translate-y-0.5 transition-all">
                <d.icon className="w-4 h-4 text-faint" />
                {d.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
