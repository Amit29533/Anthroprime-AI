import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'
import { GPU_NAV } from '../data/gpus'
import { SOLUTIONS } from '../data/solutions'
import { SERVICES } from '../data/services'

const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'GPU Cloud',
    children: GPU_NAV.map(g => ({ label: g.label, desc: g.desc, to: `/gpu/${g.slug}` })),
  },
  {
    label: 'Solutions',
    children: SOLUTIONS.map(s => ({ label: s.name, to: `/solutions/${s.slug}` })),
  },
  {
    label: 'Services',
    children: SERVICES.map(s => ({ label: s.name, to: `/services#${s.id}` })),
  },
  {
    label: 'Resources',
    children: [
      { label: 'GPU Comparison', to: '/resources#comparison' },
      { label: 'GPU Marketplace & Pricing', to: '/marketplace' },
      { label: 'AI Infrastructure Guides', to: '/resources#guides' },
      { label: 'GPU Pricing / Economics', to: '/resources#economics' },
      { label: 'Architecture Guides', to: '/resources#guides' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Partners', to: '/about#partners' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [pinned, setPinned] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!openMenu) return
    const onKey = (e) => { if (e.key === 'Escape') { setOpenMenu(null); setPinned(false) } }
    const onClick = (e) => { if (navRef.current && !navRef.current.contains(e.target)) { setOpenMenu(null); setPinned(false) } }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick) }
  }, [openMenu])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    if (mobileOpen) document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [mobileOpen])

  // close everything on navigation
  useEffect(() => { setOpenMenu(null); setPinned(false); setMobileOpen(false) }, [pathname])

  const closeMenu = () => { setOpenMenu(null); setPinned(false) }

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-bg" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[17px] leading-none tracking-tight">Anthroprime<span className="text-accent">.ai</span></span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-faint uppercase mt-0.5">Global GPU Network</span>
            </div>
          </Link>

          <nav ref={navRef} className="hidden lg:flex items-center gap-0.5" aria-label="Main">
            {nav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => { if (!pinned) setOpenMenu(null) }}
              >
                {item.children ? (
                  <button
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                    onClick={() => openMenu === item.label && pinned ? closeMenu() : (setOpenMenu(item.label), setPinned(true))}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium transition-colors ${openMenu === item.label ? 'bg-surface2 text-text' : 'text-muted hover:text-text hover:bg-surface2'}`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <NavLink to={item.to} end className={({ isActive }) => `px-3.5 py-2 rounded-lg text-[14px] font-medium transition-colors ${isActive ? 'text-text bg-surface2' : 'text-muted hover:text-text hover:bg-surface2'}`}>
                    {item.label}
                  </NavLink>
                )}

                <AnimatePresence>
                  {item.children && openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50"
                    >
                      <div className="min-w-[290px] glass-strong rounded-xl p-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.to} onClick={closeMenu} className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg hover:bg-surface2 group transition-colors">
                            <span className="text-[13.5px] font-medium text-text group-hover:text-accent transition-colors">{child.label}</span>
                            {child.desc && <span className="font-mono text-[11px] text-faint whitespace-nowrap">{child.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="px-4 py-2.5 rounded-lg text-[13.5px] font-medium text-muted hover:text-text border border-border hover:border-border2 transition-all">Talk to an Expert</Link>
            <Link to="/find-capacity" className="px-4 py-2.5 rounded-lg text-[13.5px] font-semibold bg-accent text-bg hover:bg-accent2 transition-colors flex items-center gap-1.5">
              Find GPU Capacity <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} className="lg:hidden w-10 h-10 rounded-lg border border-border flex items-center justify-center text-text">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden bg-bg/95 backdrop-blur-xl pt-[72px] overflow-y-auto">
            <div className="p-6 space-y-5">
              {nav.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <details className="group">
                      <summary className="flex items-center justify-between py-3 font-display font-semibold text-[16px] cursor-pointer list-none">
                        {item.label}
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="pl-2 pb-2 space-y-1 mt-1">
                        {item.children.map((c) => (
                          <Link key={c.label} to={c.to} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-lg bg-surface border border-border text-[14px] text-muted hover:text-text">{c.label}</Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link to={item.to} onClick={() => setMobileOpen(false)} className="block py-3 font-display font-semibold text-[16px]">{item.label}</Link>
                  )}
                </div>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="w-full py-3.5 rounded-xl border border-border text-center font-medium">Talk to an Expert</Link>
                <Link to="/find-capacity" onClick={() => setMobileOpen(false)} className="w-full py-3.5 rounded-xl bg-accent text-bg text-center font-semibold">Find GPU Capacity</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8 bg-bg relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-accent/5 rounded-full blur-[100px]" aria-hidden />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.4fr_repeat(4,1fr)] gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-bg" />
              </div>
              <span className="font-display font-bold text-[16px]">Anthroprime<span className="text-accent">.ai</span></span>
            </div>
            <p className="text-[13px] leading-[1.5] text-muted mt-4 max-w-[280px]">
              An asset-light AI infrastructure advisory and GPU capacity sourcing desk. We source and verify — you contract directly with the provider. <span className="text-text font-medium">Global GPU Infrastructure. One Partner.</span>
            </p>
            <div className="mt-6 flex gap-2">
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border text-faint">India-led</span>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border text-faint">Globally connected</span>
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">GPU Cloud</div>
            <div className="space-y-2.5">
              {GPU_NAV.map(g => (
                <Link key={g.label} to={`/gpu/${g.slug}`} className="block text-[13.5px] text-muted hover:text-accent transition-colors">{g.label}</Link>
              ))}
              <Link to="/marketplace" className="block text-[13.5px] text-muted hover:text-accent transition-colors">Marketplace →</Link>
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">Solutions</div>
            <div className="space-y-2.5">
              {SOLUTIONS.map(s => (
                <Link key={s.slug} to={`/solutions/${s.slug}`} className="block text-[13.5px] text-muted hover:text-accent transition-colors">{s.name.replace('AI ', '').replace(' Infrastructure', '')}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">Services</div>
            <div className="space-y-2.5">
              {SERVICES.map(s => (
                <Link key={s.id} to={`/services#${s.id}`} className="block text-[13.5px] text-muted hover:text-accent transition-colors">{s.name.replace('GPU Capacity Sourcing', 'GPU Sourcing').replace('AI Infrastructure', 'Infra')}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">Company</div>
            <div className="space-y-2.5">
              <Link to="/about" className="block text-[13.5px] text-muted hover:text-accent transition-colors">About Us</Link>
              <Link to="/about#partners" className="block text-[13.5px] text-muted hover:text-accent transition-colors">Partners</Link>
              <Link to="/contact" className="block text-[13.5px] text-muted hover:text-accent transition-colors">Contact</Link>
              <Link to="/resources" className="block text-[13.5px] text-muted hover:text-accent transition-colors">Resources</Link>
              <Link to="/find-capacity" className="block text-[13.5px] text-accent hover:underline transition-colors">Find GPU Capacity</Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-faint">ANTHROPRIME TECHNOLOGY PRIVATE LIMITED · CIN U62099HR2026PTC146139</div>
          <div className="flex items-center gap-6 font-mono text-[11px] text-faint">
            <span>© 2026 Anthroprime AI Infrastructure Advisory</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** Scroll restoration: top on route change; honor #hash anchors */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // wait a tick for the page to render
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-bg relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 dot-pattern opacity-[0.15]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-0 w-[800px] h-[800px] bg-[#7C3AED]/5 rounded-full blur-[120px]" />
      </div>

      <ScrollProgress />
      <ScrollManager />

      <div className="relative z-10">
        <Navbar />
        <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Outlet />
        </motion.main>
        <Footer />
      </div>

      <BackToTop />
    </div>
  )
}
