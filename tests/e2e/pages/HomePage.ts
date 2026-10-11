import { expect, type Locator, type Page } from '@playwright/test'

/** 作試題的設定表（考試已在前一頁選好，預設學測） */
export class HomePage {
  readonly heading: Locator
  readonly startButton: Locator
  readonly countInput: Locator
  readonly timerSwitch: Locator
  readonly minutesInput: Locator

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 })
    this.startButton = page.getByRole('button', { name: '開始測驗' })
    this.countInput = page.getByTestId('random-count').locator('input')
    this.timerSwitch = page.getByTestId('timer-switch')
    this.minutesInput = page.getByTestId('timer-minutes').locator('input')
  }

  async goto(exam = 'gsat') {
    await this.page.goto(`/${exam}/practice`)
    await expect(this.page.getByTestId('quiz-setup')).toHaveAttribute('data-ready', 'true')
  }

  subject(id: string) {
    return this.page.getByTestId(`subject-${id}`)
  }

  mode(id: 'full' | 'random') {
    return this.page.getByTestId(`mode-${id}`)
  }

  /** 整份考卷是單選的年度；隨機抽題是可複選的年度 */
  year(year: number) {
    return this.page.getByTestId(`year-${year}`)
  }

  /** 隨機抽題的範圍：依年度或依課綱 */
  scope(id: 'years' | 'curriculum') {
    return this.page.getByTestId(`scope-${id}`)
  }

  curriculum(name: string) {
    return this.page.getByTestId(`curriculum-${name}`)
  }

  /** 點整張年度卡片切換勾選 */
  async toggleYear(year: number, checked: boolean) {
    await this.year(year).click()
    if (checked) await expect(this.year(year).locator('input')).toBeChecked()
    else await expect(this.year(year).locator('input')).not.toBeChecked()
  }

  /** 點整張選項卡片來選 */
  async choose(option: Locator) {
    await option.click()
    await expect(option.locator('input')).toBeChecked()
  }
}
