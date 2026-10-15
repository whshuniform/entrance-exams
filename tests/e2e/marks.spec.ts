import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('右下角繪畫工具列', () => {
  test('工具列_固定在右下角由上而下四顆加顯示隱藏按鈕_題目不被擋住', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    const viewport = page.viewportSize()!

    const boxes = []
    for (const locator of [...(['off', 'highlighter', 'pen', 'eraser'] as const).map(name => quiz.tool(name)), quiz.toolbarToggle]) {
      const box = await locator.boundingBox()
      if (!box) throw new Error('toolbar button not visible')
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

  test('隱藏工具_工具收起來_題目往右延伸變滿版_再按顯示工具回來', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    const card = quiz.question('115-chinese-1')
    const before = (await card.boundingBox())!

    await expect(quiz.toolbarToggle).toHaveText('隱藏工具')
    await quiz.toolbarToggle.click()

    for (const name of ['off', 'highlighter', 'pen', 'eraser'] as const) await expect(quiz.tool(name)).toBeHidden()
    await expect(quiz.toolbarToggle).toHaveText('顯示工具')
    await expect.poll(async () => (await card.boundingBox())!.width).toBeGreaterThan(before.width + 24)
    if (page.viewportSize()!.width < 768) {
      // 手機：卡片右邊延伸到接近螢幕邊緣
      await expect.poll(async () => {
        const box = (await card.boundingBox())!
        return page.viewportSize()!.width - (box.x + box.width)
      }).toBeLessThan(24)
    }

    await quiz.toolbarToggle.click()
    await expect(quiz.tool('pen')).toBeVisible()
    await expect(quiz.toolbarToggle).toHaveText('隱藏工具')
  })

  test('畫畫時隱藏工具_應自動關閉繪畫_點選項可作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')

    await quiz.toolbarToggle.click()
    await quiz.option('115-chinese-1', 'B').locator('label').click()

    await expect(quiz.option('115-chinese-1', 'B').locator('input')).toBeChecked()
    await quiz.toolbarToggle.click()
    await expect(quiz.tool('off')).toHaveAttribute('aria-pressed', 'true')
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

  test('螢光筆_在題幹拖曳應畫線_點選項文字不會作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('highlighter')
    await expect(quiz.tool('highlighter')).toHaveAttribute('aria-pressed', 'true')
    await expect(quiz.tool('off')).toHaveAttribute('aria-pressed', 'false')

    await quiz.dragAcross(quiz.stem('115-chinese-1'))
    await expect(quiz.stem('115-chinese-1').locator('mark').first()).toBeVisible()

    await quiz.optionText('115-chinese-1', 'C').click()
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).not.toBeChecked()
  })

  test('繪畫時_點作答圈照常作答', async ({ page }) => {
    // YZ：繪畫時 checkbox 或 radio 也要能點
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')

    await quiz.option('115-chinese-1', 'C').locator('input').click({ force: true })
    await expect(quiz.option('115-chinese-1', 'C').locator('input')).toBeChecked()

    await quiz.useTool('highlighter')
    await quiz.showQuestion('115-chinese-25')
    await quiz.option('115-chinese-25', 'B').locator('input').click({ force: true })
    await quiz.option('115-chinese-25', 'D').locator('input').click({ force: true })
    await expect(quiz.option('115-chinese-25', 'B').locator('input')).toBeChecked()
    await expect(quiz.option('115-chinese-25', 'D').locator('input')).toBeChecked()
  })

  test('螢光筆_在選項文字上拖曳_應畫線', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('highlighter')
    await quiz.showQuestion('115-chinese-2')

    await quiz.dragAcross(quiz.optionText('115-chinese-2', 'B'), 0.05, 0.7)

    await expect(quiz.optionText('115-chinese-2', 'B').locator('mark').first()).toBeVisible()
    await expect(quiz.option('115-chinese-2', 'B').locator('input')).not.toBeChecked()
  })

  test('原子筆_在題目上寫字_應留下筆跡且不會作答', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')

    // 從選項文字開始寫（作答圈本身點了會作答）
    await quiz.scribble(quiz.optionText('115-chinese-1', 'A'), [0.1, 0.3], [0.5, 0.8])

    expect(await quiz.inkPixels('115-chinese-1')).toBeGreaterThan(0)
    await expect(quiz.option('115-chinese-1', 'A').locator('input')).not.toBeChecked()
  })

  test('刪去法_沒有叉叉按鈕_用原子筆在選項上劃掉', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await expect(quiz.question('115-chinese-1').locator('[data-test^="eliminate-"]')).toHaveCount(0)
    await quiz.useTool('pen')

    const option = quiz.optionText('115-chinese-1', 'B')
    await quiz.dragAcross(option, 0, 0.9)

    expect(await quiz.inkPixels('115-chinese-1', option)).toBeGreaterThan(0)
    await expect(quiz.option('115-chinese-1', 'B').locator('input')).not.toBeChecked()
  })

  test('計算紙_按鈕和紙都在所有選項下面', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'math-a' })
    await quiz.showQuestion('115-mathA-1')
    const question = quiz.question('115-mathA-1')
    const lastOption = await quiz.option('115-mathA-1', '5').boundingBox()

    const toggleBox = await question.getByTestId('scratch-toggle').boundingBox()
    expect(toggleBox!.y).toBeGreaterThanOrEqual(lastOption!.y + lastOption!.height - 1)

    // 按下按鈕會捲動頁面，重新量位置
    const scratch = await quiz.openScratch('115-mathA-1')
    const scratchBox = await scratch.boundingBox()
    const lastOptionNow = await quiz.option('115-mathA-1', '5').boundingBox()
    expect(scratchBox!.y).toBeGreaterThanOrEqual(lastOptionNow!.y + lastOptionNow!.height - 1)
  })

  test('原子筆_在計算紙寫算式_收起再打開筆跡應保留', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'math-a' })
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

    await quiz.useTool('highlighter')
    await quiz.dragAcross(quiz.stem('115-chinese-1'))
    await expect(quiz.stem('115-chinese-1').locator('mark').first()).toBeVisible()
    await quiz.useTool('eraser')
    await quiz.dragAcross(quiz.stem('115-chinese-1'), 0, 0.7)
    await expect(quiz.stem('115-chinese-1').locator('mark')).toHaveCount(0)

    await quiz.useTool('pen')
    const scratch = await quiz.openScratch('115-chinese-1')
    await quiz.scribble(scratch)
    await quiz.useTool('eraser')
    await quiz.scribble(scratch)
    expect(await quiz.inkPixels('115-chinese-1')).toBe(0)
  })

  test('橡皮擦_滑鼠移到題目上_顯示跟著滑鼠的橡皮擦大小', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('eraser')

    const box = (await quiz.stem('115-chinese-1').boundingBox())!
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)

    const cursor = page.getByTestId('eraser-cursor')
    await expect(cursor).toBeVisible()
    const circle = (await cursor.boundingBox())!
    // 跟橡皮擦筆寬一樣大（24px），圓心在滑鼠位置
    expect(Math.round(circle.width)).toBe(24)
    expect(Math.abs(circle.x + circle.width / 2 - x)).toBeLessThan(2)
    expect(Math.abs(circle.y + circle.height / 2 - y)).toBeLessThan(2)

    await page.mouse.move(x + 30, y + 10)
    const moved = (await cursor.boundingBox())!
    expect(Math.abs(moved.x + moved.width / 2 - (x + 30))).toBeLessThan(2)
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

  test('原子筆_一指上下畫線_頁面不跟著滑', async ({ page, context }) => {
    // YZ：繪畫時畫筆上下移動會跟頁面上下滑動有衝突
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')
    const stem = quiz.stem('115-chinese-2')
    await stem.scrollIntoViewIfNeeded()
    const box = await stem.boundingBox()
    if (!box) throw new Error('stem not visible')
    const cdp = await context.newCDPSession(page)
    const touch = (type: string, points: { x: number, y: number }[]) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points })

    const scrollBefore = await page.evaluate(() => window.scrollY)
    const x = box.x + box.width / 2
    await touch('touchStart', [{ x, y: box.y + 5 }])
    for (let step = 1; step <= 10; step++) await touch('touchMove', [{ x, y: box.y + 5 + step * 12 }])
    await touch('touchEnd', [])

    expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore)
    expect(await quiz.inkPixels('115-chinese-2')).toBeGreaterThan(0)
  })

  test('開啟繪畫時_一指寫字_兩指上下滑動應捲動頁面且不留筆跡', async ({ page, context }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ subject: 'math-a' })
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

  test('原子筆固定灰色_不用選顏色', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()
    await quiz.useTool('pen')

    await expect(page.getByTestId('pen-colors')).toHaveCount(0)
    await quiz.scribble(quiz.option('115-chinese-1', 'A'), [0.1, 0.3], [0.5, 0.8])

    // 找筆跡最濃的像素：紅、綠、藍差不多（灰色）
    const [r, g, b] = await quiz.inkLayer('115-chinese-1').evaluate((el: HTMLCanvasElement) => {
      const data = el.getContext('2d')!.getImageData(0, 0, el.width, el.height).data
      let best = 3
      for (let i = 3; i < data.length; i += 4) if (data[i]! > data[best]!) best = i
      return [data[best - 3]!, data[best - 2]!, data[best - 1]!]
    })
    expect(Math.max(r, g, b) - Math.min(r, g, b)).toBeLessThan(25)
  })
})

