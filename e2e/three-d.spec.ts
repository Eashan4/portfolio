import { test, expect } from './fixtures.ts'

/**
 * The diagnostics fixture already fails the test on any console error or
 * uncaught exception, so these tests double as "the 3D scene produced no
 * runtime errors" checks. They additionally assert the scene resolved to a
 * real WebGL canvas OR a graceful fallback — never a blank/broken stage.
 */
const SCENE_PAGES = ['/', '/work']

for (const path of SCENE_PAGES) {
  test(`3D stage on ${path} mounts a canvas or a fallback, error-free`, async ({
    page,
  }) => {
    await page.goto(path)
    const stage = page.getByTestId('scene-stage').first()
    await expect(stage).toBeVisible()

    // Wait for the lazy R3F chunk to resolve to one of the two valid states.
    await expect
      .poll(
        async () => {
          const hasCanvas = (await stage.locator('canvas').count()) > 0
          const hasFallback = (await stage.locator('.stage-fallback').count()) > 0
          return hasCanvas || hasFallback
        },
        { timeout: 15_000 },
      )
      .toBe(true)

    const canvas = stage.locator('canvas')
    if ((await canvas.count()) > 0) {
      // A live WebGL context should be obtainable from the mounted canvas.
      const hasGL = await canvas.first().evaluate((el) => {
        const c = el as HTMLCanvasElement
        return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
      })
      expect(hasGL).toBe(true)
    }
  })
}

test('reduced-motion preference still renders the scene without errors', async ({
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
