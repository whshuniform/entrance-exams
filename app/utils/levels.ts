import type { GradeResult, LevelStats, NumberRange, QuizPaper, RankRange, SubjectReport } from '~/types/quiz'

const round2 = (value: number) => Math.round(value * 100) / 100

/** 原始得分 → 級分（依該年官方級分表；學測、分科 0 分為 0 級分，會考 0 題仍是 C） */
export function toLevel(stats: LevelStats, raw: number): number {
  return stats.levels.find(({ above }) => raw > above)?.level ?? 0
}

/** 該級分在全國的名次區間：第（高於此級分人數 + 1）名到第（此級分以上人數）名 */
export function rankRange(stats: LevelStats, level: number): RankRange {
  const above = Object.entries(stats.counts)
    .filter(([key]) => Number(key) > level)
    .reduce((sum, [, count]) => sum + count, 0)
  return { best: above + 1, worst: above + (stats.counts[level] ?? 0), total: stats.total }
}

/** 級分落在 minLevel～maxLevel 時的名次範圍 */
export function rankBetween(stats: LevelStats, minLevel: number, maxLevel: number): RankRange {
  return { best: rankRange(stats, maxLevel).best, worst: rankRange(stats, minLevel).worst, total: stats.total }
}

/** 試作只有部分題目：沒考到的題目全錯到全對，得到整卷分數的範圍 */
export function scoreRange(earned: number, sampleMax: number, fullMarks: number): NumberRange {
  return { min: round2(earned), max: round2(earned + Math.max(fullMarks - sampleMax, 0)) }
}

/** 一科的成績：試作得分 → 整卷分數範圍 → 級分範圍 → 全國名次範圍 */
export function buildReport(paper: QuizPaper, results: Record<string, GradeResult>): SubjectReport {
  const questions = paperQuestions([paper])
  const earned = round2(questions.reduce((sum, q) => sum + (results[q.id]?.score ?? 0), 0))
  const sampleMax = questions.reduce((sum, q) => sum + q.points, 0)
  const scores = scoreRange(earned, sampleMax, paper.fullMarks)
  const levelRange = { min: toLevel(paper.stats, scores.min), max: toLevel(paper.stats, scores.max) }
  const rank = rankBetween(paper.stats, levelRange.min, levelRange.max)
  const labelOf = (level: number) => paper.stats.levels.find(row => row.level === level)?.label
  const labels = { min: labelOf(levelRange.min), max: labelOf(levelRange.max) }
  // 會考：「這個標示以上的人占幾 %」，最好情況取最高標示、最差取最低標示
  const percentAtOrAbove = (level: number) => round2(rankRange(paper.stats, level).worst / rank.total * 100)
  return {
    subject: paper.subject,
    year: paper.year,
    earned,
    sampleMax,
    fullMarks: paper.fullMarks,
    scoreRange: scores,
    levelRange,
    rank,
    ...(labels.min && labels.max ? { labelRange: { min: labels.min, max: labels.max } } : {}),
    ...(paper.stats.totalUnknown ? { totalUnknown: true } : {}),
    ...(paper.stats.rawScore ? { rawScore: true } : {}),
    ...(paper.stats.noRank ? { noRank: true } : {}),
    ...(paper.stats.percentOnly ? { percentRange: { min: percentAtOrAbove(levelRange.max), max: percentAtOrAbove(levelRange.min) } } : {}),
  }
}
