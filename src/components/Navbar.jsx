import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'

const nav = [
  { label: 'Home', href: '#hero' },
  {
    label: 'GPU Cloud',
    children: [
      { label: 'H100', desc: 'SXM / PCIe', href: '#h100' },
      { label: 'H200', desc: '141GB HBM3e', href: '#h200' },
      { label: 'B200 / GB200', desc: 'Blackwell', href: '#b200' },
      { label: 'Other GPUs', desc: 'A100 · L40S · Accelerators', href: '#other-gpus' },
    ]
  },
  {
    label: 'Solutions',
    children: [
      { label: 'AI Training Infrastructure', href: '#sol-training' },
      { label: 'AI Inference Infrastructure', href: '#sol-inference' },
      { label: 'Dedicated GPU Clusters', href: '#sol-clusters' },
      { label: 'Private AI Cloud', href: '#sol-private-cloud' },
      { label: 'HPC', href: '#sol-hpc' },
      { label: 'Sovereign AI Infrastructure', href: '#sol-sovereign' },
    ]
  },
  {
    label: 'Services',
    children: [
      { label: 'GPU Capacity Sourcing', href: '#svc-sourcing' },
      { label: 'AI Infrastructure Advisory', href: '#svc-advisory' },
      { label: 'Cluster Deployment', href: '#svc-deployment' },
      { label: 'Managed AI Infrastructure', href: '#svc-managed' },
      { label: 'AI Infrastructure Security', href: '#svc-security' },
    ]
  },
  {
    label: 'Resources',
    children: [
      { label: 'GPU Comparison', href: '#resources' },
      { label: 'AI Infrastructure Guides', href: '#resources' },
      { label: 'GPU Pricing / Economics', href: '#resources' },
      { label: 'Architecture Guides', href: '#resources' },
      { label: 'Blog', href: '#resources' },
    ]
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', href: '#about' },
      { label: 'Partners', href: '#partners' },
      { label: 'Contact', href: '#contact' },
    ]
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [pinned, setPinned] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close pinned dropdowns on Escape or outside click
  useEffect(() => {
    if (!openMenu) return
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpenMenu(null); setPinned(false) }
    }
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) { setOpenMenu(null); setPinned(false) }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [openMenu])

  // Lock body scroll while the mobile menu is open + close on Escape
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    if (mobileOpen) document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const closeMenu = () => { setOpenMenu(null); setPinned(false) }

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-bg" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[17px] leading-none tracking-tight">Anthroprime<span className="text-accent">.ai</span></span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-faint uppercase mt-0.5">Infrastructure Network</span>
            </div>
          </a>

          <nav ref={navRef} className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
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
                    onClick={() => {
                      if (openMenu === item.label && pinned) closeMenu()
                      else { setOpenMenu(item.label); setPinned(true) }
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium transition-colors ${openMenu === item.label ? 'bg-surface2 text-text' : 'text-muted hover:text-text hover:bg-surface2'}`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a href={item.href} className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-muted hover:text-text hover:bg-surface2 transition-colors">{item.label}</a>
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
                      <div className="min-w-[280px] glass-strong rounded-xl p-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                        {item.children.map((child) => (
                          <a key={child.label} href={child.href} onClick={closeMenu} className="flex items-center justify-between px-3.5 py-3 rounded-lg hover:bg-surface2 group transition-colors">
                            <span className="text-[13.5px] font-medium text-text group-hover:text-accent transition-colors">{child.label}</span>
                            {child.desc && <span className="font-mono text-[11px] text-faint">{child.desc}</span>}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="px-4 py-2.5 rounded-lg text-[13.5px] font-medium text-muted hover:text-text border border-border hover:border-border2 transition-all">Talk to an Expert</a>
            <a href="#find-capacity" className="px-4 py-2.5 rounded-lg text-[13.5px] font-semibold bg-accent text-bg hover:bg-accent2 transition-colors flex items-center gap-1.5">
              Find GPU Capacity <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden w-10 h-10 rounded-lg border border-border flex items-center justify-center text-text"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden bg-bg/95 backdrop-blur-xl pt-[72px] overflow-y-auto">
            <div className="p-6 space-y-6">
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
                          <a key={c.label} href={c.href} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-lg bg-surface border border-border text-[14px] text-muted hover:text-text">{c.label}</a>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <a href={item.href} onClick={() => setMobileOpen(false)} className="block py-3 font-display font-semibold text-[16px]">{item.label}</a>
                  )}
                </div>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                <a href="#contact" onClick={() => setMobileOpen(false)} className="w-full py-3.5 rounded-xl border border-border text-center font-medium">Talk to an Expert</a>
                <a href="#find-capacity" onClick={() => setMobileOpen(false)} className="w-full py-3.5 rounded-xl bg-accent text-bg text-center font-semibold">Find GPU Capacity</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
