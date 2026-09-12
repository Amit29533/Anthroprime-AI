# Anthroprime.ai — Global GPU Infrastructure. One Partner.

Premium, multi-page website for Anthroprime.ai — an **AI infrastructure aggregator and solutions partner**. Design language inspired by Spheron, Shadeform, FluidStack, Hyperstack, Lambda, CoreWeave, RunPod and vast.ai, with original positioning and content.

## Architecture

Vite + React 18 + Tailwind CSS 3 + Framer Motion + **react-router-dom** + **three.js / @react-three/fiber** + Lucide.

### Routes

| Route | Page |
|---|---|
| `/` | Home — 3D network globe hero, GPU strip, aggregation, clusters, how-it-works, global network, services, who-we-serve, why-us, final CTA |
| `/marketplace` | GPU capacity marketplace — accelerator families, configurations and deployment models, filters (family/type/search/sort), per-provider offers. Commercials are quoted per mandate |
| `/gpu/:slug` | GPU detail pages: `h100` `h200` `b200` `gb200` `a100` `l40s` — datasheet specs, variants, reference node configs, network availability panel |
| `/solutions` | Solutions index (6 solutions) |
| `/solutions/:slug` | Solution detail: `training` `inference` `clusters` `private-cloud` `hpc` `sovereign` |
| `/services` | Services — GPU Capacity Sourcing, Advisory, Cluster Deployment, Managed AI Infrastructure, Security (anchored) |
| `/resources` | Interactive GPU comparison + network coverage by accelerator + guides |
| `/about` | About + Partners (NDA disclosure policy) |
| `/contact` | Contact (WhatsApp / email / response expectations) |
| `/find-capacity` | Find GPU Capacity form (primary CTA destination; accepts prefill state from marketplace/GPU pages) |
| `*` | 404 |

### Data layer (`src/data/`)

- **`gpus.js`** — GPU spec database from NVIDIA public datasheets: memory sizes, bandwidth, FP64/FP32/TF32/FP16/FP8/FP4 TFLOPS, NVLink generations (900 GB/s / 1.8 TB/s), TDP, MIG, form factors, and HGX/DGX-class reference node configurations.
- **`capacity.js`** — the accelerator families, configurations and deployment models tracked across our infrastructure network. **Deliberately price-free**: availability, configuration, geography and term all move commercials, so they are quoted per mandate and verified at the time of request.
- `solutions.js`, `services.js` — page content.

> **No pricing is published anywhere on the site.** The marketplace shows "Price on request" and the desk quotes per mandate. `npm test` guards this (it fails if a dollar amount, hourly rate, TCO claim or pricing reference reappears in `src/`, `public/`, `index.html` or `netlify.toml`).

### 3D & motion

- `Globe3D` — react-three-fiber particle globe with region nodes and animated sourcing arcs (lazy-loaded chunk; static fallback on WebGL failure; respects `prefers-reduced-motion`).
- 3D mouse-tilt cards, spotlight hovers, scroll progress bar, back-to-top, page transitions, staggered reveals.

## Positioning compliance

- No ownership claims ("we operate thousands of GPUs" etc. are test-guarded).
- Accurate language: *"Access GPU capacity through our infrastructure network"* / *"We source dedicated GPU infrastructure across multiple providers and regions."*
- Partner names never published; disclosure under NDA.
- No rates, price tables or cost claims are published; commercials are quoted per mandate.

## Local development

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # production build
npm test               # 100 alignment/content/accuracy checks
```

## Netlify deployment

- Build: `npm run build` · Publish: `dist` · Node 22 (see `netlify.toml`)
- SPA fallback via `/* → /index.html 200`
- Netlify Forms: `gpu-capacity` (hidden static form in `index.html` + honeypot)

## Attribution

Provider names and logos shown in the marketplace are the property of their respective owners and are listed only as points of reference for capacity we track. No partner terms are published.

---
© 2026 Anthroprime Technology Private Limited
