import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('homepage WCAG 2.0 A & AA compliance', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()

  if (results.violations.length) {
    console.log(
      '⚠️ WCAG 2.0 A/AA violations:',
      JSON.stringify(results.violations, null, 2),
    )
  }

  // Assert no violations
  expect(results.violations).toEqual([])
})
