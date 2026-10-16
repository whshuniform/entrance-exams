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

  for (const [subject, id] of [['math-b', '115-mathB-1'], ['social', '115-social-1'], ['science', '115-science-1']] as const) {
    test(`${subject}_115整份考卷第一題是文字_交卷後有級分`, async ({ page }) => {
      const quiz = new QuizPage(page)
      await quiz.goto({ subject })

      await expect(quiz.stem(id)).toBeVisible()
      await expect(page.getByTestId('question-image')).toHaveCount(0)
      await quiz.submit()
      await expect(quiz.resultSheet).toContainText('級分')
    })
  }

  test('題組文章在前一頁_後面的題目按看題組文章_跳出文章不用翻頁', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'social' })

    await quiz.showQuestion('115-social-32')
    expect(await quiz.currentIds()).not.toContain('115-social-30')
    await quiz.question('115-social-32').getByTestId('open-lead').click()

    await expect(quiz.leadDialog).toContainText('在花東一帶，有些土地原本是臺灣原住民族祖先生活的傳統領域')
    await page.keyboard.press('Escape')
    await expect(quiz.leadDialog).toBeHidden()
    await quiz.showQuestion('115-social-30')
    await expect(quiz.question('115-social-30').getByTestId('open-lead')).toHaveCount(0)
  })

  test('自然_化學式用 KaTeX 排版', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'science' })

    await expect(page.locator('[data-test^="question-115-science-"] .katex').first()).toBeVisible()
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

  test('分科物理_115整份考卷第一題是文字_交卷後有60級分與名次', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ exam: 'ast', subject: 'physics' })

    await expect(quiz.stem('ast-115-physics-1')).toBeVisible()
    await quiz.submit()
    await expect(quiz.resultSheet).toContainText('級分')
    await expect(quiz.resultSheet).toContainText('名')
  })

  test('會考國文_115整份考卷第一題是文字_交卷後看標示和約前幾%', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ exam: 'cap', subject: 'chinese' })

    await expect(quiz.stem('cap-115-chinese-1')).toBeVisible()
    await quiz.submit()
    await expect(quiz.resultSheet.getByTestId('report-level')).toHaveText('C')
    await expect(quiz.resultSheet.getByTestId('report-rank')).toContainText('約前')
  })
})
