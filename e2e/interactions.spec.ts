import { test, expect } from './fixtures.ts'

test('counter button responds to clicks', async ({ page }) => {
  await page.goto('/')
  const button = page.getByTestId('counter')
  await expect(button).toHaveText('Clicked 0 times')
  await button.click()
  await button.click()
  await expect(button).toHaveText('Clicked 2 times')
})

test('work page lists projects', async ({ page }) => {
  await page.goto('/work')
  const items = page.getByTestId('project-list').getByRole('listitem')
  await expect(items).toHaveCount(3)
})

test('mailto link is present on about', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('link', { name: /@/ })).toHaveAttribute(
    'href',
    /^mailto:/,
  )
})
