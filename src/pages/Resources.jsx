import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, BarChart3, BookOpen, LineChart, Boxes } from 'lucide-react'
import { PageHero, Reveal, SectionHead } from '../components/ui'
import { GPUS, GPU_ORDER } from '../data/gpus'
import { marketSummary, MARKET_DATA, PROVIDER_META } from '../data/marketPricing'
import FinalCTA from '../components/FinalCTA'

const COMPARE_ROWS = [
  ['GPU memory', g => g.specs['GPU memory'] || g.specs['GPUs per rack']],
  ['Memory bandwidth', g => g.specs['Memory bandwidth'] || '—'],
  ['FP8 Tensor (sparse)', g => g.specs['FP8 Tensor'] || g.specs['FP4 Tensor'] || '—'],
  ['BF16 / FP16 Tensor', g => g.specs['BF16 / FP16 Tensor'] || '—'],
  ['NVLink', g => g.specs['NVLink'] || g.specs['NVLink domain'] || '—'],
  ['Max power', g => g.specs['Max power'] || '—'],
  ['Generation', g => g.generation],
]

function CompareTool() {
  const [selected, setSelected] = useState(['h100', 'h200', 'b200'])
  const navigate = useNavigate()

  const toggle = (slug) => setSelected(prev => {
    if (prev.includes(slug)) return prev.length > 1 ? prev.filter(x => x !== slug) : prev
    if (prev.length >= 3) return [...prev.slice(1), slug]
    return [...prev, slug]
  })

  return (
    <div id="comparison" className="scroll-mt-28 rounded-[20px] bg-surface border border-border overflow-hidden">
      <div className="px-6 lg:px-8 pt-6 pb-4 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="font-display font-semibold text-[17px]">GPU Comparison</div>
          <div className="font-mono text-[12px] text-faint mt-0.5">Pick up to 3 accelerators · per NVIDIA public datasheets</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {GPU_ORDER.map(slug => {
            const g = GPUS[slug]
            const on = selected.includes(slug)
            return (
              <button key={slug} onClick={() => toggle(slug)} aria-pressed={on}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[12px] border transition-all ${on ? 'bg-accent text-bg border-accent glow' : 'bg-bg border-border text-muted hover:text-text hover:border-border2'}`}>
                {g.name}
              </button>
            )
          })}
        </div>
      </div>

      <motion.div key={selected.join('|')} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left font-mono text-[11px] tracking-wide uppercase text-faint font-medium px-6 lg:px-8 py-4 w-[190px]">Spec</th>
              {selected.map(slug => {
                const g = GPUS[slug]
                return (
                  <th key={slug} className="text-left px-4 py-4">
                    <div className="font-display font-bold text-[18px]">{g.name}</div>
                    <div className="font-mono text-[10.5px] text-faint">{g.generation} · {g.tagline}</div>
                    <div className="mt-2 flex gap-2">
                      <Link to={`/gpu/${slug}`} className="font-mono text-[10.5px] px-2.5 py-1 rounded-full border border-border text-muted hover:text-accent hover:border-accent/30 transition-colors">Specs →</Link>
                      <button onClick={() => navigate('/find-capacity', { state: { gpu: g.name } })} className="font-mono text-[10.5px] px-2.5 py-1 rounded-full bg-accent text-bg font-semibold hover:bg-accent2 transition-colors">Source →</button>
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COMPARE_ROWS.map(([label, get]) => (
              <tr key={label} className="hover:bg-surface2/50 transition-colors">
                <td className="px-6 lg:px-8 py-3.5 font-mono text-[11.5px] text-faint uppercase tracking-wide">{label}</td>
                {selected.map(slug => (
                  <td key={slug} className="px-4 py-3.5 font-mono text-[12.5px] text-text leading-[1.5]">{get(GPUS[slug])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <div className="px-6 lg:px-8 py-4 border-t border-border font-mono text-[11px] text-faint">
        * Sparse acceleration where applicable · Sources: NVIDIA public datasheets · Availability verified per mandate — never assumed.
      </div>
    </div>
  )
}

const ECON_LABEL = { h100: 'H100', h200: 'H200', b200: 'B200 / GB200', a100: 'A100', l40s: 'L40S', mi300x: 'Ent. Accelerators' }

function Economics() {
  const summary = marketSummary().filter(s => ['h100', 'h200', 'b200', 'a100', 'l40s'].includes(s.family))
  const max = Math.max(...summary.map(s => s.median))

  return (
    <div id="economics" className="scroll-mt-28 rounded-[20px] bg-surface border border-border p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="font-display font-semibold text-[17px]">GPU Pricing Economics · {MARKET_DATA.asOf}</div>
          <div className="font-mono text-[12px] text-faint mt-0.5">Median market $/GPU/hr by family — commitment and configuration move these numbers significantly.</div>
        </div>
        <Link to="/marketplace" className="inline-flex items-center gap-1.5 font-mono text-[12px] text-accent hover:underline shrink-0">Full marketplace <ArrowUpRight className="w-3.5 h-3.5" /></Link>
      </div>

      <div className="mt-6 space-y-4">
        {summary.map(s => {
          const pm = PROVIDER_META[s.cheapest?.provider]
          return (
            <div key={s.family} className="grid grid-cols-[70px_1fr_150px] sm:grid-cols-[90px_1fr_220px] items-center gap-4">
              <div className="font-mono font-bold text-[13.5px]">{ECON_LABEL[s.family] || s.family}</div>
              <div className="h-7 rounded-lg bg-bg border border-border overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(6, (s.median / max) * 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-lg bg-gradient-to-r from-accent/70 to-accent/30"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[11.5px] font-bold text-text">${s.median.toFixed(2)}/hr median</span>
              </div>
              <div className="font-mono text-[10.5px] text-faint leading-tight hidden sm:block">
                low ${s.min.toFixed(2)} ({pm?.name || s.cheapest?.provider}) · {s.providerCount} providers
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-border grid sm:grid-cols-3 gap-4">
        {[
          ['Commitment', '1–3 year reservations typically beat on-demand list pricing by a wide margin. We model the tradeoff.'],
          ['Configuration', 'Interconnect, storage tier and node shape change effective $/useful-FLOP more than list price does.'],
          ['Geography', 'The same GPU carries different prices in different regions — sourcing geography is a pricing lever.'],
        ].map(([t, d]) => (
          <div key={t}>
            <div className="font-display font-semibold text-[13.5px]">{t}</div>
            <div className="text-[12px] leading-[1.55] text-muted mt-1">{d}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Resources() {
  const guides = [
    { icon: BookOpen, tag: 'In Progress', title: 'AI Infrastructure Guides', desc: 'Choosing between on-demand, reserved, bare-metal and private cloud — with decision trees from live mandates.' },
    { icon: Boxes, tag: 'In Progress', title: 'Architecture Guides', desc: 'Network, storage and orchestration patterns for large-scale training and inference clusters.' },
    { icon: BarChart3, tag: 'In Progress', title: 'Benchmark Library', desc: 'Workload-specific throughput and cost benchmarks, published as mandates allow.' },
    { icon: LineChart, tag: 'Coming Soon', title: 'Blog', desc: 'Field notes from the capacity desk — sourcing, verification and deployment learnings.' },
  ]

  return (
    <>
      <PageHero
        crumb="Resources"
        title="Compare first."
        highlight="Then decide."
        sub="Datasheet-accurate GPU comparisons, live market pricing economics, and the guides we build from real mandates."
      />

      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 space-y-10">
          <Reveal><CompareTool /></Reveal>
          <Reveal><Economics /></Reveal>

          <div id="guides" className="scroll-mt-28">
            <SectionHead tag="Guides & Writing" title="Knowledge, built from live mandates." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {guides.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.05}>
                  <div className="rounded-2xl bg-surface border border-dashed border-border p-6 hover:border-border2 hover:bg-surface2 hover:-translate-y-0.5 transition-all h-full">
                    <div className="flex items-center justify-between">
                      <g.icon className="w-5 h-5 text-faint" />
                      <span className="font-mono text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full bg-surface3 border border-border text-faint">{g.tag}</span>
                    </div>
                    <h3 className="font-display font-semibold text-[15.5px] mt-4">{g.title}</h3>
                    <p className="text-[13px] leading-[1.5] text-muted mt-2">{g.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-6 font-mono text-[12px] text-faint">
              Need the knowledge now? It already lives with our desk — <Link to="/contact" className="text-accent hover:underline">talk to an expert →</Link>
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
