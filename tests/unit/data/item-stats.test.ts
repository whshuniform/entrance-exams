import { describe, it, expect } from 'vitest'
import { examCatalog } from '~/data/catalog'
import { paperQuestions } from '~/utils/paper'
import { itemStatsFor } from '~/utils/item-stats'

const gsat = examCatalog.find(exam => exam.id === 'gsat')!
// 大考中心選擇題選項分析 92 年起才有
// 92–99 年數學有幾題多選題，官方表上答對率是空的（表格解析不出來）；98 國文 16 表上正解印成 ABDE、與公布答案 ADE 不同
const NO_STATS = new Set([
  '92-math-6', '92-math-7', '92-math-8', '92-math-9',
  '93-math-7', '93-math-8', '93-math-9', '93-math-11', '94-math-6', '94-math-7', '94-math-8', '94-math-9',
  '95-math-6', '95-math-7', '95-math-8', '95-math-9', '96-math-6', '96-math-7', '96-math-8', '96-math-9',
  '97-math-6', '97-math-7', '97-math-8', '97-math-9', '98-math-7', '98-math-8', '98-math-9', '99-math-8', '99-math-9',
  '98-chinese-16',
])
const questions = paperQuestions(gsat.papers.filter(paper => paper.year >= 92)).filter(q => !NO_STATS.has(q.id))

describe('每題選項比例（大考中心選擇題選項分析）', () => {
  it('EveryGsatQuestion_ShouldHaveOfficialStats', () => {
    const missing = questions.filter(q => !itemStatsFor(q.id)).map(q => q.id)

    expect(missing).toEqual([])
  })

  it('OfficialKey_ShouldMatchSiteAnswer', () => {
    // 官方表上打 * 的選項就是正解；對不上代表題號或科目接錯
    const mismatched = questions
      .filter(q => itemStatsFor(q.id)?.key !== [...q.answer].sort().join(''))
      .map(q => `${q.id}: ${q.answer} vs ${itemStatsFor(q.id)?.key}`)

    expect(mismatched).toEqual([])
  })
})
