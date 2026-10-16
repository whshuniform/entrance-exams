import type { QuizPaper } from '~/types/quiz'
import { withFullPapers } from './full-papers'
import { astStats, capStats } from './stats-ast-cap'

const paper = (exam: string, id: string, subject: string, year: number, minutes: number, fullMarks: number, stats: QuizPaper['stats']): QuizPaper => ({
  id,
  exam,
  subject,
  year,
  // 分科 111 年起、會考 111 年起都依 108課綱命題
  curriculum: '108課綱',
  minutes,
  fullMarks,
  stats,
  parts: [],
})

/** 分科測驗科目：照大考中心考試順序；試題卷頭考試時間 80 分鐘，滿分 100（含非選擇題） */
const AST_SUBJECTS: [string, string][] = [
  ['math-jia', '數學甲'], ['math-yi', '數學乙'], ['physics', '物理'], ['chemistry', '化學'],
  ['biology', '生物'], ['history', '歷史'], ['geography', '地理'], ['civics', '公民與社會'],
]

/** 網站已轉成文字的分科年度（app/data/full、app/data/text 的 ast-<年>-<科目>.json） */
const AST_YEARS = [115]

export const astPapers: QuizPaper[] = withFullPapers(
  AST_SUBJECTS.flatMap(([id, subject]) => AST_YEARS.map(year => paper('分科', id, subject, year, 80, 100, astStats[year]![subject]!))),
  'ast',
)

/**
 * 會考科目：滿分是標示對照用的分數——國文、社會、自然是答對題數；英語只有閱讀，用免考聽力的閱讀對照表（答對題數）；
 * 數學是加權分數（選擇題 85 分＋非選擇題 15 分）。考試時間照試題本封面。
 */
const CAP_SUBJECTS: { id: string, name: string, subject: string, minutes: number, fullMarks: number }[] = [
  { id: 'chinese', name: '國文', subject: '國文', minutes: 70, fullMarks: 42 },
  { id: 'english', name: '英語', subject: '英語（閱讀）', minutes: 60, fullMarks: 43 },
  { id: 'math', name: '數學', subject: '數學', minutes: 80, fullMarks: 100 },
  { id: 'social', name: '社會', subject: '社會', minutes: 70, fullMarks: 54 },
  { id: 'science', name: '自然', subject: '自然', minutes: 70, fullMarks: 50 },
]

const CAP_YEARS = [115]

export const capPapers: QuizPaper[] = withFullPapers(
  CAP_SUBJECTS.flatMap(item => CAP_YEARS.map(year => paper('會考', item.id, item.subject, year, item.minutes, item.fullMarks, capStats[year]![item.name]!))),
  'cap',
)
