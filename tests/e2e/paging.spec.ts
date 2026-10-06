import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('像真實試卷一樣翻頁', () => {
  test('一頁一題_第一頁只有第1題且頁首寫第幾頁', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await expect(page.locator('article[data-test^="question-"]')).toHaveCount(1)
    await expect(quiz.question('115-chinese-1')).toBeVisible()
    await expect(page.getByTestId('running-header')).toContainText('國語文綜合能力測驗')
    await expect(page.getByTestId('running-header')).toContainText('第 1 頁 共 5 頁')
    await expect(quiz.prevButton).toBeDisabled()
  })

  test('下一頁和上一頁_應翻到相鄰題目且答案保留', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.pick('115-chinese-1', 'C')

    await quiz.next()
    await expect(quiz.question('115-chinese-2')).toBeVisible()
    await expect(quiz.question('115-chinese-1')).toHaveCount(0)
    await expect(page.getByTestId('running-header')).toContainText('第 2 頁 共 5 頁')

    await quiz.prev()
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()
  })

  test('最後一頁_沒有下一頁只有交卷批改', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.showQuestion('115-mathA-1')

    await expect(page.getByTestId('running-header')).toContainText('數學A')
    await expect(page.getByTestId('running-header')).toContainText('第 1 頁 共 1 頁')
    await expect(quiz.nextButton).toBeHidden()
    await expect(quiz.submitButton).toBeVisible()
  })

  test('翻頁後再翻回來_計算紙與筆跡應保留', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')
    const scratch = await quiz.openScratch('115-mathA-1')
    await quiz.scribble(scratch)

    await quiz.prev()
    await quiz.next()

    await expect(scratch).toBeVisible()
    expect(await quiz.inkPixels('115-mathA-1', scratch)).toBeGreaterThan(0)
  })

  test('交卷後_應翻到成績頁且可翻回去看批改', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.submit()
    await expect(quiz.pager).toHaveAttribute('data-question', 'result')

    await quiz.prev()
    await expect(quiz.question('115-mathA-1').getByTestId('question-score')).toBeVisible()
  })
})
