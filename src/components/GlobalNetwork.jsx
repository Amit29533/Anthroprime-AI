import React from 'react'
import { motion } from 'framer-motion'

const regions = [
  { name: 'India', cities: 'Mumbai, Delhi NCR, Hyderabad', status: 'ACTIVE', coords: { x: 68, y: 52 } },
  { name: 'Southeast Asia', cities: 'Singapore, Jakarta, KL', status: 'ACTIVE', coords: { x: 76, y: 60 } },
  { name: 'Middle East', cities: 'Dubai, Riyadh, Doha', status: 'ACTIVE', coords: { x: 58, y: 48 } },
  { name: 'Europe', cities: 'London, Frankfurt, Amsterdam', status: 'ACTIVE', coords: { x: 50, y: 32 } },
  { name: 'North America', cities: 'Virginia, Oregon, Toronto', status: 'ACTIVE', coords: { x: 18, y: 38 } },
]

export default function GlobalNetwork() {
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
                <div key={r.name} className="flex items-center justify-between p-4 hover:bg-surface2 transition-colors group">
                  <div>
                    <div className="font-medium text-[14px] group-hover:text-accent transition-colors">{r.name}</div>
                    <div className="font-mono text-[11px] text-faint mt-0.5">{r.cities}</div>
                  </div>
                  <span className="font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-accentDim text-accent border border-accent/20">{r.status}</span>
                </div>
              ))}
            </div>

            <p className="font-mono text-[11px] text-faint mt-4 leading-[1.5]">
              Partner identities are disclosed to qualified buyers under NDA, as part of a sourcing mandate. Avoid publishing partner names unless we have permission.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[24px] bg-surface border border-border p-6 lg:p-8 overflow-hidden relative">
              <div className="absolute inset-0 dot-pattern opacity-10" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px]" />

              {/* World map SVG simplified */}
              <div className="relative aspect-[1.6/1] w-full bg-bg rounded-xl border border-border overflow-hidden">
                <svg viewBox="0 0 100 60" className="w-full h-full">
                  {/* grid */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1E2A3A" strokeWidth="0.2" opacity="0.3"/>
                    </pattern>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2FF2D2" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2FF2D2" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="100" height="60" fill="url(#grid)" />

                  {/* continents - very simplified blobs */}
                  <g opacity="0.15" fill="#1E2A3A">
                    <path d="M10 20 Q15 15 20 20 T30 25 Q25 30 15 28 Z" /> {/* NA */}
                    <path d="M15 32 Q18 30 20 35 T18 45 Q12 42 15 32" />
                    <path d="M45 15 Q55 12 62 18 T60 32 Q50 35 45 28 Z" /> {/* EU */}
                    <path d="M48 35 Q60 33 68 40 T65 55 Q52 54 48 42 Z" /> {/* Africa */}
                    <path d="M62 18 Q85 16 88 25 T82 45 Q70 48 62 38 Z" /> {/* Asia */}
                    <path d="M72 50 Q78 48 82 55 T75 58 Q70 55 72 50" /> {/* Australia */}
                  </g>

                  {/* connections to center */}
                  {regions.map((r, i) => (
                    <g key={r.name}>
                      <line x1="50" y1="30" x2={r.coords.x} y2={r.coords.y} stroke="#2FF2D2" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.5">
                        <animate attributeName="stroke-dashoffset" from="0" to="8" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
                      </line>
                      <circle cx={r.coords.x} cy={r.coords.y} r="1.8" fill="#2FF2D2" />
                      <circle cx={r.coords.x} cy={r.coords.y} r="3.5" fill="url(#glow)" opacity="0.6">
                        <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  ))}

                  {/* center hub */}
                  <circle cx="50" cy="30" r="3" fill="#070A0F" stroke="#2FF2D2" strokeWidth="0.8" />
                  <circle cx="50" cy="30" r="1.2" fill="#2FF2D2" />
                </svg>

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
                <div className="rounded-xl bg-bg border border-border p-3 text-center">
                  <div className="font-display font-bold text-[18px]">~40%</div>
                  <div className="font-mono text-[10px] text-faint uppercase mt-1">Faster sourcing vs direct</div>
                </div>
                <div className="rounded-xl bg-bg border border-border p-3 text-center">
                  <div className="font-display font-bold text-[18px]">Single</div>
                  <div className="font-mono text-[10px] text-faint uppercase mt-1">Commercial interface</div>
                </div>
                <div className="rounded-xl bg-bg border border-border p-3 text-center">
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
