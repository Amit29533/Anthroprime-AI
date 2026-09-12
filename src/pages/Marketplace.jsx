import React, { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowUpRight, ArrowDownUp, ExternalLink } from 'lucide-react'
import { PageHero, Reveal, CTAPrimary } from '../components/ui'
import { CAPACITY_DATA, PROVIDER_META, capacitySummary } from '../data/capacity'

/* Labels mirror the GPU Capacity Desk list: H100 · H200 · B200/GB200 · A100 · L40S · Enterprise Accelerators */
const FAMILY_LABEL = { h100: 'H100', h200: 'H200', b200: 'B200 / GB200', a100: 'A100', l40s: 'L40S', mi300x: 'Ent. Accelerators' }
const FAMILY_ORDER = ['h100', 'h200', 'b200', 'a100', 'l40s', 'mi300x']
/* SKUs outside the desk list are grouped under their desk category (Blackwell / Enterprise Accelerators) */
const DESK_FAMILY = { b300: 'b200', gb300: 'b200', b200: 'b200', gb200: 'b200', mi300x: 'mi300x' }
const KIND_STYLE = {
  'on-demand': 'bg-accentDim text-accent border-accent/20',
  'spot': 'bg-gold/10 text-gold border-gold/20',
  'serverless': 'bg-purple/10 text-purple border-purple/25',
  'secure': 'bg-surface3 text-muted border-border',
  'community': 'bg-surface3 text-muted border-border',
}
const KIND_LABEL = {
  'on-demand': 'On-demand',
  'spot': 'Spot',
  'serverless': 'Serverless',
  'secure': 'Secure',
  'community': 'Community',
}

function slugForFamily(fam) {
  return fam === 'b200' ? 'b200' : fam === 'mi300x' ? null : fam
}

export default function Marketplace() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [family, setFamily] = useState(params.get('gpu') || 'all')
  const [kind, setKind] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('family')

  useEffect(() => {
    const g = params.get('gpu')
    if (g) setFamily(g)
  }, [params])

  const all = useMemo(() => CAPACITY_DATA.offers
    .map(([provider, gpu, variant, vram, kind, minGpus]) => ({ provider, gpu, variant, vram, kind, minGpus, deskFamily: DESK_FAMILY[gpu] || gpu }))
    .filter(o => FAMILY_LABEL[o.deskFamily]), [])

  const filtered = useMemo(() => {
    let rows = all
    if (family !== 'all') rows = rows.filter(o => o.deskFamily === family)
    if (kind !== 'all') rows = rows.filter(o => o.kind === kind)
    if (query.trim()) {
      const q = query.toLowerCase()
      rows = rows.filter(o =>
        o.gpu.includes(q) || o.variant.toLowerCase().includes(q) ||
        (PROVIDER_META[o.provider]?.name || o.provider).toLowerCase().includes(q))
    }
    const byFamily = (a, b) => FAMILY_ORDER.indexOf(a.deskFamily) - FAMILY_ORDER.indexOf(b.deskFamily)
    switch (sort) {
      case 'family': rows = [...rows].sort(byFamily); break
      case 'provider': rows = [...rows].sort((a, b) => (PROVIDER_META[a.provider]?.name || a.provider).localeCompare(PROVIDER_META[b.provider]?.name || b.provider)); break
      case 'vram-desc': rows = [...rows].sort((a, b) => b.vram - a.vram); break
      case 'mingpus-asc': rows = [...rows].sort((a, b) => a.minGpus - b.minGpus); break
      default: break
    }
    return rows
  }, [all, family, kind, query, sort])

  const summary = useMemo(() => capacitySummary()
    .slice()
    .sort((a, b) => FAMILY_ORDER.indexOf(a.family) - FAMILY_ORDER.indexOf(b.family)), [])
  const hasFilters = family !== 'all' || kind !== 'all' || query !== ''
  const clear = () => { setFamily('all'); setKind('all'); setQuery(''); navigate('/marketplace', { replace: true }) }

  const request = (row) => {
    const gpuLabel = row.gpu === 'mi300x' ? 'Enterprise Accelerators'
      : row.gpu.toUpperCase().startsWith('B3') || row.gpu === 'gb300' || row.gpu === 'gb200' ? 'B200 / GB200'
      : row.gpu.toUpperCase()
    navigate('/find-capacity', {
      state: {
        gpu: gpuLabel,
        gpuQty: row.minGpus > 1 ? String(row.minGpus) : '',
        workload: `${row.variant} · ${row.vram} GB · ${KIND_LABEL[row.kind] || row.kind} (${PROVIDER_META[row.provider]?.name || row.provider})`,
        deployType: row.kind === 'spot' ? 'Bare Metal' : 'Managed',
      },
    })
  }

  return (
    <>
      <PageHero
        crumb="Marketplace"
        title="GPU Capacity"
        highlight="Marketplace"
        sub="The accelerator families, configurations and deployment models we track across our infrastructure network — availability, memory profile and provider coverage at a glance. Commercials are quoted per mandate and verified at the time of your request."
      >
        <div className="flex flex-wrap items-center gap-3">
          <CTAPrimary to="/find-capacity">Find GPU Capacity</CTAPrimary>
          <span className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-surface border border-border text-faint inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {all.length} configurations · {Object.keys(PROVIDER_META).length} providers tracked
          </span>
        </div>
      </PageHero>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {summary.map((s, i) => {
              const active = family === s.family
              const slug = slugForFamily(s.family)
              return (
                <Reveal key={s.family} delay={i * 0.04}>
                  <button
                    onClick={() => setFamily(active ? 'all' : s.family)}
                    aria-pressed={active}
                    className={`w-full text-left rounded-xl border p-4 transition-all group ${active ? 'bg-accentDim border-accent/40 glow' : 'bg-surface border-border hover:border-accent/25 hover:bg-surface2'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-[16px]">{FAMILY_LABEL[s.family]}</span>
                      <span className="font-mono text-[10px] text-faint">{s.vram}GB</span>
                    </div>
                    <div className="mt-2 font-mono text-[13px]">
                      <span className="text-accent">{s.count}</span>
                      <span className="text-faint text-[11px]"> configurations</span>
                    </div>
                    <div className="font-mono text-[10.5px] text-faint mt-0.5">{s.providerCount} {s.providerCount === 1 ? 'provider' : 'providers'} · {s.kindCount} {s.kindCount === 1 ? 'type' : 'types'}</div>
                    {slug && <div className="mt-2 font-mono text-[10px] text-faint group-hover:text-accent transition-colors">{active ? 'Clear filter ×' : 'Filter configurations →'}</div>}
                  </button>
                </Reveal>
              )
            })}
          </div>

          {/* Filter bar */}
          <Reveal delay={0.1} className="mt-8">
            <div className="rounded-2xl bg-surface border border-border p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search GPU, variant or provider…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg border border-border text-[13.5px] text-text placeholder:text-faint focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'on-demand', 'spot', 'serverless'].map(k => (
                  <button key={k} onClick={() => setKind(k)} aria-pressed={kind === k}
                    className={`px-3.5 py-2 rounded-full font-mono text-[12px] border transition-all ${kind === k ? 'bg-accent text-bg border-accent' : 'bg-bg border-border text-muted hover:text-text hover:border-border2'}`}>
                    {k === 'all' ? 'All types' : (KIND_LABEL[k] || k)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <ArrowDownUp className="w-4 h-4 text-faint" />
                <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort configurations"
                  className="px-3 py-2 rounded-xl bg-bg border border-border font-mono text-[12px] text-muted focus:outline-none focus:border-accent/50 cursor-pointer">
                  <option value="family">GPU family</option>
                  <option value="provider">Provider · A–Z</option>
                  <option value="vram-desc">Memory · high → low</option>
                  <option value="mingpus-asc">Minimum GPUs · low → high</option>
                </select>
              </div>
            </div>
          </Reveal>

          {/* Table */}
          <div className="mt-6 rounded-2xl border border-border overflow-hidden bg-surface">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px]">
                <thead>
                  <tr className="border-b border-border bg-surface2/50">
                    {['Provider', 'GPU / Variant', 'Memory', 'Commercials', 'Type', 'Min GPUs', ''].map(h => (
                      <th key={h} className="text-left font-mono text-[11px] tracking-wide uppercase text-faint font-medium px-5 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <AnimatePresence initial={false}>
                    {filtered.map((row, i) => {
                      const pm = PROVIDER_META[row.provider] || { name: row.provider, url: '#' }
                      return (
                        <motion.tr
                          key={`${row.provider}-${row.variant}-${row.vram}-${row.kind}-${row.minGpus}`}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, transition: { delay: Math.min(i * 0.02, 0.3) } }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-surface2/60 transition-colors group"
                        >
                          <td className="px-5 py-3.5">
                            <a href={pm.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-medium text-[14px] hover:text-accent transition-colors">
                              {pm.name} <ExternalLink className="w-3 h-3 text-faint opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="font-mono font-semibold text-[13.5px]">{FAMILY_LABEL[row.deskFamily]}</div>
                            <div className="font-mono text-[11px] text-faint">{row.variant}</div>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-[13px] text-muted">{row.vram} GB</td>
                          <td className="px-5 py-3.5">
                            <span className="font-mono text-[12px] px-2.5 py-1 rounded-full bg-surface3 border border-border text-muted whitespace-nowrap">Price on request</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`font-mono text-[10.5px] px-2.5 py-1 rounded-full border ${KIND_STYLE[row.kind]}`}>{KIND_LABEL[row.kind] || row.kind}</span>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-[13px] text-muted">{row.minGpus}×</td>
                          <td className="px-5 py-3.5 text-right">
                            <button onClick={() => request(row)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-bg font-mono text-[11.5px] text-accent hover:border-accent/30 hover:bg-accentDim transition-colors">
                              Request via desk ↗
                            </button>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-14 text-center">
                        <div className="font-display font-semibold text-[15px]">No configurations match those filters.</div>
                        <div className="text-[13px] text-muted mt-1.5">Most capacity is sourced on request, not listed. <Link to="/find-capacity" className="text-accent hover:underline">Ask us anyway →</Link></div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 bg-surface2/30 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="font-mono text-[11.5px] text-faint">
                Showing {filtered.length} of {all.length} configurations
                {hasFilters && <button onClick={clear} className="ml-3 inline-flex items-center gap-1 text-accent hover:underline"><X className="w-3 h-3" /> Clear filters</button>}
              </p>
              <div className="font-mono text-[11px] text-faint flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Commercials quoted per mandate · availability verified at time of request
              </div>
            </div>
          </div>

          {/* how to read the table + roadmap */}
          <div className="mt-8 grid lg:grid-cols-3 gap-4">
            <Reveal className="lg:col-span-2">
              <div className="rounded-2xl bg-gradient-to-br from-surface to-surface2 border border-border p-6 h-full">
                <div className="font-display font-semibold text-[15px]">Reading this table correctly</div>
                <ul className="mt-3 space-y-2 text-[13px] leading-[1.55] text-muted">
                  <li>• These are <span className="text-text">configurations of third-party providers</span> we track — a view of the market, not Anthroprime inventory or quotes.</li>
                  <li>• Commercials are never published: availability, term, geography and commitment all move them, so we quote per mandate and negotiate on your behalf.</li>
                  <li>• Spot/community tiers are interruptible; on-demand is firm; serverless is a per-use platform model.</li>
                </ul>
                <div className="mt-4">
                  <Link to="/find-capacity" className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-full bg-surface3 border border-border text-faint hover:text-text transition-colors">
                    Request commercials for a configuration <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-2xl bg-accentDim border border-accent/20 p-6 h-full">
                <div className="font-mono text-[11px] uppercase tracking-wide text-accent">Roadmap · Two-sided market</div>
                <div className="font-display font-medium text-[14px] mt-2 leading-snug">Filters coming: Country · Interconnect · Availability window · Contract duration. Suppliers will be able to list capacity.</div>
                <a href="mailto:desk@anthroprime.ai?subject=Listing%20GPU%20capacity%20(supply%20side)" className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12px] text-accent hover:underline">
                  List GPU Capacity →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
