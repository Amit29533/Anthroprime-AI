import React from 'react'
import { Globe2, Handshake, ShieldCheck, Route } from 'lucide-react'
import {
  PageHero,
  Reveal,
  SectionHead,
  CTAPrimary,
  CTAGhost,
  Tag
} from '../components/ui'
import FinalCTA from '../components/FinalCTA'

const values = [
  {
    icon: ShieldCheck,
    title: 'Credibility over scale',
    desc: 'We confirm GPU configurations, capacity, and delivery timelines with you before commitment.'
  },
  {
    icon: Route,
    title: 'Workload-led infrastructure',
    desc: 'We configure compute, networking, and storage around the demands of your AI workload.'
  },
  {
    icon: Handshake,
    title: 'One accountable provider',
    desc: 'Work directly with Anthroprime from your capacity request through deployment and infrastructure support.'
  },
  {
    icon: Globe2,
    title: 'India-led, globally connected',
    desc: 'India-led support for global AI ambitions. Discuss regional deployment requirements with our team.'
  }
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="Company / About"
        title="The AI infrastructure practice of"
        highlight="Anthroprime Technology."
        sub="Your GPU infrastructure provider. Anthroprime brings GPU capacity, dedicated clusters, architecture expertise, and managed infrastructure together for AI teams and enterprises."
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
                  AI teams need more than an accelerator specification. They
                  need the right balance of compute, networking, storage, and
                  infrastructure support to turn a workload into a reliable
                  deployment.
                </p>
                <p className="text-text font-medium">
                  Anthroprime provides GPU infrastructure for training,
                  inference, fine-tuning, and enterprise AI. Our team works with
                  you to define the configuration and deployment model around
                  your requirements.
                </p>
                <p>
                  From your first capacity request to cluster deployment and
                  ongoing operations, you work directly with Anthroprime. We
                  confirm configuration, availability, and commercial terms
                  before you commit.
                </p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="rounded-2xl bg-surface border border-border p-6 hover:border-accent/25 hover:bg-surface2 transition-all h-full">
                    <v.icon className="w-5 h-5 text-accent mb-4" />
                    <div className="font-display font-semibold text-[15px]">
                      {v.title}
                    </div>
                    <p className="text-[13px] leading-[1.55] text-muted mt-2">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div
            id="partners"
            className="scroll-mt-28 mt-16 rounded-[20px] bg-surface border border-border p-7 lg:p-9"
          >
            <Tag>Your infrastructure team</Tag>
            <h2 className="font-display font-bold text-[26px] lg:text-[32px] leading-[1.1] tracking-[-0.02em] -mt-2">
              Compute, deployment, and support. Together.
            </h2>
            <p className="text-[14.5px] leading-[1.65] text-muted mt-4 max-w-[760px]">
              Work with one team for GPU capacity, workload architecture, and
              managed infrastructure. We can discuss your requirements under
              NDA, with configuration and deployment details tailored to your
              project.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                'GPU Capacity',
                'Dedicated Clusters',
                'Managed Infrastructure',
                'Architecture Advisory',
                'Network & Storage'
              ].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[12px] px-3.5 py-2 rounded-full bg-bg border border-border text-muted hover:border-accent/25 hover:text-text transition-colors cursor-default"
                >
                  {t}
                </span>
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
                ['Practice', 'Anthroprime AI Infrastructure Advisory']
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-6 py-4 hover:bg-surface/60 transition-colors"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wide text-faint">
                    {k}
                  </span>
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
