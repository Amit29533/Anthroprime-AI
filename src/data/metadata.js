import { GPUS } from './gpus.js'
import { SOLUTIONS, solutionBySlug } from './solutions.js'

export const PAGE_META = {
  '/capacity': [
    'GPU Capacity — Anthroprime.ai',
    'Explore popular NVIDIA GPU capacity and request your configuration, region and deployment term directly from Anthroprime.'
  ],
  '/gpu-lab': [
    'The GPU Lab — Explore, Experiment, Understand | Anthroprime.ai',
    'Explore GPU architecture, parallel processing, model memory, and AI workflows through interactive explainers from Anthroprime.'
  ],
  '/': [
    'Anthroprime.ai — Global GPU Infrastructure. One Partner.',
    'Anthroprime provides GPU infrastructure for AI workloads. Dedicated GPU capacity, clusters and managed infrastructure, built around your workload.'
  ],
  '/solutions': [
    'AI Infrastructure Solutions — Anthroprime.ai',
    'Training, inference, dedicated clusters, private cloud, HPC and sovereign infrastructure.'
  ],
  '/services': [
    'Infrastructure Services — Anthroprime.ai',
    'GPU capacity provisioning, architecture advisory, cluster deployment, managed infrastructure and security.'
  ],
  '/resources': [
    'GPU Comparison & Resources — Anthroprime.ai',
    'Compare accelerator specifications and explore GPU deployment options with Anthroprime.'
  ],
  '/about': [
    'Our Practice — Anthroprime.ai',
    'India-led, globally connected. The AI infrastructure practice of Anthroprime Technology.'
  ],
  '/contact': [
    'Contact the Desk — Anthroprime.ai',
    'Start a conversation about your next AI infrastructure requirement.'
  ],
  '/find-capacity': [
    'Find GPU Capacity — Anthroprime.ai',
    'Build your GPU capacity brief. Choose your accelerator, scale, region and deployment model.'
  ]
}

export const PUBLIC_ROUTES = [
  ...Object.keys(PAGE_META),
  ...Object.keys(GPUS).map((slug) => '/gpu/' + slug),
  ...SOLUTIONS.map((s) => '/solutions/' + s.slug)
]
export function getPageMeta(pathname) {
  pathname = pathname.replace(/\/+$/, '') || '/'
  const [, type, slug] = pathname.split('/')
  if (
    type === 'gpu' &&
    Object.hasOwn(GPUS, slug) &&
    pathname === '/gpu/' + slug
  )
    return [GPUS[slug].full + ' — Anthroprime.ai', GPUS[slug].desc]
  if (
    type === 'solutions' &&
    solutionBySlug(slug) &&
    pathname === '/solutions/' + slug
  )
    return [
      solutionBySlug(slug).name + ' — Anthroprime.ai',
      solutionBySlug(slug).short
    ]
  return (
    PAGE_META[pathname] || [
      'Page not found — Anthroprime.ai',
      'Explore GPU infrastructure, solutions and deployment services.'
    ]
  )
}
