import React, { useId, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './hero-diagram.css'

const TOPICS = {
  gpu: {
    title: 'Inside the accelerator',
    nodes: ['Compute', 'Memory', 'Interconnect'],
    descriptions: [
      'Parallel compute units work through many independent operations at once.',
      'Local GPU memory holds model weights, activations, and working data. Capacity and bandwidth both matter.',
      'The host interface and supported GPU links move data between devices. Topology depends on the selected configuration.'
    ],
    link: '/gpu-lab#architecture',
    cta: 'Explore GPU architecture'
  },
  practice: {
    title: 'One connected practice',
    nodes: ['Architecture', 'Deployment', 'Support'],
    descriptions: [
      'Your workload shapes the balance of GPU compute, memory, storage, and networking.',
      'An agreed configuration brings the hardware, software stack, and deployment model together.',
      'Infrastructure support keeps the conversation going as your workload and capacity needs evolve.'
    ],
    link: '/services',
    cta: 'Meet the infrastructure practice'
  },
  Solutions: {
    title: 'From data to intelligence',
    nodes: ['Prepare', 'Accelerate', 'Serve'],
    descriptions: [
      'Prepare datasets and a storage path that can keep the workload supplied with data.',
      'Match compute and memory to the model, parallelism strategy, and workload.',
      'Plan inference capacity, observability, and the operational requirements of your application.'
    ],
    link: '/gpu-lab#workflows',
    cta: 'Explore AI workflows'
  },
  Services: {
    title: 'The infrastructure lifecycle',
    nodes: ['Design', 'Deploy', 'Operate'],
    descriptions: [
      'Define the GPU configuration, network fabric, and storage around your application.',
      'Bring the agreed cluster, software environment, and access model together.',
      'Discuss monitoring, maintenance, and managed infrastructure support with our team.'
    ],
    link: '/contact',
    cta: 'Talk through your architecture'
  },
  Resources: {
    title: 'A workload-first decision',
    nodes: ['Compute', 'Memory', 'Scale'],
    descriptions: [
      'Compare the operation types and precision your software actually uses.',
      'Estimate model weights, then allow for activations, runtime memory, and your framework.',
      'Consider GPU quantity, network topology, and deployment requirements together.'
    ],
    link: '/gpu-lab#memory',
    cta: 'Try the memory estimator'
  },
  brief: {
    title: 'Turn a workload into a plan',
    nodes: ['Workload', 'Configure', 'Discuss'],
    descriptions: [
      'Start with your application, model size, and preferred timeline.',
      'Set the GPU family, quantity, region, and deployment model you want to discuss.',
      'Review your brief and share it with the desk. Configuration and availability are confirmed directly.'
    ],
    link: '/gpu-lab',
    cta: 'Explore before you decide'
  }
}

/** A conceptual schematic, not telemetry or an inventory indicator. */
export default function HeroDiagram({ variant = 'brief', label }) {
  const topic = TOPICS[variant] || TOPICS.brief
  const [active, setActive] = useState(0)
  const id = useId().replace(/:/g, '')
  const gpu = variant === 'gpu'
  const practice = variant === 'practice'
  return (
    <figure
      className={`hero-diagram hero-diagram--${variant} diagram-active-${active}`}
    >
      <div className="diagram-heading mono">
        <span>{topic.title}</span>
        <span aria-hidden="true">
          AP / {String(active + 1).padStart(2, '0')}
        </span>
      </div>
      <svg viewBox="0 0 440 282" aria-hidden="true" className="diagram-canvas">
        <defs>
          <pattern
            id={`${id}-grid`}
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 22 0 L 0 0 0 22"
              fill="none"
              stroke="currentColor"
              strokeOpacity=".08"
            />
          </pattern>
          <linearGradient id={`${id}-core`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--diagram-core-a)" />
            <stop offset="1" stopColor="var(--diagram-core-b)" />
          </linearGradient>
        </defs>
        <rect width="440" height="282" fill={`url(#${id}-grid)`} />
        {gpu ? (
          <>
            <g className="diagram-traces" fill="none" stroke="currentColor">
              <path d="M34 85H104L138 119H165M34 197H104L138 163H165M406 85H336L302 119H275M406 197H336L302 163H275M220 32V96M220 186V250" />
              <path
                className="diagram-signal"
                d="M34 85H104L138 119H165M275 163H302L336 197H406M220 32V96"
              />
            </g>
            <rect
              x="147"
              y="69"
              width="146"
              height="146"
              rx="22"
              className="diagram-package"
            />
            {[106, 166].map((y) =>
              [112, 302].map((x) => (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width="26"
                  height="38"
                  rx="4"
                  className={`diagram-memory ${active === 1 ? 'is-active' : ''}`}
                />
              ))
            )}
            {Array.from({ length: 10 }, (_, i) => (
              <path
                key={i}
                d={`M${166 + i * 12} 61v8M${166 + i * 12} 215v8`}
                className="diagram-pin"
              />
            ))}
            <rect
              x="172"
              y="94"
              width="96"
              height="96"
              rx="13"
              fill={`url(#${id}-core)`}
              className={`diagram-core ${active === 0 ? 'is-active' : ''}`}
            />
            {Array.from({ length: 16 }, (_, i) => (
              <rect
                key={i}
                x={186 + (i % 4) * 18}
                y={108 + Math.floor(i / 4) * 18}
                width="12"
                height="12"
                rx="2"
                className="diagram-tile"
                style={{ animationDelay: `${i * -0.23}s` }}
              />
            ))}
            <text x="48" y="64" className="diagram-label">
              MEMORY
            </text>
            <text x="326" y="64" className="diagram-label">
              DATA PATH
            </text>
            <text x="220" y="270" textAnchor="middle" className="diagram-label">
              {label || 'GPU'} / CONCEPTUAL ARCHITECTURE
            </text>
          </>
        ) : practice ? (
          <>
            <circle cx="220" cy="145" r="98" className="diagram-orbit" />
            <circle
              cx="220"
              cy="145"
              r="71"
              className="diagram-orbit diagram-orbit-inner"
            />
            <path
              d="M220 47V109M135 194L185 166M305 194L255 166"
              className="diagram-traces diagram-signal"
            />
            <circle
              cx="220"
              cy="145"
              r="43"
              fill={`url(#${id}-core)`}
              className="diagram-core"
            />
            <text x="220" y="151" textAnchor="middle" className="diagram-brand">
              AP
            </text>
            {[
              [220, 47],
              [135, 194],
              [305, 194]
            ].map(([x, y], i) => (
              <g key={x} className={active === i ? 'is-active' : ''}>
                <rect
                  x={x - 49}
                  y={y - 15}
                  width="98"
                  height="30"
                  rx="15"
                  className="diagram-node"
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  className="diagram-label"
                >
                  {topic.nodes[i]}
                </text>
              </g>
            ))}
            <text x="220" y="270" textAnchor="middle" className="diagram-label">
              YOUR WORKLOAD AT THE CENTRE
            </text>
          </>
        ) : (
          <>
            <path d="M220 62V230" className="diagram-traces diagram-signal" />
            {topic.nodes.map((name, i) => (
              <g key={name} className={active === i ? 'is-active' : ''}>
                <path
                  d={`M100 ${48 + i * 68}L220 ${24 + i * 68}L340 ${48 + i * 68}L220 ${80 + i * 68}Z`}
                  className="diagram-layer"
                />
                <path
                  d={`M100 ${48 + i * 68}v14L220 ${94 + i * 68}L340 ${62 + i * 68}v-14L220 ${80 + i * 68}Z`}
                  className="diagram-layer-edge"
                />
                <text
                  x="220"
                  y={54 + i * 68}
                  textAnchor="middle"
                  className="diagram-layer-label"
                >
                  {name.toUpperCase()}
                </text>
                <circle
                  cx="355"
                  cy={54 + i * 68}
                  r="3"
                  className="diagram-beacon"
                />
              </g>
            ))}
            <text x="220" y="270" textAnchor="middle" className="diagram-label">
              CONNECTED BY DESIGN
            </text>
          </>
        )}
      </svg>
      <div
        className="diagram-controls"
        aria-label={`${topic.title}: explore a layer`}
      >
        {topic.nodes.map((node, i) => (
          <button
            key={node}
            type="button"
            aria-pressed={active === i}
            aria-controls={`${id}-description`}
            onClick={() => setActive(i)}
          >
            <span className="mono">0{i + 1}</span>
            {node}
          </button>
        ))}
      </div>
      <figcaption>
        <p id={`${id}-description`} aria-live="polite" aria-atomic="true">
          {topic.descriptions[active]}
        </p>
        <Link to={topic.link}>
          {topic.cta}
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </figcaption>
    </figure>
  )
}
