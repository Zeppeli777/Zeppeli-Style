import { expect, test, type Locator } from '@playwright/test'

async function skipWithoutWebGL(ball: Locator) {
  try {
    await ball.waitFor({ timeout: 8000 })
  } catch {
    test.skip(true, 'WebGL unavailable')
  }
}

test('hero steel ball idles with a golden spin animation', async ({ page }) => {
  await page.goto('/')
  const ball = page.locator('canvas.zp-ball-ready')
  await skipWithoutWebGL(ball)
  await expect(page.getByText('拖动旋转 · 点按掷出回旋')).toBeVisible()
  const first = await ball.screenshot()
  await page.waitForTimeout(450)
  const second = await ball.screenshot()
  expect(first.equals(second)).toBe(false)
})

test('tap and keyboard throw the spin while reduced motion stays still', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const ball = page.locator('canvas.zp-ball-ready')
  await skipWithoutWebGL(ball)
  const still = await ball.screenshot()
  await page.waitForTimeout(350)
  expect((await ball.screenshot()).equals(still)).toBe(true)
  await ball.click()
  await page.waitForTimeout(200)
  expect((await ball.screenshot()).equals(still)).toBe(false)
  await ball.focus()
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('Enter')
  await expect(ball).toHaveAttribute('aria-label', /掷出回旋/)
})
