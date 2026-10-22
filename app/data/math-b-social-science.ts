import type { QuizPaper } from '~/types/quiz'
import { mathBStats, scienceStats, socialStats } from './stats-math-b-social-science'

/** 109–110 年社會（歷史 101課綱、地理與公民 99課綱）、自然（99課綱微調）；111 年起都是 108課綱 */
const curriculumOf = (id: string, year: number) => {
  if (year >= 111) return '108課綱'
  return id === 'science' ? '99課綱微調' : '99課綱'
}

const paper = (id: string, subject: string, year: number, minutes: number, fullMarks: number, stats: QuizPaper['stats']): QuizPaper => ({
  id,
  exam: '學測',
  subject,
  year,
  curriculum: curriculumOf(id, year),
  minutes,
  fullMarks,
  stats,
  parts: [],
})

const years = (from: number) => Array.from({ length: 116 - from }, (_, i) => from + i)

/**
 * 學測數學B（111–115）、社會、自然（109–115）：題目全部轉成文字（app/data/full、app/data/text），這裡只放試卷資料。
 * 原卷卷頭考試時間：數學B 100 分鐘、社會和自然 110 分鐘；整卷滿分（含非選擇題）：數學B 100、社會 144、自然 128（gsat/stats/exam_specs.json）。
 */
export const mathBSocialScience: QuizPaper[] = [
  ...years(111).map(year => paper('math-b', '數學B', year, 100, 100, mathBStats[year]!)),
  ...years(109).map(year => paper('social', '社會', year, 110, 144, socialStats[year]!)),
  ...years(109).map(year => paper('science', '自然', year, 110, 128, scienceStats[year]!)),
]
