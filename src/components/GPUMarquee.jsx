import React from 'react'

const gpus = [
  { name: 'NVIDIA H100', mem: '80GB HBM3', status: 'Active' },
  { name: 'NVIDIA H200', mem: '141GB HBM3e', status: 'Active' },
  { name: 'NVIDIA B200', mem: '192GB HBM3e', status: 'Sourcing' },
  { name: 'NVIDIA GB200', mem: '384GB HBM3e', status: 'Sourcing' },
  { name: 'NVIDIA A100', mem: '40/80GB HBM2e', status: 'Active' },
  { name: 'NVIDIA L40S', mem: '48GB GDDR6', status: 'Active' },
  { name: 'Enterprise Accelerators', mem: 'On Request', status: 'Sourcing' },
]

export default function GPUMarquee() {
  return (
    <div className="border-y border-border bg-surface/50 overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {[...gpus, ...gpus, ...gpus].map((gpu, i) => (
          <div key={i} className="inline-flex items-center gap-3 mx-3 px-5 py-2.5 rounded-full bg-surface border border-border">
            <span className={`w-2 h-2 rounded-full ${gpu.status === 'Active' ? 'bg-accent' : 'bg-gold'} animate-pulse`} />
            <span className="font-mono font-medium text-[13px] text-text">{gpu.name}</span>
            <span className="font-mono text-[11px] text-faint">{gpu.mem}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${gpu.status === 'Active' ? 'bg-accentDim text-accent' : 'bg-gold/10 text-gold'}`}>{gpu.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
