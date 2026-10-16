import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'

// 115 國綜選擇題：第 1–31 題和混合題的第 35、36 題
const CHINESE = [...Array.from({ length: 31 }, (_, i) => `115-chinese-${i + 1}`), '115-chinese-35', '115-chinese-36']
const ALL_YEARS = [115, 114, 113, 112, 111, 110, 109]
const yearOf = (id: string) => Number(id.split('-')[0])

/** 題庫裡的順序：年度由舊到新，同一年照原卷題號 */
const poolOrder = (id: string) => yearOf(id) * 100 + Number(id.split('-').at(-1))

test.describe('作試題設定表選模式、科目、年度和計時', () => {
  test('作試題設定表_不再問考試_科目照國英數排', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(page.getByTestId('exam-gsat')).toHaveCount(0)
    await expect(home.subject('chinese')).toContainText('國語文綜合能力測驗')
    await expect(home.subject('english')).toContainText('英文')
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
    await expect(quiz.pager).toHaveAttribute('data-sheet', 'guide')
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
    const ids = await quiz.questionIds()
    expect(ids).toHaveLength(33)
    expect(ids.every(id => id.startsWith('114-chinese-'))).toBe(true)
  })

  test('隨機抽題_先選科目再複選年度_預設5題_只出所選年度的題目', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    await home.choose(home.subject('chinese'))
    for (const year of ALL_YEARS) {
      await expect(home.year(year).locator('input')).toBeChecked()
    }
    for (const year of [114, 113, 112, 110, 109]) await home.toggleYear(year, false)
    await expect(home.countInput).toHaveValue('5')
    await home.startButton.click()
    await quiz.startButton.click()

    await expect(page.getByTestId('running-header')).toContainText('第 1 頁 共')
    const ids = await quiz.questionIds()
    expect(ids).toHaveLength(5)
    expect(ids.every(id => [111, 115].includes(yearOf(id)))).toBe(true)
    expect(ids).toEqual([...ids].sort((a, b) => poolOrder(a) - poolOrder(b)))
  })

  test('隨機抽題_取消所有年度_不能開始測驗', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    for (const year of ALL_YEARS) await home.toggleYear(year, false)

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

  test('隨機抽題選英文99課綱_只出109和110年的英文詞彙題', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    await home.choose(home.subject('english'))
    await home.choose(home.scope('curriculum'))
    await expect(home.curriculum('108課綱')).toContainText('111–115 年')
    await home.choose(home.curriculum('99課綱'))
    await expect(home.curriculum('99課綱')).toContainText('109–110 年')
    await home.startButton.click()

    await expect(page).toHaveURL(/subject=english/)
    await expect(page).toHaveURL(/curriculum=99/)
    await quiz.startButton.click()
    const ids = await quiz.questionIds()
    expect(ids).toHaveLength(5)
    expect(ids.every(id => /^(109|110)-english-\d+$/.test(id))).toBe(true)
  })

  test('整份考卷選109年國文_舊試卷沒有部分標題_直接從單選題開始', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.year(109))
    await home.startButton.click()
    await quiz.startButton.click()

    const sheet = page.getByTestId('sheet')
    await expect(page.getByTestId('running-header')).toContainText('109年學測')
    await expect(sheet.getByRole('heading', { level: 3 })).toHaveCount(0)
    await expect(sheet.getByRole('heading', { level: 4 })).toHaveText('一、單選題（占68分）')
    expect(await quiz.questionIds()).toHaveLength(42)
  })

  test('隨機抽題_題數不設上限_超過題庫就全部作答', async ({ page }) => {
    const home = new HomePage(page)
    const quiz = new QuizPage(page)
    await home.goto()

    await home.choose(home.mode('random'))
    await home.choose(home.scope('curriculum'))
    await home.countInput.fill('200')
    await home.countInput.press('Tab')
    await expect(home.countInput).toHaveValue('200')
    // 108課綱國文 111–115 年選擇題共 167 題
    await expect(page.getByTestId('random-count')).toContainText('167 題')
    await home.startButton.click()

    await expect(page).toHaveURL(/count=200/)
    await quiz.startButton.click()
    expect(await quiz.questionIds()).toHaveLength(167)
  })

  test('隨機抽題交卷_成績單看答對率和答對題數_每題標答對答錯', async ({ page }) => {
    const quiz = new QuizPage(page)
    // 抽 115 年全部 33 題，題目固定才能指定作答
    await quiz.goto({ mode: 'random', years: [115], count: 33 })

    await quiz.pick('115-chinese-1', 'C')
    await quiz.pick('115-chinese-2', 'A')
    // 多選題少選一個：部分給分但不算答對
    await quiz.pick('115-chinese-25', 'B')
    await quiz.submit()

    await expect(page.getByTestId('accuracy-rate')).toHaveText('6%')
    await expect(page.getByTestId('accuracy-count')).toHaveText('答對 2 / 33 題')
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

  test('作答頁_按返回_回到大學學測頁_header標題是年度和科目_網頁標題用全名', async ({ page }) => {
    const quiz = new QuizPage(page)
    await quiz.goto()

    await expect(page.getByTestId('app-header').getByRole('heading', { level: 1 })).toHaveText('115年 國語文綜合能力測驗')
    await expect(page).toHaveTitle('115 學年度大學學科能力測驗 國語文綜合能力測驗')
    await expect(page.getByText('練習本')).toHaveCount(0)
    await expect(page.getByTestId('app-back')).toHaveAccessibleName('返回大學學測')
    await page.getByTestId('app-back').click()

    await expect(page).toHaveURL(/\/gsat$/)
    await expect(page.getByTestId('menu-quiz')).toBeVisible()
  })

  test('網址的考卷不存在_顯示找不到考卷並可返回大學學測', async ({ page }) => {
    await page.goto('/quiz?exam=gsat&subject=chinese&mode=full&years=99')

    await expect(page.getByText('找不到這份考卷')).toBeVisible()
    await expect(page.getByTestId('app-back')).toHaveAccessibleName('返回大學學測')
  })

  test('作試題設定表_手機寬度不應出現水平捲動', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()
    await home.choose(home.mode('random'))
    await home.timerSwitch.click()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

    expect(overflow).toBeLessThanOrEqual(0)
  })
})
