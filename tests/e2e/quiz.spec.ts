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

test.describe('批改後的選答比例', () => {
  test('交卷後回到題目_應看到全體考生選各選項的比例', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-1', 'A')
    await expect(quiz.question('115-chinese-1').getByTestId('option-stats')).toHaveCount(0)
    await quiz.submit()

    await quiz.showQuestion('115-chinese-1')
    const stats = quiz.question('115-chinese-1').getByTestId('option-stats')
    // 大考中心 115 國文第 1 題：答對 14%，選 A 的人最多（49%）
    await expect(stats.getByTestId('stats-summary')).toHaveText('全體考生 14% 答對')
    await expect(stats.getByTestId('stats-option-A')).toContainText('49%')
    await expect(stats.getByTestId('stats-option-A')).toContainText('你選的')
    await expect(stats.getByTestId('stats-option-C')).toContainText('正解')
  })
})

test.describe('直接看答案', () => {
  test('不用交卷按看答案_每題圈出正解和大家怎麼選_收起後可以繼續作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.revealButton.click()
    await expect(quiz.option('115-chinese-1', 'C')).toHaveAttribute('data-state', 'answer')
    await expect(quiz.question('115-chinese-1').getByTestId('stats-summary')).toHaveText('全體考生 14% 答對')
    await expect(quiz.question('115-chinese-1').getByTestId('question-score')).toHaveCount(0)
    await expect(quiz.revealButton).toHaveText('收起答案')

    await quiz.revealButton.click()
    await expect(quiz.question('115-chinese-1').getByTestId('option-stats')).toHaveCount(0)
    await quiz.pick('115-chinese-1', 'C')
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()
  })
})
