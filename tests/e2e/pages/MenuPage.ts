import { expect, type Locator, type Page } from '@playwright/test'

/** 首頁選考試、考試頁選作試題或背單字：都是一排可以點的卡片 */
export class MenuPage {
  readonly heading: Locator
  /** 固定在最上方的 header；iOS 樣式的返回鍵在左邊 */
  readonly header: Locator
  readonly backLink: Locator

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 })
    this.header = page.getByTestId('app-header')
    this.backLink = page.getByTestId('app-back')
  }

  async goto(path = '/') {
    await this.page.goto(path)
    await expect(this.page.getByTestId('menu')).toHaveAttribute('data-ready', 'true')
  }

  item(id: string) {
    return this.page.getByTestId(`menu-${id}`)
  }
}
