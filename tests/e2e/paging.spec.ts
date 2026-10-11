import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('像真實試卷一樣翻頁', () => {
  test('每頁題數跟原卷PDF一樣_原卷第2頁的第1、2、5題排在同一頁', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    // 115 國綜原卷第 2 頁是第 1–5 題（網站收第 1、2、5 題），第 25 題在第 8 頁、第 26 題在第 9 頁
    await expect(page.locator('article[data-test^="question-"]')).toHaveCount(3)
    for (const id of ['115-chinese-1', '115-chinese-2', '115-chinese-5']) await expect(quiz.question(id)).toBeVisible()
    await expect(page.getByTestId('running-header')).toContainText('國語文綜合能力測驗')
    await expect(page.getByTestId('running-header')).toContainText('第 1 頁 共 3 頁')
    // 段落標題只印在段落開頭那題前面
    await expect(page.getByRole('heading', { name: '一、單選題（占48分）' })).toHaveCount(1)
    // 上一頁回到試卷最前面的作答注意事項
    await expect(quiz.prevButton).toBeEnabled()
  })

  test('下一頁和上一頁_應翻到相鄰題目且答案保留', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.pick('115-chinese-1', 'C')

    await quiz.next()
    await expect(quiz.question('115-chinese-25')).toBeVisible()
    await expect(quiz.question('115-chinese-1')).toHaveCount(0)
    await expect(page.getByTestId('running-header')).toContainText('第 2 頁 共 3 頁')

    await quiz.prev()
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()
  })

  test('最後一頁_沒有下一頁只有交卷批改', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.showQuestion('115-chinese-26')

    await expect(page.getByTestId('running-header')).toContainText('第 3 頁 共 3 頁')
    await expect(quiz.nextButton).toBeHidden()
    await expect(quiz.submitButton).toBeVisible()
  })

  test('數學A試卷_頁首寫數學A和自己的頁數', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'math-a' })

    await expect(page.getByTestId('running-header')).toContainText('115年學測　數學A')
    await expect(page.getByTestId('running-header')).toContainText('第 1 頁 共 1 頁')
    await expect(quiz.submitButton).toBeVisible()
  })

  test('翻頁後再翻回來_計算紙與筆跡應保留', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')
    const scratch = await quiz.openScratch('115-chinese-1')
    await quiz.scribble(scratch)

    await quiz.next()
    await quiz.prev()

    await expect(scratch).toBeVisible()
    expect(await quiz.inkPixels('115-chinese-1', scratch)).toBeGreaterThan(0)
  })

  test('交卷後_應翻到成績頁且可翻回去看批改', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.submit()
    await expect(quiz.pager).toHaveAttribute('data-sheet', 'result')

    await quiz.prev()
    await expect(quiz.question('115-chinese-26').getByTestId('question-score')).toBeVisible()
  })

  test('英文詞彙題_原卷第2頁的十題排在同一頁', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'english' })

    expect(await quiz.currentIds()).toEqual(Array.from({ length: 10 }, (_, i) => `115-english-${i + 1}`))
    await quiz.next()
    expect(await quiz.currentIds()).toEqual(Array.from({ length: 5 }, (_, i) => `115-english-${i + 11}`))
  })

  test('翻頁_新一頁的頁首不被固定的header蓋住', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    await quiz.next()

    const header = (await page.getByTestId('app-header').boundingBox())!
    const running = (await page.getByTestId('running-header').boundingBox())!
    expect(running.y).toBeGreaterThanOrEqual(header.y + header.height - 1)
  })

test.describe('作答頁上方', () => {
  test('header標題_顯示年份和科目', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.openCover()

    await expect(page.getByTestId('app-header').getByRole('heading')).toHaveText('115年 國語文綜合能力測驗')
  })

  test('隨機抽題的header標題_顯示所選年度範圍', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.openCover({ subject: 'english', mode: 'random', years: [109, 110, 111], count: 5 })

    await expect(page.getByTestId('app-header').getByRole('heading')).toHaveText('109–111年 英文')
  })

  test('說明和小技巧_只在第一頁顯示', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.openCover()
    await expect(page.getByTestId('quiz-intro')).toBeVisible()
    await expect(page.getByTestId('quiz-intro')).toContainText('小技巧')

    await quiz.startButton.click()
    await expect(quiz.question('115-chinese-1')).toBeVisible()
    await expect(page.getByTestId('quiz-intro')).toHaveCount(0)

    await quiz.next()
    await expect(page.getByTestId('quiz-intro')).toHaveCount(0)
  })
})
