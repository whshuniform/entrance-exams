import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('試卷第一頁的作答注意事項', () => {
  test('打開試卷_第一頁是作答注意事項_有作答和繪畫範例圖', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.openCover()

    await expect(quiz.pager).toHaveAttribute('data-question', 'guide')
    await expect(page.getByRole('heading', { name: /作答注意事項/ })).toBeVisible()
    await expect(page.getByRole('img', { name: /作答範例/ })).toBeVisible()
    await expect(page.getByRole('img', { name: /繪畫範例/ })).toBeVisible()
    await expect(page.locator('article[data-test^="question-"]')).toHaveCount(0)
    await expect(quiz.prevButton).toBeDisabled()
  })

  test('按開始作答_翻到第1題_上一頁可回到作答注意事項', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.openCover()

    await quiz.startButton.click()
    await expect(quiz.question('115-chinese-1')).toBeVisible()

    await quiz.prev()
    await expect(quiz.pager).toHaveAttribute('data-question', 'guide')
  })

  test('作答注意事項_手機寬度範例圖不超出畫面', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.openCover()
    const viewport = page.viewportSize()!

    for (const name of [/作答範例/, /繪畫範例/]) {
      const box = await page.getByRole('img', { name }).boundingBox()
      if (!box) throw new Error('example image not visible')
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width)
    }
  })
})
