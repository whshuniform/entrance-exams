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
}
