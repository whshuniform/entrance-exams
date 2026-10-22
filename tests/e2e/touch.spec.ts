import { test, expect, type Locator } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

/** 2rem：手指好點的框框大小 */
const MIN_BOX = 31.5
/** 3rem：整列可點範圍的高度 */
const MIN_ROW = 47.5
/** 26rem：計算紙高度 */
const MIN_SCRATCH = 415

async function boxOf(locator: Locator) {
  await locator.scrollIntoViewIfNeeded()
  const box = await locator.boundingBox()
  if (!box) throw new Error('element not visible')
  return box
}

test.describe('手指好點好寫', () => {
  test('單選題框框_至少 2rem_整列至少 3rem 高', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const radio = await boxOf(quiz.option('115-chinese-1', 'A').locator('input'))
    expect(radio.width).toBeGreaterThanOrEqual(MIN_BOX)
    expect(radio.height).toBeGreaterThanOrEqual(MIN_BOX)

    const row = await boxOf(quiz.option('115-chinese-1', 'A').getByTestId('option'))
    expect(row.height).toBeGreaterThanOrEqual(MIN_ROW)
  })

  test('多選題框框_至少 2rem_整列至少 3rem 高', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.showQuestion('115-chinese-25')

    const checkbox = await boxOf(quiz.option('115-chinese-25', 'A').locator('input'))
    expect(checkbox.width).toBeGreaterThanOrEqual(MIN_BOX)
    expect(checkbox.height).toBeGreaterThanOrEqual(MIN_BOX)

    const row = await boxOf(quiz.option('115-chinese-25', 'A').getByTestId('option'))
    expect(row.height).toBeGreaterThanOrEqual(MIN_ROW)
  })

  test('點選項那一列的右上角_也能作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const label = quiz.option('115-chinese-1', 'C').getByTestId('option')
    const row = await boxOf(label)
    await label.click({ position: { x: row.width - 4, y: 4 } })

    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()
  })

  test('計算紙_至少 26rem 高', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const scratch = await boxOf(await quiz.openScratch('115-chinese-1'))
    expect(scratch.height).toBeGreaterThanOrEqual(MIN_SCRATCH)
  })
})
