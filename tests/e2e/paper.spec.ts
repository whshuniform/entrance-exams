import { test, expect, type Locator } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

async function top(locator: Locator) {
  const box = await locator.boundingBox()
  if (!box) throw new Error('element not visible')
  return box.y
}

test.describe('題型標示跟試題 PDF 一樣', () => {
  test('國綜第一頁_部分與題型標題和說明_應在題目前', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const order = [
      page.getByRole('heading', { name: '第壹部分、選擇題（占76分）' }),
      page.getByRole('heading', { name: '一、單選題（占48分）' }),
      page.getByText('說明：第1題至第24題，每題2分。'),
      quiz.question('115-chinese-1'),
    ]
    const tops = []
    for (const locator of order) tops.push(await top(locator))

    expect(tops).toEqual([...tops].sort((a, b) => a - b))
  })

  test('同一題型的後面幾頁_不重複標題_多選題第一頁才有多選標題', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.showQuestion('115-chinese-2')
    await expect(page.getByRole('heading', { name: /單選題|多選題|部分/ })).toHaveCount(0)

    await quiz.showQuestion('115-chinese-25')
    await expect(page.getByRole('heading', { name: '二、多選題（占28分）' })).toBeVisible()
    await expect(page.getByText('說明：第25題至第31題，每題4分。')).toBeVisible()
    await expect(page.getByRole('heading', { name: /部分/ })).toHaveCount(0)
  })

  test('數學A第一頁_部分與題型標題和說明_應在題目前', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'math-a' })

    const order = [
      page.getByRole('heading', { name: '第壹部分、選擇（填）題（占85分）' }),
      page.getByRole('heading', { name: '一、單選題（占30分）' }),
      page.getByText('說明：第1題至第6題，每題5分。'),
      quiz.question('115-mathA-1'),
    ]
    const tops = []
    for (const locator of order) tops.push(await top(locator))

    expect(tops).toEqual([...tops].sort((a, b) => a - b))
  })

  test('題目卡片_不再貼單選多選標籤', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await expect(page.locator('article[data-test^="question-"]').first()).toBeVisible()
    await expect(page.locator('article[data-test^="question-"]').filter({ hasText: /單選|多選/ })).toHaveCount(0)
  })
})

async function boxOf(locator: Locator) {
  const box = await locator.boundingBox()
  if (!box) throw new Error('element not visible')
  return box
}

test.describe('英文填空題', () => {
  test('填空線_整條在同一行_不會被拆成兩半', async ({ page }) => {
    const quiz = new QuizPage(page)
    // 109 年第 1 題的填空線在手機寬度剛好落在行尾
    await quiz.goto({ subject: 'english', years: [109] })

    const blank = quiz.stem('109-english-1').getByTestId('blank')
    await expect(blank).toHaveText('＿＿＿＿')
    expect(await blank.evaluate(element => element.getClientRects().length)).toBe(1)
  })
})

test.describe('題號與選項排法跟試題 PDF 一樣', () => {
  for (const id of ['115-chinese-1', '115-chinese-25', '115-mathA-1']) {
    test(`${id}_題目接在題號後面同一行_電腦選項對齊題目_手機選項靠左`, async ({ page }) => {
      const quiz = new QuizPage(page)
      await quiz.goto({ subject: id.includes('mathA') ? 'math-a' : 'chinese' })
      await quiz.showQuestion(id)

      const number = await boxOf(quiz.question(id).getByTestId('number'))
      const stem = await boxOf(quiz.stem(id))
      // 題號的中線落在題目第一行內，且題目在題號右邊
      expect(number.y + number.height / 2).toBeGreaterThan(stem.y)
      expect(number.y + number.height / 2).toBeLessThan(stem.y + 40)
      expect(stem.x).toBeGreaterThanOrEqual(number.x + number.width - 1)

      // 電腦：選項（含框框）從題目第一個字的位置開始，像原卷的縮排
      // 手機：選項靠左，和題號切齊，不留左邊空白
      const option = await boxOf(quiz.option(id, quiz.firstOptionKey(id)).getByTestId('option'))
      const isPhone = page.viewportSize()!.width < 768
      expect(Math.abs(option.x - (isPhone ? number.x : stem.x))).toBeLessThan(2)
    })
  }

  test('選項之間_間距不超過 4px', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const rows = []
    for (const key of ['A', 'B', 'C', 'D']) rows.push(await boxOf(quiz.option('115-chinese-1', key).getByTestId('option')))
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i]!.y - (rows[i - 1]!.y + rows[i - 1]!.height)).toBeLessThanOrEqual(4.5)
    }
  })
})
