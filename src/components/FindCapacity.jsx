import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function FindCapacity() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    gpuType: 'H100',
    gpuQty: '',
    location: '',
    startDate: '',
    duration: '',
    workload: '',
    deployType: 'Bare Metal',
    company: '',
    email: '',
    phone: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Netlify form handling + WhatsApp fallback
    const params = new URLSearchParams(form).toString()
    
    // Try netlify submission via fetch
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'gpu-capacity', ...form }).toString()
    }).catch(()=>{})

    // WhatsApp message
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
    setTimeout(() => setSubmitted(false), 6000)
  }

  return (
    <section id="find-capacity" className="py-20 lg:py-28 bg-surface/50 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" /> Find GPU Capacity
            </div>
            <h2 className="font-display font-bold text-[36px] lg:text-[48px] leading-[0.95] tracking-[-0.02em]">
              Need 8 GPUs<br />or 8,000?
            </h2>
            <p className="text-[17px] leading-[1.6] text-muted mt-5 max-w-[480px]">
              Tell us what you need. We'll identify the right infrastructure, location and commercial model, and come back with a comparable shortlist — not a sales pitch.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 max-w-[400px] border-t border-border pt-8">
              <div>
                <div className="font-display font-bold text-[20px]">2–5 days</div>
                <div className="font-mono text-[11px] uppercase tracking-wide text-faint mt-1">Initial feasibility read</div>
              </div>
              <div>
                <div className="font-display font-bold text-[20px]">Direct</div>
                <div className="font-mono text-[11px] uppercase tracking-wide text-faint mt-1">You contract with provider</div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-bg border border-border p-4 flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">✓</div>
              <div className="text-[13px] leading-[1.5] text-muted">
                <span className="text-text font-medium">Privacy:</span> We don't publish partner names without permission. Partner identities disclosed to qualified buyers under NDA.
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            name="gpu-capacity"
            data-netlify="true"
            className="rounded-[20px] bg-bg border border-border p-6 lg:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
          >
            <input type="hidden" name="form-name" value="gpu-capacity" />
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'GPU Type', name: 'gpuType', type: 'select', options: ['H100','H200','B200 / GB200','A100','L40S','Not sure / need advice'] },
                { label: 'Number of GPUs / Nodes', name: 'gpuQty', placeholder: 'e.g. 8, 64, 1024', required: true },
                { label: 'Required Location', name: 'location', placeholder: 'e.g. India, Europe, Global', required: true },
                { label: 'Required Start Date', name: 'startDate', type: 'date' },
                { label: 'Duration', name: 'duration', placeholder: 'e.g. 6 months, 3 years' },
                { label: 'Workload', name: 'workload', placeholder: 'e.g. LLM training, inference' },
                { label: 'Bare Metal / Managed', name: 'deployType', type: 'select', options: ['Bare Metal','Managed','Not sure'] },
                { label: 'Company Name', name: 'company', placeholder: 'Acme AI Pvt Ltd', required: true },
                { label: 'Business Email', name: 'email', type: 'email', placeholder: 'you@company.com', required: true },
                { label: 'Phone / WhatsApp', name: 'phone', placeholder: '+91 ...' },
              ].map((field) => (
                <div key={field.name} className={`${['company','email','workload'].includes(field.name) ? '' : ''} ${field.name === 'workload' || field.name === 'company' ? 'sm:col-span-2' : ''} flex flex-col gap-1.5`}>
                  <label className="font-mono text-[11px] tracking-wide uppercase text-faint">{field.label} {field.required && <span className="text-accent">*</span>}</label>
                  {field.type === 'select' ? (
                    <select name={field.name} value={form[field.name]} onChange={handleChange} className="w-full px-3.5 py-3 rounded-xl bg-surface border border-border text-[14px] text-text focus:outline-none focus:border-accent/50 focus:bg-surface2 transition-colors">
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input name={field.name} type={field.type || 'text'} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} required={field.required} className="w-full px-3.5 py-3 rounded-xl bg-surface border border-border text-[14px] text-text placeholder:text-faint focus:outline-none focus:border-accent/50 focus:bg-surface2 transition-colors" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button type="submit" className="px-6 py-3.5 rounded-xl bg-accent text-bg font-semibold text-[14px] hover:bg-accent2 transition-colors glow">
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
      </div>
    </section>
  )
}
