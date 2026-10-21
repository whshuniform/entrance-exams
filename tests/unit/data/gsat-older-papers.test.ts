import { describe, it, expect } from 'vitest'
import { findExam } from '~/data/catalog'
import { gsatOlderPapers } from '~/data/gsat-older-papers'
import { paperQuestions } from '~/utils/paper'
import { toLevel } from '~/utils/levels'

const gsat = findExam('gsat')!
const paperOf = (id: string, year: number) => gsat.papers.find(paper => paper.id === id && paper.year === year)

describe('學測 83–110 舊卷', () => {
  it('GsatOlderPapers_ShouldOnlyListPapersAlreadyConvertedToText', () => {
    // 只收 app/data/full、app/data/text 都有的年度科目；109–110 國文、英文、社會、自然原本就有，不重複
    for (const paper of gsatOlderPapers) {
      expect(paperQuestions([paper]).length, `${paper.id}-${paper.year}`).toBeGreaterThan(0)
      expect(paper.year <= 108 || paper.id === 'math', `${paper.id}-${paper.year}`).toBe(true)
    }
  })

  it('GsatMath_ShouldComeRightAfterEnglishWithNumberedOptions', () => {
    // 110 年以前只有一份「數學」，排在英文後面、數學A 前面；選項 (1)…(5)
    expect([...new Set(gsat.papers.map(paper => paper.id))].slice(0, 4)).toEqual(['chinese', 'english', 'math', 'math-a'])
    const math110 = paperOf('math', 110)!

    expect([math110.subject, math110.curriculum, math110.minutes, math110.fullMarks]).toEqual(['數學', '99課綱微調', 100, 100])
    expect(paperQuestions([math110]).map(q => q.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    expect(paperQuestions([math110])[0]!.options.map(option => option.key)).toEqual(['1', '2', '3', '4', '5'])
    expect(paperQuestions([math110])[0]!.id).toBe('110-math-1')
  })

  it('Gsat108_ShouldUseOriginalExamTimeAndCurriculum', () => {
    // 108 年卷頭：國文（選擇題）80 分鐘、英文 100 分鐘；國文 101課綱、英文 99課綱
    expect([paperOf('chinese', 108)?.minutes, paperOf('chinese', 108)?.curriculum]).toEqual([80, '101課綱'])
    expect([paperOf('english', 108)?.minutes, paperOf('english', 108)?.curriculum, paperOf('english', 108)?.fullMarks]).toEqual([100, '99課綱', 100])
  })

  it('Gsat108Math_ShouldUseThatYearsLevelTable', () => {
    // 108 數學級分表（gsat/stats/conversion.json）：15 級分下限 93.39、1 級分 0.01 以上
    const stats = paperOf('math', 108)!.stats

    expect(stats.levels).toHaveLength(15)
    expect(toLevel(stats, 93.39)).toBe(15)
    expect(toLevel(stats, 93.38)).toBe(14)
    expect(toLevel(stats, 0)).toBe(0)
    expect(stats.total).toBeGreaterThan(100000)
  })
})
