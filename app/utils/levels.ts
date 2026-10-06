import type { GradeResult, LevelStats, QuizPaper, RankRange, SubjectReport } from '~/types/quiz'

/** 原始得分 → 級分（依該年官方級分表；0 分為 0 級分） */
export function toLevel(stats: LevelStats, raw: number): number {
  if (raw <= 0) return 0
  return stats.levels.find(({ above }) => raw > above)?.level ?? 0
}

/** 該級分在全國的名次區間：第（高於此級分人數 + 1）名到第（此級分以上人數）名 */
export function rankRange(stats: LevelStats, level: number): RankRange {
  const above = Object.entries(stats.counts)
    .filter(([key]) => Number(key) > level)
    .reduce((sum, [, count]) => sum + count, 0)
  return { best: above + 1, worst: above + (stats.counts[level] ?? 0), total: stats.total }
}

/** 試作只有幾題：依得分比例換算成整卷分數（四捨五入到小數第二位） */
export function projectScore(earned: number, sampleMax: number, fullMarks: number): number {
  if (sampleMax <= 0) return 0
  return Math.round((earned / sampleMax) * fullMarks * 100) / 100
}

/** 一科的成績：試作得分 → 換算整卷 → 級分 → 全國名次 */
export function buildReport(paper: QuizPaper, results: Record<string, GradeResult>): SubjectReport {
  const questions = paperQuestions([paper])
  const earned = Math.round(questions.reduce((sum, q) => sum + (results[q.id]?.score ?? 0), 0) * 100) / 100
  const sampleMax = questions.reduce((sum, q) => sum + q.points, 0)
  const projected = projectScore(earned, sampleMax, paper.fullMarks)
  const level = toLevel(paper.stats, projected)
  return {
    subject: paper.subject,
    earned,
    sampleMax,
    projected,
    fullMarks: paper.fullMarks,
    level,
    rank: rankRange(paper.stats, level),
  }
}
