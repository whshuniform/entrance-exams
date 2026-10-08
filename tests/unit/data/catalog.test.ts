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
    // 國文 109–110 年是 101課綱「國文考科」80 分鐘，111 年起是 108課綱國綜 90 分鐘；
    // 英文 109–110 年 99課綱、111 年起 108課綱，都是 100 分鐘（gsat/stats/curriculum_by_year.csv、各年試題卷頭）
    const rows = gsat.papers.map(paper => [paper.id, paper.year, paper.exam, paper.subject, paper.curriculum, paper.minutes])

    expect(rows.sort()).toEqual([
      ['chinese', 109, '學測', '國文', '101課綱', 80],
      ['chinese', 110, '學測', '國文', '101課綱', 80],
      ['chinese', 111, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['chinese', 112, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['chinese', 113, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['chinese', 114, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['chinese', 115, '學測', '國語文綜合能力測驗', '108課綱', 90],
      ['english', 109, '學測', '英文', '99課綱', 100],
      ['english', 110, '學測', '英文', '99課綱', 100],
      ['english', 111, '學測', '英文', '108課綱', 100],
      ['english', 112, '學測', '英文', '108課綱', 100],
      ['english', 113, '學測', '英文', '108課綱', 100],
      ['english', 114, '學測', '英文', '108課綱', 100],
      ['english', 115, '學測', '英文', '108課綱', 100],
      ['math-a', 115, '學測', '數學A', '108課綱', 100],
    ])
  })

  it('Catalog_GsatSubjects_ShouldFollowExamOrderChineseEnglishMath', () => {
    expect([...new Set(gsat.papers.map(paper => paper.id))]).toEqual(['chinese', 'english', 'math-a'])
  })

  it('Catalog_EachSubject_ShouldHaveOnePaperPerYear', () => {
    const keys = gsat.papers.map(paper => `${paper.id}-${paper.year}`)

    expect(new Set(keys).size).toBe(keys.length)
  })

  it('Catalog_QuestionIds_ShouldBeUniqueAcrossYears', () => {
    const ids = paperQuestions(gsat.papers).map(question => question.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('Catalog_EveryAnswer_ShouldBeOneOfItsOwnOptions', () => {
    for (const question of paperQuestions(gsat.papers)) {
      const keys = question.options.map(option => option.key)

      expect([...question.answer].every(key => keys.includes(key)), question.id).toBe(true)
    }
  })

  it('Catalog_EveryQuestion_ShouldHaveStemOptionsAndPoints', () => {
    for (const question of paperQuestions(gsat.papers)) {
      expect(question.stem.trim(), question.id).not.toBe('')
      expect(question.options.every(option => option.text.trim() !== ''), question.id).toBe(true)
      expect(question.points, question.id).toBeGreaterThan(0)
    }
  })

  it('Catalog_EveryPaper_ShouldHaveFifteenLevelsAndTakers', () => {
    for (const paper of gsat.papers) {
      expect(paper.stats.levels.map(level => level.level), `${paper.id}-${paper.year}`).toEqual(
        [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      )
      expect(paper.stats.total, `${paper.id}-${paper.year}`).toBeGreaterThan(0)
    }
  })
})
