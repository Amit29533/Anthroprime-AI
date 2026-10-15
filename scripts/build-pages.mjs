import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { PUBLIC_ROUTES, getPageMeta } from '../src/data/metadata.js'

// Emit route-specific head metadata for static hosting and link previews.
// The app remains client-rendered; this does not claim to be SSR.
const directory = resolve('dist')
const template = await readFile(resolve(directory, 'index.html'), 'utf8')
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
let origin = ''
if (process.env.SITE_URL) {
  const url = new URL(process.env.SITE_URL)
  if (
    url.protocol !== 'https:' ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    throw new Error(
      'SITE_URL must be a public HTTPS origin without a path, query, or credentials.'
    )
  origin = url.origin
}
for (const pathname of [...PUBLIC_ROUTES, '/404']) {
  const [title, description] = getPageMeta(pathname)
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/,
      `$1${escape(description)}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/,
      `$1${escape(title)}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)/,
      `$1${escape(description)}$2`
    )
  let extra = '<meta name="twitter:card" content="summary_large_image" />'
  if (pathname === '/404') extra += '<meta name="robots" content="noindex" />'
  else if (origin)
    extra += `<link rel="canonical" href="${origin}${pathname}" /><meta property="og:url" content="${origin}${pathname}" />`
  if (origin)
    extra += `<meta property="og:image" content="${origin}/images/compute-horizon.jpg" /><meta property="og:image:alt" content="Conceptual AI infrastructure artwork" />`
  html = html.replace('</head>', `${extra}</head>`)
  const filename =
    pathname === '/404'
      ? resolve(directory, '404.html')
      : resolve(directory, '.' + pathname, 'index.html')
  await mkdir(resolve(filename, '..'), { recursive: true })
  await writeFile(filename, html)
}
if (origin) {
  const urls = PUBLIC_ROUTES.map(
    (path) => `<url><loc>${escape(origin + path)}</loc></url>`
  ).join('')
  await writeFile(
    resolve(directory, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
  )
  await writeFile(
    resolve(directory, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
  )
}
console.log(
  `Prepared metadata for ${PUBLIC_ROUTES.length} routes and a noindex 404${origin ? ', canonical URLs and sitemap' : ' (set SITE_URL for canonical URLs and sitemap)'}.`
)
