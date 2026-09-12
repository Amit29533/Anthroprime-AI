#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const root = path.resolve(process.cwd())
const dist = path.join(root, 'dist')
const src = path.join(root, 'src')

let passed = 0
let failed = 0

function assert(name, condition, hint = '') {
  if (condition) {
    console.log(`✅ ${name}`)
    passed++
  } else {
    console.log(`❌ ${name} ${hint}`)
    failed++
  }
}

// Check required files exist
assert('package.json exists', fs.existsSync(path.join(root, 'package.json')))
assert('netlify.toml exists', fs.existsSync(path.join(root, 'netlify.toml')))
assert('index.html exists', fs.existsSync(path.join(root, 'index.html')))
assert('vite.config.js exists', fs.existsSync(path.join(root, 'vite.config.js')))
assert('tailwind.config.js exists', fs.existsSync(path.join(root, 'tailwind.config.js')))
assert('src/App.jsx exists', fs.existsSync(path.join(src, 'App.jsx')))
assert('src/components/Navbar.jsx exists', fs.existsSync(path.join(src, 'components/Navbar.jsx')))
assert('src/components/Hero.jsx exists', fs.existsSync(path.join(src, 'components/Hero.jsx')))
assert('src/components/FindCapacity.jsx exists', fs.existsSync(path.join(src, 'components/FindCapacity.jsx')))
assert('public/_redirects exists', fs.existsSync(path.join(root, 'public/_redirects')))

// Check content quality
const appContent = fs.readFileSync(path.join(src, 'App.jsx'), 'utf-8')
assert('App imports all major sections', appContent.includes('GPUAggregation') && appContent.includes('Marketplace') && appContent.includes('GlobalNetwork') && appContent.includes('WhoWeServe'))

const heroContent = fs.readFileSync(path.join(src, 'components/Hero.jsx'), 'utf-8')
assert('Hero has correct headline', heroContent.includes('Global GPU') && heroContent.includes('One Partner'))

const marketplaceContent = fs.readFileSync(path.join(src, 'components/Marketplace.jsx'), 'utf-8')
assert('Marketplace has table structure', marketplaceContent.includes('<table') && marketplaceContent.includes('Request Availability'))

const findContent = fs.readFileSync(path.join(src, 'components/FindCapacity.jsx'), 'utf-8')
assert('FindCapacity has required fields', findContent.includes('gpuType') && findContent.includes('company') && findContent.includes('email') && findContent.includes('phone'))

const navContent = fs.readFileSync(path.join(src, 'components/Navbar.jsx'), 'utf-8')
assert('Navbar has GPU Cloud menu', navContent.includes('GPU Cloud') && navContent.includes('H100'))
assert('Navbar has Solutions menu', navContent.includes('Solutions') && navContent.includes('AI Training'))
assert('Navbar has Services menu', navContent.includes('Services') && navContent.includes('GPU Capacity Sourcing'))

const netlifyToml = fs.readFileSync(path.join(root, 'netlify.toml'), 'utf-8')
assert('netlify.toml has build command', netlifyToml.includes('npm run build'))
assert('netlify.toml has redirect', netlifyToml.includes('/*'))

const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf-8')
assert('index.html has Netlify form', indexHtml.includes('gpu-capacity') && indexHtml.includes('data-netlify'))
assert('index.html has correct title', indexHtml.includes('Anthroprime.ai'))

// Alignment checks - ensure no forbidden claims
const allSrc = fs.readdirSync(path.join(src, 'components')).map(f => fs.readFileSync(path.join(src, 'components', f), 'utf-8')).join('\n')
assert('No forbidden claim: We operate thousands of GPUs', !allSrc.includes('We operate thousands of GPUs'))
assert('No forbidden claim: We own global GPU data centers', !allSrc.includes('We own global GPU data centers'))
assert('No forbidden claim: Our H200 cluster is available (as ownership)', !allSrc.includes('Our H200 cluster is available'))
assert('Uses accurate language: Access GPU capacity through our infrastructure network', allSrc.includes('Access GPU capacity') || allSrc.includes('sourcing') || allSrc.includes('infrastructure network'))

// No internal brief-notes leaked into public copy
assert('No leaked brief note: "This section is critical"', !allSrc.includes('This section is critical'))
assert('No leaked brief note: "Important Positioning Rule"', !allSrc.includes('Important Positioning Rule'))
assert('No leaked brief note: "Avoid publishing partner names"', !allSrc.includes('Avoid publishing partner names'))
assert('No leaked brief note: "Every page, every section"', !allSrc.includes('Every page, every section'))

// No fabricated statistics
assert('No fabricated "~40% faster sourcing" stat', !allSrc.includes('~40%'))

// Homepage section order per the brief
const order = ['HowItWorks', 'GlobalNetwork', 'Marketplace', 'FindCapacity', 'Services', 'WhoWeServe', 'WhyUs', 'FinalCTA']
const positions = order.map(c => ({ c, pos: appContent.indexOf(`<${c} />`) }))
assert('All ordered sections present in App', positions.every(p => p.pos !== -1))
assert('Sections render in brief order', positions.every((p, i) => i === 0 || positions[i - 1].pos < p.pos))
assert('App includes ScrollProgress + BackToTop', appContent.includes('ScrollProgress') && appContent.includes('BackToTop'))

// Marquee loop must be seamless (3 copies shifted by exactly one copy width)
const tailwindConfig = fs.readFileSync(path.join(root, 'tailwind.config.js'), 'utf-8')
assert('Marquee keyframe shifts -33.3333% (seamless with 3 copies)', tailwindConfig.includes('-33.3333%'))

// Check for premium design tokens
const indexCss = fs.readFileSync(path.join(src, 'index.css'), 'utf-8')
assert('index.css has glass effect', indexCss.includes('.glass'))
assert('index.css has glow', indexCss.includes('.glow'))

// Check dist if built
if (fs.existsSync(dist)) {
  assert('dist/index.html exists after build', fs.existsSync(path.join(dist, 'index.html')))
  const distFiles = fs.readdirSync(dist)
  assert('dist has assets', distFiles.some(f => f === 'assets' || fs.existsSync(path.join(dist, 'assets'))))
} else {
  console.log('ℹ️  dist not found — run npm run build first (skipping dist checks)')
}

console.log(`\n---\nTests: ${passed} passed, ${failed} failed out of ${passed + failed}`)
process.exit(failed > 0 ? 1 : 0)
