import {
  isPublishedSheetUrl,
  parseCapacityCsv
} from '../../src/data/capacity-feed.js'

export default async function handler(request) {
  if (request.method !== 'GET')
    return new Response(null, { status: 405, headers: { Allow: 'GET' } })
  const source = process.env.CAPACITY_SHEET_CSV_URL
  if (!source)
    return Response.json(
      { configured: false, rows: [] },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  try {
    if (!isPublishedSheetUrl(source)) throw new Error('Invalid sheet URL')
    const response = await fetch(source, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) throw new Error('Sheet unavailable')
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let csv = '',
      bytes = 0
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        bytes += value.byteLength
        if (bytes > 65536) throw new Error('Feed too large')
        csv += decoder.decode(value, { stream: true })
      }
      csv += decoder.decode()
    } finally {
      await reader.cancel()
    }
    return Response.json(
      { configured: true, rows: parseCapacityCsv(csv) },
      {
        headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' }
      }
    )
  } catch {
    return Response.json(
      { error: 'Capacity updates temporarily unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
