import React from 'react'

/**
 * Sourcing-region diagram — faithful port of the original artifact
 * (480×480 SVG): AnthroPrime Interface hub wired to 5 sourcing regions.
 * Interactive: hover/focus a region (or its row in GlobalNetwork) to light it up.
 */
const NODES = [
  { name: 'India', x: 240, y: 60, lines: ['India'] },
  { name: 'Southeast Asia', x: 410, y: 160, short: ['SE', 'Asia'] },
  { name: 'Middle East', x: 380, y: 380, short: ['Middle', 'East'] },
  { name: 'Europe', x: 100, y: 380, lines: ['Europe'] },
  { name: 'North America', x: 70, y: 160, short: ['North', 'America'] },
]

export default function NetworkMap({ active, onActive, className = '' }) {
  return (
    <div className={`diagram ${className}`} aria-label="AnthroPrime interface connected to sourcing regions: India, Southeast Asia, Middle East, Europe and North America">
      <svg viewBox="0 0 480 480" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {NODES.map(n => {
          const isActive = active === n.name
          return (
            <g
              key={n.name}
              className={`region ${isActive ? 'active' : ''}`}
              onMouseEnter={() => onActive?.(n.name)}
              onMouseLeave={() => onActive?.(null)}
              onFocus={() => onActive?.(n.name)}
              onBlur={() => onActive?.(null)}
              tabIndex={0}
              role="img"
              aria-label={`Sourcing region: ${n.name}`}
            >
              <line className={`diagram-line active`} x1="240" y1="240" x2={n.x} y2={n.y} opacity={active && !isActive ? 0.25 : 1} style={{ transition: 'opacity .25s' }} />
              <circle cx={n.x} cy={n.y} r={isActive ? 38 : 34} className="node" style={{ transition: 'r .25s' }} />
              {isActive && <circle cx={n.x} cy={n.y} r="44" fill="none" className="hub-pulse" strokeOpacity="0.3" strokeWidth="1.5" />}
              {n.lines ? (
                <text x={n.x} y={n.y + 4} textAnchor="middle" className="nodelabel">{n.lines[0]}</text>
              ) : (
                <>
                  <text x={n.x} y={n.y - 2} textAnchor="middle" className="nodelabel">{n.short[0]}</text>
                  <text x={n.x} y={n.y + 11} textAnchor="middle" className="nodelabel">{n.short[1]}</text>
                </>
              )}
            </g>
          )
        })}

        {/* hub */}
        <circle cx="240" cy="240" r="46" className="node hub" />
        <circle cx="240" cy="240" r="52" fill="none" className="hub-pulse" strokeOpacity="0.2" strokeWidth="4">
          <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x="240" y="236" textAnchor="middle" className="nodelabel hub">AnthroPrime</text>
        <text x="240" y="251" textAnchor="middle" className="nodelabel hub" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontWeight: 400 }} opacity=".8">Interface</text>
      </svg>
    </div>
  )
}
