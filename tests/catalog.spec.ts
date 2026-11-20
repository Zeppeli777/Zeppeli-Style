import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

test('every exported component has a rendered example and portable source', async ({ page }) => {
  const entry = readFileSync('src/index.ts', 'utf8')
  const names = Array.from(entry.matchAll(/default as (Zp\w+)/g), match => match[1])
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/#catalog')
  const list = page.getByRole('list', { name: '组件列表' })
  await expect(list.getByRole('button')).toHaveCount(names.length)
  for (const name of names) {
    await list.getByRole('button', { name: new RegExp(name + '$') }).click()
    await expect(page.locator('.catalog-preview > *').first()).toBeVisible()
    const source = page.locator('.catalog-detail > .zp-code-block pre')
    await expect(source).toContainText('import { ' + name + " } from 'zeppeli-style'")
    await expect(source).toContainText("import 'zeppeli-style/style.css'")
  }
  expect(errors).toEqual([])
})

test('filter, recover from zero results and validate a field at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 })
  await page.goto('/#catalog')
  const search = page.getByRole('searchbox', { name: '搜索组件' })
  const category = page.getByRole('combobox', { name: '分类' })
  await search.fill('zptextfield')
  const title = page.getByLabel('赛段名称')
  await title.fill('')
  await expect(title).toHaveAttribute('aria-invalid', 'true')
  await expect(title).toHaveAccessibleDescription('请输入赛段名称')
  await title.fill('终点')
  await expect(title).not.toHaveAttribute('aria-invalid')
  await category.selectOption('导航')
  await expect(page.getByText('没有符合条件的组件')).toBeVisible()
  await page.getByRole('button', { name: '显示全部组件' }).click()
  await expect(search).toBeFocused()
  await expect(category).toHaveValue('')
  await expect(page.getByRole('button', { name: '清除筛选' })).toBeDisabled()
  await search.fill('图标按钮')
  const flag = page.getByRole('button', { name: '标记赛段', exact: true })
  await flag.press('Enter')
  await expect(page.getByRole('button', { name: '取消标记' })).toHaveAttribute('aria-pressed', 'true')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
})
