import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

// YZ：英文綜合測驗的選項離文章太遠，點文章裡的題號就跳出視窗直接看選項作答
test.describe('點文章裡的題號作答', () => {
  test('綜合測驗_點題號_跳出選項_選了就關閉並作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'english' })
    await quiz.showQuestion('115-english-11')

    const slot = quiz.question('115-english-11').getByTestId('lead').locator('[data-slot="12"]')
    await slot.click()

    const dialog = quiz.slotDialog
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText('12')
    await expect(dialog.getByTestId('option-text')).toHaveText(['demonstrate', 'immigrate', 'communicate', 'manipulate'])

    await dialog.getByTestId('option-B').locator('label').click()

    await expect(dialog).toBeHidden()
    await expect(slot.getByTestId('slot-answer')).toHaveText('B')
    await expect(quiz.option('115-english-12', 'B').locator('input')).toBeChecked()
  })

  test('文意選填_點題號_視窗裡看得到題組的選項文字', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'english' })
    await quiz.showQuestion('115-english-21')

    await quiz.question('115-english-21').getByTestId('lead').locator('[data-slot="21"]').click()

    await expect(quiz.slotDialog.getByTestId('option-text')).toHaveCount(10)
    await expect(quiz.slotDialog).toContainText('dramatic')
  })

  test('開著原子筆_點題號_照樣跳出選項', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'english' })
    await quiz.showQuestion('115-english-11')
    await quiz.useTool('pen')

    await quiz.question('115-english-11').getByTestId('lead').locator('[data-slot="13"]').click()

    await expect(quiz.slotDialog).toBeVisible()
  })

  test('空格上的答案_顏色和粗細跟題號不同', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'english' })
    await quiz.showQuestion('115-english-11')
    const slot = quiz.question('115-english-11').getByTestId('lead').locator('[data-slot="12"]')
    await slot.click()
    await quiz.slotDialog.getByTestId('option-B').locator('label').click()

    const style = (el: Element) => ({ color: getComputedStyle(el).color, weight: getComputedStyle(el).fontWeight })
    const number = await slot.evaluate(style)
    const answer = await slot.getByTestId('slot-answer').evaluate(style)
    expect(answer.color).not.toBe(number.color)
    expect(answer.weight).not.toBe(number.weight)
  })

  test('文意選填_別題選走的選項_加刪除線提醒', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'english' })
    await quiz.showQuestion('115-english-21')
    const lead = quiz.question('115-english-21').getByTestId('lead')

    await lead.locator('[data-slot="21"]').click()
    await quiz.slotDialog.getByTestId('option-C').locator('label').click()
    await lead.locator('[data-slot="22"]').click()

    const taken = quiz.slotDialog.getByTestId('option-C').getByTestId('option-text')
    await expect(taken).toHaveCSS('text-decoration-line', 'line-through')
    await expect(quiz.slotDialog.getByTestId('option-D').getByTestId('option-text')).not.toHaveCSS('text-decoration-line', 'line-through')
    // 下面的作答圈也提醒
    await page.keyboard.press('Escape')
    await expect(quiz.slotDialog).toBeHidden()
    await expect(quiz.option('115-english-22', 'C')).toHaveAttribute('data-taken', 'true')
  })
})
