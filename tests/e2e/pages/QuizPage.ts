import type { Locator, Page } from '@playwright/test'

export class QuizPage {
  readonly submitButton: Locator
  readonly resetButton: Locator
  readonly totalScore: Locator

  constructor(private readonly page: Page) {
    this.submitButton = page.getByRole('button', { name: '交卷批改' })
    this.resetButton = page.getByRole('button', { name: '重新作答' })
    this.totalScore = page.getByTestId('total-score')
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

  async openScratch(id: string) {
    await this.question(id).getByTestId('scratch-toggle').click()
    return this.question(id).locator('canvas')
  }
}
