import { test, expect } from '@playwright/test'
import { QuizPage } from './pages/QuizPage'

/** 手機上曾經超出畫面的長算式、長化學反應式（YZ 2026-10-16 回報） */
const LONG_FORMULAS = [
  { subject: 'math-b', year: 114, id: '114-mathB-6' },
  { subject: 'math-a', year: 112, id: '112-mathA-9' },
  { subject: 'science', year: 110, id: '110-science-48' },
  { subject: 'science', year: 112, id: '112-science-51' },
  // 分子分母是一長串中文的分式拆不開，要縮小才放得下
  { subject: 'science', year: 111, id: '111-science-11' },
]

test.describe('公式不超出畫面', () => {
  for (const { subject, year, id } of LONG_FORMULAS) {
    test(`${id}_長公式在題目寬度內_頁面不用左右捲`, async ({ page }) => {
      const quiz = new QuizPage(page)
      await quiz.goto({ subject, years: [year] })
      await quiz.showQuestion(id)

      const card = quiz.question(id)
      const cardBox = await card.boundingBox()
      if (!cardBox) throw new Error('question not visible')
      const rights = await card.getByTestId('math').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().right))
      expect(rights.length).toBeGreaterThan(0)
      for (const right of rights) expect(right).toBeLessThanOrEqual(cardBox.x + cardBox.width + 1)

      const main = await page.locator('main').evaluate(el => ({ scroll: el.scrollWidth, client: el.clientWidth }))
      expect(main.scroll).toBeLessThanOrEqual(main.client)
    })
  }
})
