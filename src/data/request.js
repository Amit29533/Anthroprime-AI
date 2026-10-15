export const GPU_OPTIONS = [
  'H100',
  'H200',
  'B200 / GB200',
  'A100',
  'L40S',
  'Enterprise Accelerators',
  'Not sure / need advice'
]
export const DEPLOY_OPTIONS = [
  'Bare Metal',
  'Managed',
  'Dedicated / Reserved',
  'Not sure'
]
const GPU_ALIASES = {
  B200: 'B200 / GB200',
  GB200: 'B200 / GB200',
  B300: 'B200 / GB200',
  GB300: 'B200 / GB200',
  MI300X: 'Enterprise Accelerators',
  MI300: 'Enterprise Accelerators'
}
export const normalizeGpu = (g) =>
  GPU_OPTIONS.find((o) => o.toUpperCase() === String(g).toUpperCase()) ||
  GPU_ALIASES[String(g).toUpperCase()] ||
  null
export const DEFAULTS = {
  gpuType: 'H100',
  gpuQty: '',
  location: '',
  startDate: '',
  duration: '',
  workload: '',
  deployType: 'Bare Metal',
  company: '',
  email: '',
  phone: ''
}
export function initialRequest(state = {}) {
  return {
    ...DEFAULTS,
    gpuType: normalizeGpu(state.gpu) || DEFAULTS.gpuType,
    gpuQty: state.gpuQty || '',
    location: state.location || '',
    workload: state.workload || '',
    deployType: DEPLOY_OPTIONS.includes(state.deployType)
      ? state.deployType
      : DEFAULTS.deployType
  }
}
export function buildBrief(form) {
  return [
    'GPU Capacity Request — Anthroprime.ai',
    '',
    `GPU: ${form.gpuType}`,
    `Quantity: ${form.gpuQty}`,
    `Region: ${form.location}`,
    `Start date: ${form.startDate || 'Flexible'}`,
    `Duration: ${form.duration || 'To discuss'}`,
    `Workload: ${form.workload || 'To discuss'}`,
    `Deployment: ${form.deployType}`,
    '',
    `Company: ${form.company}`,
    `Business email: ${form.email}`,
    `Phone: ${form.phone || 'Not provided'}`
  ].join('\n')
}
