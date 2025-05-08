import { expect, test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto(`${process.env.WEB_BASE_URL}`)
})
