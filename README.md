# Anthroprime.ai — Global GPU Infrastructure. One Partner.

Premium, multi-page website for Anthroprime.ai — an **AI infrastructure aggregator and solutions partner**. Design language inspired by Spheron, Shadeform, FluidStack, Hyperstack, Lambda, CoreWeave, RunPod and vast.ai, with original positioning and content.

## Architecture

Vite + React 18 + Tailwind CSS 3 + Framer Motion + **react-router-dom** + **three.js / @react-three/fiber** + Lucide.

### Routes

| Route | Page |
|---|---|
| `/` | Home — 3D network globe hero, GPU strip, aggregation, clusters, how-it-works, global network, services, who-we-serve, why-us, final CTA |
| `/marketplace` | GPU capacity marketplace — live market reference pricing, filters (family/type/search/sort), per-provider offers |
| `/gpu/:slug` | GPU detail pages: `h100` `h200` `b200` `gb200` `a100` `l40s` — datasheet specs, variants, reference node configs, market pricing band |
| `/solutions` | Solutions index (6 solutions) |
| `/solutions/:slug` | Solution detail: `training` `inference` `clusters` `private-cloud` `hpc` `sovereign` |
| `/services` | Services — GPU Capacity Sourcing, Advisory, Cluster Deployment, Managed AI Infrastructure, Security (anchored) |
| `/resources` | Interactive GPU comparison + pricing economics + guides |
| `/about` | About + Partners (NDA disclosure policy) |
| `/contact` | Contact (WhatsApp / email / response expectations) |
| `/find-capacity` | Find GPU Capacity form (primary CTA destination; accepts prefill state from marketplace/GPU pages) |
| `*` | 404 |

### Data layer (`src/data/`)

- **`gpus.js`** — GPU spec database from NVIDIA public datasheets: memory sizes, bandwidth, FP64/FP32/TF32/FP16/FP8/FP4 TFLOPS, NVLink generations (900 GB/s / 1.8 TB/s), TDP, MIG, form factors, and HGX/DGX-class reference node configurations.
- **`marketPricing.js`** — market reference pricing snapshot sourced from the open **gpu-rental-prices** dataset ([github.com/adriannutiu/gpu-rental-prices](https://github.com/adriannutiu/gpu-rental-prices), CC BY 4.0, live at gpurentalprices.com). Clearly labelled as third-party list prices — never Anthroprime inventory.
- **`scripts/fetch-market-data.mjs`** — runs on `npm run build`: refreshes the snapshot from the upstream dataset; falls back to the committed snapshot if the fetch fails.
- `solutions.js`, `services.js` — page content.

### 3D & motion

- `Globe3D` — react-three-fiber particle globe with region nodes and animated sourcing arcs (lazy-loaded chunk; static fallback on WebGL failure; respects `prefers-reduced-motion`).
- 3D mouse-tilt cards, spotlight hovers, scroll progress bar, back-to-top, page transitions, staggered reveals.

## Positioning compliance

- No ownership claims ("we operate thousands of GPUs" etc. are test-guarded).
- Accurate language: *"Access GPU capacity through our infrastructure network"* / *"We source dedicated GPU infrastructure across multiple providers and regions."*
- Partner names never published; disclosure under NDA.
- Market pricing always attributed, dated and labelled as reference data.

## Local development

```bash
npm install
npm run dev            # http://localhost:5173
npm run fetch:market   # refresh pricing snapshot manually
npm run build          # refresh snapshot + production build
npm test               # 76 alignment/content/accuracy checks
```

## Netlify deployment

- Build: `npm run build` · Publish: `dist` · Node 22 (see `netlify.toml`)
- SPA fallback via `/* → /index.html 200`
- Netlify Forms: `gpu-capacity` (hidden static form in `index.html` + honeypot)

## Attribution

Market reference pricing: [gpu-rental-prices](https://github.com/adriannutiu/gpu-rental-prices) by Adrian Nutiu, CC BY 4.0 — [gpurentalprices.com](https://gpurentalprices.com).

---
© 2026 Anthroprime Technology Private Limited
