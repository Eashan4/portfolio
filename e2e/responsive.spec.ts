import { test, expect } from './fixtures.ts'

const BREAKPOINTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'desktop', width: 1440, height: 900 },
]

const PATHS = ['/', '/work/smarthealth-ai']

/**
 * Screenshots each path at each breakpoint into test-results/screenshots/ and
 * asserts the layout never overflows horizontally.
 */
for (const bp of BREAKPOINTS) {
  for (const path of PATHS) {
    test(`${path} has no horizontal overflow at ${bp.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height })
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      )
      expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(1)

      const slug = path === '/' ? 'home' : path.replace(/\//g, '-')
      await page.screenshot({
        path: `test-results/screenshots/${slug}-${bp.name}.png`,
        fullPage: true,
      })
    })
  }
}
