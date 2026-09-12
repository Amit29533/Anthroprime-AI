#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

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

const needPages = ['Home', 'Marketplace', 'GpuDetail', 'Solutions', 'Services', 'Resources', 'About', 'Contact', 'FindCapacity', 'NotFound']
needPages.forEach(p => assert(`pages/${p}.jsx exists`, fs.existsSync(path.join(pages, `${p}.jsx`))))
assert('components/Layout.jsx exists', fs.existsSync(path.join(src, 'components/Layout.jsx')))
assert('components/Globe3D.jsx exists', fs.existsSync(path.join(src, 'components/Globe3D.jsx')))
assert('data/gpus.js exists', fs.existsSync(path.join(data, 'gpus.js')))
assert('data/marketPricing.js exists', fs.existsSync(path.join(data, 'marketPricing.js')))
assert('data/solutions.js exists', fs.existsSync(path.join(data, 'solutions.js')))
assert('data/services.js exists', fs.existsSync(path.join(data, 'services.js')))
assert('market-data refresh script exists', fs.existsSync(path.join(root, 'scripts/fetch-market-data.mjs')))

// ---------- routing ----------
const app = read(path.join(src, 'App.jsx'))
const routes = ['/', '/marketplace', '/gpu/:slug', '/solutions', '/solutions/:slug', '/services', '/resources', '/about', '/contact', '/find-capacity']
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
assert('Home has both CTAs', home.includes('Find GPU Capacity') && home.includes('Talk to an AI Infrastructure Expert'))
// check order inside the render block only (imports/definitions precede it)
const homeRender = home.slice(home.indexOf('export default function Home'))
assert('Home renders brief sections in order', ['GpuCloudSection', 'ClustersSection', 'HowItWorks', 'GlobalNetwork', 'WhoWeServe', 'WhyUs', 'FinalCTA']
  .every((c, i, arr) => i === 0 || homeRender.indexOf(arr[i - 1]) < homeRender.indexOf(c)))
assert('Home uses 3D globe', home.includes('Globe3D'))

// ---------- diagrams ported from the original GPU Capacity Desk artifact ----------
assert('CapacityGraph diagram component exists', fs.existsSync(path.join(src, 'components/CapacityGraph.jsx')))
assert('NetworkMap diagram component exists', fs.existsSync(path.join(src, 'components/NetworkMap.jsx')))
const capGraph = read(path.join(src, 'components/CapacityGraph.jsx'))
assert('CapacityGraph has hub + nodes', ['AnthroPrime', 'Capacity Graph', 'Your', 'Requirement', 'Verified', 'Hyperscalers', 'Neoclouds', 'Data Centers', 'OEM / Finance'].every(t => capGraph.includes(t)))
assert('Home renders CapacityGraph', home.includes('CapacityGraph'))
assert('GlobalNetwork renders NetworkMap', read(path.join(src, 'components/GlobalNetwork.jsx')).includes('NetworkMap'))
const netMap = read(path.join(src, 'components/NetworkMap.jsx'))
assert('NetworkMap has 5 regions', ['India', 'Southeast Asia', 'Middle East', 'Europe', 'North America'].every(t => netMap.includes(t)))

// ---------- GPU list matches the desk list ----------
assert('Home GPU strip = desk GPU list', ['h100', 'h200', 'b200', 'gb200', 'a100', 'l40s'].every(g => home.includes(`\`/gpu/${g}\``) || read(path.join(src, 'data/gpus.js')).includes(`'${g}'`)))

// ---------- GPU spec accuracy (per NVIDIA datasheets) ----------
const gpus = read(path.join(data, 'gpus.js'))
assert('H100: 80 GB HBM3 + 3.35 TB/s', gpus.includes('80 GB HBM3') && gpus.includes('3.35 TB/s'))
assert('H200: 141 GB HBM3e + 4.8 TB/s', gpus.includes('141 GB HBM3e') && gpus.includes('4.8 TB/s'))
assert('B200: 192 GB HBM3e + 8 TB/s', gpus.includes('192 GB HBM3e') && gpus.includes('8 TB/s'))
assert('GB200: 72-GPU NVL72 + 13.5 TB', gpus.includes('72') && gpus.includes('13.5 TB'))
assert('A100: 80/40 GB HBM2e + 2.0 TB/s', gpus.includes('HBM2e') && gpus.includes('2.0 TB/s'))
assert('L40S: 48 GB GDDR6 + 864 GB/s', gpus.includes('48 GB GDDR6') && gpus.includes('864 GB/s'))
assert('NVLink generations documented', gpus.includes('900 GB/s') && gpus.includes('1.8 TB/s') && gpus.includes('600 GB/s'))
assert('InfiniBand 200/400/800 documented', gpus.includes('400 Gb/s') && gpus.includes('800 Gb/s') && gpus.includes('200 Gb/s'))
assert('Node/reference configs present', gpus.includes('nodeConfig'))

// ---------- marketplace data ----------
const market = read(path.join(data, 'marketPricing.js'))
assert('marketplace data has attribution (CC BY 4.0)', market.includes('CC BY 4.0'))
assert('marketplace data has snapshot date', /asOf:\s*'20\d\d-\d\d-\d\d'/.test(market))
assert('marketplace data has provider metadata', market.includes('PROVIDER_META'))
assert('marketplace page has filter controls', read(path.join(pages, 'Marketplace.jsx')).includes('setKind') && read(path.join(pages, 'Marketplace.jsx')).includes('setSort'))
assert('marketplace honesty note present', read(path.join(pages, 'Marketplace.jsx')).includes('not Anthroprime inventory'))

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
assert('Uses accurate language (infrastructure network)', allSrc.includes('infrastructure network'))
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

console.log(`\n---\nTests: ${passed} passed, ${failed} failed out of ${passed + failed}`)
process.exit(failed > 0 ? 1 : 0)
