import { test, expect } from '@playwright/test'

// 網站本來就是中文：瀏覽器不該跳出 Google 翻譯
test.describe('不要被 Google 翻譯', () => {
  for (const path of ['/', '/gsat', '/gsat/practice', '/quiz?exam=gsat&subject=chinese&mode=full&years=115']) {
    test(`${path}_標明繁體中文且不要翻譯`, async ({ page }) => {
      await page.goto(path)

      const html = page.locator('html')
      await expect(html).toHaveAttribute('lang', 'zh-TW')
      await expect(html).toHaveAttribute('translate', 'no')
      await expect(page.locator('meta[name="google"]')).toHaveAttribute('content', 'notranslate')
    })
  }
})
