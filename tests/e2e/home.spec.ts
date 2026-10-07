import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'

const CHINESE = ['115-chinese-1', '115-chinese-2', '115-chinese-5', '115-chinese-25', '115-chinese-26']
const yearOf = (id: string) => Number(id.split('-')[0])

/** 題庫裡的順序：年度由舊到新，同一年照原卷題號 */
const poolOrder = (id: string) => yearOf(id) * 100 + Number(id.split('-').at(-1))

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

    await home.choose(home.mode('full'))
    await home.choose(home.subject('chinese'))
    await expect(home.year(115).locator('input')).toBeChecked()
    await home.startButton.click()

    await expect(page).toHaveURL(/\/quiz\?/)
    await expect(quiz.pager).toHaveAttribute('data-question', 'guide')
    await expect(quiz.timer).toHaveCount(0)
    await quiz.startButton.click()
    expect(await quiz.questionIds()).toEqual(CHINESE)
  })

  test('整份考卷選114年_只出114年的題目', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.year(114))
    await home.startButton.click()
    await quiz.startButton.click()

    await expect(page.getByTestId('running-header')).toContainText('114年學測')
    expect(await quiz.questionIds()).toEqual(['114-chinese-1', '114-chinese-2', '114-chinese-3'])
  })

  test('隨機抽題_先選科目再複選年度_預設5題_只出所選年度的題目', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    await home.choose(home.subject('chinese'))
    for (const year of [115, 114, 113, 112, 111]) {
      await expect(home.year(year).locator('input')).toBeChecked()
    }
    for (const year of [114, 113, 112]) await home.toggleYear(year, false)
    await expect(home.countInput).toHaveValue('5')
    await home.startButton.click()
    await quiz.startButton.click()

    await expect(page.getByTestId('running-header')).toContainText('第 1 頁 共 5 頁')
    const ids = await quiz.questionIds()
    expect(ids).toHaveLength(5)
    expect(ids.every(id => [111, 115].includes(yearOf(id)))).toBe(true)
    expect(ids).toEqual([...ids].sort((a, b) => poolOrder(a) - poolOrder(b)))
  })

  test('隨機抽題_取消所有年度_不能開始測驗', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    for (const year of [115, 114, 113, 112, 111]) await home.toggleYear(year, false)

    await expect(home.startButton).toBeDisabled()
    await expect(page.getByText('至少選一個年度')).toBeVisible()
  })

  test('隨機抽題_依課綱選範圍_網址帶課綱_作答頁寫出課綱', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    await home.choose(home.scope('curriculum'))
    await expect(home.curriculum('108課綱').locator('input')).toBeChecked()
    await expect(home.curriculum('108課綱')).toContainText('111–115 年')
    await home.startButton.click()

    await expect(page).toHaveURL(/curriculum=108/)
    await expect(page.getByText(/108課綱/).first()).toBeVisible()
    await quiz.startButton.click()
    expect(await quiz.questionIds()).toHaveLength(5)
  })

  test('隨機抽題_題數不設上限_超過題庫就全部作答', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    await home.countInput.fill('30')
    await home.countInput.press('Tab')
    await expect(home.countInput).toHaveValue('30')
    await expect(page.getByTestId('random-count')).toContainText('17 題')
    await home.startButton.click()

    await expect(page).toHaveURL(/count=30/)
    await quiz.startButton.click()
    await expect(page.getByTestId('running-header')).toContainText('共 17 頁')
  })

  test('隨機抽題交卷_成績單看答對率和答對題數_每題標答對答錯', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto({ mode: 'random', years: [115], count: 5 })

    await quiz.pick('115-chinese-1', 'C')
    await quiz.pick('115-chinese-2', 'A')
    // 多選題少選一個：部分給分但不算答對
    await quiz.pick('115-chinese-25', 'B')
    await quiz.submit()

    await expect(page.getByTestId('accuracy-rate')).toHaveText('40%')
    await expect(page.getByTestId('accuracy-count')).toHaveText('答對 2 / 5 題')
    await expect(page.getByTestId('report-level')).toHaveCount(0)
    await quiz.showQuestion('115-chinese-1')
    await expect(quiz.question('115-chinese-1').getByTestId('question-score')).toHaveText('答對')
    await quiz.showQuestion('115-chinese-25')
    await expect(quiz.question('115-chinese-25').getByTestId('question-score')).toHaveText('答錯')
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
    await page.goto('/quiz?exam=gsat&subject=chinese&mode=full&years=99')

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
