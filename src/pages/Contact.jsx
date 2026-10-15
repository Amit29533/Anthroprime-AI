import React from 'react'
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { PageHero, Reveal, CTAPrimary } from '../components/ui'

const CONTACT_BUTTON =
  'flex w-full items-center justify-center gap-3 text-center py-4 px-5 rounded-xl bg-surface border border-border text-muted font-medium text-[14.5px] hover:bg-surface2 hover:text-text hover:border-border2 transition-colors'

function WhatsAppIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      className="shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M16 4.5a11.1 11.1 0 0 0-9.6 16.7L5 27l5.9-1.5A11.1 11.1 0 1 0 16 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 9.8c-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.5-1.3 1.4-1.3 3.2s1.3 3.5 1.5 3.7c.2.3 2.6 4 6.3 5.4 3.1 1.2 3.7.9 4.4.8.7-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5l-2.7-1.3c-.4-.2-.7-.3-1 .2l-1.2 1.4c-.2.3-.5.3-.9.1-.4-.2-1.8-.7-3.3-2.1-1.2-1-2-2.3-2.2-2.7-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.2.1-.5 0-.7l-1-2.4Z"
        fill="currentColor"
        transform="translate(1 0) scale(.94)"
      />
    </svg>
  )
}

function EmailIcon() {
  return <Mail className="w-[22px] h-[22px] shrink-0" aria-hidden="true" />
}

export default function Contact() {
  return (
    <>
      <PageHero
        diagram="brief"
        crumb="Company / Contact"
        title="Talk to the desk."
        sub="Talk directly with Anthroprime about GPU capacity, dedicated clusters, and managed infrastructure. Share your workload and we will help plan your deployment."
      >
        <CTAPrimary to="/find-capacity">
          Or start with a capacity request
        </CTAPrimary>
      </PageHero>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            {[
              {
                icon: MessageCircle,
                k: 'WhatsApp',
                v: '+91 97115 54410',
                href: 'https://wa.me/919711554410',
                note: 'Fastest channel · usually within hours'
              },
              {
                icon: Mail,
                k: 'Email',
                v: 'hello@anthroprime.com',
                href: 'mailto:hello@anthroprime.com',
                note: 'For RFPs, NDAs and detailed requirements'
              },
              {
                icon: MapPin,
                k: 'Based in',
                v: 'Gurugram, India',
                note: 'Serving globally across 5 regions'
              },
              {
                icon: Clock,
                k: 'Response',
                v: 'Within 24 hours',
                note: 'Feasibility read in 2–5 days'
              }
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.05}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener"
                    className="group flex items-center gap-4 rounded-2xl bg-surface border border-border p-5 hover:border-accent/25 hover:bg-surface2 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accentDim border border-accent/20 flex items-center justify-center text-accent shrink-0">
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-[10.5px] uppercase tracking-wide text-faint">
                        {c.k}
                      </div>
                      <div className="font-display font-semibold text-[16px] group-hover:text-accent transition-colors">
                        {c.v}
                      </div>
                      {c.note && (
                        <div className="font-mono text-[11px] text-faint mt-0.5">
                          {c.note}
                        </div>
                      )}
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl bg-surface border border-border p-5">
                    <div className="w-11 h-11 rounded-xl bg-surface3 border border-border flex items-center justify-center text-faint shrink-0">
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10.5px] uppercase tracking-wide text-faint">
                        {c.k}
                      </div>
                      <div className="font-display font-semibold text-[16px]">
                        {c.v}
                      </div>
                      {c.note && (
                        <div className="font-mono text-[11px] text-faint mt-0.5">
                          {c.note}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="grid gap-3">
                <a
                  href="https://wa.me/919711554410?text=Hi%20AnthroPrime%2C%20I%27d%20like%20to%20talk%20to%20an%20AI%20infrastructure%20expert."
                  target="_blank"
                  rel="noopener"
                  className={CONTACT_BUTTON}
                >
                  <WhatsAppIcon />
                  Message the Desk on WhatsApp →
                </a>
                <a
                  href="mailto:hello@anthroprime.com?subject=GPU%20Infrastructure%20Enquiry"
                  className={CONTACT_BUTTON}
                >
                  <EmailIcon />
                  Email the Desk Directly →
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[20px] bg-surface border border-border p-7 lg:p-8">
              <div className="font-display font-semibold text-[18px]">
                What to expect
              </div>
              <div className="mt-5 space-y-5">
                {[
                  [
                    '01',
                    'First response within 24 hours',
                    'A named engineer from the desk — not a sales queue.'
                  ],
                  [
                    '02',
                    'Feasibility read in 2–5 days',
                    'We confirm GPU configuration, capacity, and deployment options for your requirement.'
                  ],
                  [
                    '03',
                    'Your deployment proposal',
                    'GPU configuration, deployment plan and commercial terms directly from Anthroprime.'
                  ],
                  [
                    '04',
                    'NDA whenever you need one',
                    'We can discuss your workload, configuration, and deployment requirements confidentially.'
                  ]
                ].map(([n, t, d]) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-bg border border-border flex items-center justify-center font-mono text-[12px] font-bold text-accent shrink-0">
                      {n}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-[14.5px]">
                        {t}
                      </div>
                      <div className="text-[13px] leading-[1.5] text-muted mt-0.5">
                        {d}
                      </div>
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
