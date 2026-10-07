import { describe, it, expect } from 'vitest'
import { examCatalog } from '~/data/catalog'
import { paperQuestions } from '~/utils/paper'

const gsat = examCatalog[0]!

describe('examCatalog', () => {
  it('Catalog_ShouldListGsatThenAstThenCap', () => {
    expect(examCatalog.map(exam => [exam.id, exam.name])).toEqual([
      ['gsat', '大學學測'],
      ['ast', '分科測驗'],
      ['cap', '國中會考'],
    ])
  })

  it('Catalog_ForNow_OnlyGsatHasPapers', () => {
    expect(examCatalog.map(exam => exam.papers.length > 0)).toEqual([true, false, false])
  })

  it('Catalog_GsatPapers_ShouldCarryIdYearCurriculumAndExamTimeOfOriginalPaper', () => {
    // 國綜 111–115 年、數學A 115 年，都是 108課綱；考試時間照原試題卷頭
    const rows = gsat.papers.map(paper => [paper.id, paper.year, paper.exam, paper.subject, paper.curriculum, paper.minutes])

    expect(rows.sort()).toEqual([
      ['chinese', 111, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['chinese', 112, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['chinese', 113, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['chinese', 114, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['chinese', 115, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['math-a', 115, '學測', '數學A', '108課綱', 100],
    ])
  })

  it('Catalog_EachSubject_ShouldHaveOnePaperPerYear', () => {
    const keys = gsat.papers.map(paper => `${paper.id}-${paper.year}`)

    expect(new Set(keys).size).toBe(keys.length)
  })

  it('Catalog_QuestionIds_ShouldBeUniqueAcrossYears', () => {
    const ids = paperQuestions(gsat.papers).map(question => question.id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})
