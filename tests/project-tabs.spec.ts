import { expect, test } from '@playwright/test'

test('switch project views using the keyboard and copy the Vue example', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#project')
  const overview = page.getByRole('tab', { name: '进度概览' })
  await overview.focus()
  await overview.press('ArrowRight')
  const stages = page.getByRole('tabpanel', { name: '赛段日志' })
  await expect(stages.locator('[aria-current="step"]')).toContainText('穿过丘陵')
  await page.keyboard.press('End')
  const usage = page.getByRole('tabpanel', { name: '组件用法' })
  await usage.getByRole('button', { name: '复制代码' }).click()
  await expect(usage.getByRole('status')).toHaveText('已复制')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(await usage.locator('code').textContent())
})

test('select code for manual copying on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('denied') } } })
  })
  await page.goto('/#project')
  await page.getByRole('tab', { name: '组件用法' }).click()
  await page.getByRole('button', { name: '复制代码' }).click()
  await expect(page.getByRole('status')).toHaveText('请手动复制')
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(await page.locator('pre code').textContent())
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
})
