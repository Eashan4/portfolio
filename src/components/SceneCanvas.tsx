import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { SpinningKnot } from './SpinningKnot.tsx'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.ts'

type Props = {
  /** Pass false to pause rendering entirely (e.g. canvas scrolled offscreen). */
  active: boolean
}

/**
 * The actual WebGL surface. Imported lazily so three.js / R3F land in a
 * separate chunk that only downloads when a 3D scene is on screen.
 *
 * Rendering strategy:
 *  - `frameloop="demand"` by default: nothing renders unless React state
 *    changes or `invalidate()` is called — no idle GPU churn.
 *  - Switch to `frameloop="always"` only while the canvas is active AND the
 *    user has not asked for reduced motion.
 *  - dpr capped at 2 to avoid over-rendering on high-density displays.
 */
export default function SceneCanvas({ active }: Props) {
  const prefersReduced = usePrefersReducedMotion()
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const shouldAnimate = active && pageVisible && !prefersReduced

  return (
    <Canvas
      ref={canvasRef}
      frameloop={shouldAnimate ? 'always' : 'demand'}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0b0b0f', 0)
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Suspense fallback={null}>
        <SpinningKnot animate={shouldAnimate} />
      </Suspense>
    </Canvas>
  )
}
