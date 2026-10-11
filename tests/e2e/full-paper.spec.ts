import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('完整考卷', () => {
  test('115國綜第一頁_原卷第2頁的第1到5題都在_題目是文字', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    expect(await quiz.currentIds()).toEqual(['115-chinese-1', '115-chinese-2', '115-chinese-3', '115-chinese-4', '115-chinese-5'])
    await expect(quiz.question('115-chinese-3').getByTestId('stem')).toBeVisible()
    await expect(page.getByTestId('question-image')).toHaveCount(0)
  })

  test('題組_文章印在第一題前面_同組後面的題目不重印', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.showQuestion('115-chinese-6')
    await expect(quiz.question('115-chinese-6').getByTestId('lead')).toContainText('臺灣杉')
    await expect(quiz.question('115-chinese-7').getByTestId('lead')).toHaveCount(0)
  })

  test('數學_算式用 KaTeX 排版', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'math-a' })

    await expect(quiz.question('115-mathA-3').locator('.katex').first()).toBeVisible()
  })

  test('整份考卷_作答_交卷後批改', async ({ page }) => {
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
    await expect(quiz.question('115-english-21').getByTestId('lead').getByTestId('slot').first()).toHaveText('21')
    await expect(quiz.question('115-english-22').getByTestId('option')).toHaveCount(10)
  })

  test('手機寬度_題目和表格不超出畫面', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
})
