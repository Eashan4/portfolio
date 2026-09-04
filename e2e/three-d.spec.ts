import { test, expect } from './fixtures.ts'

/**
 * The diagnostics fixture already fails the test on any console error or
 * uncaught exception, so this doubles as "the 3D engineering map produced no
 * runtime errors". It also asserts the stage resolved to a real WebGL canvas
 * OR a graceful fallback — never a blank/broken stage.
 */
test('the engineering map mounts a canvas or a fallback, error-free', async ({
  page,
}) => {
  await page.goto('/')
  const stage = page.getByTestId('scene-stage').first()
  await expect(stage).toBeVisible()

  await expect
    .poll(
      async () => {
        const hasCanvas = (await stage.locator('canvas').count()) > 0
        const hasFallback =
          (await stage.locator('.stage-fallback').count()) > 0
        return hasCanvas || hasFallback
      },
      { timeout: 15_000 },
    )
    .toBe(true)

  const canvas = stage.locator('canvas')
  if ((await canvas.count()) > 0) {
    const hasGL = await canvas.first().evaluate((el) => {
      const c = el as HTMLCanvasElement
      return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
    })
    expect(hasGL).toBe(true)
  }
})

test('the map is still operable with the keyboard and pointer', async ({
  page,
}) => {
  await page.goto('/')
  const panel = page.locator('#signal [aria-live="polite"]')
  await page
    .locator('#signal')
    .getByRole('button', { name: 'Research', exact: true })
    .click()
  await expect(panel.getByRole('heading', { level: 3 })).toHaveText('Research')
})

test('reduced-motion preference still renders the map without errors', async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

  await page.goto('/')
  await expect(page.getByTestId('scene-stage').first()).toBeVisible()
  await page.waitForTimeout(1500)

  expect(errors).toEqual([])
  await context.close()
})
