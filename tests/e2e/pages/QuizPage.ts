import { expect, type Locator, type Page } from '@playwright/test'

export class QuizPage {
  readonly submitButton: Locator
  readonly resetButton: Locator
  readonly pager: Locator
  readonly nextButton: Locator
  readonly prevButton: Locator
  readonly resultSheet: Locator

  constructor(private readonly page: Page) {
    this.submitButton = page.getByRole('button', { name: '交卷批改' })
    this.resetButton = page.getByRole('button', { name: '重新作答' })
    this.pager = page.getByTestId('pager')
    this.nextButton = page.getByTestId('next-page')
    this.prevButton = page.getByTestId('prev-page')
    this.resultSheet = page.getByTestId('result-sheet')
  }

  /** 目前這一頁的題目 id；成績頁為 result */
  async currentPage() {
    return this.pager.getAttribute('data-question')
  }

  private async flip(button: Locator) {
    const before = await this.currentPage()
    await button.click()
    await expect(this.pager).not.toHaveAttribute('data-question', before ?? '')
  }

  async next() {
    await this.flip(this.nextButton)
  }

  async prev() {
    await this.flip(this.prevButton)
  }

  /** 一頁一題：往後或往前翻到該題 */
  async showQuestion(id: string) {
    for (let i = 0; i < 20 && (await this.currentPage()) !== id; i++) {
      if (!(await this.nextButton.isVisible())) break
      await this.next()
    }
    for (let i = 0; i < 20 && (await this.currentPage()) !== id; i++) {
      await this.prev()
    }
    await expect(this.question(id)).toBeVisible()
  }

  /** 翻到最後一頁交卷 */
  async submit() {
    while (!(await this.submitButton.isVisible())) await this.next()
    await this.submitButton.click()
    await expect(this.resultSheet).toBeVisible()
  }

  report(subject: string) {
    return this.page.getByTestId(`report-${subject}`)
  }

  async goto() {
    await this.page.goto('/')
  }

  question(id: string) {
    return this.page.getByTestId(`question-${id}`)
  }

  async pick(id: string, keys: string) {
    await this.showQuestion(id)
    for (const key of keys) {
      await this.question(id).getByTestId(`option-${key}`).locator('label').click()
    }
  }

  option(id: string, key: string) {
    return this.question(id).getByTestId(`option-${key}`)
  }

  stem(id: string) {
    return this.question(id).getByTestId('stem')
  }

  optionText(id: string, key: string) {
    return this.option(id, key).getByTestId('option-text')
  }

  /** 用滑鼠在文字第一行橫向拖曳（模擬螢光筆） */
  async dragAcross(target: Locator, from = 0.05, to = 0.6) {
    await target.scrollIntoViewIfNeeded()
    const box = await target.boundingBox()
    if (!box) throw new Error('target not visible')
    const y = box.y + 14
    await this.page.mouse.move(box.x + box.width * from, y)
    await this.page.mouse.down()
    await this.page.mouse.move(box.x + box.width * to, y, { steps: 8 })
    await this.page.mouse.up()
  }

  /** 用滑鼠在區塊內斜斜畫一筆（座標為區塊寬高比例） */
  async scribble(target: Locator, from: [number, number] = [0.1, 0.2], to: [number, number] = [0.6, 0.7]) {
    await target.scrollIntoViewIfNeeded()
    const box = await target.boundingBox()
    if (!box) throw new Error('target not visible')
    await this.page.mouse.move(box.x + box.width * from[0], box.y + box.height * from[1])
    await this.page.mouse.down()
    await this.page.mouse.move(box.x + box.width * to[0], box.y + box.height * to[1], { steps: 12 })
    await this.page.mouse.up()
  }

  tool(name: 'off' | 'highlighter' | 'pen' | 'eraser') {
    return this.page.getByTestId(`tool-${name}`)
  }

  async useTool(name: 'off' | 'highlighter' | 'pen' | 'eraser') {
    await this.tool(name).click()
  }

  inkLayer(id: string) {
    return this.question(id).getByTestId('ink-layer')
  }

  /** 題目卡片的筆跡層上有幾個有顏色的像素；給 within 時只算該區塊範圍 */
  async inkPixels(id: string, within?: Locator) {
    const layer = this.inkLayer(id)
    const layerBox = await layer.boundingBox()
    const area = within ? await within.boundingBox() : layerBox
    if (!layerBox || !area) throw new Error('ink layer not visible')
    const region = {
      left: area.x - layerBox.x,
      top: area.y - layerBox.y,
      width: area.width,
      height: area.height,
    }
    return layer.evaluate((el: HTMLCanvasElement, r) => {
      const scale = el.width / el.clientWidth
      const x = Math.max(0, Math.floor(r.left * scale))
      const y = Math.max(0, Math.floor(r.top * scale))
      const w = Math.min(el.width - x, Math.ceil(r.width * scale))
      const h = Math.min(el.height - y, Math.ceil(r.height * scale))
      if (w <= 0 || h <= 0) return 0
      const data = el.getContext('2d')!.getImageData(x, y, w, h).data
      let count = 0
      for (let i = 3; i < data.length; i += 4) if (data[i]! > 0) count++
      return count
    }, region)
  }

  async openScratch(id: string) {
    await this.showQuestion(id)
    await this.question(id).getByTestId('scratch-toggle').click()
    return this.question(id).getByTestId('scratch-area')
  }
}
