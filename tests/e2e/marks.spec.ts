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

  test('螢光筆_不用切換_在題幹拖曳應畫線且點選項仍可作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.dragAcross(quiz.stem('115-chinese-1'))
    await expect(quiz.stem('115-chinese-1').locator('mark').first()).toBeVisible()

    await quiz.option('115-chinese-1', 'C').locator('label').click()
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()
  })

  test('螢光筆_在選項文字上拖曳_應畫線且不會選到該選項', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.dragAcross(quiz.optionText('115-chinese-2', 'B'), 0.05, 0.7)

    await expect(quiz.optionText('115-chinese-2', 'B').locator('mark').first()).toBeVisible()
    await expect(quiz.option('115-chinese-2', 'B').locator('input')).not.toBeChecked()
  })

  test('螢光筆_同一段再拖一次_應擦掉', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.dragAcross(quiz.stem('115-chinese-1'))
    await quiz.dragAcross(quiz.stem('115-chinese-1'))

    await expect(quiz.stem('115-chinese-1').locator('mark')).toHaveCount(0)
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

test.describe('計算紙手機觸控', () => {
  test.skip(({ isMobile }) => !isMobile, '只有手機需要觸控手勢')

  test('計算紙_一指寫字_兩指上下滑動應捲動頁面且不留筆跡', async ({ page, context }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    const canvas = await quiz.openScratch('115-mathA-1')
    await canvas.scrollIntoViewIfNeeded()
    const box = await canvas.boundingBox()
    if (!box) throw new Error('canvas not visible')
    const cdp = await context.newCDPSession(page)
    const touch = (type: string, points: { x: number, y: number }[]) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points })
    const ink = () => canvas.evaluate((el: HTMLCanvasElement) => {
      const data = el.getContext('2d')!.getImageData(0, 0, el.width, el.height).data
      return data.some((value, index) => index % 4 === 3 && value > 0)
    })

    // 兩指往下滑 → 頁面往上捲
    const scrollBefore = await page.evaluate(() => window.scrollY)
    const x1 = box.x + 60
    const x2 = box.x + 160
    const yStart = box.y + 30
    await touch('touchStart', [{ x: x1, y: yStart }, { x: x2, y: yStart }])
    for (let step = 1; step <= 10; step++) {
      const y = yStart + step * 15
      await touch('touchMove', [{ x: x1, y }, { x: x2, y }])
    }
    await touch('touchEnd', [])

    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(scrollBefore - 50)
    expect(await ink()).toBe(false)

    // 一指寫字
    await canvas.scrollIntoViewIfNeeded()
    const after = await canvas.boundingBox()
    if (!after) throw new Error('canvas not visible')
    await touch('touchStart', [{ x: after.x + 30, y: after.y + 30 }])
    for (let step = 1; step <= 8; step++) {
      await touch('touchMove', [{ x: after.x + 30 + step * 10, y: after.y + 30 + step * 5 }])
    }
    await touch('touchEnd', [])

    expect(await ink()).toBe(true)
  })
})
