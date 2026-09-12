import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronRight } from 'lucide-react'

/** Eyebrow tag used above section titles */
export function Tag({ children }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" /> {children}
    </div>
  )
}

/** Scroll-reveal wrapper */
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.55, ease: [0.21, 0.6, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Primary / secondary CTA buttons (router-aware) */
export function CTAPrimary({ to, href, state, children, className = '' }) {
  const cls = `inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-bg font-semibold text-[14.5px] hover:bg-accent2 transition-all glow ${className}`
  return to ? <Link to={to} state={state} className={cls}>{children} <ArrowUpRight className="w-4 h-4" /></Link>
    : <a href={href} className={cls}>{children} <ArrowUpRight className="w-4 h-4" /></a>
}

export function CTAGhost({ to, href, state, children, className = '' }) {
  const cls = `inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface border border-border text-text font-medium text-[14.5px] hover:border-border2 hover:bg-surface2 transition-all ${className}`
  return to ? <Link to={to} state={state} className={cls}>{children}</Link> : <a href={href} className={cls}>{children}</a>
}

/** Sub-page hero with breadcrumb */
export function PageHero({ crumb, title, highlight, sub, children }) {
  return (
    <section className="relative pt-[128px] pb-14 lg:pb-16 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-[0.12]" aria-hidden />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-accent/5 rounded-full blur-[110px]" aria-hidden />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.nav initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide uppercase text-faint" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-muted">{crumb}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-display font-bold text-[36px] sm:text-[48px] lg:text-[58px] leading-[0.98] tracking-[-0.025em] mt-5 max-w-[880px]"
        >
          {title} {highlight && <span className="text-muted">{highlight}</span>}
        </motion.h1>
        {sub && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="text-[16.5px] lg:text-[17.5px] leading-[1.6] text-muted mt-5 max-w-[680px]">
            {sub}
          </motion.p>
        )}
        {children && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-7">{children}</motion.div>}
      </div>
    </section>
  )
}

/** 3D mouse-tilt card */
export function Tilt({ children, className = '', max = 7 }) {
  const ref = useRef(null)
  const [t, setT] = useState({ rx: 0, ry: 0 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setT({ rx: -py * max, ry: px * max })
  }

  return (
    <div style={{ perspective: '1000px' }} className={className}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setT({ rx: 0, ry: 0 })}
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.18s ease-out' }}
      >
        {children}
      </div>
    </div>
  )
}

/** Stat block */
export function Stat({ value, label, accent = false }) {
  return (
    <div>
      <div className={`font-display font-bold text-[26px] leading-none ${accent ? 'text-accent' : ''}`}>{value}</div>
      <div className="font-mono text-[10.5px] tracking-wide uppercase text-faint mt-1.5">{label}</div>
    </div>
  )
}

/** Section heading block */
export function SectionHead({ tag, title, sub, center = false }) {
  return (
    <Reveal className={`max-w-[760px] ${center ? 'mx-auto text-center' : ''}`}>
      {tag && <Tag>{tag}</Tag>}
      <h2 className="font-display font-bold text-[30px] lg:text-[42px] leading-[1.08] tracking-[-0.02em]">{title}</h2>
      {sub && <p className="text-[16px] leading-[1.6] text-muted mt-4">{sub}</p>}
    </Reveal>
  )
}
