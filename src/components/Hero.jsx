import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Cpu, Globe, Layers, Zap } from 'lucide-react'

/** Eased count-up used for hero stats */
function useCountUp(target, { duration = 1200, delay = 700 } = {}) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf
    let start
    const t = setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(target * eased))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(t); cancelAnimationFrame(raf) }
  }, [target, duration, delay])
  return val
}

export default function Hero() {
  const regions = useCountUp(5)

  return (
    <section id="hero" className="relative pt-[112px] pb-20 lg:pb-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-[11px] font-mono tracking-widest uppercase text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Provider-agnostic • Global sourcing • Enterprise scale
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-display font-bold text-[40px] sm:text-[52px] lg:text-[68px] leading-[0.95] tracking-[-0.03em] mt-6">
              Global GPU<br />
              <span className="text-muted">Infrastructure.</span><br />
              One Partner.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[18px] leading-[1.6] text-muted max-w-[560px] mt-6">
              We connect enterprises, AI companies and research organizations with GPU infrastructure across multiple cloud providers, data centers and infrastructure partners — sourced, verified and deployed through a single commercial interface.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-3 mt-8">
              <a href="#find-capacity" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-bg font-semibold text-[14.5px] hover:bg-accent2 transition-colors glow">
                Find GPU Capacity <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface border border-border text-text font-medium text-[14.5px] hover:border-border2 hover:bg-surface2 transition-all">
                Talk to an AI Infrastructure Expert
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="grid grid-cols-3 gap-6 mt-12 max-w-[460px] border-t border-border pt-8">
              <div>
                <div className="font-display font-bold text-[28px] leading-none tabular-nums">{regions}</div>
                <div className="font-mono text-[11px] tracking-wide uppercase text-faint mt-1.5">Regions sourced</div>
              </div>
              <div>
                <div className="font-display font-bold text-[28px] leading-none">8–8K+</div>
                <div className="font-mono text-[11px] tracking-wide uppercase text-faint mt-1.5">GPUs per mandate</div>
              </div>
              <div>
                <div className="font-display font-bold text-[28px] leading-none flex items-center gap-1"><span className="text-accent">∞</span></div>
                <div className="font-mono text-[11px] tracking-wide uppercase text-faint mt-1.5">No single-cloud lock-in</div>
              </div>
            </motion.div>
          </div>

          {/* Right - Diagram */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="relative">
            <div className="relative rounded-[24px] bg-gradient-to-b from-surface to-surface2 border border-border p-8 lg:p-10 overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[60px]" />

              {/* Central hub */}
              <div className="relative">
                <div className="flex justify-center mb-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-[16px] blur-xl" />
                    <div className="relative w-[200px] h-[72px] rounded-[16px] bg-[#0A1A18] border border-accent/30 flex flex-col items-center justify-center">
                      <span className="font-display font-bold text-[14px] text-white">Anthroprime.ai</span>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-accent mt-0.5">Capacity Graph</span>
                    </div>
                    {/* pulse dots */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-accent animate-ping" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-accent animate-ping [animation-delay:0.5s]" />
                  </div>
                </div>

                {/* Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ height: '360px', top: '-20px' }}>
                  <line x1="50%" y1="36" x2="20%" y2="80" stroke="#1E2A3A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="50%" y1="36" x2="80%" y2="80" stroke="#1E2A3A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="50%" y1="72" x2="50%" y2="140" stroke="#2FF2D2" strokeWidth="1" strokeDasharray="6 4" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                  </line>
                  <line x1="50%" y1="212" x2="20%" y2="260" stroke="#1E2A3A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="50%" y1="212" x2="80%" y2="260" stroke="#1E2A3A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                </svg>

                {/* Middle row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="rounded-xl bg-surface2 border border-border p-4 text-center">
                    <Cpu className="w-5 h-5 text-faint mx-auto mb-2" />
                    <div className="font-mono text-[11px] text-muted">Your</div>
                    <div className="font-display font-semibold text-[13px]">Requirement</div>
                  </div>
                  <div className="rounded-xl bg-surface2 border border-border p-4 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-1">
                      <Layers className="w-4 h-4 text-accent" />
                    </div>
                    <div className="font-mono text-[10px] text-faint">Verified</div>
                  </div>
                  <div className="rounded-xl bg-surface2 border border-border p-4 text-center">
                    <Zap className="w-5 h-5 text-faint mx-auto mb-2" />
                    <div className="font-mono text-[11px] text-muted">Verified</div>
                    <div className="font-display font-semibold text-[13px]">Capacity</div>
                  </div>
                </div>

                {/* Bottom providers */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Hyperscalers', icon: Globe },
                    { label: 'Neoclouds', icon: Cpu },
                    { label: 'Data Centers', icon: Layers },
                    { label: 'OEM / Finance', icon: Zap },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-surface border border-border px-4 py-3 flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 text-faint" />
                      <span className="font-mono text-[12px] text-muted">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono text-faint">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Live search across infrastructure network
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <span className="font-mono text-[10px] font-bold text-accent">H100</span>
              </div>
              <div>
                <div className="text-[12px] font-medium leading-none">8× HGX</div>
                <div className="font-mono text-[10px] text-faint mt-1">India • Verified</div>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute -bottom-6 -left-6 glass rounded-xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
                <span className="font-mono text-[10px] font-bold text-[#A78BFA]">B200</span>
              </div>
              <div>
                <div className="text-[12px] font-medium leading-none">Cluster • 256 GPUs</div>
                <div className="font-mono text-[10px] text-faint mt-1">Global • Sourcing</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#gpu-cloud"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-3 flex-col items-center gap-1 text-faint hover:text-accent transition-colors"
        aria-label="Scroll to GPU capacity section"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
