import type { Locator, Page } from '@playwright/test'

export class QuizPage {
  readonly submitButton: Locator
  readonly resetButton: Locator
  readonly totalScore: Locator
  readonly highlighterTool: Locator
  readonly answerTool: Locator

  constructor(private readonly page: Page) {
    this.submitButton = page.getByRole('button', { name: '交卷批改' })
    this.resetButton = page.getByRole('button', { name: '重新作答' })
    this.totalScore = page.getByTestId('total-score')
    this.highlighterTool = page.getByTestId('tool-highlighter')
    this.answerTool = page.getByTestId('tool-answer')
  }

  async goto() {
    await this.page.goto('/')
  }

  question(id: string) {
    return this.page.getByTestId(`question-${id}`)
  }

  async pick(id: string, keys: string) {
    for (const key of keys) {
      await this.question(id).getByTestId(`option-${key}`).locator('label').click()
    }
  }

  option(id: string, key: string) {
    return this.question(id).getByTestId(`option-${key}`)
  }

  async eliminate(id: string, key: string) {
    await this.question(id).getByTestId(`eliminate-${key}`).click()
  }

  /** 用滑鼠在題幹上從左拖到右（模擬螢光筆） */
  async dragAcrossStem(id: string) {
    const box = await this.question(id).getByTestId('stem').boundingBox()
    if (!box) throw new Error('stem not visible')
    const y = box.y + 14
    await this.page.mouse.move(box.x + 4, y)
    await this.page.mouse.down()
    await this.page.mouse.move(box.x + box.width * 0.5, y, { steps: 8 })
    await this.page.mouse.up()
  }

  async openScratch(id: string) {
    await this.question(id).getByTestId('scratch-toggle').click()
    return this.question(id).locator('canvas')
  }
}
