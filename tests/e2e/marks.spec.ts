import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('右下角繪畫工具列', () => {
  test('工具列_固定在右下角由上而下四顆_題目不被擋住', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    const viewport = page.viewportSize()!

    const boxes = []
    for (const name of ['off', 'highlighter', 'pen', 'eraser'] as const) {
      const box = await quiz.tool(name).boundingBox()
      if (!box) throw new Error(`tool ${name} not visible`)
      boxes.push(box)
    }
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i]!.y).toBeGreaterThanOrEqual(boxes[i - 1]!.y + boxes[i - 1]!.height - 1)
      expect(Math.abs(boxes[i]!.x - boxes[0]!.x)).toBeLessThan(2)
    }
    const last = boxes.at(-1)!
    expect(viewport.width - (last.x + last.width)).toBeLessThan(32)
    expect(viewport.height - (last.y + last.height)).toBeLessThan(40)

    const card = await quiz.question('115-chinese-1').boundingBox()
    expect(card!.x + card!.width).toBeLessThanOrEqual(boxes[0]!.x)

    await page.evaluate(() => window.scrollTo(0, 900))
    const afterScroll = await quiz.tool('off').boundingBox()
    expect(afterScroll!.y).toBeCloseTo(boxes[0]!.y, 0)
  })

  test('預設關閉繪畫_拖曳文字不畫線_點選項可作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await expect(quiz.tool('off')).toHaveAttribute('aria-pressed', 'true')

    await quiz.dragAcross(quiz.stem('115-chinese-1'))
    await expect(quiz.stem('115-chinese-1').locator('mark')).toHaveCount(0)

    await quiz.option('115-chinese-1', 'C').locator('label').click()
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()
  })

  test('螢光筆_在題幹拖曳應畫線_點選項不會作答_刪去仍可用', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('highlighter')
    await expect(quiz.tool('highlighter')).toHaveAttribute('aria-pressed', 'true')
    await expect(quiz.tool('off')).toHaveAttribute('aria-pressed', 'false')

    await quiz.dragAcross(quiz.stem('115-chinese-1'))
    await expect(quiz.stem('115-chinese-1').locator('mark').first()).toBeVisible()

    await quiz.option('115-chinese-1', 'C').locator('label').click()
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).not.toBeChecked()

    await quiz.eliminate('115-chinese-1', 'B')
    await expect(quiz.option('115-chinese-1', 'B')).toHaveAttribute('data-eliminated', 'true')
  })

  test('螢光筆_在選項文字上拖曳_應畫線', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('highlighter')

    await quiz.dragAcross(quiz.optionText('115-chinese-2', 'B'), 0.05, 0.7)

    await expect(quiz.optionText('115-chinese-2', 'B').locator('mark').first()).toBeVisible()
    await expect(quiz.option('115-chinese-2', 'B').locator('input')).not.toBeChecked()
  })

  test('原子筆_在題目上寫字_應留下筆跡且不會作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')

    await quiz.scribble(quiz.option('115-chinese-1', 'A'), [0.1, 0.3], [0.5, 0.8])

    expect(await quiz.inkPixels('115-chinese-1')).toBeGreaterThan(0)
    await expect(quiz.option('115-chinese-1', 'A').locator('input')).not.toBeChecked()
  })

  test('原子筆_在計算紙寫算式_收起再打開筆跡應保留', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')

    const scratch = await quiz.openScratch('115-mathA-1')
    await quiz.scribble(scratch)
    expect(await quiz.inkPixels('115-mathA-1', scratch)).toBeGreaterThan(0)

    await quiz.question('115-mathA-1').getByTestId('scratch-toggle').click()
    await quiz.question('115-mathA-1').getByTestId('scratch-toggle').click()

    expect(await quiz.inkPixels('115-mathA-1', scratch)).toBeGreaterThan(0)
  })

  test('橡皮擦_應擦掉原子筆筆跡和螢光筆', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await quiz.useTool('pen')
    const scratch = await quiz.openScratch('115-mathA-1')
    await quiz.scribble(scratch)
    await quiz.useTool('highlighter')
    await quiz.dragAcross(quiz.stem('115-chinese-1'))
    await expect(quiz.stem('115-chinese-1').locator('mark').first()).toBeVisible()

    await quiz.useTool('eraser')
    await quiz.scribble(scratch)
    await quiz.dragAcross(quiz.stem('115-chinese-1'), 0, 0.7)

    expect(await quiz.inkPixels('115-mathA-1')).toBe(0)
    await expect(quiz.stem('115-chinese-1').locator('mark')).toHaveCount(0)
  })

  test('關閉繪畫_畫過的線保留_點選項恢復作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('highlighter')
    await quiz.dragAcross(quiz.stem('115-chinese-1'))

    await quiz.useTool('off')
    await quiz.option('115-chinese-1', 'C').locator('label').click()

    await expect(quiz.stem('115-chinese-1').locator('mark').first()).toBeVisible()
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()
  })
})

test.describe('手機觸控', () => {
  test.skip(({ isMobile }) => !isMobile, '只有手機需要觸控手勢')

  test('開啟繪畫時_一指寫字_兩指上下滑動應捲動頁面且不留筆跡', async ({ page, context }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')
    const scratch = await quiz.openScratch('115-mathA-1')
    await scratch.scrollIntoViewIfNeeded()
    const box = await scratch.boundingBox()
    if (!box) throw new Error('scratch area not visible')
    const cdp = await context.newCDPSession(page)
    const touch = (type: string, points: { x: number, y: number }[]) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points })

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
    expect(await quiz.inkPixels('115-mathA-1')).toBe(0)

    // 一指寫字
    await scratch.scrollIntoViewIfNeeded()
    const after = await scratch.boundingBox()
    if (!after) throw new Error('scratch area not visible')
    await touch('touchStart', [{ x: after.x + 30, y: after.y + 30 }])
    for (let step = 1; step <= 8; step++) {
      await touch('touchMove', [{ x: after.x + 30 + step * 10, y: after.y + 30 + step * 5 }])
    }
    await touch('touchEnd', [])

    expect(await quiz.inkPixels('115-mathA-1', scratch)).toBeGreaterThan(0)
  })
})
