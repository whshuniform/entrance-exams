import type { QuizPaper } from '~/types/quiz'
import { mathAStats111To114 } from './stats-math-a-111-114'

/**
 * 111–114 學年度學測數學A：題目全部用原卷截圖（app/data/full/<年度>-math-a.json），這裡只放試卷資料。
 * 108課綱、原卷卷頭考試時間 100 分鐘、整卷 100 分。
 */
export const mathA111To114: QuizPaper[] = [111, 112, 113, 114].map(year => ({
  id: 'math-a',
  exam: '學測',
  subject: '數學A',
  year,
  curriculum: '108課綱',
  minutes: 100,
  fullMarks: 100,
  stats: mathAStats111To114[year]!,
  parts: [],
}))
