import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('作答頁成績單', () => {
  test('只答對5題_交卷後應以沒作答的題全錯到全對給級分與名次範圍', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-1', 'C')
    await quiz.pick('115-chinese-2', 'A')
    await quiz.pick('115-chinese-5', 'C')
    await quiz.pick('115-chinese-25', 'BE')
    await quiz.pick('115-chinese-26', 'ABD')
    await quiz.submit()

    const chinese = quiz.report('國語文綜合能力測驗')
    // 選擇題共 80 分，非選擇題 20 分不在網站上：整卷 14～34 分
    await expect(chinese.getByTestId('report-score')).toContainText('14 / 80')
    await expect(chinese.getByTestId('report-score')).toContainText('14～34')
    await expect(chinese.getByTestId('report-level')).toHaveText('3～7 級分')
    await expect(chinese.getByTestId('report-rank')).toContainText('第 103,473～117,401 名')
    // 一次考一科，成績單只有這一科
    await expect(quiz.report('數學A')).toHaveCount(0)
  })

  test('數學A只答對第1題_成績單只有數學A的級分與名次範圍', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'math-a' })

    await quiz.pick('115-mathA-1', '2')
    await quiz.submit()

    const math = quiz.report('數學A')
    // 網站上的數學A選擇題共 63 分（選填、非選擇題不在網站上）：整卷 5～42 分
    await expect(math.getByTestId('report-score')).toContainText('5 / 63')
    await expect(math.getByTestId('report-level')).toHaveText('1～8 級分')
    await expect(math.getByTestId('report-rank')).toContainText('第 36,214～90,559 名')
    await expect(quiz.report('國語文綜合能力測驗')).toHaveCount(0)
  })

  test('多選錯一個選項_應得部分分數給級分範圍並可重新作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-25', 'B')
    await quiz.submit()

    const chinese = quiz.report('國語文綜合能力測驗')
    await expect(chinese.getByTestId('report-score')).toContainText('2.4 / 80')
    await expect(chinese.getByTestId('report-score')).toContainText('2.4～22.4')
    await expect(chinese.getByTestId('report-level')).toHaveText('1～5 級分')
    await expect(chinese.getByTestId('report-rank')).toContainText('第 113,210～118,018 名')

    await quiz.showQuestion('115-chinese-25')
    await expect(quiz.question('115-chinese-25').getByTestId('question-score')).toHaveText('+2.4')

    await quiz.toResult()
    await quiz.resetButton.click()
    await expect(quiz.resultSheet).toBeHidden()
    await expect(quiz.pager).toHaveAttribute('data-sheet', /\b115-chinese-1\b/)
    await expect(quiz.option('115-chinese-1', 'A').locator('input')).not.toBeChecked()
  })

  test('手機寬度_頁面不應出現水平捲動', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

    expect(overflow).toBeLessThanOrEqual(0)
  })
})
