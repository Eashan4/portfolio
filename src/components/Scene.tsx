import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { isWebGLAvailable } from '../lib/webgl.ts'
import { SceneErrorBoundary } from './SceneErrorBoundary.tsx'

const SceneCanvas = lazy(() => import('./SceneCanvas.tsx'))

type Props = {
  /** Short description rendered as the fallback and for screen readers. */
  label: string
}

const fallback = (label: string) => (
  <div className="stage-fallback" role="img" aria-label={label}>
    <p>{label}</p>
  </div>
)

/**
 * Drop-in 3D stage.
 *  - Renders a static fallback when WebGL is unavailable.
 *  - Only mounts the canvas once it scrolls into view (IntersectionObserver),
 *    and unmounts / pauses it when it leaves — no offscreen WebGL work.
 */
export function Scene({ label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [webgl] = useState(isWebGLAvailable)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '150px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="stage" ref={containerRef} data-testid="scene-stage">
      {!webgl ? (
        fallback(`${label} (3D unavailable — WebGL not supported)`)
      ) : (
        <SceneErrorBoundary fallback={fallback(`${label} (3D failed to load)`)}>
          <Suspense fallback={fallback(`Loading ${label}…`)}>
            {inView && <SceneCanvas active={inView} />}
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
