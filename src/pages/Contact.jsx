import React from 'react'
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { PageHero, Reveal, CTAPrimary } from '../components/ui'

export default function Contact() {
  return (
    <>
      <PageHero
        crumb="Company / Contact"
        title="Talk to the desk."
        sub="One conversation is usually enough to scope a mandate. Tell us about your workload — we'll tell you honestly what the network can do for it."
      >
        <CTAPrimary to="/find-capacity">Or start with a capacity request</CTAPrimary>
      </PageHero>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            {[
              { icon: MessageCircle, k: 'WhatsApp', v: '+91 97115 54410', href: 'https://wa.me/919711554410', note: 'Fastest channel · usually within hours' },
              { icon: Mail, k: 'Email', v: 'desk@anthroprime.ai', href: 'mailto:desk@anthroprime.ai', note: 'For RFPs, NDAs and detailed requirements' },
              { icon: MapPin, k: 'Based in', v: 'Gurugram, India', note: 'Serving globally across 5 regions' },
              { icon: Clock, k: 'Response', v: 'Within 24 hours', note: 'Feasibility read in 2–5 days' },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.05}>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="group flex items-center gap-4 rounded-2xl bg-surface border border-border p-5 hover:border-accent/25 hover:bg-surface2 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-accentDim border border-accent/20 flex items-center justify-center text-accent shrink-0">
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-[10.5px] uppercase tracking-wide text-faint">{c.k}</div>
                      <div className="font-display font-semibold text-[16px] group-hover:text-accent transition-colors">{c.v}</div>
                      {c.note && <div className="font-mono text-[11px] text-faint mt-0.5">{c.note}</div>}
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl bg-surface border border-border p-5">
                    <div className="w-11 h-11 rounded-xl bg-surface3 border border-border flex items-center justify-center text-faint shrink-0">
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10.5px] uppercase tracking-wide text-faint">{c.k}</div>
                      <div className="font-display font-semibold text-[16px]">{c.v}</div>
                      {c.note && <div className="font-mono text-[11px] text-faint mt-0.5">{c.note}</div>}
                    </div>
                  </div>
                )}
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <a href="https://wa.me/919711554410?text=Hi%20AnthroPrime%2C%20I%27d%20like%20to%20talk%20to%20an%20AI%20infrastructure%20expert." target="_blank" rel="noopener"
                className="block w-full text-center py-4 rounded-xl bg-accent text-bg font-semibold text-[14.5px] hover:bg-accent2 transition-colors glow">
                Message the Desk on WhatsApp →
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[20px] bg-surface border border-border p-7 lg:p-8">
              <div className="font-display font-semibold text-[18px]">What to expect</div>
              <div className="mt-5 space-y-5">
                {[
                  ['01', 'First response within 24 hours', 'A named engineer from the desk — not a sales queue.'],
                  ['02', 'Feasibility read in 2–5 days', 'Availability across the network for your GPU type, quantity and geography.'],
                  ['03', 'Comparable shortlist', 'Architecture, deployment model and commercial terms side by side.'],
                  ['04', 'NDA whenever you need one', 'Partner identities disclosed to qualified buyers under NDA — never published without permission.'],
                ].map(([n, t, d]) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-bg border border-border flex items-center justify-center font-mono text-[12px] font-bold text-accent shrink-0">{n}</div>
                    <div>
                      <div className="font-display font-semibold text-[14.5px]">{t}</div>
                      <div className="text-[13px] leading-[1.5] text-muted mt-0.5">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
