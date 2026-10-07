import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'

const CHINESE = ['115-chinese-1', '115-chinese-2', '115-chinese-5', '115-chinese-25', '115-chinese-26']

test.describe('首頁選考試項目和模式', () => {
  test('首頁_列出學測分科會考_分科和會考即將推出不能選', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.exam('gsat')).toContainText('大學學測')
    await expect(home.exam('gsat').locator('input')).toBeChecked()
    for (const id of ['ast', 'cap']) {
      await expect(home.exam(id)).toContainText('即將推出')
      await expect(home.exam(id).locator('input')).toBeDisabled()
    }
    await expect(home.subject('chinese')).toContainText('國語文綜合能力測驗')
    await expect(home.subject('math-a')).toContainText('數學A')
  })

  test('選國綜整份考卷不計時_開始測驗_先看作答注意事項再作答全部題目', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.subject('chinese'))
    await home.choose(home.mode('full'))
    await home.startButton.click()

    await expect(page).toHaveURL(/\/quiz\?/)
    await expect(quiz.pager).toHaveAttribute('data-question', 'guide')
    await expect(quiz.timer).toHaveCount(0)
    await quiz.startButton.click()
    expect(await quiz.questionIds()).toEqual(CHINESE)
  })

  test('選隨機抽題3題_試卷只有抽到的3題且照原卷順序', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    await expect(home.countInput).toHaveValue('3')
    await home.startButton.click()
    await quiz.startButton.click()

    await expect(page.getByTestId('running-header')).toContainText('第 1 頁 共 3 頁')
    const ids = await quiz.questionIds()
    expect(ids).toHaveLength(3)
    expect(ids.every(id => CHINESE.includes(id))).toBe(true)
    expect(ids).toEqual([...ids].sort((a, b) => CHINESE.indexOf(a) - CHINESE.indexOf(b)))
  })

  test('選數學A並計時_預設考試時間100分鐘_作答頁顯示限時', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.subject('math-a'))
    await home.timerSwitch.click()
    await expect(home.minutesInput).toHaveValue('100')
    await home.startButton.click()

    await expect(quiz.timer).toContainText('限時 100 分鐘')
    await quiz.startButton.click()
    await expect(quiz.question('115-mathA-1')).toBeVisible()
  })

  test('作答頁_按回首頁_回到選考試的首頁', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await quiz.goto()

    await page.getByRole('link', { name: '回首頁' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(home.exam('gsat')).toBeVisible()
  })

  test('網址的考卷不存在_顯示找不到考卷並可回首頁', async ({ page }) => {
    await page.goto('/quiz?exam=gsat&year=99&subject=chinese')

    await expect(page.getByText('找不到這份考卷')).toBeVisible()
    await expect(page.getByRole('link', { name: '回首頁' })).toBeVisible()
  })

  test('首頁_手機寬度不應出現水平捲動', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()
    await home.choose(home.mode('random'))
    await home.timerSwitch.click()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

    expect(overflow).toBeLessThanOrEqual(0)
  })
})
