import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('看板娘 Live2D Haru', () => {
  test('首頁_看板娘打招呼_點她換一句話', async ({ page }) => {
    await page.goto('/')
    const girl = page.getByTestId('mascot-girl')
    const bubble = page.getByTestId('mascot-bubble')

    await expect(girl).toHaveAttribute('data-state', 'ready')
    await expect(girl.locator('canvas')).toBeVisible()
    const first = await bubble.textContent()
    await girl.click()

    await expect(bubble).not.toHaveText(first ?? '')
  })

  test('收起看板娘_重新整理仍收起_按叫她出來又出現', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('mascot-hide').click()
    await expect(page.getByTestId('mascot-girl')).toHaveCount(0)

    await page.reload()
    await expect(page.getByTestId('mascot-show')).toBeVisible()
    await expect(page.getByTestId('mascot-girl')).toHaveCount(0)

    await page.getByTestId('mascot-show').click()
    await expect(page.getByTestId('mascot-girl')).toBeVisible()
  })

  test('考試頁也有看板娘_作答頁沒有', async ({ page }) => {
    await page.goto('/gsat')
    await expect(page.getByTestId('mascot-girl')).toBeVisible()

    await new QuizPage(page).goto()
    await expect(page.getByTestId('mascot-girl')).toHaveCount(0)
  })

  test('頁尾_附上Live2D官方範例資料聲明', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('This content uses sample data owned and copyrighted by Live2D Inc.')).toBeVisible()
  })

  test('手機寬度_看板娘不造成水平捲動', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('mascot-girl')).toBeVisible()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

    expect(overflow).toBeLessThanOrEqual(0)
  })
})
