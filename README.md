# Anthroprime.ai — Global GPU Infrastructure. One Partner.

Premium, enterprise-grade website for Anthroprime.ai AI Infrastructure & GPU Cloud business. Designed inspired by Spheron, Fluidstack, Hyperstack, Lambda, CoreWeave, Shadeform, Vast.ai, RunPod — but with original positioning as **AI infrastructure aggregator and solutions partner**.

## Core Message
**One Partner. Global GPU Infrastructure.**  
We connect enterprises, AI companies and research organizations with GPU infrastructure across multiple cloud providers, data centers and infrastructure partners.

## Features Implemented

### Homepage Structure (as per brief)
- **Hero**: Global GPU Infrastructure. One Partner. + CTA + metrics + animated capacity graph
- **GPU Marquee**: H100 | H200 | B200 | GB200 | A100 | L40S with live status
- **GPU Capacity Aggregation**: 4 GPU cards (H100, H200, B200/GB200, A100·L40S) + deployment models
- **Dedicated AI Clusters**: Spec grid (HGX, NVLink, InfiniBand, storage, K8s/Slurm) + use cases
- **Solutions**: 6 solution cards (Training, Inference, Private Cloud, HPC, Sovereign, Dedicated Clusters)
- **How It Works**: 4-step aggregator model with visual connector
- **Marketplace / Availability**: Filterable table (GPU, Config, Region, Deployment, Availability) — no false inventory
- **Find GPU Capacity**: Full form (GPU Type, Qty, Location, Start Date, Duration, Workload, Bare Metal/Managed, Company, Email, Phone) — Netlify Forms + WhatsApp deep link
- **Global Infrastructure Network**: World map SVG with 5 regions (India, SEA, Middle East, Europe, North America) + NDA disclosure note
- **Who We Serve**: 6 customer categories
- **AI Infrastructure Services**: Advisory (10 items) + Managed (9 items) — differentiation from reseller
- **Why Us**: 6 differentiators + positioning rule compliance
- **Resources**: GPU Comparison, Guides, Pricing, Architecture, Blog (In Progress)
- **Company**: About, Partners (no names without permission), Contact (Gurugram, WhatsApp)
- **Final CTA**: Need 8 GPUs or 8,000?
- **Footer**: Full navigation + legal (CIN)

### Navigation (as per brief)
- Home
- GPU Cloud: H100, H200, B200/GB200, Other GPUs
- Solutions: AI Training, Inference, Dedicated Clusters, Private AI Cloud, HPC, Sovereign AI
- Services: GPU Sourcing, Advisory, Cluster Deployment, Managed Infra, Security
- Resources: GPU Comparison, Guides, Pricing, Architecture, Blogs
- Company: About, Partners, Contact
- Primary CTA: Find GPU Capacity, Secondary: Talk to an AI Infrastructure Expert

### Positioning Compliance
- Avoids: "We operate thousands of GPUs", "We own global data centers", "Our H200 cluster is available"
- Uses: "Access GPU capacity through our infrastructure network", "We source dedicated GPU infrastructure across multiple providers and regions", "Our team helps enterprises identify and deploy suitable GPU infrastructure"

### Design System
- **Look & Feel**: Serious global AI infra company, not IT-services
- **Style**: Minimal, premium, technical, strong typography, modern animations, infra/network graphics, very little stock photography
- **Colors**: #070A0F bg, #0F141C surface, #2FF2D2 accent, gold secondary
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (mono)
- **Effects**: Glassmorphism, dot-grid, glow, marquee, Framer Motion reveals
- **Responsive**: Mobile hamburger, sticky header, grid adaptations

### Tech Stack
- Vite + React 18 + Tailwind CSS 3 + Framer Motion + Lucide Icons
- Netlify-ready: `netlify.toml`, `_redirects`, Netlify Forms detection, headers
- Future-proof: Filter architecture for marketplace, supplier listing placeholder

## Local Development

```bash
npm install
npm run dev   # http://localhost:5173
npm run build # production build to dist/
npm run preview
npm test      # alignment + content checks
```

## Netlify Deployment

1. Connect repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment: Node 22 (set in netlify.toml)
5. Forms: Automatically detected (`gpu-capacity` form)
6. Redirects: SPA fallback via `/* -> /index.html 200`

The site is fully static, no server required. Form submissions go to Netlify Forms dashboard + WhatsApp.

## Testing

`npm test` runs `tests/run-tests.js` which checks:
- File existence (components, config, Netlify)
- Content presence (headlines, table, form fields, nav)
- Positioning compliance (no forbidden claims)
- Design tokens (glass, glow)
- Dist build output (if present)

## Long-term Marketplace Roadmap (in code comments & UI)

- Search GPU Capacity with filters: GPU, Country, Quantity, Price/GPU/hr, Interconnect, Availability, Contract duration
- Supplier portal: List GPU Capacity
- Concept: Demand (enterprises) → Supply aggregation (GPU clouds/DCs) → Platform matching → AnthroPrime commercial/managed layer

## Original Reference
This replaces the previous `GPU Capacity Desk.html` artifact with a production-grade React implementation.

---
© 2026 Anthroprime Technology Private Limited
