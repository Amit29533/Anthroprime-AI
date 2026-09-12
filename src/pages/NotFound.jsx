import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-[520px]">
        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-display font-bold text-[100px] leading-none text-gradient">
          404
        </motion.h1>
        <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-faint mt-3">Node not found in the network</div>
        <p className="text-muted text-[15px] leading-[1.6] mt-5">
          This route isn't in our capacity graph. Head back to the homepage, or go straight to the marketplace.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-bg font-semibold text-[14px] hover:bg-accent2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
          <Link to="/marketplace" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border font-medium text-[14px] hover:border-border2 transition-colors">
            GPU Marketplace
          </Link>
        </div>
      </div>
    </section>
  )
}
