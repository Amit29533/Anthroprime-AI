import React, { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../theme'

const ACCENT = '#2FF2D2'
const DIM = '#1E2A3A'
const ACCENT_LIGHT = '#0F766E'
const DIM_LIGHT = '#C7D4E0'

/** Fibonacci-sphere point cloud */
function useSpherePoints(count, radius) {
  return useMemo(() => {
    const pos = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      pos[i * 3] = Math.cos(theta) * r * radius
      pos[i * 3 + 1] = y * radius
      pos[i * 3 + 2] = Math.sin(theta) * r * radius
    }
    return pos
  }, [count, radius])
}

function PointsSphere({ count = 1600, radius = 1, color = ACCENT }) {
  const positions = useSpherePoints(count, radius)
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.016} color={color} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function FaintSphere({ count = 900, radius = 1.001, color = DIM }) {
  const positions = useSpherePoints(count, radius)
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.011} color={color} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/** Great-circle-ish arc between two lat/lon points, lifted above the surface */
function Arc({ from, to, lift = 0.35, color = ACCENT, opacity = 0.5, speed = 1 }) {
  const line = useMemo(() => {
    const toVec3 = ([lat, lon], r = 1) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      )
    }
    const a = toVec3(from)
    const b = toVec3(to)
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(1 + lift)
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64))
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    return new THREE.Line(geo, mat)
  }, [from, to, lift, color, opacity])

  const pulse = useRef(null)
  useFrame(({ clock }) => {
    if (pulse.current) {
      pulse.current.material.opacity = opacity * (0.55 + 0.45 * Math.sin(clock.elapsedTime * speed))
    }
  })
  useEffect(() => { pulse.current = line }, [line])

  return <primitive object={line} />
}

/** Hub + regional node dots on the sphere surface */
function Nodes({ points, color = ACCENT }) {
  return (
    <group>
      {points.map(([lat, lon], i) => {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lon + 180) * (Math.PI / 180)
        const x = -1.005 * Math.sin(phi) * Math.cos(theta)
        const y = 1.005 * Math.cos(phi)
        const z = 1.005 * Math.sin(phi) * Math.sin(theta)
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshBasicMaterial color={color} />
          </mesh>
        )
      })}
    </group>
  )
}

/* Anthroprime sourcing regions (approximate): India, SEA, Middle East, Europe, North America */
const REGIONS = [
  [20.6, 78.9],    // India
  [1.35, 103.8],   // Singapore
  [25.2, 55.3],    // Dubai
  [50.1, 8.7],     // Frankfurt
  [38.9, -77.0],   // Virginia
]

const ARCS = [
  [REGIONS[0], REGIONS[3]],
  [REGIONS[0], REGIONS[1]],
  [REGIONS[2], REGIONS[0]],
  [REGIONS[3], REGIONS[4]],
  [REGIONS[4], REGIONS[0]],
  [REGIONS[2], REGIONS[3]],
]

function Scene({ interactive, reduced, accent = ACCENT, dim = DIM }) {
  const group = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!interactive) return
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [interactive])

  useFrame((_, delta) => {
    if (!group.current) return
    if (!reduced) group.current.rotation.y += delta * 0.08
    if (interactive) {
      group.current.rotation.x += ((pointer.current.y * 0.15) - group.current.rotation.x) * 0.03
      group.current.rotation.z += ((pointer.current.x * 0.04) - group.current.rotation.z) * 0.03
    }
  })

  return (
    <group ref={group}>
      <FaintSphere color={dim} />
      <PointsSphere color={accent} />
      <Nodes points={REGIONS} color={accent} />
      {ARCS.map((a, i) => (
        <Arc key={i} from={a[0]} to={a[1]} lift={0.3 + (i % 3) * 0.08} opacity={0.55} speed={0.8 + i * 0.25} color={accent} />
      ))}
    </group>
  )
}

/** Static fallback if WebGL fails */
function Fallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="w-[420px] h-[420px] rounded-full border border-border relative">
        <div className="absolute inset-6 rounded-full border border-border/60" />
        <div className="absolute inset-14 rounded-full border border-accent/20" />
        <div className="absolute inset-0 rounded-full bg-accent/5 blur-2xl" />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-accent animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-accent animate-pulse [animation-delay:0.6s]" />
      </div>
    </div>
  )
}

class Boundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <Fallback /> : this.props.children }
}

export default function Globe3D({ className = '', interactive = true }) {
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const theme = useTheme()
  const dark = theme === 'dark'
  const accent = dark ? ACCENT : ACCENT_LIGHT
  const dim = dark ? DIM : DIM_LIGHT

  return (
    <div className={`relative ${className}`} aria-hidden>
      <Boundary>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.2, 2.7], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <Scene interactive={interactive && !reduced} reduced={reduced} accent={accent} dim={dim} />
        </Canvas>
      </Boundary>
      {/* vignette so the globe melts into the page (theme-aware) */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(closest-side, transparent 60%, rgb(var(--c-bg) / 1) 100%)' }} />
    </div>
  )
}
