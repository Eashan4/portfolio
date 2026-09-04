import { test, expect } from './fixtures.ts'

test('engineering map: selecting a domain updates the detail panel', async ({
  page,
}) => {
  await page.goto('/')
  const panel = page.locator('#signal [aria-live="polite"]')
  await expect(panel.getByRole('heading', { level: 3 })).toHaveText(
    'Intelligent Systems',
  )
  await page
    .locator('#signal')
    .getByRole('button', { name: 'Cloud', exact: true })
    .click()
  await expect(panel.getByRole('heading', { level: 3 })).toHaveText(
    'Cloud & Infrastructure',
  )
})

test('what I build: a domain row expands to reveal evidence', async ({
  page,
}) => {
  await page.goto('/')
  const row = page
    .locator('#build')
    .getByRole('button', { name: /Desktop & Executable Software/i })
  await row.click()
  await expect(row).toHaveAttribute('aria-expanded', 'true')
  await expect(
    page.locator('#build').getByRole('link', {
      name: /Real-Time Facial Recognition System/i,
    }),
  ).toBeVisible()
})

test('technology ecosystem: selecting a project lights its stack', async ({
  page,
}) => {
  await page.goto('/')
  const eco = page.locator('#ecosystem')
  await eco.getByRole('button', { name: 'SmartHealth AI', exact: true }).click()
  await expect(eco.locator('[aria-live="polite"]')).toContainText('PyTorch')
})

test('case study architecture diagram: clicking a node updates the detail', async ({
  page,
}) => {
  await page.goto('/work/smart-hospital-queue')
  const detail = page.locator('[aria-live="polite"]').last()
  await page.getByRole('button', { name: /On-device AI/i }).click()
  await expect(detail).toContainText('anomaly detector')
})

test('contact: copy-email button gives feedback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-write'])
  await page.goto('/')
  const btn = page.getByRole('button', { name: 'Copy email' })
  await btn.click()
  await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible()
})
