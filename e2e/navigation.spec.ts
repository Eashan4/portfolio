import { test, expect } from './fixtures.ts'

const PAGES = [
  { name: 'Home', path: '/', heading: 'Eashan Jain' },
  { name: 'Work', path: '/work', heading: 'Work' },
  { name: 'About', path: '/about', heading: 'About' },
]

test.describe('every major page', () => {
  for (const p of PAGES) {
    test(`${p.name} loads clean and shows its heading`, async ({ page }) => {
      await page.goto(p.path)
      await expect(
        page.getByRole('heading', { level: 1, name: p.heading }),
      ).toBeVisible()
    })
  }
})

test('primary nav walks through all pages', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Work', exact: true }).click()
  await expect(page).toHaveURL(/\/work$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Work' })).toBeVisible()

  await page.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible()

  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page).toHaveURL(/:\d+\/$/)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Eashan Jain' }),
  ).toBeVisible()
})

test('unknown route renders the not-found page', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.getByRole('heading', { level: 1, name: 'Not found' })).toBeVisible()
})
