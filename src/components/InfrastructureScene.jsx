import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMotionSettings } from './MotionSettings'

function Chip({ paused }) {
  const group = useRef()
  const rings = useRef()
  useFrame(({ clock, pointer }, dt) => {
    if (paused) return
    const t = clock.getElapsedTime()
    group.current.rotation.x =
      -0.27 + Math.sin(t * 0.3) * 0.06 + pointer.y * 0.08
    group.current.rotation.y =
      -0.4 + Math.sin(t * 0.2) * 0.13 + pointer.x * 0.18
    group.current.position.y = Math.sin(t * 0.7) * 0.08
    rings.current.rotation.z += dt * 0.035
  })
  const pins = useMemo(
    () => Array.from({ length: 17 }, (_, i) => (i - 8) * 0.097),
    []
  )
  return (
    <group rotation={[0.25, 0.1, -0.28]}>
      <group ref={rings}>
        {[1.75, 2.08, 2.4].map((r, i) => (
          <group key={r} rotation={[0.7 + i * 0.5, i * 0.5, i * 0.2]}>
            <mesh>
              <torusGeometry args={[r, 0.006, 5, 160]} />
              <meshBasicMaterial
                color={i === 1 ? '#b8a080' : '#7288d6'}
                transparent
                opacity={i === 1 ? 0.6 : 0.32}
              />
            </mesh>
            <mesh position={[r, 0, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#d4bd9b" />
            </mesh>
            <mesh position={[-r, 0, 0]}>
              <sphereGeometry args={[0.021, 10, 10]} />
              <meshBasicMaterial color="#879ee8" />
            </mesh>
          </group>
        ))}
      </group>
      <group ref={group} rotation={[-0.27, -0.4, 0]}>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[1.95, 1.95, 0.13]} />
          <meshStandardMaterial
            color="#1c304a"
            metalness={0.75}
            roughness={0.28}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[1.78, 1.78, 0.14]} />
          <meshStandardMaterial
            color="#34496c"
            metalness={0.8}
            roughness={0.32}
          />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[1.19, 1.19, 0.12]} />
          <meshStandardMaterial
            color="#b8a080"
            metalness={0.85}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0.18]}>
          <boxGeometry args={[1.09, 1.09, 0.07]} />
          <meshStandardMaterial
            color="#1b2b49"
            metalness={0.5}
            roughness={0.22}
          />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side}>
            {pins.map((p, i) => (
              <React.Fragment key={p}>
                <mesh position={[side * 0.91, p, 0.04]}>
                  <boxGeometry args={[0.15, 0.035, 0.025]} />
                  <meshStandardMaterial
                    color={i % 3 ? '#b8a080' : '#7288d6'}
                    metalness={0.9}
                    roughness={0.3}
                  />
                </mesh>
                <mesh position={[p, side * 0.91, 0.04]}>
                  <boxGeometry args={[0.035, 0.15, 0.025]} />
                  <meshStandardMaterial
                    color="#b8a080"
                    metalness={0.8}
                    roughness={0.3}
                  />
                </mesh>
              </React.Fragment>
            ))}
          </group>
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <React.Fragment key={i}>
            <mesh position={[(i - 4) * 0.11, 0, 0.221]}>
              <boxGeometry args={[0.002, 0.93, 0.002]} />
              <meshBasicMaterial color="#7288d6" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, (i - 4) * 0.11, 0.221]}>
              <boxGeometry args={[0.93, 0.002, 0.002]} />
              <meshBasicMaterial color="#7288d6" transparent opacity={0.5} />
            </mesh>
          </React.Fragment>
        ))}
        <mesh position={[0, 0, 0.23]}>
          <boxGeometry args={[0.43, 0.43, 0.05]} />
          <meshStandardMaterial
            color="#a68f71"
            metalness={0.8}
            roughness={0.28}
            emissive="#b8a080"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.33, 0.33, 0.02]} />
          <meshStandardMaterial
            color="#18243d"
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>
        {[-0.76, 0.76].flatMap((x) =>
          [-0.76, 0.76].map((y) => (
            <mesh key={`${x}${y}`} position={[x, y, 0.09]}>
              <cylinderGeometry args={[0.028, 0.028, 0.035, 12]} />
              <meshStandardMaterial color="#c7b494" />
            </mesh>
          ))
        )}
      </group>
    </group>
  )
}

function Particles({ paused }) {
  const ref = useRef()
  const points = useMemo(() => {
    const p = new Float32Array(210 * 3)
    for (let i = 0; i < 210; i++) {
      const a = i * 2.399963
      const z = 1 - (2 * (i + 0.5)) / 210
      const r = Math.sqrt(1 - z * z) * 3
      p.set([Math.cos(a) * r, Math.sin(a) * r, z * 2.4], i * 3)
    }
    return p
  }, [])
  useFrame((_, dt) => {
    if (!paused) ref.current.rotation.y += dt * 0.025
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={210}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a2b4de"
        size={0.016}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

export class SceneBoundary extends React.Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <div className="visual-fallback">AI CORE</div>
    ) : (
      this.props.children
    )
  }
}

export default function InfrastructureScene() {
  const { paused } = useMotionSettings()
  const holder = useRef(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '100px' }
    )
    observer.observe(holder.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={holder} className="core-canvas" aria-hidden="true">
      <SceneBoundary>
        <Canvas
          dpr={[1, 1.5]}
          frameloop={paused || !inView ? 'demand' : 'always'}
          camera={{ position: [0, 0, 6.8], fov: 46 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight
            position={[3, 4, 5]}
            intensity={4}
            color="#bdcaff"
          />
          <pointLight position={[-3, -2, 3]} intensity={12} color="#b8a080" />
          <Chip paused={paused || !inView} />
          <Particles paused={paused || !inView} />
        </Canvas>
      </SceneBoundary>
    </div>
  )
}
