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
    await quiz.goto()
    await quiz.showQuestion('115-mathA-1')

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
