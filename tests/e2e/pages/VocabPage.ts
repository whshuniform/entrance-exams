import { expect, type Locator, type Page } from '@playwright/test'

export class VocabPage {
  readonly summary: Locator
  readonly words: Locator
  readonly days: Locator
  readonly dateInput: Locator

  constructor(private readonly page: Page) {
    this.summary = page.getByTestId('vocab-summary')
    this.words = page.getByTestId('vocab-word')
    this.days = page.getByTestId('vocab-day')
    this.dateInput = page.getByTestId('vocab-exam-date').locator('input')
  }

  /** 固定「今天」是哪一天，再打開單字頁 */
  async goto(today = '2026-10-10T09:00:00') {
    await this.page.clock.setFixedTime(new Date(today))
    await this.page.goto('/vocab')
    await expect(this.page.getByTestId('vocab-page')).toHaveAttribute('data-ready', 'true')
  }

  exam(id: 'gsat' | 'cap') {
    return this.page.getByTestId(`vocab-exam-${id}`)
  }

  level(level: number) {
    return this.page.getByTestId(`vocab-level-${level}`)
  }

  word(text: string) {
    return this.words.filter({ hasText: text }).first()
  }
}
