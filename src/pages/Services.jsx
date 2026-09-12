import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Compass, Rocket, Settings2, ShieldCheck, ArrowRight, Check } from 'lucide-react'
import { PageHero, Reveal, CTAPrimary } from '../components/ui'
import { SERVICES } from '../data/services'
import FinalCTA from '../components/FinalCTA'

const ICONS = { Search, Compass, Rocket, Settings2, ShieldCheck }

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        title="From GPU sourcing to"
        highlight="production-ready AI infrastructure."
        sub="We don't just provide GPUs — we determine the right architecture, coordinate deployment, and keep it running. That's what separates an aggregator with engineering depth from a GPU reseller."
      >
        <CTAPrimary to="/find-capacity">Start a sourcing mandate</CTAPrimary>
      </PageHero>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 space-y-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon]
            const flip = i % 2 === 1
            return (
              <Reveal key={s.id}>
                <div id={s.id} className="scroll-mt-28 rounded-[20px] bg-surface border border-border p-7 lg:p-9 hover:border-border2 transition-colors">
                  <div className={`grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start ${flip ? 'lg:[direction:rtl]' : ''}`}>
                    <div className="[direction:ltr]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accentDim border border-accent/20 flex items-center justify-center text-accent shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="font-display font-bold text-[21px] leading-tight">{s.name}</h2>
                          <div className="font-mono text-[12px] text-faint mt-1">{s.short}</div>
                        </div>
                      </div>
                      <p className="text-[14.5px] leading-[1.6] text-muted mt-5">{s.desc}</p>
                      <Link to="/find-capacity" state={{ workload: s.name }} className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12.5px] text-accent hover:underline">
                        Engage the desk <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="[direction:ltr] grid sm:grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-bg border border-border p-6">
                      {s.items.map(item => (
                        <div key={item} className="flex gap-2.5 text-[13.5px] leading-[1.45] text-muted">
                          <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}

          <Reveal>
            <div className="rounded-2xl border border-accent/20 bg-accentDim p-[1px]">
              <div className="rounded-[15px] bg-bg px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="font-mono text-[12px] leading-[1.5] text-muted max-w-[640px]">
                  <span className="text-text font-medium">Engagement models:</span> sourcing mandates (one-off), advisory retainers, managed-service subscriptions — or a single end-to-end program covering Sourcing → Architecture → Contracting → Deployment → Management.
                </div>
                <Link to="/contact" className="font-mono text-[12px] px-4 py-2 rounded-full bg-accent text-bg font-bold shrink-0 hover:bg-accent2 transition-colors">Talk to the desk</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
