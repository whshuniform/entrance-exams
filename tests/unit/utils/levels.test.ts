import { describe, it, expect } from 'vitest'
import { buildReport, rankBetween, rankRange, scoreRange, toLevel } from '~/utils/levels'
import { stats115 } from '~/data/stats-115'
import { sample115Papers } from '~/data/sample-115-papers'
import type { QuizPaper, QuizQuestion } from '~/types/quiz'

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

describe('rankBetween', () => {
  it('rankBetween_LevelRange_ShouldSpanFromHighestToLowest', () => {
    // 最好：12 級分的第一名；最差：11 級分的最後一名
    expect(rankBetween(chinese, 11, 12)).toEqual({ best: 20277, worst: 58183, total: 118026 })
  })
})

describe('scoreRange', () => {
  it('scoreRange_PartOfPaper_ShouldAssumeUnseenQuestionsAllWrongToAllRight', () => {
    // 試作 14 分拿 8.4；沒考到的 86 分可能全錯（+0）也可能全對（+86）
    expect(scoreRange(8.4, 14, 100)).toEqual({ min: 8.4, max: 94.4 })
  })

  it('scoreRange_WholePaper_ShouldBeExact', () => {
    expect(scoreRange(60, 100, 100)).toEqual({ min: 60, max: 60 })
  })

  it('scoreRange_ShouldRoundToTwoDecimals', () => {
    expect(scoreRange(2.4, 14, 100)).toEqual({ min: 2.4, max: 88.4 })
  })
})

describe('buildReport', () => {
  it('buildReport_AllSampleCorrect_ShouldGiveRangeOfLevelsAndRanks', () => {
    const paper = sample115Papers[0]!
    const results = Object.fromEntries(
      paper.parts.flatMap(part => part.groups.flatMap(group => group.questions))
        .map(question => [question.id, { score: question.points, isCorrect: true, wrongCount: 0 }]),
    )

    // 整卷 14～100 分 → 3～15 級分 → 全國第 1～117,401 名（與 gsat/scripts/score.py 相同）
    expect(buildReport(paper, results)).toEqual({
      subject: '國語文綜合能力測驗',
      year: 115,
      earned: 14,
      sampleMax: 14,
      fullMarks: 100,
      scoreRange: { min: 14, max: 100 },
      levelRange: { min: 3, max: 15 },
      rank: { best: 1, worst: 117401, total: 118026 },
    })
  })

  it('buildReport_PartialScore_ShouldWidenToLowestLevel', () => {
    const paper = sample115Papers[0]!
    const results = { '115-chinese-25': { score: 2.4, isCorrect: false, wrongCount: 1 } }

    const report = buildReport(paper, results)

    expect(report.scoreRange).toEqual({ min: 2.4, max: 88.4 })
    expect(report.levelRange).toEqual({ min: 1, max: 15 })
    expect(report.rank).toEqual({ best: 1, worst: 118018, total: 118026 })
  })

  it('buildReport_WholePaper_ShouldGiveSingleLevel', () => {
    const base = sample115Papers[0]!
    const whole: QuizQuestion = { ...base.parts[0]!.groups[0]!.questions[0]!, id: 'whole', points: 100 }
    const paper: QuizPaper = { ...base, parts: [{ title: 'p', groups: [{ title: 'g', note: '', questions: [whole] }] }] }

    const report = buildReport(paper, { whole: { score: 60, isCorrect: false, wrongCount: 0 } })

    expect(report.levelRange).toEqual({ min: 12, max: 12 })
    expect(report.rank).toEqual({ best: 20277, worst: 37654, total: 118026 })
  })
})
