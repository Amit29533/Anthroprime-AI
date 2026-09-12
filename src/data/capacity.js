/**
 * Capacity network reference — the accelerator families, configurations and
 * deployment models we track across our infrastructure network.
 *
 * This file intentionally contains NO pricing. Commercials are quoted per
 * mandate: availability, configuration, geography, term and commitment are all
 * verified at time of request, so anything published here would be stale the
 * moment it shipped. Ask the desk — we negotiate terms on your behalf.
 *
 * kind: 'on-demand' = firm reserved capacity · 'spot' = interruptible ·
 *       'serverless' = per-use platform · 'secure' | 'community' = other tiers
 */

export const CAPACITY_DATA = {
  // [provider, gpu family, variant label, vram GB, kind, min GPUs]
  offers: [
    // ---- H100 ----
    ['voltagepark', 'h100', 'H100 HGX', 80, 'on-demand', 8],
    ['sfcompute', 'h100', 'H100 Cluster', 80, 'spot', 8],
    ['tensordock', 'h100', 'H100 SXM', 80, 'on-demand', 1],
    ['tensordock', 'h100', 'H100 SXM', 80, 'spot', 1],
    ['runpod', 'h100', 'H100 PCIe', 80, 'on-demand', 1],
    ['runpod', 'h100', 'H100 PCIe', 80, 'spot', 1],
    ['runpod', 'h100', 'H100 SXM', 80, 'on-demand', 1],
    ['runpod', 'h100', 'H100 SXM', 80, 'spot', 1],
    ['jarvislabs', 'h100', 'H100 SXM', 80, 'on-demand', 1],
    ['massedcompute', 'h100', 'H100', 80, 'on-demand', 1],
    ['massedcompute', 'h100', 'H100 SXM', 80, 'on-demand', 1],
    ['koyeb', 'h100', 'H100', 80, 'serverless', 1],
    ['hyperstack', 'h100', 'H100', 80, 'on-demand', 1],
    ['hyperstack', 'h100', 'H100 SXM', 80, 'on-demand', 1],
    ['datacrunch', 'h100', 'H100 SXM', 80, 'on-demand', 1],
    ['latitude', 'h100', 'H100', 80, 'on-demand', 1],
    ['scaleway', 'h100', 'H100', 80, 'on-demand', 1],
    ['scaleway', 'h100', 'H100 SXM', 80, 'on-demand', 4],
    ['nebius', 'h100', 'H100', 80, 'on-demand', 1],
    ['crusoe', 'h100', 'H100', 80, 'on-demand', 1],
    ['lambda', 'h100', 'H100 SXM', 80, 'on-demand', 1],
    ['lambda', 'h100', 'H100 PCIe', 80, 'on-demand', 1],
    ['thundercompute', 'h100', 'H100 PCIe', 80, 'on-demand', 1],
    ['coreweave', 'h100', 'H100', 80, 'on-demand', 8],
    ['gcp', 'h100', 'H100 (A3)', 80, 'on-demand', 8],
    ['gcp', 'h100', 'H100 (A3)', 80, 'spot', 8],
    ['replicate', 'h100', 'H100', 80, 'serverless', 1],
    ['fireworks', 'h100', 'H100', 80, 'serverless', 1],
    // ---- H200 ----
    ['koyeb', 'h200', 'H200', 141, 'serverless', 1],
    ['massedcompute', 'h200', 'H200 NVL', 141, 'on-demand', 1],
    ['runpod', 'h200', 'H200', 141, 'on-demand', 1],
    ['runpod', 'h200', 'H200', 141, 'spot', 1],
    ['runpod', 'h200', 'H200 NVL', 143, 'on-demand', 1],
    ['hyperstack', 'h200', 'H200', 141, 'on-demand', 1],
    ['jarvislabs', 'h200', 'H200', 141, 'on-demand', 1],
    ['datacrunch', 'h200', 'H200', 141, 'on-demand', 1],
    ['crusoe', 'h200', 'H200', 141, 'on-demand', 1],
    ['nebius', 'h200', 'H200', 141, 'on-demand', 1],
    ['coreweave', 'h200', 'H200', 141, 'on-demand', 8],
    ['gcp', 'h200', 'H200', 141, 'on-demand', 8],
    ['gcp', 'h200', 'H200', 141, 'spot', 8],
    ['replicate', 'h200', 'H200', 141, 'serverless', 1],
    // ---- B200 / Blackwell ----
    ['koyeb', 'b200', 'B200', 180, 'serverless', 1],
    ['runpod', 'b200', 'B200', 180, 'on-demand', 1],
    ['runpod', 'b200', 'B200', 180, 'spot', 1],
    ['hyperstack', 'b200', 'B200', 192, 'on-demand', 1],
    ['datacrunch', 'b200', 'B200', 180, 'on-demand', 1],
    ['lambda', 'b200', 'B200', 180, 'on-demand', 1],
    ['nebius', 'b200', 'B200', 180, 'on-demand', 1],
    ['coreweave', 'b200', 'B200', 180, 'on-demand', 8],
    ['gcp', 'b200', 'B200', 180, 'on-demand', 8],
    ['gcp', 'b200', 'B200', 180, 'spot', 8],
    // ---- B300 / GB300 (next-gen Blackwell) ----
    ['runpod', 'b300', 'B300', 288, 'on-demand', 1],
    ['runpod', 'b300', 'B300', 288, 'spot', 1],
    ['hyperstack', 'b300', 'B300', 288, 'on-demand', 1],
    ['nebius', 'b300', 'B300', 288, 'on-demand', 1],
    ['datacrunch', 'b300', 'B300', 268, 'on-demand', 1],
    ['datacrunch', 'gb300', 'GB300', 288, 'on-demand', 1],
    ['scaleway', 'b300', 'B300', 288, 'on-demand', 8],
    ['latitude', 'b300', 'B300', 288, 'on-demand', 8],
    // ---- A100 ----
    ['thundercompute', 'a100', 'A100 80GB', 80, 'on-demand', 1],
    ['hyperstack', 'a100', 'A100 80GB', 80, 'on-demand', 1],
    ['massedcompute', 'a100', 'A100 80GB', 80, 'on-demand', 1],
    ['massedcompute', 'a100', 'A100 SXM 80GB', 80, 'on-demand', 1],
    ['jarvislabs', 'a100', 'A100 80GB', 80, 'on-demand', 1],
    ['jarvislabs', 'a100', 'A100 SXM 40GB', 40, 'on-demand', 1],
    ['runpod', 'a100', 'A100 PCIe 80GB', 80, 'on-demand', 1],
    ['runpod', 'a100', 'A100 PCIe 80GB', 80, 'spot', 1],
    ['runpod', 'a100', 'A100 SXM 80GB', 80, 'on-demand', 1],
    ['runpod', 'a100', 'A100 SXM 80GB', 80, 'spot', 1],
    ['runpod', 'a100', 'A100 SXM 40GB', 40, 'spot', 1],
    ['hyperstack', 'a100', 'A100 SXM 80GB', 80, 'on-demand', 1],
    ['koyeb', 'a100', 'A100 80GB', 80, 'serverless', 1],
    ['koyeb', 'a100', 'A100 SXM 80GB', 80, 'serverless', 1],
    ['tensordock', 'a100', 'A100 SXM 80GB', 80, 'on-demand', 1],
    ['tensordock', 'a100', 'A100 PCIe 80GB', 80, 'on-demand', 1],
    ['datacrunch', 'a100', 'A100 SXM 80GB', 80, 'on-demand', 1],
    ['datacrunch', 'a100', 'A100 SXM 40GB', 40, 'on-demand', 1],
    ['lambda', 'a100', 'A100 SXM 80GB', 80, 'on-demand', 1],
    ['lambda', 'a100', 'A100 PCIe 40GB', 40, 'on-demand', 1],
    ['crusoe', 'a100', 'A100 SXM 80GB', 80, 'on-demand', 1],
    ['crusoe', 'a100', 'A100 PCIe 80GB', 80, 'on-demand', 1],
    ['coreweave', 'a100', 'A100 80GB', 80, 'on-demand', 8],
    ['ovh', 'a100', 'A100', 80, 'on-demand', 1],
    ['gcp', 'a100', 'A100 SXM 80GB', 80, 'on-demand', 8],
    ['gcp', 'a100', 'A100 SXM 80GB', 80, 'spot', 8],
    ['gcp', 'a100', 'A100 SXM 40GB', 40, 'on-demand', 1],
    ['gcp', 'a100', 'A100 SXM 40GB', 40, 'spot', 1],
    ['replicate', 'a100', 'A100 80GB', 80, 'serverless', 1],
    // ---- L40S ----
    ['massedcompute', 'l40s', 'L40S', 48, 'on-demand', 1],
    ['runpod', 'l40s', 'L40S', 48, 'on-demand', 1],
    ['runpod', 'l40s', 'L40S', 48, 'spot', 1],
    ['koyeb', 'l40s', 'L40S', 48, 'serverless', 1],
    ['nebius', 'l40s', 'L40S', 48, 'on-demand', 1],
    ['datacrunch', 'l40s', 'L40S', 48, 'on-demand', 1],
    ['crusoe', 'l40s', 'L40S', 48, 'on-demand', 1],
    ['scaleway', 'l40s', 'L40S', 48, 'on-demand', 1],
    ['coreweave', 'l40s', 'L40S', 48, 'on-demand', 8],
    ['replicate', 'l40s', 'L40S', 48, 'serverless', 1],
    // ---- MI300X (AMD, "other accelerators") ----
    ['runpod', 'mi300x', 'MI300X', 192, 'on-demand', 1],
    ['hotaisle', 'mi300x', 'MI300X', 192, 'on-demand', 1],
    ['crusoe', 'mi300x', 'MI300X', 192, 'on-demand', 1],
  ],
}

/** Provider directory — public sites only; no partner terms are published. */
export const PROVIDER_META = {
  runpod: { name: 'RunPod', url: 'https://www.runpod.io' },
  lambda: { name: 'Lambda', url: 'https://lambda.ai' },
  hyperstack: { name: 'Hyperstack', url: 'https://www.hyperstack.cloud' },
  coreweave: { name: 'CoreWeave', url: 'https://www.coreweave.com' },
  nebius: { name: 'Nebius', url: 'https://nebius.com' },
  datacrunch: { name: 'DataCrunch', url: 'https://datacrunch.io' },
  voltagepark: { name: 'Voltage Park', url: 'https://www.voltagepark.com' },
  crusoe: { name: 'Crusoe', url: 'https://crusoe.ai' },
  jarvislabs: { name: 'Jarvis Labs', url: 'https://jarvislabs.ai' },
  ovh: { name: 'OVHcloud', url: 'https://www.ovhcloud.com' },
  massedcompute: { name: 'Massed Compute', url: 'https://massedcompute.com' },
  tensordock: { name: 'TensorDock', url: 'https://www.tensordock.com' },
  koyeb: { name: 'Koyeb', url: 'https://www.koyeb.com' },
  thundercompute: { name: 'Thunder Compute', url: 'https://www.thundercompute.com' },
  latitude: { name: 'Latitude.sh', url: 'https://www.latitude.sh' },
  sfcompute: { name: 'SF Compute', url: 'https://sfcompute.com' },
  scaleway: { name: 'Scaleway', url: 'https://www.scaleway.com' },
  hotaisle: { name: 'Hot Aisle', url: 'https://hotaisle.xyz' },
  gcp: { name: 'Google Cloud', url: 'https://cloud.google.com' },
  replicate: { name: 'Replicate', url: 'https://replicate.com' },
  fireworks: { name: 'Fireworks AI', url: 'https://fireworks.ai' },
}

/** Family → the offer gpu ids grouped under it */
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
  return CAPACITY_DATA.offers
    .map(([provider, gpu, variant, vram, kind, minGpus]) => ({ provider, gpu, variant, vram, kind, minGpus }))
    .filter(o => ids.includes(o.gpu))
}

/** Aggregate rows for the marketplace summary cards */
export function capacitySummary() {
  const groups = {}
  for (const [provider, gpu, variant, vram, kind, minGpus] of CAPACITY_DATA.offers) {
    const fam = Object.keys(FAMILY_OF).find(f => FAMILY_OF[f].includes(gpu))
    const g = (groups[fam] ||= { family: fam, vram: 0, offers: [], providers: new Set(), kinds: new Set(), variants: new Set() })
    g.vram = Math.max(g.vram, vram)
    g.offers.push({ provider, variant, vram, kind, minGpus })
    g.providers.add(provider)
    g.kinds.add(kind)
    g.variants.add(variant)
  }
  return Object.values(groups).map(g => ({
    family: g.family,
    vram: g.vram,
    count: g.offers.length,
    providerCount: g.providers.size,
    kindCount: g.kinds.size,
    variantCount: g.variants.size,
  }))
}
