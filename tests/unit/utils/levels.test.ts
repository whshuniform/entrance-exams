import { describe, it, expect } from 'vitest'
import { buildReport, rankBetween, rankRange, scoreRange, toLevel } from '~/utils/levels'
import { stats115 } from '~/data/stats-115'
import { sample115Papers } from '~/data/sample-115-papers'
import type { LevelStats, QuizPaper, QuizQuestion } from '~/types/quiz'

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

describe('toLevel 會考標示', () => {
  it('toLevel_CapLabels_ZeroCorrectShouldStillBeLowestLabel', () => {
    // 會考標示 C 從答對 0 題起算
    const cap: LevelStats = {
      levels: [{ level: 2, above: 16.99, label: 'B' }, { level: 1, above: -1, label: 'C' }],
      counts: { 2: 10, 1: 5 },
      total: 15,
    }

    expect(toLevel(cap, 0)).toBe(1)
    expect(toLevel(cap, 17)).toBe(2)
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

  it('buildReport_CapPaper_ShouldGiveLabelRangeAndPercentInsteadOfRank', () => {
    // 會考沒有名次：標示範圍 + 「這個標示以上約前幾 %」（A 以上 20%、B 以上 50%）
    const base = sample115Papers[0]!
    const question: QuizQuestion = { ...base.parts[0]!.groups[0]!.questions[0]!, id: 'cap-1', points: 1 }
    const paper: QuizPaper = {
      ...base,
      fullMarks: 2,
      stats: {
        levels: [{ level: 3, above: 1.99, label: 'A' }, { level: 2, above: 0.99, label: 'B' }, { level: 1, above: -1, label: 'C' }],
        counts: { 3: 20, 2: 30, 1: 50 },
        total: 100,
        percentOnly: true,
      },
      parts: [{ title: '', groups: [{ title: '', note: '', questions: [question] }] }],
    }

    const report = buildReport(paper, { 'cap-1': { score: 1, isCorrect: true, wrongCount: 0 } })

    expect(report.levelRange).toEqual({ min: 2, max: 3 })
    expect(report.labelRange).toEqual({ min: 'B', max: 'A' })
    expect(report.percentRange).toEqual({ min: 20, max: 50 })
  })

  it('buildReport_TotalUnknown_ShouldSaySo', () => {
    // 90、91 學測只有百分比、沒有到考人數
    const base = sample115Papers[0]!
    const paper: QuizPaper = { ...base, stats: { ...base.stats, percentOnly: true, totalUnknown: true } }

    const report = buildReport(paper, {})

    expect(report.totalUnknown).toBe(true)
    expect(report.percentRange).toBeDefined()
  })

  it('buildReport_ZhiKaoRawScore_ShouldMarkReportAsRawScore', () => {
    const base = sample115Papers[0]!
    const question: QuizQuestion = { ...base.parts[0]!.groups[0]!.questions[0]!, id: 'zk-1', points: 100 }
    const paper: QuizPaper = {
      ...base,
      stats: { levels: [{ level: 2, above: 1.99 }, { level: 1, above: 0.99 }], counts: { 2: 3, 1: 4, 0: 1 }, total: 8, rawScore: true },
      parts: [{ title: '', groups: [{ title: '', note: '', questions: [question] }] }],
    }

    const report = buildReport(paper, { 'zk-1': { score: 2, isCorrect: false, wrongCount: 0 } })

    expect(report.rawScore).toBe(true)
    expect(report.rank).toEqual({ best: 1, worst: 3, total: 8 })
  })

  it('buildReport_NoRank_ShouldMarkReportAsNoRank', () => {
    const base = sample115Papers[0]!
    const paper: QuizPaper = { ...base, stats: { levels: [], counts: {}, total: 0, rawScore: true, noRank: true } }

    expect(buildReport(paper, {}).noRank).toBe(true)
  })
})
