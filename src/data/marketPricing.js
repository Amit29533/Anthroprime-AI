/**
 * Market reference pricing snapshot.
 *
 * Source: "gpu-rental-prices" open dataset by Adrian Nutiu (CC BY 4.0)
 * https://github.com/adriannutiu/gpu-rental-prices · live at gpurentalprices.com
 * Snapshot date: 2026-09-11 (dataset refreshed daily upstream).
 *
 * These are PUBLIC LIST PRICES of third-party cloud providers, shown as a
 * market reference so buyers can benchmark. They are NOT Anthroprime inventory
 * and NOT quotes — Anthroprime sources and negotiates capacity independently
 * through its infrastructure network. Attribution per CC BY 4.0.
 *
 * kind: "on-demand" = firm listed price · "spot" = interruptible · "serverless" = per-use platform
 */

export const MARKET_DATA = {
  asOf: '2026-09-11',
  source: {
    name: 'gpu-rental-prices (CC BY 4.0)',
    repo: 'https://github.com/adriannutiu/gpu-rental-prices',
    live: 'https://gpurentalprices.com',
    providersTracked: 34,
  },
  // [provider, gpu family, variant label, vram GB, USD/GPU/hr, kind, min GPUs]
  offers: [
    // ---- H100 ----
    ['voltagepark', 'h100', 'H100 HGX', 80, 1.99, 'on-demand', 8],
    ['sfcompute', 'h100', 'H100 Cluster', 80, 1.67, 'spot', 8],
    ['tensordock', 'h100', 'H100 SXM', 80, 2.25, 'on-demand', 1],
    ['tensordock', 'h100', 'H100 SXM', 80, 1.91, 'spot', 1],
    ['runpod', 'h100', 'H100 PCIe', 80, 2.89, 'on-demand', 1],
    ['runpod', 'h100', 'H100 PCIe', 80, 1.99, 'spot', 1],
    ['runpod', 'h100', 'H100 SXM', 80, 3.49, 'on-demand', 1],
    ['runpod', 'h100', 'H100 SXM', 80, 2.69, 'spot', 1],
    ['jarvislabs', 'h100', 'H100 SXM', 80, 2.69, 'on-demand', 1],
    ['massedcompute', 'h100', 'H100', 80, 2.73, 'on-demand', 1],
    ['massedcompute', 'h100', 'H100 SXM', 80, 2.89, 'on-demand', 1],
    ['koyeb', 'h100', 'H100', 80, 2.5, 'serverless', 1],
    ['hyperstack', 'h100', 'H100', 80, 2.5, 'on-demand', 1],
    ['hyperstack', 'h100', 'H100 SXM', 80, 3.2, 'on-demand', 1],
    ['datacrunch', 'h100', 'H100 SXM', 80, 3.25, 'on-demand', 1],
    ['latitude', 'h100', 'H100', 80, 3.37, 'on-demand', 1],
    ['scaleway', 'h100', 'H100', 80, 3.33, 'on-demand', 1],
    ['scaleway', 'h100', 'H100 SXM', 80, 3.71, 'on-demand', 4],
    ['nebius', 'h100', 'H100', 80, 3.85, 'on-demand', 1],
    ['crusoe', 'h100', 'H100', 80, 3.9, 'on-demand', 1],
    ['lambda', 'h100', 'H100 SXM', 80, 3.99, 'on-demand', 1],
    ['lambda', 'h100', 'H100 PCIe', 80, 3.29, 'on-demand', 1],
    ['thundercompute', 'h100', 'H100 PCIe', 80, 3.2, 'on-demand', 1],
    ['coreweave', 'h100', 'H100', 80, 6.16, 'on-demand', 8],
    ['gcp', 'h100', 'H100 (A3)', 80, 9.8, 'on-demand', 8],
    ['gcp', 'h100', 'H100 (A3)', 80, 5.58, 'spot', 8],
    ['replicate', 'h100', 'H100', 80, 5.49, 'serverless', 1],
    ['fireworks', 'h100', 'H100', 80, 8.0, 'serverless', 1],
    // ---- H200 ----
    ['koyeb', 'h200', 'H200', 141, 3.0, 'serverless', 1],
    ['massedcompute', 'h200', 'H200 NVL', 141, 3.62, 'on-demand', 1],
    ['runpod', 'h200', 'H200', 141, 4.59, 'on-demand', 1],
    ['runpod', 'h200', 'H200', 141, 3.59, 'spot', 1],
    ['runpod', 'h200', 'H200 NVL', 143, 3.79, 'on-demand', 1],
    ['hyperstack', 'h200', 'H200', 141, 3.99, 'on-demand', 1],
    ['jarvislabs', 'h200', 'H200', 141, 3.99, 'on-demand', 1],
    ['datacrunch', 'h200', 'H200', 141, 4.0, 'on-demand', 1],
    ['crusoe', 'h200', 'H200', 141, 4.29, 'on-demand', 1],
    ['nebius', 'h200', 'H200', 141, 4.5, 'on-demand', 1],
    ['coreweave', 'h200', 'H200', 141, 6.31, 'on-demand', 8],
    ['gcp', 'h200', 'H200', 141, 9.31, 'on-demand', 8],
    ['gcp', 'h200', 'H200', 141, 5.38, 'spot', 8],
    ['replicate', 'h200', 'H200', 141, 5.49, 'serverless', 1],
    // ---- B200 / Blackwell ----
    ['koyeb', 'b200', 'B200', 180, 5.5, 'serverless', 1],
    ['runpod', 'b200', 'B200', 180, 6.79, 'on-demand', 1],
    ['runpod', 'b200', 'B200', 180, 5.98, 'spot', 1],
    ['hyperstack', 'b200', 'B200', 192, 6.0, 'on-demand', 1],
    ['datacrunch', 'b200', 'B200', 180, 6.11, 'on-demand', 1],
    ['lambda', 'b200', 'B200', 180, 6.69, 'on-demand', 1],
    ['nebius', 'b200', 'B200', 180, 7.15, 'on-demand', 1],
    ['coreweave', 'b200', 'B200', 180, 8.6, 'on-demand', 8],
    ['gcp', 'b200', 'B200', 180, 16.11, 'on-demand', 8],
    ['gcp', 'b200', 'B200', 180, 4.95, 'spot', 8],
    // ---- B300 / GB300 (next-gen Blackwell) ----
    ['runpod', 'b300', 'B300', 288, 7.89, 'on-demand', 1],
    ['runpod', 'b300', 'B300', 288, 6.94, 'spot', 1],
    ['hyperstack', 'b300', 'B300', 288, 7.4, 'on-demand', 1],
    ['nebius', 'b300', 'B300', 288, 7.85, 'on-demand', 1],
    ['datacrunch', 'b300', 'B300', 268, 7.5, 'on-demand', 1],
    ['datacrunch', 'gb300', 'GB300', 288, 8.62, 'on-demand', 1],
    ['scaleway', 'b300', 'B300', 288, 8.71, 'on-demand', 8],
    ['latitude', 'b300', 'B300', 288, 16.0, 'on-demand', 8],
    // ---- A100 ----
    ['thundercompute', 'a100', 'A100 80GB', 80, 1.09, 'on-demand', 1],
    ['hyperstack', 'a100', 'A100 80GB', 80, 1.35, 'on-demand', 1],
    ['massedcompute', 'a100', 'A100 80GB', 80, 1.35, 'on-demand', 1],
    ['massedcompute', 'a100', 'A100 SXM 80GB', 80, 1.38, 'on-demand', 1],
    ['jarvislabs', 'a100', 'A100 80GB', 80, 1.49, 'on-demand', 1],
    ['jarvislabs', 'a100', 'A100 SXM 40GB', 40, 0.89, 'on-demand', 1],
    ['runpod', 'a100', 'A100 PCIe 80GB', 80, 1.59, 'on-demand', 1],
    ['runpod', 'a100', 'A100 PCIe 80GB', 80, 1.19, 'spot', 1],
    ['runpod', 'a100', 'A100 SXM 80GB', 80, 1.59, 'on-demand', 1],
    ['runpod', 'a100', 'A100 SXM 80GB', 80, 1.39, 'spot', 1],
    ['runpod', 'a100', 'A100 SXM 40GB', 40, 1.0, 'spot', 1],
    ['hyperstack', 'a100', 'A100 SXM 80GB', 80, 1.6, 'on-demand', 1],
    ['koyeb', 'a100', 'A100 80GB', 80, 1.6, 'serverless', 1],
    ['koyeb', 'a100', 'A100 SXM 80GB', 80, 2.15, 'serverless', 1],
    ['tensordock', 'a100', 'A100 SXM 80GB', 80, 1.8, 'on-demand', 1],
    ['tensordock', 'a100', 'A100 PCIe 80GB', 80, 1.5, 'on-demand', 1],
    ['datacrunch', 'a100', 'A100 SXM 80GB', 80, 1.79, 'on-demand', 1],
    ['datacrunch', 'a100', 'A100 SXM 40GB', 40, 1.29, 'on-demand', 1],
    ['lambda', 'a100', 'A100 SXM 80GB', 80, 2.79, 'on-demand', 1],
    ['lambda', 'a100', 'A100 PCIe 40GB', 40, 1.99, 'on-demand', 1],
    ['crusoe', 'a100', 'A100 SXM 80GB', 80, 2.3, 'on-demand', 1],
    ['crusoe', 'a100', 'A100 PCIe 80GB', 80, 2.0, 'on-demand', 1],
    ['coreweave', 'a100', 'A100 80GB', 80, 2.7, 'on-demand', 8],
    ['ovh', 'a100', 'A100', 80, 3.07, 'on-demand', 1],
    ['gcp', 'a100', 'A100 SXM 80GB', 80, 3.93, 'on-demand', 8],
    ['gcp', 'a100', 'A100 SXM 80GB', 80, 2.27, 'spot', 8],
    ['gcp', 'a100', 'A100 SXM 40GB', 40, 2.93, 'on-demand', 1],
    ['gcp', 'a100', 'A100 SXM 40GB', 40, 1.69, 'spot', 1],
    ['replicate', 'a100', 'A100 80GB', 80, 5.04, 'serverless', 1],
    // ---- L40S ----
    ['massedcompute', 'l40s', 'L40S', 48, 0.97, 'on-demand', 1],
    ['runpod', 'l40s', 'L40S', 48, 1.09, 'on-demand', 1],
    ['runpod', 'l40s', 'L40S', 48, 0.79, 'spot', 1],
    ['koyeb', 'l40s', 'L40S', 48, 1.2, 'serverless', 1],
    ['nebius', 'l40s', 'L40S', 48, 1.35, 'on-demand', 1],
    ['datacrunch', 'l40s', 'L40S', 48, 1.37, 'on-demand', 1],
    ['crusoe', 'l40s', 'L40S', 48, 1.5, 'on-demand', 1],
    ['scaleway', 'l40s', 'L40S', 48, 1.71, 'on-demand', 1],
    ['coreweave', 'l40s', 'L40S', 48, 2.25, 'on-demand', 8],
    ['replicate', 'l40s', 'L40S', 48, 3.51, 'serverless', 1],
    // ---- MI300X (AMD, "other accelerators") ----
    ['runpod', 'mi300x', 'MI300X', 192, 2.39, 'on-demand', 1],
    ['hotaisle', 'mi300x', 'MI300X', 192, 2.99, 'on-demand', 1],
    ['crusoe', 'mi300x', 'MI300X', 192, 3.45, 'on-demand', 1],
  ],
}

export const PROVIDER_META = {
  runpod: { name: 'RunPod', url: 'https://www.runpod.io/pricing' },
  lambda: { name: 'Lambda', url: 'https://lambda.ai/service/gpu-cloud' },
  hyperstack: { name: 'Hyperstack', url: 'https://www.hyperstack.cloud/gpu-pricing' },
  coreweave: { name: 'CoreWeave', url: 'https://www.coreweave.com/pricing' },
  nebius: { name: 'Nebius', url: 'https://docs.nebius.com/compute/resources/pricing' },
  datacrunch: { name: 'DataCrunch', url: 'https://datacrunch.io/pricing' },
  voltagepark: { name: 'Voltage Park', url: 'https://support.voltagepark.com' },
  crusoe: { name: 'Crusoe', url: 'https://www.crusoe.ai/cloud/pricing' },
  jarvislabs: { name: 'Jarvis Labs', url: 'https://jarvislabs.ai/pricing' },
  ovh: { name: 'OVHcloud', url: 'https://www.ovhcloud.com/en/public-cloud/prices/' },
  massedcompute: { name: 'Massed Compute', url: 'https://massedcompute.com/pricing' },
  tensordock: { name: 'TensorDock', url: 'https://www.tensordock.com/cloud-gpus.html' },
  koyeb: { name: 'Koyeb', url: 'https://www.koyeb.com/pricing' },
  thundercompute: { name: 'Thunder Compute', url: 'https://www.thundercompute.com/pricing' },
  latitude: { name: 'Latitude.sh', url: 'https://www.latitude.sh/pricing' },
  sfcompute: { name: 'SF Compute', url: 'https://sfcompute.com/#prices' },
  scaleway: { name: 'Scaleway', url: 'https://www.scaleway.com/en/pricing/gpu/' },
  hotaisle: { name: 'Hot Aisle', url: 'https://hotaisle.xyz/pricing' },
  gcp: { name: 'Google Cloud', url: 'https://cloud.google.com/compute/gpus-pricing' },
  replicate: { name: 'Replicate', url: 'https://replicate.com/pricing' },
  fireworks: { name: 'Fireworks AI', url: 'https://fireworks.ai/pricing' },
}

/** Family → which offer gpu ids belong to it */
const FAMILY_OF = {
  h100: ['h100'],
  h200: ['h200'],
  b200: ['b200', 'b300', 'gb300'],
  a100: ['a100'],
  l40s: ['l40s'],
  mi300x: ['mi300x'],
}

export function offersForFamily(family) {
  const ids = FAMILY_OF[family] || []
  return MARKET_DATA.offers
    .map(([provider, gpu, variant, vram, usd, kind, minGpus]) => ({ provider, gpu, variant, vram, usd, kind, minGpus }))
    .filter(o => ids.includes(o.gpu))
}

/** Aggregate rows for the marketplace summary table */
export function marketSummary() {
  const groups = {}
  for (const [provider, gpu, variant, vram, usd, kind, minGpus] of MARKET_DATA.offers) {
    const fam = Object.keys(FAMILY_OF).find(f => FAMILY_OF[f].includes(gpu))
    const g = (groups[fam] ||= { family: fam, vram, offers: [], firm: [], flexible: [], providers: new Set() })
    g.vram = Math.max(g.vram, vram)
    g.offers.push({ provider, usd, kind, minGpus, variant })
    if (kind === 'spot' || kind === 'serverless') g.flexible.push(usd)
    else g.firm.push(usd)
    g.providers.add(provider)
  }
  return Object.values(groups).map(g => {
    const all = g.offers.map(o => o.usd).sort((a, b) => a - b)
    const firmSorted = [...g.firm].sort((a, b) => a - b)
    return {
      family: g.family,
      vram: g.vram,
      count: g.offers.length,
      providerCount: g.providers.size,
      min: all[0],
      firmMin: firmSorted[0],
      median: all[Math.floor(all.length / 2)],
      cheapest: g.offers.find(o => o.usd === all[0]),
    }
  })
}
