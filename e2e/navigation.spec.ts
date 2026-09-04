import { test, expect } from './fixtures.ts'

test('home loads clean with the hero heading', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /building intelligent software systems/i,
    }),
  ).toBeVisible()
})

test('every homepage channel section is present', async ({ page }) => {
  await page.goto('/')
  for (const id of [
    'signal',
    'build',
    'ecosystem',
    'work',
    'research',
    'current',
    'journey',
    'contact',
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
})

test('primary nav scrolls to sections and keeps the user on /', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Work', exact: true }).click()
  await expect(
    page.getByRole('heading', { level: 2, name: /real systems/i }),
  ).toBeInViewport()
  await expect(page).toHaveURL(/\/$/)

  await page.getByRole('button', { name: 'Research', exact: true }).click()
  await expect(
    page.getByRole('heading', { level: 2, name: /published contribution/i }),
  ).toBeInViewport()
})

test('a flagship case study opens from the work index', async ({ page }) => {
  await page.goto('/')
  await page
    .locator('#work')
    .getByRole('link', { name: /Smart Hospital Queue System/i })
    .first()
    .click()
  await expect(page).toHaveURL(/\/work\/smart-hospital-queue$/)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Smart Hospital Queue System' }),
  ).toBeVisible()
  await expect(page.getByText('The problem')).toBeVisible()
})

test('every flagship + system case study route renders a heading', async ({
  page,
}) => {
  const slugs = [
    'smart-hospital-queue',
    'smarthealth-ai',
    'nova',
    'quotaverse',
    'facial-recognition',
    'laboratory-management',
    'bed-occupancy',
    'smart-energy-meter',
    'fingerprint-door-lock',
    'heart-rate-monitoring',
  ]
  for (const slug of slugs) {
    await page.goto(`/work/${slug}`)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
})

test('back link returns from a case study to the work section', async ({
  page,
}) => {
  await page.goto('/work/nova')
  await page.getByRole('link', { name: '← All work', exact: true }).click()
  await expect(page).toHaveURL(/\/#work$/)
  await expect(
    page.getByRole('heading', { level: 2, name: /real systems/i }),
  ).toBeInViewport()
})

test('an archived project route redirects back to work', async ({ page }) => {
  await page.goto('/work/smartirrigate')
  await expect(page).toHaveURL(/\/#work$/)
})

test('unknown route renders the not-found page', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(
    page.getByRole('heading', { level: 1, name: /signal lost/i }),
  ).toBeVisible()
})
