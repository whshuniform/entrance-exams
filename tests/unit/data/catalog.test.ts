import { describe, it, expect } from 'vitest'
import { examCatalog } from '~/data/catalog'

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

  it('Catalog_GsatPapers_ShouldCarryIdYearAndExamTimeOfOriginalPaper', () => {
    const gsat = examCatalog[0]!

    // 考試時間照原試題卷頭：國綜 90 分鐘、數學A 100 分鐘
    expect(gsat.papers.map(paper => [paper.id, paper.year, paper.exam, paper.subject, paper.minutes])).toEqual([
      ['chinese', 115, '學測', '國語文綜合能力測驗', 90],
      ['math-a', 115, '學測', '數學A', 100],
    ])
  })
})
