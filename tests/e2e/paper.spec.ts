import { test, expect, type Locator } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

async function top(locator: Locator) {
  const box = await locator.boundingBox()
  if (!box) throw new Error('element not visible')
  return box.y
}

test.describe('題型標示跟試題 PDF 一樣', () => {
  test('國綜_部分與題型標題和說明_應依序出現在題目前', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const order = [
      page.getByRole('heading', { name: '第壹部分、選擇題（占76分）' }),
      page.getByRole('heading', { name: '一、單選題（占48分）' }),
      page.getByText('說明：第1題至第24題，每題2分。'),
      quiz.question('115-chinese-1'),
      quiz.question('115-chinese-5'),
      page.getByRole('heading', { name: '二、多選題（占28分）' }),
      page.getByText('說明：第25題至第31題，每題4分。'),
      quiz.question('115-chinese-25'),
    ]
    const tops = []
    for (const locator of order) tops.push(await top(locator))

    expect(tops).toEqual([...tops].sort((a, b) => a - b))
  })

  test('數學A_部分與題型標題和說明_應出現在題目前', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

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
