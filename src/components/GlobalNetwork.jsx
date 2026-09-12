import React, { useState } from 'react'
import NetworkMap from './NetworkMap'

const regions = [
  { name: 'India', cities: 'Mumbai, Delhi NCR, Hyderabad', status: 'ACTIVE', coords: { x: 68, y: 52 } },
  { name: 'Southeast Asia', cities: 'Singapore, Jakarta, KL', status: 'ACTIVE', coords: { x: 76, y: 60 } },
  { name: 'Middle East', cities: 'Dubai, Riyadh, Doha', status: 'ACTIVE', coords: { x: 58, y: 48 } },
  { name: 'Europe', cities: 'London, Frankfurt, Amsterdam', status: 'ACTIVE', coords: { x: 50, y: 32 } },
  { name: 'North America', cities: 'Virginia, Oregon, Toronto', status: 'ACTIVE', coords: { x: 18, y: 38 } },
]

export default function GlobalNetwork() {
  const [active, setActive] = useState(null)

  return (
    <section id="network" className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" /> Global Infrastructure Network
            </div>
            <h2 className="font-display font-bold text-[32px] lg:text-[44px] leading-[1.05] tracking-[-0.02em]">
              Global Capacity.<br />One Commercial Interface.
            </h2>
            <p className="text-[16px] leading-[1.6] text-muted mt-4">
              Access AI infrastructure across multiple regions without having to independently identify, evaluate and negotiate with multiple infrastructure providers. We are provider-agnostic and disclosure-controlled.
            </p>

            <div className="mt-8 rounded-2xl border border-border overflow-hidden divide-y divide-border bg-surface">
              {regions.map((r) => (
                <button
                  key={r.name}
                  onMouseEnter={() => setActive(r.name)}
                  onFocus={() => setActive(r.name)}
                  onClick={() => setActive(active === r.name ? null : r.name)}
                  className={`w-full flex items-center justify-between p-4 text-left transition-colors group ${active === r.name ? 'bg-surface2' : 'hover:bg-surface2'}`}
                >
                  <div>
                    <div className={`font-medium text-[14px] transition-colors ${active === r.name ? 'text-accent' : 'group-hover:text-accent'}`}>{r.name}</div>
                    <div className="font-mono text-[11px] text-faint mt-0.5">{r.cities}</div>
                  </div>
                  <span className="font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-accentDim text-accent border border-accent/20">{r.status}</span>
                </button>
              ))}
            </div>

            <p className="font-mono text-[11px] text-faint mt-4 leading-[1.5]">
              Partner identities are disclosed to qualified buyers under NDA as part of a sourcing mandate — we never publish partner names without permission.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[24px] bg-surface border border-border p-6 lg:p-8 overflow-hidden relative">
              <div className="absolute inset-0 dot-pattern opacity-10" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px]" />

              {/* Sourcing-region diagram (ported from the original GPU Capacity Desk) */}
              <div className="relative aspect-square w-full bg-bg rounded-xl border border-border overflow-hidden p-6 lg:p-10">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <NetworkMap active={active} onActive={setActive} className="relative w-full h-full" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="px-2.5 py-1 rounded-full bg-bg/80 backdrop-blur border border-border font-mono text-[10px] text-faint">
                    ● 5 regions • Provider-agnostic routing
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-accent text-bg font-mono text-[10px] font-bold">
                    Anthroprime Interface
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-bg border border-border p-3 text-center hover:border-accent/20 transition-colors">
                  <div className="font-display font-bold text-[18px]">5</div>
                  <div className="font-mono text-[10px] text-faint uppercase mt-1">Regions sourced</div>
                </div>
                <div className="rounded-xl bg-bg border border-border p-3 text-center hover:border-accent/20 transition-colors">
                  <div className="font-display font-bold text-[18px]">Single</div>
                  <div className="font-mono text-[10px] text-faint uppercase mt-1">Commercial interface</div>
                </div>
                <div className="rounded-xl bg-bg border border-border p-3 text-center hover:border-accent/20 transition-colors">
                  <div className="font-display font-bold text-[18px]">NDA</div>
                  <div className="font-mono text-[10px] text-faint uppercase mt-1">Controlled disclosure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
