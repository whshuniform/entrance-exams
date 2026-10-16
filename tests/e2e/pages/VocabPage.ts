import { expect, type Locator, type Page } from '@playwright/test'

export class VocabPage {
  readonly summary: Locator
  readonly words: Locator
  readonly days: Locator
  readonly dateInput: Locator
  /** 這一頁在背哪個考試的單字（從考試頁帶進來，不用再選） */
  readonly examName: Locator

  constructor(private readonly page: Page) {
    this.summary = page.getByTestId('vocab-summary')
    this.words = page.getByTestId('vocab-word')
    this.days = page.getByTestId('vocab-day')
    this.dateInput = page.getByTestId('vocab-exam-date').locator('input')
    this.examName = page.getByTestId('vocab-exam-name')
  }

  /** 固定「今天」是哪一天，再打開單字頁 */
  async goto(today = '2026-10-10T09:00:00', query = '') {
    await this.page.clock.setFixedTime(new Date(today))
    await this.page.goto(`/vocab${query}`)
    await expect(this.page.getByTestId('vocab-page')).toHaveAttribute('data-ready', 'true')
  }

  level(level: number) {
    return this.page.getByTestId(`vocab-level-${level}`)
  }

  word(text: string) {
    return this.words.filter({ hasText: text }).first()
  }
}
