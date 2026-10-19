import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_CAPACITY,
  parseCapacityCsv,
  isPublishedSheetUrl
} from '../src/data/capacity-feed.js'
import handler from '../netlify/functions/capacity.mjs'
import { initialRequest, applyCapacitySelection } from '../src/data/request.js'
import { prepareCapacityRequest } from '../src/data/request-delivery.js'

const header = 'gpu,quantity,location,term,ready\n'
const source =
  'https://docs.google.com/spreadsheets/d/e/abc-123/pub?gid=0&output=csv'
test('inline capacity selection preserves contact and workload details', () => {
  const form = {
    ...initialRequest(),
    company: 'Customer',
    email: 'customer@example.com',
    workload: 'Training',
    gpuQty: '32',
    location: 'Europe'
  }
  const selected = applyCapacitySelection(
    form,
    DEFAULT_CAPACITY.find((row) => row.gpu === 'B300')
  )
  assert.deepEqual(selected, { ...form, gpuType: 'B300' })
  assert.deepEqual(
    applyCapacitySelection(form, {
      gpu: 'H200 NVL',
      quantity: '8',
      location: 'India'
    }),
    { ...form, gpuType: 'H200 NVL', gpuQty: '8', location: 'India' }
  )
  assert.equal(
    applyCapacitySelection(form, {
      gpu: 'Custom GPU',
      quantity: 'On request',
      location: 'On request'
    }).gpuType,
    'Not sure / need advice'
  )
})
test('default rows make no stock or location claims', () => {
  assert.equal(DEFAULT_CAPACITY.length, 14)
  assert.ok(
    DEFAULT_CAPACITY.every(
      (row) => row.quantity === 'On request' && row.location === 'On request'
    )
  )
})
test('all distinct first-table offerings are included and requestable', () => {
  const offerings = [
    'H100 SXM',
    'H200 NVL',
    'RTX PRO 6000',
    'B300',
    'H100',
    'B200',
    'H200',
    'Any, dedicated build',
    'H100 / A100',
    'Vera Rubin',
    'L40 / L40G'
  ]
  for (const gpu of offerings)
    assert.ok(
      DEFAULT_CAPACITY.some((row) => row.gpu === gpu),
      gpu
    )
  for (const { gpu } of DEFAULT_CAPACITY) {
    const request = initialRequest({ gpu })
    const expected =
      {
        B200: 'B200 / GB200',
        GB200: 'B200 / GB200',
        'Any, dedicated build': 'Dedicated build'
      }[gpu] || gpu
    assert.equal(request.gpuType, expected)
    const result = prepareCapacityRequest({
      ...request,
      gpuQty: '8',
      location: 'To discuss',
      company: 'Validation',
      email: 'test@example.com'
    })
    assert.ok(result, gpu)
  }
})
test('published Sheets CSV supports BOM, CRLF, commas, escaped quotes and newlines', () => {
  const rows = parseCapacityCsv(
    '\uFEFF' +
      header +
      'H100,8,"Europe, West",Reserved,"Ask ""desk""\nfor date"\r\n'
  )
  assert.deepEqual(rows[0], {
    gpu: 'H100',
    quantity: '8',
    location: 'Europe, West',
    term: 'Reserved',
    ready: 'Ask "desk"\nfor date'
  })
  assert.equal(
    parseCapacityCsv(
      'ready,term,location,quantity,gpu\nConfirm,Flexible,India,8,H200'
    )[0].gpu,
    'H200'
  )
})
test('malformed, empty, duplicate, oversized and partial feeds are rejected', () => {
  for (const csv of [
    '',
    header,
    'gpu,gpu,location,term,ready\nH100,8,India,Flex,Now',
    header + 'H100,8,India',
    header + 'H100,8,India,Flex,"unclosed',
    header + 'H100,8,India,Flex,"Now"oops',
    header + 'H100,,India,Flex,Now',
    header + 'H'.repeat(121) + ',8,India,Flex,Now',
    header + 'H100,8,India,Flex,Now\n'.repeat(101),
    'x'.repeat(65537)
  ])
    assert.throws(() => parseCapacityCsv(csv))
})
test('only published HTTPS Google Sheets CSV URLs are accepted', () => {
  assert.ok(isPublishedSheetUrl(source))
  for (const url of [
    'https://evil.example/pub?output=csv',
    source.replace('https:', 'http:'),
    source.replace('docs.google.com', 'docs.google.com.evil.example'),
    'https://docs.google.com/spreadsheets/d/abc/edit?output=csv',
    source.replace('output=csv', 'output=html'),
    source.replace('docs.google.com', 'user@docs.google.com')
  ])
    assert.equal(isPublishedSheetUrl(url), false)
})
test('function handles missing config, validated data and upstream failures without leaking source', async () => {
  const previous = process.env.CAPACITY_SHEET_CSV_URL
  const originalFetch = globalThis.fetch
  const request = new Request('https://example.com/.netlify/functions/capacity')
  try {
    delete process.env.CAPACITY_SHEET_CSV_URL
    assert.deepEqual(await (await handler(request)).json(), {
      configured: false,
      rows: []
    })
    process.env.CAPACITY_SHEET_CSV_URL = source
    globalThis.fetch = async (url, options) => {
      const upstream = new URL(url)
      assert.equal(
        upstream.origin + upstream.pathname,
        new URL(source).origin + new URL(source).pathname
      )
      assert.equal(upstream.searchParams.get('gid'), '0')
      assert.equal(upstream.searchParams.get('output'), 'csv')
      assert.match(upstream.searchParams.get('_refresh'), /^\d+$/)
      assert.equal(options.cache, 'no-store')
      return new Response(header + 'H100,8,India,Reserved,On request')
    }
    const response = await handler(request)
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('Cache-Control'), 'no-store')
    assert.equal(
      response.headers.get('Netlify-CDN-Cache-Control'),
      'public, max-age=15, must-revalidate'
    )
    assert.equal((await response.json()).rows[0].quantity, '8')
    globalThis.fetch = async () => new Response('Error', { status: 500 })
    assert.equal((await handler(request)).status, 503)
    globalThis.fetch = async () => new Response(header + 'invalid')
    assert.equal((await handler(request)).status, 503)
    globalThis.fetch = async () => new Response('x'.repeat(65537))
    assert.equal((await handler(request)).status, 503)
    process.env.CAPACITY_SHEET_CSV_URL = 'https://evil.example'
    globalThis.fetch = () => {
      throw new Error('Should not fetch')
    }
    assert.equal((await handler(request)).status, 503)
    assert.equal(
      (await handler(new Request(request.url, { method: 'POST' }))).status,
      405
    )
  } finally {
    globalThis.fetch = originalFetch
    if (previous === undefined) delete process.env.CAPACITY_SHEET_CSV_URL
    else process.env.CAPACITY_SHEET_CSV_URL = previous
  }
})
