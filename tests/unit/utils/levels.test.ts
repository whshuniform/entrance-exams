import { describe, it, expect } from 'vitest'
import { buildReport, projectScore, rankRange, toLevel } from '~/utils/levels'
import { stats115 } from '~/data/stats-115'
import { sample115Papers } from '~/data/sample-115-papers'

const chinese = stats115['國文']
const math = stats115['數學A']

describe('toLevel', () => {
  it('toLevel_MiddleScore_ShouldUseOfficialTable', () => {
    // 115 國文：56.17 < 60 ≤ 61.27 → 12 級分（與 gsat/scripts/score.py 結果相同）
    expect(toLevel(chinese, 60)).toBe(12)
  })

  it('toLevel_ExactlyOnLowerBound_ShouldStayInLowerLevel', () => {
    // 級分表區間是「大於下限」才算
    expect(toLevel(chinese, 71.48)).toBe(14)
    expect(toLevel(chinese, 71.49)).toBe(15)
  })

  it('toLevel_ZeroAndFullMarks_ShouldBeZeroAndFifteen', () => {
    expect(toLevel(chinese, 0)).toBe(0)
    expect(toLevel(math, 100)).toBe(15)
  })
})

describe('rankRange', () => {
  it('rankRange_SameLevel_ShouldGiveRangeFromHeadcounts', () => {
    expect(rankRange(chinese, 12)).toEqual({ best: 20277, worst: 37654, total: 118026 })
  })

  it('rankRange_TopLevel_ShouldStartFromFirst', () => {
    expect(rankRange(math, 15)).toEqual({ best: 1, worst: 1112, total: 90579 })
  })
})

describe('projectScore', () => {
  it('projectScore_HalfOfSample_ShouldBeHalfOfFullMarks', () => {
    expect(projectScore(7, 14, 100)).toBe(50)
  })

  it('projectScore_ShouldRoundToTwoDecimals', () => {
    expect(projectScore(2.4, 14, 100)).toBe(17.14)
  })

  it('projectScore_EmptySample_ShouldBeZero', () => {
    expect(projectScore(0, 0, 100)).toBe(0)
  })
})

describe('buildReport', () => {
  it('buildReport_AllCorrect_ShouldBeFifteenWithTopRank', () => {
    const paper = sample115Papers[0]!
    const results = Object.fromEntries(
      paper.parts.flatMap(part => part.groups.flatMap(group => group.questions))
        .map(question => [question.id, { score: question.points, isCorrect: true, wrongCount: 0 }]),
    )

    expect(buildReport(paper, results)).toEqual({
      subject: '國語文綜合能力測驗',
      earned: 14,
      sampleMax: 14,
      projected: 100,
      fullMarks: 100,
      level: 15,
      rank: { best: 1, worst: 2563, total: 118026 },
    })
  })

  it('buildReport_PartialScore_ShouldProjectThenConvert', () => {
    const paper = sample115Papers[0]!
    const results = { '115-chinese-25': { score: 2.4, isCorrect: false, wrongCount: 1 } }

    const report = buildReport(paper, results)

    expect(report.projected).toBe(17.14)
    expect(report.level).toBe(4)
    expect(report.rank).toEqual({ best: 115251, worst: 116472, total: 118026 })
  })
})
