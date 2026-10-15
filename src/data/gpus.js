/**
 * GPU specification database.
 *
 * All figures sourced from NVIDIA public datasheets (H100/H200 HGX & PCIe,
 * A100, L40S, Blackwell B200/GB200). "*sparse" = with structural sparsity.
 * Node configurations follow NVIDIA HGX / DGX reference platforms.
 *
 * Availability is intentionally NOT claimed here — Anthroprime confirms
 * capacity, configuration and delivery dates directly for each request.
 */

export const GPUS = {
  h100: {
    slug: 'h100',
    name: 'H100',
    family: 'H100',
    full: 'NVIDIA H100 Tensor Core GPU',
    generation: 'Hopper',
    tagline: 'The workhorse of enterprise AI.',
    desc: 'Hopper-generation acceleration for large-scale training and high-throughput inference. Discuss SXM, PCIe, and NVL configurations with Anthroprime for your workload.',
    accent: '#2FF2D2',
    accentLight: '#0F766E',
    status: 'Capacity on request',
    specs: {
      'GPU memory': '80 GB HBM3',
      'Memory bandwidth': '3.35 TB/s (SXM) · 2.0 TB/s (PCIe)',
      FP64: '34 TFLOPS · 67 TFLOPS Tensor',
      FP32: '67 TFLOPS',
      'TF32 Tensor': '495 TFLOPS · 989 sparse',
      'BF16 / FP16 Tensor': '989 TFLOPS · 1,979 sparse',
      'FP8 Tensor': '1,979 TFLOPS · 3,958 sparse',
      NVLink: '4th gen · 900 GB/s (SXM) · 600 GB/s (PCIe)',
      PCIe: 'Gen5 x16',
      MIG: 'Up to 7 instances',
      'Form factor': 'SXM5 · PCIe dual-slot · H100 NVL (94GB)',
      'Max power': '700W SXM · 350W PCIe · 400W NVL'
    },
    variants: [
      {
        id: 'sxm',
        name: 'H100 SXM5',
        mem: '80GB HBM3',
        bw: '3.35 TB/s',
        fp8: '3,958 TFLOPS*',
        tdp: '700W',
        note: 'HGX 8-GPU platforms'
      },
      {
        id: 'pcie',
        name: 'H100 PCIe',
        mem: '80GB HBM2e',
        bw: '2.0 TB/s',
        fp8: '3,026 TFLOPS*',
        tdp: '350W',
        note: 'Rack & tower servers'
      },
      {
        id: 'nvl',
        name: 'H100 NVL',
        mem: '94GB HBM3',
        bw: '3.9 TB/s',
        fp8: '3,341 TFLOPS*',
        tdp: '400W',
        note: 'LLM inference pairs'
      }
    ],
    nodeConfig: {
      title: 'Reference 8-GPU node (HGX H100)',
      rows: [
        ['GPUs', '8× H100 SXM5 · 640 GB combined HBM3'],
        ['GPU interconnect', 'NVLink 4 + NVSwitch · 900 GB/s per GPU'],
        ['CPUs', '2× Intel Xeon / AMD EPYC'],
        ['System memory', 'Up to 2 TB DDR5'],
        ['Local storage', 'Up to 30 TB NVMe (DGX-class)'],
        ['Cluster fabric', '8× InfiniBand NDR 400 Gb/s']
      ]
    },
    bestFor: [
      'Foundation-model training',
      'High-throughput inference',
      'Multi-tenant MIG serving',
      'Distributed fine-tuning'
    ],
    chips: ['80GB', 'HBM3', 'NVLink 4', '700W', 'MIG']
  },

  h200: {
    slug: 'h200',
    name: 'H200',
    family: 'H200',
    full: 'NVIDIA H200 Tensor Core GPU',
    generation: 'Hopper',
    tagline: 'Hopper with 76% more memory.',
    desc: '141 GB of HBM3e at 4.8 TB/s makes H200 the memory-bandwidth champion of the Hopper generation — the default choice for long-context LLM inference and memory-bound training, with the same software stack as H100.',
    accent: '#2FF2D2',
    accentLight: '#0F766E',
    status: 'Capacity on request',
    specs: {
      'GPU memory': '141 GB HBM3e',
      'Memory bandwidth': '4.8 TB/s',
      FP64: '34 TFLOPS · 67 TFLOPS Tensor',
      FP32: '67 TFLOPS',
      'TF32 Tensor': '495 TFLOPS · 989 sparse',
      'BF16 / FP16 Tensor': '989 TFLOPS · 1,979 sparse',
      'FP8 Tensor': '1,979 TFLOPS · 3,958 sparse',
      NVLink: '4th gen · 900 GB/s',
      PCIe: 'Gen5 x16 (H200 NVL)',
      MIG: 'Up to 7 instances',
      'Form factor': 'SXM5 (HGX) · H200 NVL (PCIe)',
      'Max power': '700W SXM · 600W NVL'
    },
    variants: [
      {
        id: 'sxm',
        name: 'H200 SXM',
        mem: '141GB HBM3e',
        bw: '4.8 TB/s',
        fp8: '3,958 TFLOPS*',
        tdp: '700W',
        note: 'HGX 8-GPU platforms'
      },
      {
        id: 'nvl',
        name: 'H200 NVL',
        mem: '141GB HBM3e',
        bw: '4.8 TB/s',
        fp8: '3,341 TFLOPS*',
        tdp: '600W',
        note: 'PCIe inference nodes'
      }
    ],
    nodeConfig: {
      title: 'Reference 8-GPU node (HGX H200)',
      rows: [
        ['GPUs', '8× H200 SXM · 1,128 GB combined HBM3e'],
        ['GPU interconnect', 'NVLink 4 + NVSwitch · 900 GB/s per GPU'],
        ['CPUs', '2× Intel Xeon / AMD EPYC'],
        ['System memory', 'Up to 2 TB DDR5'],
        ['Local storage', 'High-throughput NVMe checkpoint tier'],
        ['Cluster fabric', 'InfiniBand NDR 400 Gb/s']
      ]
    },
    bestFor: [
      'Long-context LLM inference',
      'Memory-bound training',
      'KV-cache-heavy serving',
      'H100 fleet upgrades'
    ],
    chips: ['141GB', 'HBM3e', '4.8 TB/s', 'NVLink 4', '700W']
  },

  b200: {
    slug: 'b200',
    name: 'B200',
    family: 'B200 / GB200',
    full: 'NVIDIA B200 (Blackwell)',
    generation: 'Blackwell',
    tagline: 'Frontier-class training silicon.',
    desc: 'Blackwell architecture brings high-bandwidth memory and support for lower-precision AI operations. Discuss GPU and system configurations, power, cooling, and deployment requirements directly with our team.',
    accent: '#F5C518',
    accentLight: '#B45309',
    status: 'Availability confirmed on request',
    specs: {
      'GPU memory': '180 GB HBM3e (HGX B200)',
      'Memory bandwidth': '8 TB/s',
      'BF16 / FP16 Tensor': '2,250 TFLOPS · 4,500 sparse',
      'FP8 Tensor': '4,500 TFLOPS · 9,000 sparse',
      'FP4 Tensor': '9,000 TFLOPS · 18,000 sparse',
      NVLink: '5th gen · 1.8 TB/s',
      'Transformer Engine': '2nd generation (FP4/FP6/FP8)',
      Transistors: '208B · dual-die NV-HBI 10 TB/s',
      'Form factor': 'SXM (HGX B200)',
      'Max power': 'Up to 1,000W per HGX B200 GPU'
    },
    variants: [
      {
        id: 'hgx',
        name: 'B200 (HGX)',
        mem: '180GB HBM3e',
        bw: '8 TB/s',
        fp8: '9,000 TFLOPS*',
        tdp: '1,000W',
        note: '8-GPU HGX platforms'
      },
      {
        id: 'gb200',
        name: 'GB200 superchip',
        mem: '372GB HBM3e (2× Blackwell GPU)',
        bw: '16 TB/s',
        fp8: '20,000 TFLOPS*',
        tdp: 'Rack-scale',
        note: 'Grace CPU + 2× B200'
      }
    ],
    nodeConfig: {
      title: 'Reference platforms',
      rows: [
        ['HGX B200 node', '8× B200 · 1.44 TB HBM3e · NVLink 5 with NVSwitch'],
        ['GB200 NVL72', '72 Blackwell GPUs + 36 Grace CPUs · 13.4 TB HBM3e'],
        ['GPU interconnect', 'NVLink 5 · 1.8 TB/s per GPU'],
        ['Cluster fabric', 'InfiniBand XDR 800 Gb/s / Spectrum-X Ethernet'],
        ['Storage tier', 'Parallel file system for checkpoint throughput']
      ]
    },
    bestFor: [
      'Frontier pre-training',
      'Trillion-parameter MoE inference',
      'FP4 inference at scale',
      'Sovereign AI builds'
    ],
    chips: ['180GB', 'HBM3e', 'NVLink 5', 'FP4', '1kW']
  },

  gb200: {
    slug: 'gb200',
    name: 'GB200',
    family: 'B200 / GB200',
    full: 'NVIDIA GB200 NVL72',
    generation: 'Blackwell',
    tagline: 'Rack-scale supercomputing for AI.',
    desc: 'The GB200 NVL72 connects 72 Blackwell GPUs and 36 Grace CPUs in a liquid-cooled rack with 13.4 TB of HBM3e. Discuss rack-scale AI workloads and site readiness directly with Anthroprime.',
    accent: '#F5C518',
    accentLight: '#B45309',
    status: 'Availability confirmed on request',
    specs: {
      'GPUs per rack': '72× Blackwell GPUs · liquid-cooled rack',
      'CPUs per rack': '36× Grace (Arm Neoverse V2)',
      'GPU memory': '372 GB HBM3e per superchip · 13.4 TB per rack',
      'Memory bandwidth': '16 TB/s per superchip',
      'FP8 Tensor': '20,000 TFLOPS per superchip sparse',
      'FP4 Tensor': '1.44 EFLOPS per rack (sparse)',
      'NVLink domain': '72 GPUs · NVLink 5 · 1.8 TB/s per GPU',
      'Cluster fabric': 'InfiniBand XDR 800 Gb/s',
      Cooling: 'Liquid-cooled rack',
      Superchips: '36× GB200 (Grace + 2× Blackwell GPUs)'
    },
    variants: [
      {
        id: 'nvl72',
        name: 'GB200 NVL72',
        mem: '13.4TB / rack',
        bw: '16 TB/s per superchip',
        fp8: '1.44 EFLOPS NVFP4*',
        tdp: 'Rack-scale',
        note: 'Trillion-param domain'
      },
      {
        id: 'nvl36',
        name: 'GB200 superchip',
        mem: '372GB / superchip',
        bw: '16 TB/s',
        fp8: '20,000 TFLOPS FP8*',
        tdp: 'Per-rack',
        note: 'Building block'
      }
    ],
    nodeConfig: {
      title: 'Reference rack (GB200 NVL72)',
      rows: [
        ['Compute trays', '18× compute trays · 2× GB200 superchips each'],
        ['NVLink switch trays', '9× NVSwitch trays · full 72-GPU domain'],
        ['Aggregate memory', '13.4 TB HBM3e'],
        ['Aggregate FP4', '1.44 EFLOPS NVFP4 (sparse)'],
        ['Cooling', 'Closed-loop liquid cooling'],
        ['Deployment', 'Data-center build-out with site readiness review']
      ]
    },
    bestFor: [
      'Trillion-parameter models',
      'Real-time giant-model inference',
      'National / sovereign AI programs'
    ],
    chips: ['72 GPUs', '13.4TB', 'NVL72', 'Liquid-cooled']
  },

  a100: {
    slug: 'a100',
    name: 'A100',
    family: 'A100 · L40S',
    full: 'NVIDIA A100 Tensor Core GPU',
    generation: 'Ampere',
    tagline: 'The proven value platform.',
    desc: 'Ampere-generation acceleration for training and fine-tuning workloads. Discuss A100 configurations, memory capacity, and MIG partitioning for shared clusters with our team.',
    accent: '#8A9BB0',
    accentLight: '#475569',
    status: 'Capacity on request',
    specs: {
      'GPU memory': '80 GB HBM2e · 40 GB HBM2',
      'Memory bandwidth': '2.0 TB/s (SXM 80GB) · 1.9 TB/s (PCIe 80GB)',
      FP64: '9.7 TFLOPS · 19.5 TFLOPS Tensor',
      FP32: '19.5 TFLOPS',
      'TF32 Tensor': '156 TFLOPS · 312 sparse',
      'BF16 / FP16 Tensor': '312 TFLOPS · 624 sparse',
      'INT8 Tensor': '624 TOPS · 1,248 sparse',
      FP8: 'Not supported (pre-Hopper)',
      NVLink: '3rd gen · 600 GB/s (SXM)',
      PCIe: 'Gen4 x16',
      MIG: 'Up to 7 instances',
      'Form factor': 'SXM4 · PCIe · 40GB / 80GB',
      'Max power': '400W SXM · 300W PCIe'
    },
    variants: [
      {
        id: 'sxm80',
        name: 'A100 SXM 80GB',
        mem: '80GB HBM2e',
        bw: '2.0 TB/s',
        fp8: 'n/a · 312 TFLOPS TF32*',
        tdp: '400W',
        note: 'HGX 8-GPU platforms'
      },
      {
        id: 'sxm40',
        name: 'A100 SXM 40GB',
        mem: '40GB HBM2',
        bw: '1.6 TB/s',
        fp8: 'n/a · 312 TFLOPS TF32*',
        tdp: '400W',
        note: 'Legacy HGX / value'
      },
      {
        id: 'pcie80',
        name: 'A100 PCIe 80GB',
        mem: '80GB HBM2e',
        bw: '1.9 TB/s',
        fp8: 'n/a · 312 TFLOPS TF32*',
        tdp: '300W',
        note: 'PCIe servers'
      }
    ],
    nodeConfig: {
      title: 'Reference 8-GPU node (HGX A100)',
      rows: [
        ['GPUs', '8× A100 SXM 80GB · 640 GB combined HBM2e'],
        ['GPU interconnect', 'NVLink 3 + NVSwitch · 600 GB/s per GPU'],
        ['CPUs', '2× Intel Xeon / AMD EPYC'],
        ['System memory', '1–2 TB DDR4'],
        ['Local storage', 'NVMe tier · 15–30 TB typical'],
        ['Cluster fabric', 'InfiniBand HDR 200 Gb/s']
      ]
    },
    bestFor: [
      'Fine-tuning at scale',
      'Research clusters',
      'MIG multi-tenancy',
      'High-availability training'
    ],
    chips: ['80GB', 'HBM2e', 'NVLink 3', '400W', 'MIG']
  },

  l40s: {
    slug: 'l40s',
    name: 'L40S',
    family: 'A100 · L40S',
    full: 'NVIDIA L40S',
    generation: 'Ada Lovelace',
    tagline: 'Inference and graphics convergence.',
    desc: 'Ada Lovelace for the data center: 48 GB GDDR6, strong FP8 inference and built-in video engines. The efficient choice for serving, fine-tuning and AI + graphics pipelines where HBM is not required.',
    accent: '#8A9BB0',
    accentLight: '#475569',
    status: 'Capacity on request',
    specs: {
      'GPU memory': '48 GB GDDR6 with ECC',
      'Memory bandwidth': '864 GB/s',
      FP64: '1.42 TFLOPS',
      FP32: '91.6 TFLOPS',
      'TF32 Tensor': '366 TFLOPS sparse',
      'BF16 / FP16 Tensor': '733 TFLOPS sparse',
      'FP8 Tensor': '1,466 TFLOPS sparse',
      NVLink: 'Not available · PCIe Gen4 x16',
      'Video engines': '3× encode / 3× decode (AV1)',
      MIG: 'Not available',
      'Form factor': 'PCIe dual-slot, passive',
      'Max power': '350W'
    },
    variants: [
      {
        id: 'pcie',
        name: 'L40S PCIe',
        mem: '48GB GDDR6',
        bw: '864 GB/s',
        fp8: '1,466 TFLOPS*',
        tdp: '350W',
        note: 'Universal PCIe servers'
      }
    ],
    nodeConfig: {
      title: 'Reference node',
      rows: [
        ['GPUs', '2–8× L40S PCIe per server'],
        ['Interconnect', 'PCIe Gen4 x16 per GPU (no NVLink)'],
        ['Typical platform', '4U PCIe servers · air-cooled'],
        ['Local storage', 'NVMe tier for model cache'],
        ['Best topology', 'Scale-out inference replicas']
      ]
    },
    bestFor: [
      'High-throughput inference',
      'Fine-tuning (LoRA/QLoRA)',
      'AI video & graphics',
      'VDI + AI convergence'
    ],
    chips: ['48GB', 'GDDR6', 'FP8', '350W', 'AV1']
  }
}

export const GPU_ORDER = ['h100', 'h200', 'b200', 'gb200', 'a100', 'l40s']

export const GPU_REFERENCES = {
  h100: 'https://www.nvidia.com/en-us/data-center/h100/',
  h200: 'https://www.nvidia.com/en-us/data-center/h200/',
  b200: 'https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory-h100-h200-b200/latest/components.html',
  gb200: 'https://www.nvidia.com/en-us/data-center/gb200-nvl72/',
  a100: 'https://www.nvidia.com/en-us/data-center/a100/',
  l40s: 'https://www.nvidia.com/en-us/data-center/l40s/'
}

export const gpuBySlug = (slug) =>
  Object.hasOwn(GPUS, slug) ? GPUS[slug] : null

/** Nav grouping from the brief */
export const GPU_NAV = [
  { label: 'H100', slug: 'h100', desc: 'SXM / PCIe' },
  { label: 'H200', slug: 'h200', desc: '141GB HBM3e' },
  { label: 'B200 / GB200', slug: 'b200', desc: 'Blackwell' },
  { label: 'Other GPUs', slug: 'a100', desc: 'A100 · L40S · Accelerators' }
]
