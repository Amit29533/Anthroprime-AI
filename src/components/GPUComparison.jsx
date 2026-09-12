import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* Public NVIDIA datasheet specifications (not availability claims). */
const gpus = {
  H100: { mem: '80GB HBM3', bw: '3.35 TB/s', fp8: '3,958 TFLOPS*', link: 'NVLink 4 · 900 GB/s', tdp: '700W', best: 'Large-scale training, high-throughput inference' },
  H200: { mem: '141GB HBM3e', bw: '4.8 TB/s', fp8: '3,958 TFLOPS*', link: 'NVLink 4 · 900 GB/s', tdp: '700W', best: 'Long-context LLM inference, memory-bound training' },
  B200: { mem: '192GB HBM3e', bw: '8 TB/s', fp8: '9,000 TFLOPS dense', link: 'NVLink 5 · 1.8 TB/s', tdp: '1,000W', best: 'Frontier training, giant-model inference' },
  GB200: { mem: '384GB HBM3e (superchip)', bw: '16 TB/s aggregate', fp8: '18 PFLOPS dense (2× B200)', link: 'NVLink 5 · 1.8 TB/s per GPU', tdp: 'Rack-scale', best: 'Extreme-scale training (NVL racks)' },
  A100: { mem: '80GB HBM2e', bw: '2.0 TB/s', fp8: 'n/a · 312 TFLOPS TF32*', link: 'NVLink 3 · 600 GB/s', tdp: '400W', best: 'Cost-efficient training, fine-tuning, HPC' },
  L40S: { mem: '48GB GDDR6', bw: '864 GB/s', fp8: '1,466 TFLOPS dense', link: 'PCIe Gen4 (no NVLink)', tdp: '300W', best: 'Inference, fine-tuning, AI + graphics' },
}

const rows = [
  ['Memory', 'mem'],
  ['Memory bandwidth', 'bw'],
  ['FP8 performance', 'fp8'],
  ['Interconnect', 'link'],
  ['TDP', 'tdp'],
  ['Best suited for', 'best'],
]

export default function GPUComparison() {
  const [selected, setSelected] = useState(['H100', 'H200', 'B200'])

  const toggle = (name) => {
    setSelected(prev => {
      if (prev.includes(name)) return prev.length > 1 ? prev.filter(x => x !== name) : prev
      if (prev.length >= 3) return [...prev.slice(1), name]
      return [...prev, name]
    })
  }

  const source = (name) => {
    window.dispatchEvent(new CustomEvent('ap:prefill-capacity', { detail: { gpu: name === 'GB200' ? 'B200' : name } }))
    document.getElementById('find-capacity')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="mt-12 rounded-[20px] bg-surface border border-border overflow-hidden">
      <div className="px-6 lg:px-8 pt-6 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border">
        <div>
          <div className="font-display font-semibold text-[16px]">GPU Comparison</div>
          <div className="font-mono text-[12px] text-faint mt-0.5">Pick up to 3 accelerators to compare. Datasheet specs, not availability.</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(gpus).map(name => (
            <button
              key={name}
              onClick={() => toggle(name)}
              aria-pressed={selected.includes(name)}
              className={`px-3 py-1.5 rounded-full font-mono text-[12px] border transition-all ${selected.includes(name) ? 'bg-accent text-bg border-accent glow' : 'bg-bg border-border text-muted hover:text-text hover:border-border2'}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <motion.div key={selected.join('|')} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left font-mono text-[11px] tracking-wide uppercase text-faint font-medium px-6 lg:px-8 py-4 w-[220px]">Spec</th>
              {selected.map(name => (
                <th key={name} className="text-left px-4 py-4">
                  <div className="font-display font-bold text-[17px]">{name}</div>
                  <button onClick={() => source(name)} className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline">
                    Source this <ArrowUpRight className="w-3 h-3" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map(([label, key]) => (
              <tr key={key} className="hover:bg-surface2/50 transition-colors">
                <td className="px-6 lg:px-8 py-3.5 font-mono text-[12px] text-faint uppercase tracking-wide">{label}</td>
                {selected.map(name => (
                  <td key={name} className={`px-4 py-3.5 text-[13.5px] ${key === 'best' ? 'text-muted leading-[1.45]' : 'text-text font-mono text-[13px]'}`}>
                    {gpus[name][key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="px-6 lg:px-8 py-4 border-t border-border font-mono text-[11px] text-faint">
        * With sparsity where applicable · Source: NVIDIA public datasheets · Sourcing availability varies by region — check with the desk.
      </div>
    </div>
  )
}
