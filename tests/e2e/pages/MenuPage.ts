import { expect, type Locator, type Page } from '@playwright/test'

/** 首頁選考試、考試頁選作試題或背單字：都是一排可以點的卡片 */
export class MenuPage {
  readonly heading: Locator

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 })
  }

  async goto(path = '/') {
    await this.page.goto(path)
    await expect(this.page.getByTestId('menu')).toHaveAttribute('data-ready', 'true')
  }

  item(id: string) {
    return this.page.getByTestId(`menu-${id}`)
  }
}
