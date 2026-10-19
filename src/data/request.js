export const GPU_OPTIONS = [
  'H100',
  'H100 SXM',
  'H200',
  'H200 NVL',
  'RTX PRO 6000',
  'B300',
  'B200 / GB200',
  'A100',
  'H100 / A100',
  'Vera Rubin',
  'L40 / L40G',
  'L40S',
  'Dedicated build',
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
  'ANY, DEDICATED BUILD': 'Dedicated build',
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
export function applyCapacitySelection(form, row) {
  return {
    ...form,
    gpuType: normalizeGpu(row.gpu) || 'Not sure / need advice',
    ...(row.quantity !== 'On request' ? { gpuQty: row.quantity } : {}),
    ...(row.location !== 'On request' ? { location: row.location } : {})
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
