import { describe, it, expect } from 'vitest'
import { examCatalog } from '~/data/catalog'
import { paperQuestions } from '~/utils/paper'
import { itemStatsFor } from '~/utils/item-stats'

const gsat = examCatalog.find(exam => exam.id === 'gsat')!
// 大考中心選擇題選項分析 92 年起才有
const questions = paperQuestions(gsat.papers.filter(paper => paper.year >= 92))

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
