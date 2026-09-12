import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const initialData = [
  { id: 'h100-8x-in', gpu: 'H100', config: '8× GPU Node', region: 'India', deployment: 'Bare Metal', availability: 'Request Availability', status: 'active' },
  { id: 'h100-hgx-apac', gpu: 'H100', config: 'HGX Cluster', region: 'APAC', deployment: 'Dedicated', availability: 'Request Availability', status: 'active' },
  { id: 'h200-8x-inap', gpu: 'H200', config: '8× GPU Node', region: 'India / APAC', deployment: 'Dedicated', availability: 'Request Availability', status: 'active' },
  { id: 'h200-hgx-eu', gpu: 'H200', config: 'HGX Cluster', region: 'Europe', deployment: 'Reserved', availability: 'Request Availability', status: 'active' },
  { id: 'b200-cluster-gl', gpu: 'B200', config: 'GPU Cluster', region: 'Global', deployment: 'Dedicated', availability: 'Request Availability', status: 'sourcing' },
  { id: 'a100-8x-in', gpu: 'A100', config: '8× GPU Node', region: 'India', deployment: 'Bare Metal', availability: 'Request Availability', status: 'active' },
  { id: 'l40s-4x-na', gpu: 'L40S', config: '4× GPU Node', region: 'North America', deployment: 'On-Demand', availability: 'Request Availability', status: 'active' },
]

const gpus = ['All', 'H100', 'H200', 'B200', 'A100', 'L40S']
const regionOptions = ['All', ...new Set(initialData.map(r => r.region))]
const deployOptions = ['All', ...new Set(initialData.map(r => r.deployment))]

export default function Marketplace() {
  const [gpu, setGpu] = useState('All')
  const [region, setRegion] = useState('All')
  const [deploy, setDeploy] = useState('All')

  // Listen for filter events from the GPU marquee / GPU cards
  useEffect(() => {
    const onFilter = (e) => {
      setGpu(e.detail || 'All')
      setRegion('All')
      setDeploy('All')
    }
    window.addEventListener('ap:gpu-filter', onFilter)
    return () => window.removeEventListener('ap:gpu-filter', onFilter)
  }, [])

  const filtered = initialData.filter(r =>
    (gpu === 'All' || r.gpu === gpu) &&
    (region === 'All' || r.region === region) &&
    (deploy === 'All' || r.deployment === deploy)
  )

  const hasActiveFilters = gpu !== 'All' || region !== 'All' || deploy !== 'All'

  const requestAvailability = (row) => {
    window.dispatchEvent(new CustomEvent('ap:prefill-capacity', {
      detail: { gpu: row.gpu, config: row.config, region: row.region, deployment: row.deployment }
    }))
    document.getElementById('find-capacity')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="marketplace" className="py-20 lg:py-28 border-t border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" /> GPU Capacity & Availability
            </div>
            <h2 className="font-display font-bold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em]">
              A working view into what we can source right now.
            </h2>
            <p className="text-[15px] leading-[1.6] text-muted mt-3">
              This reflects the categories of capacity we actively search for on behalf of buyers — not owned inventory. Every request is verified against live supply before it's presented to you. <span className="text-text font-medium">We help enterprises identify and deploy suitable GPU infrastructure.</span>
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2.5 items-start lg:items-end">
            <div className="flex flex-wrap gap-2">
              {gpus.map(f => (
                <button key={f} onClick={() => setGpu(f)} aria-pressed={gpu === f} className={`px-3.5 py-2 rounded-full text-[12.5px] font-mono border transition-all ${gpu === f ? 'bg-accent text-bg border-accent glow' : 'bg-surface border-border text-muted hover:text-text hover:border-border2'}`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Filter by region" className="px-3 py-1.5 rounded-full bg-surface border border-border font-mono text-[12px] text-muted hover:border-border2 focus:outline-none focus:border-accent/50 transition-colors cursor-pointer">
                {regionOptions.map(o => <option key={o} value={o}>{o === 'All' ? 'Region: All' : o}</option>)}
              </select>
              <select value={deploy} onChange={(e) => setDeploy(e.target.value)} aria-label="Filter by deployment model" className="px-3 py-1.5 rounded-full bg-surface border border-border font-mono text-[12px] text-muted hover:border-border2 focus:outline-none focus:border-accent/50 transition-colors cursor-pointer">
                {deployOptions.map(o => <option key={o} value={o}>{o === 'All' ? 'Deployment: All' : o}</option>)}
              </select>
              {hasActiveFilters && (
                <button onClick={() => { setGpu('All'); setRegion('All'); setDeploy('All') }} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border text-[12px] font-mono text-faint hover:text-text hover:border-border2 transition-colors">
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border overflow-hidden bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-border bg-surface2/50">
                  <th className="text-left font-mono text-[11px] tracking-wide uppercase text-faint font-medium px-6 py-4">GPU</th>
                  <th className="text-left font-mono text-[11px] tracking-wide uppercase text-faint font-medium px-6 py-4">Configuration</th>
                  <th className="text-left font-mono text-[11px] tracking-wide uppercase text-faint font-medium px-6 py-4">Region</th>
                  <th className="text-left font-mono text-[11px] tracking-wide uppercase text-faint font-medium px-6 py-4">Deployment</th>
                  <th className="text-left font-mono text-[11px] tracking-wide uppercase text-faint font-medium px-6 py-4">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group hover:bg-surface2 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'active' ? 'bg-accent' : 'bg-gold'}`} />
                        <span className="font-mono font-semibold text-[14px]">{row.gpu}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-muted">{row.config}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-surface3 border border-border font-mono text-[12px] text-muted">{row.region}</span>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-muted">{row.deployment}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => requestAvailability(row)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-bg font-mono text-[12px] text-accent hover:border-accent/30 hover:bg-accentDim transition-colors cursor-pointer"
                      >
                        {row.availability} <span className="text-[11px]">↗</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="font-display font-semibold text-[15px]">No listed configuration matches those filters.</div>
                      <div className="text-[13px] text-muted mt-1.5">Most requirements are sourced on request, not listed. <a href="#find-capacity" className="text-accent hover:underline">Ask us anyway →</a></div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-surface2/30 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-mono text-[11.5px] text-faint">
              Showing {filtered.length} of {initialData.length} configurations • Availability is confirmed with our infrastructure network at the time of your request.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-faint">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Live sourcing
            </div>
          </div>
        </div>

        {/* Future marketplace teaser */}
        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-surface to-surface2 border border-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-display font-semibold text-[15px]">Future Phase — Two-Sided GPU Marketplace</div>
              <div className="font-mono text-[12px] text-faint mt-1">Search filters: GPU • Country • Quantity • Price/GPU/hr • Interconnect • Availability • Contract duration. Suppliers will be able to list capacity.</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a href="mailto:desk@anthroprime.ai?subject=Listing%20GPU%20capacity%20(supply%20side)" className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-surface3 border border-border text-muted hover:text-text hover:border-border2 transition-colors">
                List GPU Capacity →
              </a>
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/20">Roadmap</div>
            </div>
          </div>
          <div className="rounded-2xl bg-accentDim border border-accent/20 p-6">
            <div className="font-mono text-[11px] uppercase tracking-wide text-accent">Commercial Model</div>
            <div className="font-display font-medium text-[14px] mt-1 leading-snug">Demand → Supply Aggregation → Platform Matching → AnthroPrime Commercial & Managed Layer</div>
          </div>
        </div>
      </div>
    </section>
  )
}
