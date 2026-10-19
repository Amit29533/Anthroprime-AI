import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { DEFAULT_CAPACITY } from '../data/capacity-feed'

function RequestAction({ onSelect, disabled, row, to, state, ...props }) {
  return onSelect ? (
    <button
      {...props}
      type="button"
      disabled={disabled}
      onClick={() => onSelect(row)}
    />
  ) : (
    <Link {...props} to={to} state={state} />
  )
}

export default function CapacityTable({ onSelect, disabled = false }) {
  const [feed, setFeed] = useState({
    rows: DEFAULT_CAPACITY,
    status: 'default'
  })
  useEffect(() => {
    if (import.meta.env.DEV) return
    let active = true
    let controller
    async function refresh() {
      if (document.hidden) return
      controller?.abort()
      const requestController = new AbortController()
      controller = requestController
      const timeout = setTimeout(() => requestController.abort(), 10000)
      try {
        const response = await fetch('/.netlify/functions/capacity', {
          signal: requestController.signal
        })
        if (!response.ok) throw new Error('Capacity feed unavailable')
        const data = await response.json()
        if (data.configured && (!Array.isArray(data.rows) || !data.rows.length))
          throw new Error('Empty capacity feed')
        if (active && controller === requestController)
          setFeed({
            rows: data.configured ? data.rows : DEFAULT_CAPACITY,
            status: data.configured ? 'connected' : 'default'
          })
      } catch {
        if (active && controller === requestController)
          setFeed((previous) => ({ ...previous, status: 'unavailable' }))
      } finally {
        clearTimeout(timeout)
      }
    }
    refresh()
    const interval = setInterval(refresh, 60000)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      active = false
      controller?.abort()
      clearInterval(interval)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])

  return (
    <>
      <div className="capacity-table-heading">
        <h2>Capacity overview</h2>
        <span>Configuration confirmed on enquiry</span>
      </div>
      <p id="capacity-scroll-hint" className="capacity-scroll-hint">
        Swipe to explore all columns →
      </p>
      <div
        className="capacity-table-scroll"
        role="region"
        aria-label="GPU capacity table"
        aria-describedby="capacity-scroll-hint"
        tabIndex={0}
      >
        <table className="capacity-table">
          <caption className="sr-only">
            GPU capacity enquiries. Quantities, regions and readiness require
            confirmation from Anthroprime.
          </caption>
          <thead>
            <tr>
              {['GPU', 'Quantity', 'Location', 'Term', 'Ready', 'Enquire'].map(
                (label) => (
                  <th scope="col" key={label}>
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {feed.rows.map((row, index) => (
              <tr key={`${row.gpu}-${index}`}>
                <th scope="row">
                  <span className="capacity-chip" aria-hidden="true">
                    GPU
                  </span>
                  {row.gpu}
                </th>
                <td>{row.quantity}</td>
                <td>{row.location}</td>
                <td>{row.term}</td>
                <td>{row.ready}</td>
                <td>
                  <RequestAction
                    onSelect={onSelect}
                    disabled={disabled}
                    row={row}
                    className="capacity-request"
                    to="/find-capacity"
                    state={{
                      gpu: row.gpu,
                      ...(row.quantity !== 'On request'
                        ? { gpuQty: row.quantity }
                        : {}),
                      ...(row.location !== 'On request'
                        ? { location: row.location }
                        : {})
                    }}
                    aria-label={`Request ${row.gpu} capacity`}
                  >
                    Request
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </RequestAction>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="capacity-footnote">
        <p role="status">
          {feed.status === 'unavailable'
            ? 'Capacity updates are temporarily unavailable. Please contact us to verify the details shown.'
            : feed.status === 'connected'
              ? 'Capacity details refresh automatically. Availability is subject to confirmation.'
              : 'Capacity is on request. Quantities, regions and start dates are confirmed with your brief.'}
        </p>
        <Link to={onSelect ? '#capacity-brief' : '/find-capacity'}>
          Need a different configuration?{' '}
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </>
  )
}
