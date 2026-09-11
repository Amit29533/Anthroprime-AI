import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8 bg-bg">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
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
              {[
                { label: 'H100', href: '#h100' },
                { label: 'H200', href: '#h200' },
                { label: 'B200 / GB200', href: '#b200' },
                { label: 'Other GPUs', href: '#other-gpus' },
              ].map(l => <a key={l.label} href={l.href} className="block text-[13.5px] text-muted hover:text-accent transition-colors">{l.label}</a>)}
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">Solutions</div>
            <div className="space-y-2.5">
              {[
                { label: 'AI Training', href: '#sol-training' },
                { label: 'AI Inference', href: '#sol-inference' },
                { label: 'Dedicated Clusters', href: '#sol-clusters' },
                { label: 'Private AI Cloud', href: '#sol-private-cloud' },
                { label: 'HPC', href: '#sol-hpc' },
                { label: 'Sovereign AI', href: '#sol-sovereign' },
              ].map(l => <a key={l.label} href={l.href} className="block text-[13.5px] text-muted hover:text-accent transition-colors">{l.label}</a>)}
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">Services</div>
            <div className="space-y-2.5">
              {[
                { label: 'GPU Capacity Sourcing', href: '#svc-sourcing' },
                { label: 'Advisory', href: '#svc-advisory' },
                { label: 'Cluster Deployment', href: '#svc-deployment' },
                { label: 'Managed Infra', href: '#svc-managed' },
                { label: 'Security', href: '#svc-security' },
              ].map(l => <a key={l.label} href={l.href} className="block text-[13.5px] text-muted hover:text-accent transition-colors">{l.label}</a>)}
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-wide uppercase text-faint mb-4">Company</div>
            <div className="space-y-2.5">
              <a href="#about" className="block text-[13.5px] text-muted hover:text-accent transition-colors">About Us</a>
              <a href="#partners" className="block text-[13.5px] text-muted hover:text-accent transition-colors">Partners</a>
              <a href="#contact" className="block text-[13.5px] text-muted hover:text-accent transition-colors">Contact</a>
              <a href="#resources" className="block text-[13.5px] text-muted hover:text-accent transition-colors">Resources</a>
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
