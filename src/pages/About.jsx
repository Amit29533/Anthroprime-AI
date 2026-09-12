import React from 'react'
import { Globe2, Handshake, ShieldCheck, Route } from 'lucide-react'
import { PageHero, Reveal, SectionHead, CTAPrimary, CTAGhost, Tag } from '../components/ui'
import FinalCTA from '../components/FinalCTA'

const values = [
  { icon: ShieldCheck, title: 'Credibility over scale', desc: "We never claim capacity we can't substantiate. Every GPU statement is verified against our infrastructure network before it reaches you." },
  { icon: Route, title: 'Provider-agnostic', desc: 'No single-cloud allegiance. The network is searched for your best fit, not ours.' },
  { icon: Handshake, title: 'Buyer-side by design', desc: 'You contract directly with the chosen provider. We represent your requirement, not a supply quota.' },
  { icon: Globe2, title: 'India-led, globally connected', desc: 'Sourcing reach across India, Southeast Asia, Middle East, Europe and North America.' },
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="Company / About"
        title="The AI infrastructure practice of"
        highlight="Anthroprime Technology."
        sub="India-led and globally connected. GPU Capacity Desk, our first commercial offering, represents qualified enterprise buyers end-to-end: translating a workload into a comparable specification, finding and verifying supply, negotiating commercial terms, and governing deployment after contract."
      >
        <div className="flex flex-wrap gap-3">
          <CTAPrimary to="/find-capacity">Work with the desk</CTAPrimary>
          <CTAGhost to="/contact">Contact us</CTAGhost>
        </div>
      </PageHero>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="space-y-5 text-[15px] leading-[1.7] text-muted">
                <p>
                  Most GPU buyers face the same problem: the market is fragmented across hyperscalers, neoclouds, colocation operators and OEM financing — each with different architectures, regions and commercial models. Evaluating them alone means weeks of calls, incomparable quotes and decisions made on incomplete information.
                </p>
                <p className="text-text font-medium">
                  We sell verified execution, not a list of GPU suppliers. We source dedicated GPU infrastructure across multiple providers and regions, and our team helps enterprises identify and deploy suitable GPU infrastructure.
                </p>
                <p>
                  Anthroprime operates asset-light by design: we aggregate demand, search the network, verify capacity and structure the deal — while you contract directly with the chosen provider. Our incentives stay aligned with yours: the right infrastructure at the right terms.
                </p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="rounded-2xl bg-surface border border-border p-6 hover:border-accent/25 hover:bg-surface2 transition-all h-full">
                    <v.icon className="w-5 h-5 text-accent mb-4" />
                    <div className="font-display font-semibold text-[15px]">{v.title}</div>
                    <p className="text-[13px] leading-[1.55] text-muted mt-2">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div id="partners" className="scroll-mt-28 mt-16 rounded-[20px] bg-surface border border-border p-7 lg:p-9">
            <Tag>Partners</Tag>
            <h2 className="font-display font-bold text-[26px] lg:text-[32px] leading-[1.1] tracking-[-0.02em] -mt-2">
              A vetted panel. Disclosed under NDA.
            </h2>
            <p className="text-[14.5px] leading-[1.65] text-muted mt-4 max-w-[760px]">
              We work with infrastructure operators, cloud providers and data-centre partners across India, Southeast Asia, the Middle East, Europe and North America. Partner identities are disclosed to qualified buyers under NDA as part of an active sourcing mandate — we don't publish partner names without permission.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {['Hyperscalers', 'Neoclouds', 'Colo & DC Operators', 'OEM & Finance', 'Network & Storage'].map(t => (
                <span key={t} className="font-mono text-[12px] px-3.5 py-2 rounded-full bg-bg border border-border text-muted hover:border-accent/25 hover:text-text transition-colors cursor-default">{t}</span>
              ))}
            </div>
          </div>

          {/* Entity */}
          <Reveal className="mt-10">
            <div className="rounded-2xl bg-bg border border-border divide-y divide-border overflow-hidden">
              {[
                ['Entity', 'Anthroprime Technology Private Limited'],
                ['CIN', 'U62099HR2026PTC146139'],
                ['Based in', 'Gurugram, India — serving globally'],
                ['Practice', 'Anthroprime AI Infrastructure Advisory'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-6 py-4 hover:bg-surface/60 transition-colors">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-faint">{k}</span>
                  <span className="text-[14px] font-medium">{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
