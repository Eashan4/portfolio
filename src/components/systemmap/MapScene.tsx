import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'
import { graphNodes, RING_RADIUS } from './graph'
import type { DomainId } from '../../data/types'

type Props = {
  active: boolean
  /** the domain currently selected or hovered in the DOM layer */
  emphasis: DomainId | null
}

const TRACE = '#4fd1c5'
const DIM = '#39414a'

/**
 * Ambient armature behind the interactive DOM node ring: a central polyhedron,
 * faint spokes out to each domain, and a slow rotation like a radar sweep. The
 * DOM buttons are the actual interface; this is depth and atmosphere.
 */
function Armature({ active, emphasis }: Props) {
  const group = useRef<Group>(null)
  const prefersReduced = usePrefersReducedMotion()

  const positions = useMemo(() => {
    const pts: number[] = []
    for (const n of graphNodes) pts.push(0, 0, 0, n.x, n.y, 0)
    const seg = 96
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * Math.PI * 2
      const a1 = ((i + 1) / seg) * Math.PI * 2
      pts.push(
        Math.cos(a0) * RING_RADIUS,
        Math.sin(a0) * RING_RADIUS,
        0,
        Math.cos(a1) * RING_RADIUS,
        Math.sin(a1) * RING_RADIUS,
        0,
      )
    }
    return new Float32Array(pts)
  }, [])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    // settle to a slight tilt on mount; keep dots aligned with the DOM labels
    g.rotation.x += (-0.06 - g.rotation.x) * 0.05
    if (active && !prefersReduced) {
      const b = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.012
      g.scale.setScalar(b)
    }
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={emphasis ? TRACE : DIM}
          transparent
          opacity={emphasis ? 0.42 : 0.28}
        />
      </lineSegments>

      {graphNodes.map((n) => (
        <mesh key={n.id} position={[n.x, n.y, 0]}>
          <circleGeometry args={[emphasis === n.id ? 0.08 : 0.045, 20]} />
          <meshBasicMaterial
            color={emphasis === n.id ? '#f2a93b' : '#8b929c'}
          />
        </mesh>
      ))}

      <mesh>
        <icosahedronGeometry args={[0.17, 1]} />
        <meshStandardMaterial
          color="#e9eef5"
          emissive="#e9eef5"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.2}
          flatShading
        />
      </mesh>
    </group>
  )
}

/**
 * WebGL surface for the Engineering Map. Lazy-imported so three / R3F stay in
 * the `r3f` chunk. Frameloop follows the scaffold convention: `demand` unless
 * the stage is active, the tab is visible, and reduced-motion is off.
 */
export default function MapScene(props: Props) {
  const prefersReduced = usePrefersReducedMotion()
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  )
  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const animate = props.active && pageVisible && !prefersReduced

  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#0a0b0d', 0)}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 3, 5]} intensity={30} />
      <pointLight position={[-5, -2, 2]} intensity={10} color="#4fd1c5" />
      <Armature {...props} />
    </Canvas>
  )
}
