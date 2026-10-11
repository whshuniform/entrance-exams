import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { VocabPage } from './pages/VocabPage'

test.describe('必背單字每日規劃', () => {
  test('首頁_點必背單字_打開單字規劃頁', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await page.getByRole('link', { name: /必背單字/ }).click()

    await expect(page).toHaveURL(/\/vocab/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('必背單字')
  })

  test('第一次打開_預設學測和考試日期_算出每天要背幾個字並列出今天的字', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto()

    await expect(vocab.exam('gsat').locator('input')).toBeChecked()
    await expect(vocab.dateInput).toHaveValue('2027/01/22')
    await expect(vocab.summary).toContainText('還有 104 天')
    await expect(vocab.summary).toContainText('每天背 58 個字')
    await expect(vocab.words).toHaveCount(58)
    await expect(vocab.words.first()).toContainText('第 1 級')
    await expect(vocab.days).toHaveCount(7)
    await expect(page.getByTestId('vocab-source')).toContainText('大學入學考試中心')
  })

  test('打勾背好的字_重新整理後還記得_進度增加', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto()

    await vocab.words.first().locator('label').click()
    await expect(vocab.words.first().locator('input')).toBeChecked()
    await expect(vocab.summary).toContainText('已背 1 /')

    await page.reload()
    await expect(page.getByTestId('vocab-page')).toHaveAttribute('data-ready', 'true')
    await expect(vocab.words.first().locator('input')).toBeChecked()
    await expect(vocab.summary).toContainText('已背 1 /')
    await expect(vocab.words).toHaveCount(58)
  })

  test('在日曆改考試日期_天數和每天字數跟著變', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto()

    await vocab.dateInput.click()
    await page.locator('.p-datepicker-panel').getByText('15', { exact: true }).first().click()

    await expect(vocab.dateInput).toHaveValue('2027/01/15')
    await expect(vocab.summary).toContainText('還有 97 天')
    await expect(vocab.summary).toContainText('每天背 62 個字')
  })

  test('每個字有中文意思_打開遮住中文_點了才看得到', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto()
    const first = vocab.words.first()

    await expect(first.getByTestId('vocab-meaning')).not.toBeEmpty()
    await page.getByTestId('vocab-hide-meaning').click()

    await expect(first.getByTestId('vocab-meaning')).toHaveCount(0)
    await first.getByTestId('vocab-reveal').click()
    await expect(first.getByTestId('vocab-meaning')).toBeVisible()
    await expect(vocab.words.nth(1).getByTestId('vocab-reveal')).toBeVisible()
  })

  test('只背第1到4級_每天的字變少', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto()

    await vocab.level(5).click()
    await vocab.level(6).click()

    await expect(vocab.level(6).locator('input')).not.toBeChecked()
    await expect(vocab.summary).toContainText('每天背 39 個字')
  })

  test('換會考_用會考日期和基本字表_不分級', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto()

    await vocab.exam('cap').click()

    await expect(vocab.dateInput).toHaveValue('2027/05/15')
    await expect(vocab.summary).toContainText('還有 217 天')
    await expect(vocab.summary).toContainText('每天背 6 個字')
    await expect(page.locator('[data-test^="vocab-level-"]')).toHaveCount(0)
    await expect(page.getByTestId('vocab-source')).toContainText('附錄五')
  })

  test('從考試頁帶會考進來_直接選好會考', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto(undefined, '?exam=cap')

    await expect(vocab.exam('cap').locator('input')).toBeChecked()
    await expect(vocab.summary).toContainText('每天背 6 個字')
  })

  test('考試日已過_提醒改日期且沒有今天的字', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto('2027-01-23T09:00:00')

    await expect(vocab.summary).toContainText('考試日已經到了')
    await expect(vocab.words).toHaveCount(0)
  })
})
