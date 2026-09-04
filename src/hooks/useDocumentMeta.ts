import { useEffect } from 'react'

/**
 * Sets document.title and the meta description for a route, restoring the
 * previous values on unmount so client navigation stays correct for crawlers
 * that execute JS and for the browser tab / history.
 */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let metaEl: HTMLMetaElement | null = null
    let prevDesc: string | null = null
    if (description) {
      metaEl = document.querySelector('meta[name="description"]')
      if (metaEl) {
        prevDesc = metaEl.getAttribute('content')
        metaEl.setAttribute('content', description)
      }
    }

    return () => {
      document.title = prevTitle
      if (metaEl && prevDesc !== null) metaEl.setAttribute('content', prevDesc)
    }
  }, [title, description])
}
