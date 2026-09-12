import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, ArrowRight, Check, Cpu } from 'lucide-react'
import { PageHero, Reveal, SectionHead, CTAPrimary, CTAGhost, Tilt } from '../components/ui'
import { GPUS, GPU_ORDER, gpuBySlug } from '../data/gpus'
import { offersForFamily, PROVIDER_META } from '../data/capacity'
import { useTheme } from '../theme'
import FinalCTA from '../components/FinalCTA'

const FAMILY_MAP = { h100: 'h100', h200: 'h200', b200: 'b200', gb200: 'b200', a100: 'a100', l40s: 'l40s' }

function AvailabilityPanel({ slug }) {
  const fam = FAMILY_MAP[slug]
  const offers = offersForFamily(fam)
  if (!offers.length) return null
  const providers = [...new Set(offers.map(o => o.provider))]
  const kinds = [...new Set(offers.map(o => o.kind))]
  const variants = [...new Set(offers.map(o => o.variant))]

  const kindLabel = {
    'on-demand': 'On-demand',
    'spot': 'Spot',
    'serverless': 'Serverless',
    'secure': 'Secure',
    'community': 'Community',
  }

  return (
    <Reveal className="mt-16">
      <div className="rounded-[20px] bg-surface border border-border overflow-hidden">
        <div className="px-6 lg:px-8 py-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-display font-semibold text-[17px]">Availability across our infrastructure network</div>
            <div className="font-mono text-[11.5px] text-faint mt-0.5">
              Configurations we track across {providers.length} providers · verified per mandate, never assumed
            </div>
          </div>
          <Link to={`/find-capacity`} state={{ gpu: slug === 'gb200' ? 'B200 / GB200' : GPUS[slug].name }} className="inline-flex items-center gap-1.5 font-mono text-[12px] text-accent hover:underline shrink-0">
            Request availability & commercials <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-b border-border">
          <div className="p-5">
            <div className="font-mono text-[10.5px] uppercase tracking-wide text-faint">Configurations tracked</div>
            <div className="font-display font-bold text-[24px] mt-1">{offers.length}</div>
            <div className="font-mono text-[11px] text-faint mt-0.5">{variants.length} variants</div>
          </div>
          <div className="p-5">
            <div className="font-mono text-[10.5px] uppercase tracking-wide text-faint">Providers in network</div>
            <div className="font-display font-bold text-[24px] mt-1">{providers.length}</div>
            <div className="font-mono text-[11px] text-faint mt-0.5">{providers.slice(0, 2).map(p => PROVIDER_META[p]?.name || p).join(' · ')}</div>
          </div>
          <div className="p-5">
            <div className="font-mono text-[10.5px] uppercase tracking-wide text-faint">Deployment models</div>
            <div className="font-display font-bold text-[24px] mt-1">{kinds.length}</div>
            <div className="font-mono text-[11px] text-faint mt-0.5">{kinds.map(k => kindLabel[k] || k).join(' · ')}</div>
          </div>
        </div>

        <div className="px-6 lg:px-8 py-4 font-mono text-[11px] text-faint leading-[1.6]">
          We publish no rates: availability, configuration, geography and contract term all move the numbers, so commercials are quoted per mandate and negotiated on your behalf. Tell us the requirement and we verify it against the network.
        </div>
      </div>
    </Reveal>
  )
}

export default function GpuDetail() {
  const { slug } = useParams()
  const gpu = gpuBySlug(slug)
  if (!gpu) return <Navigate to="/marketplace" replace />

  const theme = useTheme()
  const accent = theme === 'dark' ? gpu.accent : (gpu.accentLight || gpu.accent)

  const idx = GPU_ORDER.indexOf(slug)
  const prev = GPU_ORDER[(idx - 1 + GPU_ORDER.length) % GPU_ORDER.length]
  const next = GPU_ORDER[(idx + 1) % GPU_ORDER.length]
  const related = GPU_ORDER.filter(s => s !== slug && GPUS[s].generation === gpu.generation).slice(0, 3)
  const rel = related.length ? related : GPU_ORDER.filter(s => s !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        crumb={`GPU Cloud / ${gpu.name}`}
        title={gpu.name}
        highlight={gpu.generation}
        sub={gpu.desc}
      >
        <div className="flex flex-wrap items-center gap-3">
          <CTAPrimary to="/find-capacity" state={{ gpu: gpu.name }}>Find {gpu.name} Capacity</CTAPrimary>
          <CTAGhost to="/marketplace">Availability & capacity</CTAGhost>
          <span className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-surface border border-border text-faint">{gpu.status}</span>
        </div>
      </PageHero>

      {/* chips strip */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 -mt-4">
        <div className="flex flex-wrap gap-2">
          {gpu.chips.map(c => (
            <span key={c} className="font-mono text-[12px] px-3.5 py-1.5 rounded-full bg-surface border border-border text-muted">{c}</span>
          ))}
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          {/* 3D tilt visual card */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Tilt max={6}>
                <div className="relative rounded-[24px] bg-gradient-to-b from-surface to-surface2 border border-border p-8 lg:p-10 overflow-hidden">
                  <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden />
                  <div className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full blur-[70px]" style={{ background: `${accent}18` }} aria-hidden />

                  <div className="relative" style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint">{gpu.full}</span>
                      <Cpu className="w-5 h-5 text-faint" />
                    </div>

                    {/* stylized GPU die */}
                    <div className="mt-8 flex justify-center">
                      <div className="relative w-[240px] h-[240px]">
                        <div className="absolute inset-0 rounded-[28px] border-2 border-border bg-bg/60" />
                        <div className="absolute inset-[18px] rounded-[20px] border border-border bg-surface2" />
                        <div className="absolute inset-[42px] rounded-[14px] border flex items-center justify-center" style={{ borderColor: `${accent}55`, background: `${accent}0d` }}>
                          <div className="text-center">
                            <div className="font-display font-bold text-[34px] leading-none" style={{ color: accent }}>{gpu.name}</div>
                            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint mt-2">{gpu.generation}</div>
                            <div className="font-mono text-[11px] text-muted mt-3">{gpu.specs['GPU memory'] || gpu.specs['GPUs per rack']}</div>
                          </div>
                        </div>
                        {/* corner pads */}
                        {[['top-2 left-2'], ['top-2 right-2'], ['bottom-2 left-2'], ['bottom-2 right-2']].map(pos => (
                          <div key={pos} className={`absolute ${pos} w-3 h-3 rounded-full bg-surface3 border border-border`} />
                        ))}
                        <motion.div aria-hidden className="absolute inset-[42px] rounded-[14px]" style={{ boxShadow: `0 0 40px ${accent}33` }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} />
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {Object.entries(gpu.specs).slice(0, 4).map(([k, v]) => (
                        <div key={k} className="rounded-xl bg-bg/70 border border-border p-3">
                          <div className="font-mono text-[9.5px] uppercase tracking-wide text-faint">{k}</div>
                          <div className="font-mono text-[12px] text-text mt-1 leading-snug">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>

              {/* best for */}
              <div className="mt-5 rounded-2xl bg-surface border border-border p-6">
                <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-3">Best suited for</div>
                <div className="space-y-2.5">
                  {gpu.bestFor.map(b => (
                    <div key={b} className="flex items-center gap-2.5 text-[13.5px] text-muted">
                      <Check className="w-4 h-4 text-accent shrink-0" /> {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* specs */}
          <div>
            <Reveal>
              <div className="rounded-[20px] bg-surface border border-border overflow-hidden">
                <div className="px-6 lg:px-8 py-5 border-b border-border">
                  <div className="font-display font-semibold text-[17px]">Datasheet specifications</div>
                  <div className="font-mono text-[11.5px] text-faint mt-0.5">Per NVIDIA public datasheets · *sparse where applicable</div>
                </div>
                <div className="divide-y divide-border">
                  {Object.entries(gpu.specs).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] gap-4 px-6 lg:px-8 py-3.5 hover:bg-surface2/50 transition-colors">
                      <div className="font-mono text-[11.5px] uppercase tracking-wide text-faint pt-0.5">{k}</div>
                      <div className="font-mono text-[13px] text-text leading-[1.5]">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* variants */}
            <Reveal delay={0.05} className="mt-6">
              <div className="rounded-[20px] bg-surface border border-border overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="border-b border-border bg-surface2/40">
                      {['Variant', 'Memory', 'Bandwidth', 'Peak (sparse)', 'TDP', 'Typical use'].map(h => (
                        <th key={h} className="text-left font-mono text-[10.5px] tracking-wide uppercase text-faint font-medium px-5 py-3.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {gpu.variants.map(v => (
                      <tr key={v.id} className="hover:bg-surface2/50 transition-colors">
                        <td className="px-5 py-3.5 font-display font-semibold text-[13.5px]">{v.name}</td>
                        <td className="px-5 py-3.5 font-mono text-[12.5px] text-muted">{v.mem}</td>
                        <td className="px-5 py-3.5 font-mono text-[12.5px] text-muted">{v.bw}</td>
                        <td className="px-5 py-3.5 font-mono text-[12.5px] text-muted">{v.fp8}</td>
                        <td className="px-5 py-3.5 font-mono text-[12.5px] text-muted">{v.tdp}</td>
                        <td className="px-5 py-3.5 font-mono text-[12px] text-faint">{v.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            {/* node config */}
            <Reveal delay={0.1} className="mt-6">
              <div className="rounded-[20px] bg-surface border border-border overflow-hidden">
                <div className="px-6 lg:px-8 py-5 border-b border-border flex items-center justify-between">
                  <div className="font-display font-semibold text-[17px]">{gpu.nodeConfig.title}</div>
                  <span className="font-mono text-[10.5px] px-2.5 py-1 rounded-full bg-accentDim text-accent border border-accent/20">REFERENCE</span>
                </div>
                <div className="divide-y divide-border">
                  {gpu.nodeConfig.rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[150px_1fr] gap-4 px-6 lg:px-8 py-3.5 hover:bg-surface2/50 transition-colors">
                      <div className="font-mono text-[11.5px] uppercase tracking-wide text-faint pt-0.5">{k}</div>
                      <div className="text-[13.5px] text-text leading-[1.5]">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <AvailabilityPanel slug={slug} />
        </div>
      </section>

      {/* prev / next + related */}
      <section className="pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rel.map(s => {
              const g = GPUS[s]
              return (
                <Link key={s} to={`/gpu/${s}`} className="group rounded-xl bg-surface border border-border p-5 hover:border-accent/25 hover:bg-surface2 transition-all">
                  <div className="font-mono text-[10px] uppercase tracking-wide text-faint">{g.generation}</div>
                  <div className="font-display font-bold text-[20px] mt-1 group-hover:text-accent transition-colors">{g.name}</div>
                  <div className="font-mono text-[11.5px] text-faint mt-1">{g.chips[0]} · {g.chips[1]}</div>
                </Link>
              )
            })}
            <div className="rounded-xl bg-accentDim border border-accent/20 p-5 flex flex-col justify-between">
              <div className="font-display font-semibold text-[15px]">Not sure which GPU fits your workload?</div>
              <Link to="/services#svc-advisory" className="mt-3 inline-flex items-center gap-1.5 font-mono text-[12px] text-accent hover:underline">
                Get architecture advisory <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <Link to={`/gpu/${prev}`} className="inline-flex items-center gap-2 font-mono text-[12.5px] text-muted hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4" /> {GPUS[prev].name}
            </Link>
            <Link to={`/gpu/${next}`} className="inline-flex items-center gap-2 font-mono text-[12.5px] text-muted hover:text-accent transition-colors">
              {GPUS[next].name} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
