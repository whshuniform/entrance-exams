import { test, expect } from '@playwright/test'
import { MenuPage } from './pages/MenuPage'
import { HomePage } from './pages/HomePage'

test.describe('首頁選考試 → 考試頁選作試題或背單字', () => {
  test('首頁_只列學測分科會考_還沒內容的標準備中不能點', async ({ page }) => {
    const menu = new MenuPage(page)
    await menu.goto()

    await expect(page.getByTestId('menu').getByRole('link')).toHaveCount(1)
    await expect(menu.item('gsat')).toContainText('大學學測')
    for (const id of ['ast', 'cap']) {
      await expect(menu.item(id)).toContainText('準備中')
      await expect(menu.item(id)).toHaveAttribute('aria-disabled', 'true')
    }
    await expect(page.getByTestId('quiz-setup')).toHaveCount(0)
  })

  test('首頁_header標題是考古題_沒有返回鍵_網頁標題是考古題', async ({ page }) => {
    const menu = new MenuPage(page)
    await menu.goto()

    await expect(menu.header.getByRole('heading', { level: 1 })).toHaveText('考古題')
    await expect(menu.backLink).toHaveCount(0)
    await expect(page).toHaveTitle('考古題')
  })

  test('點大學學測_進到學測頁_header標題是大學學測_網頁標題是全名', async ({ page }) => {
    const menu = new MenuPage(page)
    await menu.goto()

    await menu.item('gsat').click()

    await expect(page).toHaveURL(/\/gsat$/)
    await expect(page).toHaveTitle('大學學科能力測驗')
    await expect(menu.header.getByRole('heading', { level: 1 })).toHaveText('大學學測')
    await expect(menu.item('quiz')).toContainText('作試題')
    await expect(menu.item('vocab')).toContainText('背單字')
  })

  test('學測頁點作試題_才出現作答方式科目等選項', async ({ page }) => {
    const menu = new MenuPage(page)
    const home = new HomePage(page)
    await menu.goto('/gsat')

    await menu.item('quiz').click()

    await expect(page).toHaveURL(/\/gsat\/practice$/)
    await expect(page.getByTestId('quiz-setup')).toHaveAttribute('data-ready', 'true')
    await expect(menu.header.getByRole('heading', { level: 1 })).toHaveText('作試題')
    await expect(page).toHaveTitle('大學學科能力測驗 作試題')
    await expect(home.mode('full')).toBeVisible()
    await expect(home.subject('chinese')).toBeVisible()
  })

  test('作試題頁_按返回大學學測_回到學測頁', async ({ page }) => {
    const menu = new MenuPage(page)
    await new HomePage(page).goto()

    await expect(menu.backLink).toHaveAccessibleName('返回大學學測')
    await menu.backLink.click()

    await expect(page).toHaveURL(/\/gsat$/)
    await expect(menu.item('quiz')).toBeVisible()
  })

  test('學測頁_按返回首頁_回到選考試', async ({ page }) => {
    const menu = new MenuPage(page)
    await menu.goto('/gsat')

    await expect(menu.backLink).toHaveAccessibleName('返回首頁')
    await menu.backLink.click()

    await expect(page).toHaveURL(/\/$/)
    await expect(menu.item('gsat')).toBeVisible()
  })

  test('header固定在畫面最上方_往下捲也看得到', async ({ page }) => {
    const menu = new MenuPage(page)
    await new HomePage(page).goto()

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const box = (await menu.header.boundingBox())!
    expect(box.y).toBeLessThanOrEqual(1)
    await expect(menu.backLink).toBeInViewport()
  })

  test('考試頁_手機寬度不應出現水平捲動', async ({ page }) => {
    const menu = new MenuPage(page)
    for (const path of ['/', '/gsat']) {
      await menu.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    }
  })
})
