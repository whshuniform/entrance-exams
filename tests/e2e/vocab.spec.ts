import { test, expect } from '@playwright/test'
import { MenuPage } from './pages/MenuPage'
import { VocabPage } from './pages/VocabPage'

test.describe('必背單字每日規劃', () => {
  test('學測頁_點背單字_打開單字規劃頁_header標題背單字_網頁標題是全名', async ({ page }) => {
    const menu = new MenuPage(page)
    await menu.goto('/gsat')

    await menu.item('vocab').click()

    await expect(page).toHaveURL(/\/vocab\?exam=gsat$/)
    await expect(menu.header.getByRole('heading', { level: 1 })).toHaveText('背單字')
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page).toHaveTitle('大學學科能力測驗 背單字')
  })

  test('單字頁_按返回鍵_回到學測頁', async ({ page }) => {
    const vocab = new VocabPage(page)
    const menu = new MenuPage(page)
    await vocab.goto(undefined, '?exam=gsat')

    await expect(menu.backLink).toHaveAccessibleName('返回大學學測')
    await menu.backLink.click()

    await expect(page).toHaveURL(/\/gsat$/)
  })

  test('第一次打開_預設學測和考試日期_算出每天要背幾個字並列出今天的字', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto()

    await expect(vocab.examName).toContainText('大學學測')
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

  test('會考_用會考日期和基本字表_不分級', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto(undefined, '?exam=cap')

    await expect(vocab.dateInput).toHaveValue('2027/05/15')
    await expect(vocab.summary).toContainText('還有 217 天')
    await expect(vocab.summary).toContainText('每天背 6 個字')
    await expect(page.locator('[data-test^="vocab-level-"]')).toHaveCount(0)
    await expect(page.getByTestId('vocab-source')).toContainText('附錄五')
  })

  test('從考試頁帶會考進來_直接用會考_不用再選考試', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto(undefined, '?exam=cap')

    await expect(vocab.examName).toContainText('國中會考')
    await expect(page.getByRole('radio')).toHaveCount(0)
    await expect(page.getByText('選考試')).toHaveCount(0)
    await expect(vocab.summary).toContainText('每天背 6 個字')
    await expect(page.getByTestId('app-back')).toHaveAccessibleName('返回國中會考')
    await expect(page).toHaveTitle('國中教育會考 背單字')
  })

  test('今天的字和每天進度_放在白色卡片上_背景橫線不會穿過單字', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto()

    // 卡片底色 --color-card #fffdf7，蓋住 body 的筆記本橫線
    for (const id of ['vocab-today', 'vocab-plan']) {
      await expect(page.getByTestId(id)).toHaveCSS('background-color', 'rgb(255, 253, 247)')
    }
  })

  test('考試日已過_提醒改日期且沒有今天的字', async ({ page }) => {
    const vocab = new VocabPage(page)
    await vocab.goto('2027-01-23T09:00:00')

    await expect(vocab.summary).toContainText('考試日已經到了')
    await expect(vocab.words).toHaveCount(0)
  })
})
