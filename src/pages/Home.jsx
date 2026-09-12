import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Cpu, Layers, Zap, Globe, Server, Rocket, Network } from 'lucide-react'
import { Tag, Reveal, SectionHead, CTAPrimary, CTAGhost, Stat, Tilt } from '../components/ui'
import CapacityGraph from '../components/CapacityGraph'
import HowItWorks from '../components/HowItWorks'
import GlobalNetwork from '../components/GlobalNetwork'
import WhoWeServe from '../components/WhoWeServe'
import WhyUs from '../components/WhyUs'
import FinalCTA from '../components/FinalCTA'
import { GPUS, GPU_ORDER } from '../data/gpus'
import { marketSummary, MARKET_DATA } from '../data/marketPricing'

const Globe3D = lazy(() => import('../components/Globe3D'))

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="hero" className="relative pt-[104px] lg:pt-[120px] pb-10 lg:pb-16 overflow-hidden">
      {/* 3D globe ambient background, right-weighted */}
      <div className="absolute inset-y-0 right-[-18%] w-[75%] min-w-[520px] opacity-45 hidden lg:block" aria-hidden>
        <Suspense fallback={null}>
          <Globe3D className="w-full h-full" />
        </Suspense>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <div className="max-w-[720px]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur border border-border text-[11px] font-mono tracking-widest uppercase text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Provider-agnostic • Global sourcing • Enterprise scale
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="font-display font-bold text-[42px] sm:text-[56px] lg:text-[72px] leading-[0.94] tracking-[-0.03em] mt-6">
            Global GPU<br />
            <span className="text-muted">Infrastructure.</span><br />
            <span className="relative inline-block">
              One Partner.
              <motion.span layoutId="hero-underline" className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-accent to-transparent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[17px] lg:text-[18px] leading-[1.6] text-muted max-w-[560px] mt-7">
            Source and deploy enterprise AI infrastructure across a global network of GPU clouds, data centers and infrastructure providers — through a single commercial interface.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="flex flex-wrap gap-3 mt-8">
            <CTAPrimary to="/find-capacity">Find GPU Capacity</CTAPrimary>
            <CTAGhost to="/contact">Talk to an AI Infrastructure Expert</CTAGhost>
          </motion.div>

          {/* GPU strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }} className="mt-10">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-faint mb-3">Accelerators across our network</div>
            <div className="flex flex-wrap gap-2">
              {GPU_ORDER.map((slug, i) => {
                const g = GPUS[slug]
                return (
                  <motion.div key={slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.07 }}>
                    <Link to={`/gpu/${slug}`} className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur border border-border hover:border-accent/40 hover:bg-surface2 transition-all">
                      <span className="font-mono font-semibold text-[13px]">{g.name}</span>
                      <span className="font-mono text-[10.5px] text-faint">{g.chips[0]}</span>
                      <ArrowUpRight className="w-3 h-3 text-faint group-hover:text-accent transition-colors" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="grid grid-cols-3 gap-6 mt-12 max-w-[520px] border-t border-border pt-7">
            <Stat value="5" label="Regions sourced" />
            <Stat value="8–8K+" label="GPUs per mandate" />
            <Stat value="34" label="Providers tracked" />
          </motion.div>
        </div>

        {/* Capacity Graph diagram (from the original GPU Capacity Desk) */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.7 }} className="relative mt-10 lg:mt-0">
          <div className="relative rounded-[24px] bg-gradient-to-b from-surface/90 to-surface2/90 backdrop-blur border border-border p-6 lg:p-8 overflow-hidden">
            <div className="absolute inset-0 dot-pattern opacity-15" aria-hidden />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-faint">How the desk works</span>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] text-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> live
                </span>
              </div>
              <CapacityGraph />
              <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10.5px] text-faint">
                Requirement in → network search → verified capacity out
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Live market ticker ---------- */
const TICKER_LABEL = { h100: 'H100', h200: 'H200', b200: 'B200 / GB200', a100: 'A100', l40s: 'L40S', mi300x: 'Ent. Accelerators' }

function MarketTicker() {
  const summary = marketSummary()
  const order = ['h100', 'h200', 'b200', 'a100', 'l40s', 'mi300x']
  const rows = order.map(f => summary.find(s => s.family === f)).filter(Boolean)

  return (
    <Link to="/marketplace" className="block border-y border-border bg-surface/60 hover:bg-surface transition-colors group">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-3.5 flex items-center gap-6 overflow-hidden">
        <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.15em] uppercase text-faint shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Market reference · {MARKET_DATA.asOf}
        </span>
        <div className="flex items-center gap-6 overflow-hidden fade-x">
          {rows.map(r => (
            <span key={r.family} className="inline-flex items-center gap-2 font-mono text-[12.5px] whitespace-nowrap">
              <span className="font-semibold text-text uppercase">{TICKER_LABEL[r.family] || r.family}</span>
              <span className="text-faint">from</span>
              <span className="text-accent">${r.min.toFixed(2)}/hr</span>
              <span className="text-faint text-[11px]">· {r.providerCount} providers</span>
            </span>
          ))}
        </div>
        <span className="ml-auto hidden md:inline-flex items-center gap-1 font-mono text-[11.5px] text-accent shrink-0">Open marketplace <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
      </div>
    </Link>
  )
}

/* ---------- GPU Capacity Aggregation (compact) ---------- */
function GpuCloudSection() {
  const navigate = useNavigate()
  const featured = ['h100', 'h200', 'b200', 'a100']

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHead
            tag="GPU Capacity Aggregation"
            title="One requirement. A global search across our infrastructure network."
            sub="Tell us the GPU, quantity, geography and duration. We search across cloud providers, GPU clouds, data centers and infrastructure partners — you evaluate and choose."
          />
          <Reveal delay={0.1}>
            <Link to="/marketplace" className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-accent hover:underline shrink-0">
              View capacity marketplace <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {featured.map((slug, i) => {
            const g = GPUS[slug]
            return (
              <Reveal key={slug} delay={i * 0.07}>
                <Tilt>
                  <Link to={`/gpu/${slug}`} className="group block relative overflow-hidden rounded-2xl bg-surface border border-border p-6 hover:border-accent/30 hover:bg-surface2 transition-all h-full">
                    <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `${g.accent}22` }} />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full border ${g.generation === 'Blackwell' ? 'bg-gold/10 text-gold border-gold/20' : g.generation === 'Hopper' ? 'bg-accentDim text-accent border-accent/20' : 'bg-surface3 text-faint border-border'}`}>
                          {g.generation}
                        </span>
                        <Cpu className="w-4 h-4 text-faint group-hover:text-accent transition-colors" />
                      </div>
                      <div className="font-display font-bold text-[30px] tracking-tight mt-4">{g.name}</div>
                      <div className="font-mono text-[11px] text-faint mt-0.5">{g.tagline}</div>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {g.chips.slice(0, 3).map(c => (
                          <span key={c} className="font-mono text-[10.5px] px-2 py-0.5 rounded-full bg-surface3 border border-border text-muted">{c}</span>
                        ))}
                      </div>
                      <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between font-mono text-[11px] text-faint group-hover:text-accent transition-colors">
                        Full specs & market pricing <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </Tilt>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.15} className="mt-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-wide uppercase text-faint mr-2">Deployment models</span>
            {['On-demand', 'Reserved', 'Dedicated servers', 'Dedicated clusters', 'Bare-metal', 'Private AI cloud', 'Long-term reservation'].map(d => (
              <span key={d} className="px-3.5 py-1.5 rounded-full bg-surface border border-border font-mono text-[11.5px] text-muted hover:border-accent/25 hover:text-text transition-colors cursor-default">{d}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Dedicated clusters teaser ---------- */
function ClustersSection() {
  const items = [
    { icon: Server, title: '8-GPU HGX nodes', sub: 'A100 · H100 · H200 · B200 platforms' },
    { icon: Zap, title: 'NVLink / NVSwitch', sub: 'Up to 1.8 TB/s per GPU (NVLink 5)' },
    { icon: Network, title: 'InfiniBand fabrics', sub: 'HDR / NDR / XDR · 200–800 Gb/s' },
    { icon: Layers, title: 'HP storage tiers', sub: 'Datasets + checkpoint throughput' },
    { icon: Cpu, title: 'Orchestration', sub: 'Kubernetes & Slurm, tuned' },
    { icon: Rocket, title: 'Containerized AI', sub: 'Reproducible, portable stacks' },
  ]

  return (
    <section className="py-20 lg:py-28 bg-surface/50 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-[0.07]" aria-hidden />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <Reveal>
            <Tag>Dedicated AI Clusters</Tag>
            <h2 className="font-display font-bold text-[30px] lg:text-[42px] leading-[1.08] tracking-[-0.02em]">
              Complete GPU clusters, designed and sourced for large AI workloads.
            </h2>
            <p className="text-[16px] leading-[1.6] text-muted mt-4">
              From a single 8-GPU node to multi-node HGX clusters — we design the architecture and source the infrastructure behind it. Every configuration is verified at time of mandate.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Model Training', 'Fine-Tuning', 'Inference', 'GenAI', 'LLM', 'Computer Vision', 'Research', 'HPC'].map(uc => (
                <span key={uc} className="px-3 py-1.5 rounded-lg bg-bg border border-border font-display font-medium text-[12.5px] text-muted hover:text-accent hover:border-accent/25 transition-colors cursor-default">{uc}</span>
              ))}
            </div>
            <div className="mt-8">
              <CTAGhost to="/solutions/clusters">Explore dedicated clusters →</CTAGhost>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-3">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.05}>
                <div className="group rounded-xl bg-bg border border-border p-5 hover:border-accent/25 hover:bg-surface2 transition-all h-full">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-surface3 border border-border flex items-center justify-center text-faint group-hover:text-accent group-hover:border-accent/20 transition-colors shrink-0">
                      <it.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-[14px] leading-tight">{it.title}</div>
                      <div className="font-mono text-[11.5px] text-faint mt-1">{it.sub}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Services teaser ---------- */
function ServicesTeaser() {
  const cards = [
    { icon: Globe, title: 'GPU Capacity Sourcing', desc: 'Requirement in → verified shortlist out, with comparable commercials.', to: '/services#svc-sourcing' },
    { icon: Layers, title: 'AI Infrastructure Advisory', desc: 'Architecture, TCO and provider selection before capital is committed.', to: '/services#svc-advisory' },
    { icon: Server, title: 'Managed AI Infrastructure', desc: 'Monitoring, hardening, optimization and support after go-live.', to: '/services#svc-managed' },
  ]
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <SectionHead
          tag="AI Infrastructure Services"
          title="From GPU sourcing to production-ready AI infrastructure."
          sub="We don't just provide GPUs — we help determine the right architecture, then keep it running. That's what separates an aggregator from a reseller."
        />
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <Link to={c.to} className="group block rounded-2xl bg-surface border border-border p-7 hover:border-accent/25 hover:bg-surface2 hover:-translate-y-1 transition-all h-full">
                <c.icon className="w-6 h-6 text-accent mb-5" />
                <div className="font-display font-semibold text-[17px] group-hover:text-accent transition-colors">{c.title}</div>
                <p className="text-[13.5px] leading-[1.5] text-muted mt-2">{c.desc}</p>
                <div className="mt-5 font-mono text-[11.5px] text-faint group-hover:text-accent transition-colors inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <MarketTicker />
      <GpuCloudSection />
      <ClustersSection />
      <HowItWorks />
      <GlobalNetwork />
      <ServicesTeaser />
      <WhoWeServe />
      <WhyUs />
      <FinalCTA />
    </>
  )
}
