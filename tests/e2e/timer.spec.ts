import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

test.describe('計時作答', () => {
  test('計時1分鐘_按開始作答才倒數_時間到自動交卷翻到成績單且不能再作答', async ({ page }) => {
    await page.clock.install()
    const quiz = new QuizPage(page)
    await quiz.openCover({ minutes: 1 })

    await expect(quiz.timer).toContainText('限時 1 分鐘')
    await page.clock.fastForward('00:05')
    await expect(quiz.timer).toContainText('限時 1 分鐘')

    await quiz.startButton.click()
    await quiz.pick('115-chinese-1', 'C')
    await page.clock.fastForward('00:30')
    await expect(quiz.timer.getByTestId('timer-clock')).toHaveText(/^00:(2\d|30)$/)

    await page.clock.fastForward('00:31')
    await expect(quiz.resultSheet).toBeVisible()
    await expect(page.getByTestId('time-up')).toContainText('時間到')
    await expect(quiz.timer).toContainText('時間到')

    await quiz.showQuestion('115-chinese-1')
    await expect(quiz.question('115-chinese-1').getByTestId('question-score')).toHaveText('+2')
    await quiz.showQuestion('115-chinese-2')
    await expect(quiz.option('115-chinese-2', 'A').locator('input')).toBeDisabled()
  })

  test('提早交卷_倒數停止顯示已交卷_之後不會再跳時間到', async ({ page }) => {
    await page.clock.install()
    const quiz = new QuizPage(page)
    await quiz.goto({ minutes: 10 })

    await quiz.submit()
    await expect(quiz.timer).toContainText('已交卷')
    await page.clock.fastForward('11:00')

    await expect(quiz.timer).toContainText('已交卷')
    await expect(page.getByTestId('time-up')).toHaveCount(0)
  })

  test('重新作答_倒數從頭開始', async ({ page }) => {
    await page.clock.install()
    const quiz = new QuizPage(page)
    await quiz.goto({ minutes: 1 })

    await page.clock.fastForward('01:01')
    await expect(quiz.resultSheet).toBeVisible()
    await quiz.resetButton.click()

    await expect(quiz.pager).toHaveAttribute('data-question', '115-chinese-1')
    await expect(quiz.timer.getByTestId('timer-clock')).toHaveText(/^0[01]:\d\d$/)
    await expect(quiz.option('115-chinese-1', 'A').locator('input')).toBeEnabled()
  })

  test('倒數固定在畫面最上方的細長條_往下捲也停在最上方', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ minutes: 10 })
    const viewport = page.viewportSize()!

    const bar = (await quiz.timer.boundingBox())!
    expect(bar.y).toBeLessThanOrEqual(1)
    expect(bar.height).toBeLessThanOrEqual(36)
    expect(bar.width).toBeGreaterThanOrEqual(viewport.width - 20)

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const scrolled = (await quiz.timer.boundingBox())!
    expect(scrolled.y).toBeLessThanOrEqual(1)
  })

  test('倒數長條_不蓋住頁面最上面的回首頁', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.openCover({ minutes: 10 })

    const bar = (await quiz.timer.boundingBox())!
    const home = (await page.getByRole('link', { name: '回首頁' }).boundingBox())!

    expect(home.y).toBeGreaterThanOrEqual(bar.y + bar.height)
  })

  test('計時中翻頁_新一頁的頁首不被倒數長條蓋住', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ minutes: 10 })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    await quiz.next()

    const bar = (await quiz.timer.boundingBox())!
    const header = (await page.getByTestId('running-header').boundingBox())!
    expect(header.y).toBeGreaterThanOrEqual(bar.y + bar.height - 1)
  })

  test('不計時_作答頁沒有倒數', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await expect(quiz.timer).toHaveCount(0)
  })
})
