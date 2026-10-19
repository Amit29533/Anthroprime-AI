// Public capacity only. Unconfirmed stock, regions and dates are never inferred.
export const DEFAULT_CAPACITY = [
  'H200',
  'H100',
  'B200',
  'GB200',
  'A100',
  'L40S'
].map((gpu) => ({
  gpu,
  quantity: 'On request',
  location: 'On request',
  term: 'Flexible',
  ready: 'Confirm with us'
}))

export const CAPACITY_COLUMNS = ['gpu', 'quantity', 'location', 'term', 'ready']

// RFC 4180 quoting, including commas, escaped quotes and multiline cells.
export function parseCapacityCsv(csv) {
  if (typeof csv !== 'string' || csv.length > 65536)
    throw new Error('Invalid capacity feed')
  const records = []
  let row = [],
    cell = '',
    quoted = false,
    closed = false
  const pushCell = () => {
    row.push(cell.trim())
    cell = ''
    closed = false
  }
  const pushRow = () => {
    pushCell()
    if (row.some(Boolean)) records.push(row)
    row = []
  }
  csv = csv.replace(/^\uFEFF/, '')
  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i]
    if (quoted) {
      if (ch === '"' && csv[i + 1] === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        quoted = false
        closed = true
      } else cell += ch
    } else if (ch === ',') pushCell()
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && csv[i + 1] === '\n') i++
      pushRow()
    } else if (ch === '"' && cell === '' && !closed) quoted = true
    else if (ch === '"' || (closed && !/\s/.test(ch)))
      throw new Error('Invalid CSV quoting')
    else cell += ch
  }
  if (quoted) throw new Error('Unclosed CSV cell')
  pushRow()
  const headers = records.shift()?.map((value) => value.toLowerCase())
  if (
    !headers ||
    headers.length !== 5 ||
    new Set(headers).size !== 5 ||
    !CAPACITY_COLUMNS.every((key) => headers.includes(key))
  )
    throw new Error('Expected gpu, quantity, location, term, ready headers')
  if (!records.length || records.length > 100)
    throw new Error('Expected 1–100 capacity rows')
  return records.map((values) => {
    if (
      values.length !== headers.length ||
      values.some(
        (value) =>
          !value ||
          value.length > 120 ||
          /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)
      )
    )
      throw new Error('Invalid capacity row')
    return Object.fromEntries(headers.map((key, index) => [key, values[index]]))
  })
}

export function isPublishedSheetUrl(value) {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      url.hostname === 'docs.google.com' &&
      !url.port &&
      !url.username &&
      !url.password &&
      /^\/spreadsheets\/d\/(?:e\/)?[\w-]+\/pub$/.test(url.pathname) &&
      url.searchParams.get('output') === 'csv'
    )
  } catch {
    return false
  }
}
