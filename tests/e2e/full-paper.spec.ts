import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('完整考卷', () => {
  test('115國綜第一頁_原卷第2頁的第1到5題都在_截圖題目有載入', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    expect(await quiz.currentIds()).toEqual(['115-chinese-1', '115-chinese-2', '115-chinese-3', '115-chinese-4', '115-chinese-5'])
    const image = quiz.question('115-chinese-3').getByTestId('question-image')
    await expect(image).toBeVisible()
    expect(await image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
  })

  test('截圖題目_點作答圈作答_交卷後批改', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-3', 'D')
    await expect(quiz.option('115-chinese-3', 'D').locator('input')).toBeChecked()
    await quiz.submit()
    await quiz.showQuestion('115-chinese-3')
    await expect(quiz.question('115-chinese-3').getByTestId('question-score')).toHaveText('+2')
  })

  test('英文文意選填_文章和十個選項的作答圈', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'english' })

    await quiz.showQuestion('115-english-22')
    await expect(quiz.question('115-english-21').getByTestId('question-image')).toBeVisible()
    await expect(quiz.question('115-english-22').getByTestId('option')).toHaveCount(10)
  })

  test('手機寬度_截圖題目不超出畫面', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
})
