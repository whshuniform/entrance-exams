import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('試作作答頁', () => {
  test('全部答對_交卷後應顯示各科15級分與全國名次', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-1', 'C')
    await quiz.pick('115-chinese-2', 'A')
    await quiz.pick('115-chinese-5', 'C')
    await quiz.pick('115-chinese-25', 'BE')
    await quiz.pick('115-chinese-26', 'ABD')
    await quiz.pick('115-mathA-1', '2')
    await quiz.submit()

    const chinese = quiz.report('國語文綜合能力測驗')
    await expect(chinese.getByTestId('report-score')).toContainText('14 / 14')
    await expect(chinese.getByTestId('report-level')).toHaveText('15 級分')
    await expect(chinese.getByTestId('report-rank')).toContainText('第 1～2,563 名')
    const math = quiz.report('數學A')
    await expect(math.getByTestId('report-level')).toHaveText('15 級分')
    await expect(math.getByTestId('report-rank')).toContainText('第 1～1,112 名')
  })

  test('多選錯一個選項_應得部分分數換算級分並可重新作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-25', 'B')
    await quiz.submit()

    const chinese = quiz.report('國語文綜合能力測驗')
    await expect(chinese.getByTestId('report-score')).toContainText('2.4 / 14')
    await expect(chinese.getByTestId('report-level')).toHaveText('4 級分')
    await expect(chinese.getByTestId('report-rank')).toContainText('第 115,251～116,472 名')

    await quiz.showQuestion('115-chinese-25')
    await expect(quiz.question('115-chinese-25').getByTestId('question-score')).toHaveText('+2.4')

    await quiz.showQuestion('115-mathA-1')
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
