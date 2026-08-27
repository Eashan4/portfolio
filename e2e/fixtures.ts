import { test as base, expect, type Page } from '@playwright/test'

export type PageDiagnostics = {
  consoleErrors: string[]
  pageErrors: string[]
  failedRequests: string[]
}

/**
 * Attaches console / pageerror / network listeners to a page and returns the
 * collected problems. Call at the top of a test, assert on it at the end.
 */
export function collectDiagnostics(page: Page): PageDiagnostics {
  const d: PageDiagnostics = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
  }

  page.on('console', (msg) => {
    if (msg.type() === 'error') d.consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => {
    d.pageErrors.push(err.message)
  })
  page.on('requestfailed', (req) => {
    // Ignore benign aborts (e.g. navigations cancelling in-flight requests).
    const failure = req.failure()?.errorText ?? ''
    if (failure.includes('ERR_ABORTED') || failure.includes('NS_BINDING_ABORTED'))
      return
    d.failedRequests.push(`${req.method()} ${req.url()} — ${failure}`)
  })
  page.on('response', (res) => {
    if (res.status() >= 400) {
      d.failedRequests.push(`${res.status()} ${res.request().method()} ${res.url()}`)
    }
  })

  return d
}

/** Test fixture that auto-collects diagnostics and fails if any surfaced. */
export const test = base.extend<{ diagnostics: PageDiagnostics }>({
  diagnostics: async ({ page }, use) => {
    const d = collectDiagnostics(page)
    await use(d)
    expect(d.pageErrors, 'uncaught page errors').toEqual([])
    expect(d.consoleErrors, 'console errors').toEqual([])
    expect(d.failedRequests, 'failed network requests').toEqual([])
  },
})

export { expect }
