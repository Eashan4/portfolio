import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode; fallback: ReactNode }
type State = { hasError: boolean }

/**
 * Keeps a WebGL/runtime failure inside a 3D scene from taking down the page.
 * Renders the static fallback instead and logs once for diagnostics.
 */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[Scene] render failed, showing fallback:', error, info)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
