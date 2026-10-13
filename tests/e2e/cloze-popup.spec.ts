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
})
