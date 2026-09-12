import React from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Rocket, Zap, Lock, Sigma, Landmark, Network, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { PageHero, Reveal, SectionHead, CTAPrimary, CTAGhost } from '../components/ui'
import { SOLUTIONS, solutionBySlug } from '../data/solutions'
import { GPUS } from '../data/gpus'
import FinalCTA from '../components/FinalCTA'

const ICONS = { Rocket, Zap, Lock, Sigma, Landmark, Network }

export function SolutionsIndex() {
  return (
    <>
      <PageHero
        crumb="Solutions"
        title="Built around the workload,"
        highlight="not one GPU generation."
        sub="Six ways enterprises buy AI infrastructure through us — each with its own architecture pattern, deployment model and commercial structure."
      />

      <section className="pb-20 lg:pb-28 -mt-2">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((s, i) => {
            const Icon = ICONS[s.icon]
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link to={`/solutions/${s.slug}`} className="group block relative overflow-hidden rounded-2xl bg-surface border border-border p-7 hover:border-accent/25 hover:bg-surface2 hover:-translate-y-1 transition-all h-full">
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(240px circle at 75% 10%, rgb(var(--c-accent) / 0.07), transparent 65%)' }} />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-surface3 border border-border flex items-center justify-center text-faint group-hover:text-accent group-hover:border-accent/20 transition-colors mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-[18px] leading-tight">{s.name}</h3>
                    <p className="text-[13.5px] leading-[1.5] text-muted mt-2.5">{s.short}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {s.gpus.slice(0, 3).map(g => (
                          <span key={g} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-bg border border-border text-faint">{GPUS[g]?.name || g}</span>
                        ))}
                      </div>
                      <ArrowRight className="w-4 h-4 text-faint group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

export function SolutionDetail() {
  const { slug } = useParams()
  const sol = solutionBySlug(slug)
  if (!sol) return <Navigate to="/solutions" replace />
  const Icon = ICONS[sol.icon]
  const others = SOLUTIONS.filter(s => s.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero crumb={`Solutions / ${sol.name}`} title={sol.hero} sub={sol.desc}>
        <div className="flex flex-wrap gap-3">
          <CTAPrimary to="/find-capacity" state={{ workload: sol.name }}>Start this conversation</CTAPrimary>
          <CTAGhost to="/solutions">All solutions</CTAGhost>
        </div>
      </PageHero>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
            <div>
              <Reveal>
                <div className="rounded-[20px] bg-surface border border-border p-7 lg:p-9">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accentDim border border-accent/20 flex items-center justify-center text-accent"><Icon className="w-5 h-5" /></div>
                    <h2 className="font-display font-bold text-[22px]">What we deliver</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {sol.points.map((p, i) => (
                      <Reveal key={p} delay={i * 0.04}>
                        <div className="flex gap-3 text-[14px] leading-[1.5] text-muted">
                          <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="mt-6">
                <div className="rounded-[20px] bg-surface border border-border p-7">
                  <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">Typical workloads</div>
                  <div className="flex flex-wrap gap-2">
                    {sol.workloads.map(w => (
                      <span key={w} className="px-3.5 py-2 rounded-lg bg-bg border border-border font-display font-medium text-[13px] text-muted hover:text-accent hover:border-accent/25 transition-colors cursor-default">{w}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:sticky lg:top-28 space-y-4">
              <Reveal delay={0.05}>
                <div className="rounded-[20px] bg-surface border border-border p-6">
                  <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">Commonly paired GPUs</div>
                  <div className="space-y-2.5">
                    {sol.gpus.map(g => {
                      const gpu = GPUS[g]
                      if (!gpu) return null
                      return (
                        <Link key={g} to={`/gpu/${g}`} className="group flex items-center justify-between rounded-xl bg-bg border border-border px-4 py-3 hover:border-accent/25 hover:bg-surface2 transition-all">
                          <div>
                            <span className="font-display font-bold text-[15px]">{gpu.name}</span>
                            <span className="font-mono text-[11px] text-faint ml-2">{gpu.chips[0]} · {gpu.generation}</span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-faint group-hover:text-accent transition-colors" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-[20px] bg-accentDim border border-accent/20 p-6">
                  <div className="font-display font-semibold text-[15px]">How sourcing works for this solution</div>
                  <p className="text-[13px] leading-[1.6] text-muted mt-2">
                    Requirement → network search → verified shortlist with comparable commercials → you contract with the provider → we coordinate deployment and stay accountable.
                  </p>
                  <Link to="/find-capacity" className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12px] text-accent hover:underline">
                    Start a mandate <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* other solutions */}
          <div className="mt-14 border-t border-border pt-10">
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-5">More solutions</div>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map(s => {
                const OIcon = ICONS[s.icon]
                return (
                  <Link key={s.slug} to={`/solutions/${s.slug}`} className="group rounded-xl bg-surface border border-border p-5 hover:border-accent/25 hover:bg-surface2 transition-all">
                    <OIcon className="w-5 h-5 text-faint group-hover:text-accent transition-colors mb-3" />
                    <div className="font-display font-semibold text-[14.5px]">{s.name}</div>
                    <div className="text-[12.5px] text-muted mt-1 leading-[1.5]">{s.short}</div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
