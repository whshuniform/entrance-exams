import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('試作作答頁', () => {
  test('試作全對_交卷後應以沒考的題全錯到全對給級分與名次範圍', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-1', 'C')
    await quiz.pick('115-chinese-2', 'A')
    await quiz.pick('115-chinese-5', 'C')
    await quiz.pick('115-chinese-25', 'BE')
    await quiz.pick('115-chinese-26', 'ABD')
    await quiz.submit()

    const chinese = quiz.report('國語文綜合能力測驗')
    await expect(chinese.getByTestId('report-score')).toContainText('14 / 14')
    await expect(chinese.getByTestId('report-score')).toContainText('14～100')
    await expect(chinese.getByTestId('report-level')).toHaveText('3～15 級分')
    await expect(chinese.getByTestId('report-rank')).toContainText('第 1～117,401 名')
    // 一次考一科，成績單只有這一科
    await expect(quiz.report('數學A')).toHaveCount(0)
  })

  test('數學A試作全對_成績單只有數學A的級分與名次範圍', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'math-a' })

    await quiz.pick('115-mathA-1', '2')
    await quiz.submit()

    const math = quiz.report('數學A')
    await expect(math.getByTestId('report-level')).toHaveText('1～15 級分')
    await expect(math.getByTestId('report-rank')).toContainText('第 1～90,559 名')
    await expect(quiz.report('國語文綜合能力測驗')).toHaveCount(0)
  })

  test('多選錯一個選項_應得部分分數給級分範圍並可重新作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-25', 'B')
    await quiz.submit()

    const chinese = quiz.report('國語文綜合能力測驗')
    await expect(chinese.getByTestId('report-score')).toContainText('2.4 / 14')
    await expect(chinese.getByTestId('report-score')).toContainText('2.4～88.4')
    await expect(chinese.getByTestId('report-level')).toHaveText('1～15 級分')
    await expect(chinese.getByTestId('report-rank')).toContainText('第 1～118,018 名')

    await quiz.showQuestion('115-chinese-25')
    await expect(quiz.question('115-chinese-25').getByTestId('question-score')).toHaveText('+2.4')

    await quiz.showQuestion('115-chinese-26')
    await quiz.next()
    await quiz.resetButton.click()
    await expect(quiz.resultSheet).toBeHidden()
    await expect(quiz.pager).toHaveAttribute('data-question', '115-chinese-1')
    await expect(quiz.option('115-chinese-1', 'A').locator('input')).not.toBeChecked()
  })

  test('手機寬度_頁面不應出現水平捲動', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

    expect(overflow).toBeLessThanOrEqual(0)
  })
})
