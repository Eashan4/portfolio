import { useState } from 'react'
import { Scene } from '../components/Scene.tsx'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Eashan Jain</h1>
      <p>
        Creative developer. This is a starter 3D portfolio built with React Three Fiber
        &mdash; replace this copy and the scene with your own work.
      </p>

      <Scene label="Hero scene" />

      <p>
        The interaction below exists so end-to-end tests have a deterministic DOM
        element to click.
      </p>
      <button
        type="button"
        data-testid="counter"
        onClick={() => setCount((c) => c + 1)}
      >
        Clicked {count} times
      </button>
    </>
  )
}
