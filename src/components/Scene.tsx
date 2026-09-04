import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { isWebGLAvailable } from '../lib/webgl.ts'
import { SceneErrorBoundary } from './SceneErrorBoundary.tsx'

type Props = {
  /** Short description rendered as the fallback and for screen readers. */
  label: string
  /**
   * The WebGL canvas to mount. Lazy-import it at the call site so `three` /
   * R3F land in the `r3f` vendor chunk and only download when a scene is on
   * screen. It receives `active` so it can pause work when scrolled away.
   */
  children: (active: boolean) => ReactNode
  /** Rendered instead of the fallback text when WebGL is missing (optional). */
  staticFallback?: ReactNode
  className?: string
}

const fallbackText = (label: string) => (
  <div className="stage-fallback" role="img" aria-label={label}>
    <p>{label}</p>
  </div>
)

/**
 * Drop-in 3D stage.
 *  - Renders a static fallback when WebGL is unavailable.
 *  - Only mounts the canvas once it scrolls into view (IntersectionObserver),
 *    and pauses it when it leaves — no offscreen WebGL work.
 *  - A runtime failure inside the canvas is caught and replaced with the
 *    fallback, never the whole page.
 */
export function Scene({ label, children, staticFallback, className }: Props) {
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
    <div
      className={`stage${className ? ` ${className}` : ''}`}
      ref={containerRef}
      data-testid="scene-stage"
    >
      {!webgl ? (
        (staticFallback ??
          fallbackText(`${label} — 3D unavailable (WebGL not supported)`))
      ) : (
        <SceneErrorBoundary
          fallback={
            staticFallback ?? fallbackText(`${label} — 3D failed to load`)
          }
        >
          <Suspense
            fallback={
              staticFallback ?? fallbackText(`Loading ${label}…`)
            }
          >
            {inView && children(inView)}
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
