import React from 'react'

/**
 * "Capacity Graph" diagram — faithful port of the original GPU Capacity Desk
 * artifact (640×520 SVG): Your Requirement → AnthroPrime Capacity Graph →
 * Verified Capacity, fed by Hyperscalers / Neoclouds / Data Centers / OEM-Finance.
 */
export default function CapacityGraph({ className = '' }) {
  return (
    <div className={`diagram ${className}`} aria-label="AnthroPrime capacity graph: your requirement is matched against hyperscalers, neoclouds, data centers and OEM finance, returning verified capacity">
      <svg viewBox="0 0 640 520" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* active flows */}
        <line className="diagram-line active" x1="90" y1="260" x2="230" y2="260" />
        <line className="diagram-line active" x1="410" y1="260" x2="550" y2="260" />
        {/* supply tree */}
        <line className="diagram-line" x1="320" y1="180" x2="320" y2="120" />
        <line className="diagram-line" x1="320" y1="180" x2="230" y2="180" />
        <line className="diagram-line" x1="320" y1="180" x2="410" y2="180" />
        <line className="diagram-line" x1="320" y1="340" x2="320" y2="400" />
        <line className="diagram-line" x1="320" y1="340" x2="230" y2="340" />
        <line className="diagram-line" x1="320" y1="340" x2="410" y2="340" />
        <line className="diagram-line" x1="320" y1="180" x2="320" y2="220" />
        <line className="diagram-line" x1="320" y1="300" x2="320" y2="340" />

        {/* hub */}
        <g>
          <rect x="230" y="228" width="180" height="64" rx="12" className="node hub" />
          <rect x="230" y="228" width="180" height="64" rx="12" fill="none" stroke="#2FF2D2" strokeOpacity="0.25" strokeWidth="5">
            <animate attributeName="stroke-opacity" values="0.12;0.35;0.12" dur="3s" repeatCount="indefinite" />
          </rect>
          <text x="320" y="254" textAnchor="middle" className="nodelabel hub">AnthroPrime</text>
          <text x="320" y="270" textAnchor="middle" className="nodelabel hub" opacity=".75" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontWeight: 400 }}>Capacity Graph</text>
        </g>

        {/* requirement / verified */}
        <g>
          <rect x="16" y="234" width="130" height="52" rx="10" className="node" />
          <text x="81" y="256" textAnchor="middle" className="nodelabel big">Your</text>
          <text x="81" y="272" textAnchor="middle" className="nodelabel big">Requirement</text>
        </g>
        <g>
          <rect x="494" y="234" width="130" height="52" rx="10" className="node" />
          <text x="559" y="256" textAnchor="middle" className="nodelabel big">Verified</text>
          <text x="559" y="272" textAnchor="middle" className="nodelabel big">Capacity</text>
        </g>

        {/* supply categories */}
        {[
          { x: 150, y: 96, label: 'Hyperscalers' },
          { x: 350, y: 96, label: 'Neoclouds' },
          { x: 150, y: 376, label: 'Data Centers' },
          { x: 350, y: 376, label: 'OEM / Finance' },
        ].map(n => (
          <g key={n.label} className="region">
            <rect x={n.x} y={n.y} width="140" height="48" rx="9" className="node" />
            <text x={n.x + 70} y={n.y + 28} textAnchor="middle" className="nodelabel">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
