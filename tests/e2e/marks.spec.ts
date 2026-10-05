import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('作答標記工具', () => {
  test('刪去法_點選項旁的叉叉_選項應被劃掉且可復原', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.eliminate('115-chinese-1', 'B')
    await expect(quiz.option('115-chinese-1', 'B')).toHaveAttribute('data-eliminated', 'true')

    await quiz.eliminate('115-chinese-1', 'B')
    await expect(quiz.option('115-chinese-1', 'B')).not.toHaveAttribute('data-eliminated', 'true')
  })

  test('螢光筆_在題幹上拖曳_應畫出標記且不會選到答案', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.highlighterTool.click()
    await quiz.dragAcrossStem('115-chinese-1')
    await expect(quiz.question('115-chinese-1').getByTestId('stem').locator('mark').first()).toBeVisible()

    // 螢光筆模式下選項暫時鎖住，避免畫線時誤選
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeDisabled()

    await quiz.answerTool.click()
    await quiz.option('115-chinese-1', 'C').locator('label').click()
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()
  })

  test('計算紙_畫線後收起再打開_筆跡應保留', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    const canvas = await quiz.openScratch('115-mathA-1')
    await canvas.scrollIntoViewIfNeeded()
    const box = await canvas.boundingBox()
    if (!box) throw new Error('canvas not visible')
    await page.mouse.move(box.x + 20, box.y + 20)
    await page.mouse.down()
    await page.mouse.move(box.x + 120, box.y + 80, { steps: 10 })
    await page.mouse.up()

    await quiz.question('115-mathA-1').getByTestId('scratch-toggle').click()
    await quiz.question('115-mathA-1').getByTestId('scratch-toggle').click()

    const inked = await quiz.question('115-mathA-1').locator('canvas').evaluate((el: HTMLCanvasElement) => {
      const data = el.getContext('2d')!.getImageData(0, 0, el.width, el.height).data
      return data.some((value, index) => index % 4 === 3 && value > 0)
    })
    expect(inked).toBe(true)
  })
})
