#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { GPUS, GPU_ORDER, gpuBySlug } from '../src/data/gpus.js'
import { SOLUTIONS } from '../src/data/solutions.js'
import { PUBLIC_ROUTES, getPageMeta } from '../src/data/metadata.js'
import { GPU_OPTIONS, initialRequest, normalizeGpu, buildBrief } from '../src/data/request.js'
import { weightMemoryGB, completedTasks, PIPELINES, KNOWLEDGE_CHECK } from '../src/data/learning.js'
import { REQUEST_EMAIL, canSubmitRequest, capacityEmailLink, encodeCapacityRequest, submitCapacityRequest, prepareCapacityRequest } from '../src/data/request-delivery.js'

const root = path.resolve(process.cwd())
const dist = path.join(root, 'dist')
const src = path.join(root, 'src')
const pages = path.join(src, 'pages')
const data = path.join(src, 'data')

let passed = 0
let failed = 0

function assert(name, condition, hint = '') {
  if (condition) { console.log(`✅ ${name}`); passed++ }
  else { console.log(`❌ ${name} ${hint}`); failed++ }
}

const read = (p) => fs.readFileSync(p, 'utf-8')

// ---------- structure ----------
assert('package.json exists', fs.existsSync(path.join(root, 'package.json')))
assert('netlify.toml exists', fs.existsSync(path.join(root, 'netlify.toml')))
assert('index.html exists', fs.existsSync(path.join(root, 'index.html')))
assert('vite.config.js exists', fs.existsSync(path.join(root, 'vite.config.js')))
assert('tailwind.config.js exists', fs.existsSync(path.join(root, 'tailwind.config.js')))
assert('public/_redirects exists', fs.existsSync(path.join(root, 'public/_redirects')))
assert('react-router-dom dependency', read(path.join(root, 'package.json')).includes('react-router-dom'))

const needPages = ['Home', 'GpuDetail', 'GpuLab', 'Solutions', 'Services', 'Resources', 'About', 'Contact', 'FindCapacity', 'NotFound']
needPages.forEach(p => assert(`pages/${p}.jsx exists`, fs.existsSync(path.join(pages, `${p}.jsx`))))
assert('components/Layout.jsx exists', fs.existsSync(path.join(src, 'components/Layout.jsx')))
assert('components/Globe3D.jsx exists', fs.existsSync(path.join(src, 'components/Globe3D.jsx')))
assert('data/gpus.js exists', fs.existsSync(path.join(data, 'gpus.js')))
assert('Third-party capacity dataset has been removed', !fs.existsSync(path.join(data, 'capacity.js')))
assert('data/solutions.js exists', fs.existsSync(path.join(data, 'solutions.js')))
assert('data/services.js exists', fs.existsSync(path.join(data, 'services.js')))
assert('no market-pricing dataset is shipped', !fs.existsSync(path.join(data, 'marketPricing.js')))

// ---------- routing ----------
const app = read(path.join(src, 'App.jsx'))
const routes = ['/', '/marketplace', '/gpu/:slug', '/gpu-lab', '/solutions', '/solutions/:slug', '/services', '/resources', '/about', '/contact', '/find-capacity']
routes.forEach(r => assert(`route ${r}`, app.includes(`"${r}"`)))
assert('404 catch-all route', app.includes('path="*"'))

const layout = read(path.join(src, 'components/Layout.jsx'))
assert('nav has GPU Cloud menu', layout.includes('GPU Cloud') && layout.includes('GPU_NAV'))
assert('nav links to gpu pages', layout.includes('/gpu/'))
assert('nav has Solutions menu', layout.includes('Solutions'))
assert('nav has Services menu', layout.includes('Services') && layout.includes('SERVICES'))
assert('nav has Find GPU Capacity CTA', layout.includes('Find GPU Capacity'))

// ---------- homepage ----------
const home = read(path.join(pages, 'Home.jsx'))
assert('Home has correct headline', home.includes('Global GPU') && home.includes('One Partner'))
assert('Home has capacity and GPU exploration CTAs', home.includes('Find GPU Capacity') && home.includes('Explore our GPUs'))
// check order inside the render block only (imports/definitions precede it)
const homeRender = home.slice(home.indexOf('export default function Home'))
assert('Home renders brief sections in order', ['GpuCloudSection', 'ClustersSection', 'HowItWorks', 'GlobalNetwork', 'WhoWeServe', 'WhyUs', 'FinalCTA']
  .every((c, i, arr) => i === 0 || homeRender.indexOf(arr[i - 1]) < homeRender.indexOf(c)))
assert('Home lazy-loads the GPU scene', home.includes("import('../components/InfrastructureScene')"))

// ---------- rebuilt visual experience ----------
const scene = read(path.join(src, 'components/InfrastructureScene.jsx'))
assert('GPU scene has a WebGL failure fallback', scene.includes('getDerivedStateFromError') && scene.includes('AI CORE'))
assert('GPU scene stops rendering outside viewport', scene.includes('IntersectionObserver') && scene.includes("'demand'"))
assert('GPU scene honors the motion control', scene.includes('useMotionSettings') && scene.includes('if (paused) return'))
assert('Home renders server-rack visualization', home.includes('rack-visual'))
assert('Network map has 5 deployment-planning regions', ['India', 'Southeast Asia', 'Middle East', 'Europe', 'North America'].every(t => home.includes(t)))
assert('Network map is clearly illustrative', home.includes('Not a live availability map'))

// ---------- GPU list matches the desk list ----------
assert('Home GPU strip = desk GPU list', ['h100', 'h200', 'b200', 'gb200', 'a100', 'l40s'].every(g => home.includes(`\`/gpu/${g}\``) || read(path.join(src, 'data/gpus.js')).includes(`'${g}'`)))

// ---------- GPU spec accuracy (per NVIDIA datasheets) ----------
const gpus = read(path.join(data, 'gpus.js'))
assert('H100: 80 GB HBM3 + 3.35 TB/s', gpus.includes('80 GB HBM3') && gpus.includes('3.35 TB/s'))
assert('H200: 141 GB HBM3e + 4.8 TB/s', gpus.includes('141 GB HBM3e') && gpus.includes('4.8 TB/s'))
assert('HGX B200: 180 GB HBM3e + 8 TB/s', GPUS.b200.specs['GPU memory'].includes('180 GB HBM3e') && GPUS.b200.specs['Memory bandwidth'] === '8 TB/s')
assert('GB200: 72-GPU NVL72 + 13.4 TB', GPUS.gb200.specs['GPUs per rack'].includes('72') && GPUS.gb200.specs['GPU memory'].includes('13.4 TB'))
assert('A100: 80/40 GB HBM2e + 2.0 TB/s', gpus.includes('HBM2e') && gpus.includes('2.0 TB/s'))
assert('L40S: 48 GB GDDR6 + 864 GB/s', gpus.includes('48 GB GDDR6') && gpus.includes('864 GB/s'))
assert('NVLink generations documented', gpus.includes('900 GB/s') && gpus.includes('1.8 TB/s') && gpus.includes('600 GB/s'))
assert('InfiniBand 200/400/800 documented', gpus.includes('400 Gb/s') && gpus.includes('800 Gb/s') && gpus.includes('200 Gb/s'))
assert('Node/reference configs present', gpus.includes('nodeConfig'))

// ---------- direct-provider experience ----------
assert('Marketplace page has been removed', !fs.existsSync(path.join(pages, 'Marketplace.jsx')))
assert('Old marketplace URLs redirect to GPU offerings', /path="\/marketplace"[\s\S]*?<Navigate to="\/#capacity" replace/.test(app))
assert('Navigation and footer have no marketplace links', !/marketplace/i.test(layout))
assert('Home presents Anthroprime as the GPU provider', home.includes('Your GPU provider') && !home.includes('PROVIDER_META'))
const resources = read(path.join(pages, 'Resources.jsx'))
assert('Resources show deployment options instead of provider comparisons', resources.includes('DeploymentOptions') && !resources.includes('providerCount'))
const gpuDetail = read(path.join(pages, 'GpuDetail.jsx'))
assert('GPU details request capacity directly from Anthroprime', gpuDetail.includes('GPU infrastructure from Anthroprime') && !gpuDetail.includes('offersForFamily'))

// ---------- no pricing anywhere in the app ----------
const srcFiles = []
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
  const full = path.join(dir, e.name)
  if (e.isDirectory()) walk(full)
  else if (/\.(jsx?|mjs|html|json)$/.test(e.name)) srcFiles.push(full)
})
walk(src)
walk(path.join(root, 'public'))
srcFiles.push(path.join(root, 'index.html'), path.join(root, 'netlify.toml'))
const appText = srcFiles.map(read).join('\n')
const PRICE_PATTERNS = [
  [/\$\s?\d/, 'dollar amounts'],
  [/\/GPU\/hr|per hour|\/hr\b/i, 'hourly rates'],
  [/\bTCO\b/, 'TCO'],
  [/(?<!no )\blist price/i, 'list price'],
  [/price-per-token|cost-per-token/i, 'cost-per-token'],
  [/pricing economics|market reference pricing|market pricing/i, 'pricing sections'],
  [/gpurentalprices|gpu-rental-prices/i, 'pricing dataset attribution'],
]
PRICE_PATTERNS.forEach(([re, label]) => assert(`no ${label} in the app`, !re.test(appText)))

// ---------- hero typewriter ----------
assert('Home hero headline uses the typewriter', /<Typewriter/.test(read(path.join(pages, 'Home.jsx'))))
assert('Typewriter component exists', read(path.join(src, 'components/ui.jsx')).includes('export function Typewriter'))
assert('Typewriter respects reduced motion', read(path.join(src, 'components/ui.jsx')).includes('prefers-reduced-motion'))
assert('Typewriter keeps the full headline for a11y/SEO', read(path.join(src, 'components/ui.jsx')).includes('sr-only'))
assert('caret keyframes defined in css', read(path.join(src, 'index.css')).includes('caret-blink'))

// ---------- capacity form ----------
const find = read(path.join(pages, 'FindCapacity.jsx'))
assert('FindCapacity has all brief fields', ['gpuType', 'gpuQty', 'location', 'startDate', 'duration', 'workload', 'deployType', 'company', 'email', 'phone'].every(f => find.includes(f)))

// ---------- positioning compliance ----------
const allSrc = [...fs.readdirSync(path.join(src, 'components')), ...fs.readdirSync(pages), ...fs.readdirSync(data)]
  .map(f => {
    const dir = fs.existsSync(path.join(src, 'components', f)) ? path.join(src, 'components', f)
      : fs.existsSync(path.join(pages, f)) ? path.join(pages, f) : path.join(data, f)
    return read(dir)
  }).join('\n')

assert('No forbidden claim: We operate thousands of GPUs', !allSrc.includes('We operate thousands of GPUs'))
assert('No forbidden claim: We own global GPU data centers', !allSrc.includes('We own global GPU data centers'))
assert('No forbidden claim: Our H200 cluster is available', !allSrc.includes('Our H200 cluster is available'))
assert('Active pages do not link to a marketplace', !/to=[{"']+\/marketplace/.test(allSrc))
assert('No leaked brief note: "This section is critical"', !allSrc.includes('This section is critical'))
assert('No leaked brief note: "Important Positioning Rule"', !allSrc.includes('Important Positioning Rule'))
assert('No leaked brief note: "Avoid publishing partner names"', !allSrc.includes('Avoid publishing partner names'))
assert('No fabricated "~40% faster" stat', !allSrc.includes('~40%'))

// ---------- deployment ----------
const netlifyToml = read(path.join(root, 'netlify.toml'))
assert('netlify.toml has build command', netlifyToml.includes('npm run build'))
assert('netlify.toml has SPA redirect', netlifyToml.includes('/*'))
const indexHtml = read(path.join(root, 'index.html'))
assert('index.html has Netlify form', indexHtml.includes('gpu-capacity') && indexHtml.includes('data-netlify'))
assert('index.html has correct title', indexHtml.includes('Anthroprime.ai'))

// ---------- design tokens ----------
const indexCss = read(path.join(src, 'index.css'))
assert('index.css has glass effect', indexCss.includes('.glass'))
assert('index.css has glow', indexCss.includes('.glow'))
assert('reduced-motion support', indexCss.includes('prefers-reduced-motion'))

// ---------- dist ----------
if (fs.existsSync(dist)) {
  assert('dist/index.html exists after build', fs.existsSync(path.join(dist, 'index.html')))
  assert('dist has assets', fs.existsSync(path.join(dist, 'assets')))
} else {
  console.log('ℹ️  dist not found — run npm run build first (skipping dist checks)')
}

// ---------- final audit: desk-list consistency ----------
const findCapacity = read(path.join(src, 'pages/FindCapacity.jsx'))
assert('Find-capacity form offers Enterprise Accelerators', GPU_OPTIONS.includes('Enterprise Accelerators'))
assert('Find-capacity form keeps all desk GPU options', ['H100', 'H200', 'B200 / GB200', 'A100', 'L40S'].every(o => GPU_OPTIONS.includes(o)))
assert('Footer service labels are explicit (no replace chains)', layout.includes("'svc-managed': 'Managed Infra'") && !layout.includes(".replace('GPU Capacity Sourcing'"))

// ---------- executable data and request checks ----------
assert('Every GPU detail has specs, variants, and reference configuration', GPU_ORDER.every(slug=>GPUS[slug]?.specs && GPUS[slug]?.variants.length && GPUS[slug]?.nodeConfig.rows.length))
assert('All solution recommendations reference existing GPU pages', SOLUTIONS.every(s=>s.gpus.every(slug=>GPUS[slug])))
for (const [input,expected] of [['B200','B200 / GB200'],['gb200','B200 / GB200'],['B300','B300'],['MI300X','Enterprise Accelerators'],['h200','H200']]) {
  assert(`Request normalizes ${input}`, normalizeGpu(input) === expected)
}
assert('Unknown GPU aliases return null', normalizeGpu('unknown') === null)
assert('Request defaults are safe with no route state', initialRequest().gpuType === 'H100' && initialRequest().deployType === 'Bare Metal')
const request = initialRequest({gpu:'GB200',gpuQty:'64',location:'India',workload:'Training',deployType:'Dedicated / Reserved'})
assert('GPU request prefill keeps the complete request', request.gpuType === 'B200 / GB200' && request.gpuQty === '64' && request.location === 'India' && request.workload === 'Training' && request.deployType === 'Dedicated / Reserved')
assert('Invalid deployment prefill uses a selectable option', initialRequest({deployType:'invalid'}).deployType === 'Bare Metal')
const brief = buildBrief({...request,company:'Example team',email:'test@example.com'})
assert('Brief preserves workload and contact information', ['Quantity: 64','Region: India','Workload: Training','Company: Example team','Business email: test@example.com'].every(t=>brief.includes(t)))
assert('Brief uses honest fallbacks for optional fields', brief.includes('Start date: Flexible') && brief.includes('Duration: To discuss'))
assert('Reviewing a brief does not open external channels automatically', !findCapacity.includes('window.open('))
assert('Local form offers a downloadable brief', findCapacity.includes('createObjectURL') && findCapacity.includes('anthroprime-capacity-brief.txt'))

// ---------- educational calculations and generated assets ----------
const deliveryRequest = {...request,company:'Example & Co',email:'qa@example.com',workload:'Training & inference\nSecond line'}
const body = new URLSearchParams(encodeCapacityRequest(deliveryRequest,true))
assert('Delivery targets the registered Netlify form', body.get('form-name') === 'gpu-capacity')
assert('Notification preserves submitter email for Reply-To', body.get('email') === 'qa@example.com')
assert('Structured request values survive URL encoding', body.get('company') === 'Example & Co' && body.get('workload') === deliveryRequest.workload)
assert('Notification contains full brief, consent, and subject', body.get('brief').includes('Quantity: 64') && body.get('consent').startsWith('Yes') && body.get('subject').includes('B200 / GB200'))
assert('Static detection declares every submitted field', [...body.keys()].every(key => indexHtml.includes(`name="${key}"`)))
assert('Email handoff uses hello@anthroprime.com', REQUEST_EMAIL === 'hello@anthroprime.com' && capacityEmailLink(deliveryRequest).startsWith('mailto:hello@anthroprime.com?'))
assert('Email handoff retains the full request', decodeURIComponent(capacityEmailLink(deliveryRequest).split('&body=')[1]) === buildBrief(deliveryRequest))
for (const host of ['localhost','gpu.localhost','127.0.0.1','127.0.0.2','[::1]','::1','gpu.local','']) assert(`Preview hostname cannot submit: ${host || '(empty)'}`, !canSubmitRequest(true,host))
assert('Non-enabled public builds cannot submit', !canSubmitRequest(false,'example.com'))
assert('Review normalization trims required and optional fields', prepareCapacityRequest({...deliveryRequest,company:' Example team ',phone:' 123 '}).company === 'Example team' && prepareCapacityRequest({...deliveryRequest,phone:' 123 '}).phone === '123')
assert('Review validation strips fields outside the request schema', !Object.hasOwn(prepareCapacityRequest({...deliveryRequest,unknown:'ignored'}),'unknown'))
for (const [name,form,consent] of [
  ['missing consent',deliveryRequest,false],
  ['blank company',{...deliveryRequest,company:'   '},true],
  ['invalid email',{...deliveryRequest,email:'not-an-email'},true],
  ['invalid GPU',{...deliveryRequest,gpuType:'unknown'},true],
  ['overlong email',{...deliveryRequest,email:'x'.repeat(250)+'@example.com'},true],
  ['non-boolean consent',deliveryRequest,'yes'],
  ['oversized workload',{...deliveryRequest,workload:'x'.repeat(4001)},true],
  ['honeypot',{...deliveryRequest,'bot-field':'spam'},true]
]) {
  let rejected=false;try{encodeCapacityRequest(form,consent)}catch{rejected=true}
  assert(`Delivery rejects ${name}`,rejected)
}
let attempted=0
try { await submitCapacityRequest(deliveryRequest,{enabled:true,hostname:'localhost',consent:true,fetchImpl:async()=>{attempted++;return {ok:true}}}) } catch {}
assert('Local delivery guard prevents network requests', attempted===0)
let sentOptions
await submitCapacityRequest(deliveryRequest,{enabled:true,hostname:'example.com',consent:true,fetchImpl:async(url,options)=>{sentOptions={url,...options};return {ok:true}}})
assert('Live transport posts URL-encoded fields to the same origin', sentOptions.url==='/' && sentOptions.method==='POST' && sentOptions.headers['Content-Type']==='application/x-www-form-urlencoded' && new URLSearchParams(sentOptions.body).get('email')==='qa@example.com')
let timedOut=false
try {
  await submitCapacityRequest(deliveryRequest,{enabled:true,hostname:'example.com',consent:true,timeoutMs:10,fetchImpl:async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new Error('aborted')),{once:true}))})
} catch(error) {timedOut=error.message.includes('could not be confirmed')}
assert('A stalled submission times out without reporting success',timedOut)
for(const failure of ['http','network']) {
  let rejected=false
  try{await submitCapacityRequest(deliveryRequest,{enabled:true,hostname:'example.com',consent:true,fetchImpl:async()=>{if(failure==='network')throw new Error('offline');return {ok:false}}})}catch(error){rejected=error.message.includes('could not be confirmed') && error.message.includes(REQUEST_EMAIL)}
  assert(`Transport reports ${failure} failure without a false success`,rejected)
}

assert('7B FP32 weights use 28 decimal GB', weightMemoryGB(7,32) === 28)
assert('70B BF16 weights use 140 decimal GB', weightMemoryGB(70,16) === 140)
assert('70B 8-bit raw weights use 70 decimal GB', weightMemoryGB(70,8) === 70)
assert('70B 4-bit raw weights use 35 decimal GB', weightMemoryGB(70,4) === 35)
assert('Fractional parameter counts retain fractional storage', weightMemoryGB(1.5,4) === .75)
for (const [parameters,bits] of [[0,16],[-1,16],[NaN,16],[Infinity,16],[7,3]]) {
  let rejected=false;try{weightMemoryGB(parameters,bits)}catch(error){rejected=error instanceof RangeError}
  assert(`Memory estimator rejects invalid input ${parameters}/${bits}`,rejected)
}
assert('Serial scheduler completes one task per step', completedTasks(3,1) === 3)
assert('Independent scheduler completes worker-sized batches', completedTasks(3,8) === 24)
assert('Task completion is capped at workload size', completedTasks(9,16) === 32)
assert('Dependency chain prevents parallel scheduling', completedTasks(3,16,32,true) === 3)
assert('Reset scheduler has completed no tasks', completedTasks(0,8) === 0)
for(const args of [[-1,8],[1,0],[1.5,8],[1,8,0]]) {
  let rejected=false;try{completedTasks(...args)}catch(error){rejected=error instanceof RangeError}
  assert(`Scheduler rejects invalid input ${args.join('/')}`,rejected)
}
assert('Training and inference walkthroughs each have four stages', Object.values(PIPELINES).every(stages=>stages.length===4 && stages.every(s=>s.title && s.detail && s.tag)))
assert('Knowledge checks have one valid answer each', KNOWLEDGE_CHECK.every(q=>Number.isInteger(q.correct) && q.correct>=0 && q.correct<q.options.length && q.explanation))
assert('Generated GPU artwork is bundled locally', fs.statSync(path.join(root,'public/images/gpu-silicon.jpg')).size>10000)
assert('Generated infrastructure artwork is bundled locally', fs.statSync(path.join(root,'public/images/compute-horizon.jpg')).size>10000)
assert('Image generation prompts are preserved', fs.existsSync(path.join(root,'docs/image-prompts.md')))

// ---------- static route metadata ----------
assert('Public routes have no duplicates', new Set(PUBLIC_ROUTES).size === PUBLIC_ROUTES.length)
assert('All public routes resolve a real page title', PUBLIC_ROUTES.every(route => !getPageMeta(route)[0].includes('not found')))
assert('Unknown routes resolve not-found metadata', getPageMeta('/missing-page')[0].includes('not found'))
assert('Static host trailing slashes preserve page metadata', PUBLIC_ROUTES.every(route=>getPageMeta(route+'/')[0]===getPageMeta(route)[0]))
assert('GPU metadata rejects extra path segments', getPageMeta('/gpu/h100/missing')[0].includes('not found'))
assert('Inherited object properties cannot become GPU records', ['constructor','__proto__','toString','unknown'].every(slug=>gpuBySlug(slug)===null && getPageMeta('/gpu/'+slug)[0].includes('not found')))
assert('H100 PCIe memory type matches NVIDIA product specifications', GPUS.h100.variants.find(v=>v.id==='pcie').mem === '80GB HBM2e')
assert('H200 NVL uses its own FP8 peak, not the SXM peak', GPUS.h200.variants.find(v=>v.id==='nvl').fp8 === '3,341 TFLOPS*')
assert('A100 FP64 is distinct from its tensor-core FP64 peak', GPUS.a100.specs.FP64 === '9.7 TFLOPS · 19.5 TFLOPS Tensor')
assert('L40S sparse FP8 peak is not doubled again', GPUS.l40s.specs['FP8 Tensor'] === '1,466 TFLOPS sparse')
if (fs.existsSync(path.join(dist,'gpu/h100/index.html'))) {
  const escaped = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
  for (const route of PUBLIC_ROUTES) {
    const html = read(path.join(dist,route,'index.html'))
    const [title,description] = getPageMeta(route)
    assert(`Built route metadata: ${route}`, html.includes(`<title>${escaped(title)}</title>`) && html.includes(`content="${escaped(description)}"`))
  }
  assert('Built 404 is excluded from indexing', read(path.join(dist,'404.html')).includes('name="robots" content="noindex"'))
}

console.log(`\n---\nTests: ${passed} passed, ${failed} failed out of ${passed + failed}`)
process.exit(failed > 0 ? 1 : 0)
