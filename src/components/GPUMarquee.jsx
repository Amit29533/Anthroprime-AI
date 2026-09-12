import React from 'react'

const gpus = [
  { name: 'NVIDIA H100', code: 'H100', mem: '80GB HBM3', status: 'Active' },
  { name: 'NVIDIA H200', code: 'H200', mem: '141GB HBM3e', status: 'Active' },
  { name: 'NVIDIA B200', code: 'B200', mem: '192GB HBM3e', status: 'Sourcing' },
  { name: 'NVIDIA GB200', code: 'B200', mem: '384GB HBM3e', status: 'Sourcing' },
  { name: 'NVIDIA A100', code: 'A100', mem: '40/80GB HBM2e', status: 'Active' },
  { name: 'NVIDIA L40S', code: 'L40S', mem: '48GB GDDR6', status: 'Active' },
  { name: 'Enterprise Accelerators', code: 'All', mem: 'On Request', status: 'Sourcing' },
]

function jumpToMarketplace(code) {
  window.dispatchEvent(new CustomEvent('ap:gpu-filter', { detail: code }))
  document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })
}

export default function GPUMarquee() {
  return (
    <div className="border-y border-border bg-surface/50 overflow-hidden py-4 fade-x">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] whitespace-nowrap will-change-transform transition-transform">
        {[...gpus, ...gpus, ...gpus].map((gpu, i) => (
          <button
            key={i}
            onClick={() => jumpToMarketplace(gpu.code)}
            title={`View ${gpu.name} in the capacity marketplace`}
            className="inline-flex items-center gap-3 mx-3 px-5 py-2.5 rounded-full bg-surface border border-border hover:border-accent/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span className={`w-2 h-2 rounded-full ${gpu.status === 'Active' ? 'bg-accent' : 'bg-gold'} animate-pulse`} />
            <span className="font-mono font-medium text-[13px] text-text">{gpu.name}</span>
            <span className="font-mono text-[11px] text-faint">{gpu.mem}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${gpu.status === 'Active' ? 'bg-accentDim text-accent' : 'bg-gold/10 text-gold'}`}>{gpu.status}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
