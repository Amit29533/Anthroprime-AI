import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageHero } from '../components/ui'

const GPU_OPTIONS = ['H100', 'H200', 'B200 / GB200', 'A100', 'L40S', 'Enterprise Accelerators', 'Not sure / need advice']
const DEPLOY_OPTIONS = ['Bare Metal', 'Managed', 'Dedicated / Reserved', 'Not sure']

const FIELDS = [
  { label: 'GPU Type', name: 'gpuType', type: 'select', options: GPU_OPTIONS },
  { label: 'Number of GPUs / Nodes', name: 'gpuQty', placeholder: 'e.g. 8, 64, 1024', required: true },
  { label: 'Required Location', name: 'location', placeholder: 'e.g. India, Europe, Global', required: true },
  { label: 'Required Start Date', name: 'startDate', type: 'date' },
  { label: 'Duration', name: 'duration', placeholder: 'e.g. 6 months, 3 years' },
  { label: 'Workload', name: 'workload', placeholder: 'e.g. LLM training, inference' },
  { label: 'Bare Metal / Managed', name: 'deployType', type: 'select', options: DEPLOY_OPTIONS },
  { label: 'Company Name', name: 'company', placeholder: 'Acme AI Pvt Ltd', required: true },
  { label: 'Business Email', name: 'email', type: 'email', placeholder: 'you@company.com', required: true },
  { label: 'Phone / WhatsApp', name: 'phone', placeholder: '+91 ...' },
]

const DEFAULTS = {
  gpuType: 'H100', gpuQty: '', location: '', startDate: '', duration: '',
  workload: '', deployType: 'Bare Metal', company: '', email: '', phone: '',
}

export default function FindCapacity() {
  const { state } = useLocation()
  const [submitted, setSubmitted] = useState(false)
  const [flash, setFlash] = useState(false)
  const timersRef = useRef([])
  const [form, setForm] = useState(() => {
    const s = state || {}
    return {
      ...DEFAULTS,
      gpuType: GPU_OPTIONS.includes(s.gpu) ? s.gpu : DEFAULTS.gpuType,
      gpuQty: s.gpuQty || '',
      location: s.location || '',
      workload: s.workload || '',
      deployType: DEPLOY_OPTIONS.includes(s.deployType) ? s.deployType : DEFAULTS.deployType,
    }
  })

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  useEffect(() => {
    if (state && Object.keys(state).length) {
      setFlash(true)
      timersRef.current.push(setTimeout(() => setFlash(false), 2400))
    }
  }, [state])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'gpu-capacity', ...form }).toString()
    }).catch(() => {})

    const lines = [
      `GPU Capacity Request - Anthroprime.ai`,
      `GPU Type: ${form.gpuType}`,
      `GPUs/Nodes: ${form.gpuQty}`,
      `Location: ${form.location}`,
      `Start: ${form.startDate || 'Flexible'}`,
      `Duration: ${form.duration || 'TBD'}`,
      `Workload: ${form.workload || 'TBD'}`,
      `Deploy: ${form.deployType}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || 'n/a'}`,
    ]
    const wa = `https://wa.me/919711554410?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(wa, '_blank')
    setSubmitted(true)
    timersRef.current.push(setTimeout(() => setSubmitted(false), 8000))
  }

  return (
    <>
      <PageHero
        crumb="Find GPU Capacity"
        title="Need 8 GPUs"
        highlight="or 8,000?"
        sub="Tell us what you need. We'll identify the right infrastructure, location and commercial model, and come back with a comparable shortlist — not a sales pitch."
      />

      <section className="pb-20 lg:pb-28 -mt-4">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          {/* Left rail */}
          <div className="lg:sticky lg:top-28 space-y-4">
            <div className="rounded-2xl bg-surface border border-border p-6">
              <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">What happens next</div>
              <div className="space-y-4">
                {[
                  ['01', 'Feasibility read', 'We confirm availability across the network within 2–5 days.'],
                  ['02', 'Comparable shortlist', 'Architecture, geography, deployment model and pricing — side by side.'],
                  ['03', 'You contract direct', 'With the chosen provider. We coordinate deployment and stay on as your desk.'],
                ].map(([n, t, d]) => (
                  <div key={n} className="flex gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-bg border border-border flex items-center justify-center font-mono text-[11px] font-bold text-accent shrink-0">{n}</div>
                    <div>
                      <div className="font-display font-semibold text-[13.5px]">{t}</div>
                      <div className="text-[12.5px] leading-[1.5] text-muted mt-0.5">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-bg border border-border p-4 flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent">✓</div>
              <div className="text-[12.5px] leading-[1.5] text-muted">
                <span className="text-text font-medium">Privacy:</span> partner identities are disclosed to qualified buyers under NDA — never published without permission.
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            name="gpu-capacity"
            data-netlify="true"
            className={`rounded-[20px] bg-surface border p-6 lg:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-500 ${flash ? 'border-accent/50 ring-2 ring-accent/30' : 'border-border'}`}
          >
            <input type="hidden" name="form-name" value="gpu-capacity" />
            <p className="hidden" aria-hidden><input name="bot-field" tabIndex={-1} autoComplete="off" /></p>

            {flash && (
              <div className="mb-5 rounded-xl bg-accentDim border border-accent/20 px-4 py-2.5 font-mono text-[12px] text-accent">
                Pre-filled from your selection — review and submit.
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              {FIELDS.map((field) => (
                <div key={field.name} className={`${field.name === 'workload' || field.name === 'company' ? 'sm:col-span-2' : ''} flex flex-col gap-1.5`}>
                  <label htmlFor={`fc-${field.name}`} className="font-mono text-[11px] tracking-wide uppercase text-faint">
                    {field.label} {field.required && <span className="text-accent">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select id={`fc-${field.name}`} name={field.name} value={form[field.name]} onChange={handleChange}
                      className="w-full px-3.5 py-3 rounded-xl bg-bg border border-border text-[14px] text-text focus:outline-none focus:border-accent/50 focus:bg-surface2 transition-colors cursor-pointer">
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input id={`fc-${field.name}`} name={field.name} type={field.type || 'text'} value={form[field.name]} onChange={handleChange}
                      placeholder={field.placeholder} required={field.required}
                      className="w-full px-3.5 py-3 rounded-xl bg-bg border border-border text-[14px] text-text placeholder:text-faint focus:outline-none focus:border-accent/50 focus:bg-surface2 transition-colors" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button type="submit" className="px-6 py-3.5 rounded-xl bg-accent text-bg font-semibold text-[14px] hover:bg-accent2 hover:glow-strong transition-all glow">
                Find GPU Capacity →
              </button>
              <span className="font-mono text-[11px] text-faint leading-[1.4]">Opens WhatsApp with your request pre-filled — nothing sends automatically. Also submitted to our desk via Netlify.</span>
            </div>

            {submitted && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-xl bg-accentDim border border-accent/20 px-4 py-3 flex items-center gap-2 text-[13px] text-accent">
                <span className="w-5 h-5 rounded-full bg-accent text-bg flex items-center justify-center text-[11px]">✓</span>
                Request drafted — send it in WhatsApp to reach our desk. Our team will respond within 24h.
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>
    </>
  )
}
