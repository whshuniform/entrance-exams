import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('試作作答頁', () => {
  test('全部答對_交卷後應顯示滿分', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-1', 'C')
    await quiz.pick('115-chinese-2', 'A')
    await quiz.pick('115-chinese-5', 'C')
    await quiz.pick('115-chinese-25', 'BE')
    await quiz.pick('115-chinese-26', 'ABD')
    await quiz.submitButton.click()

    await expect(quiz.totalScore).toHaveText('14')
  })

  test('多選錯一個選項_應得部分分數並可重新作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.pick('115-chinese-25', 'B')
    await quiz.submitButton.click()

    await expect(quiz.question('115-chinese-25').getByTestId('question-score')).toHaveText('+2.4')
    await expect(quiz.totalScore).toHaveText('2.4')

    await quiz.resetButton.click()
    await expect(quiz.totalScore).toBeHidden()
  })

  test('手機寬度_頁面不應出現水平捲動', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

    expect(overflow).toBeLessThanOrEqual(0)
  })
})
