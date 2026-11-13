import type { QuizPaper } from '~/types/quiz'
import { fullPaperData, textPaperData, withFullPapers } from './full-papers'
import { astInfo, astStats, capInfo, capStats } from './stats-ast-cap'

/** 分科（111 起）、指考（91–110）科目：照大考中心考試順序；國文、英文只有指考 */
const AST_SUBJECTS: [string, string][] = [
  ['chinese', '國文'], ['english', '英文'],
  ['math-jia', '數學甲'], ['math-yi', '數學乙'], ['physics', '物理'], ['chemistry', '化學'],
  ['biology', '生物'], ['history', '歷史'], ['geography', '地理'], ['civics', '公民與社會'],
]

/**
 * 會考科目：滿分是標示對照用的分數——國文、社會、自然是答對題數；英語只有閱讀（答對題數）；
 * 數學 104 年起是加權分數（選擇題 85 分＋非選擇題 15 分）。
 */
const CAP_SUBJECTS: [string, string, string][] = [
  ['chinese', '國文', '國文'], ['english', '英語', '英語（閱讀）'], ['math', '數學', '數學'],
  ['social', '社會', '社會'], ['science', '自然', '自然'],
]

const hasData = (key: string) => Boolean(fullPaperData[key] && textPaperData[key])

/**
 * 分科、指考歷屆：題目轉成文字（app/data/full、app/data/text 的 ast-<年>-<科目>.json），兩個檔都有的年度科目才放上網站；
 * 滿分、考試時間、課綱、級分表（指考是原始分數）在 stats-ast-cap.ts。
 */
export const astPapers: QuizPaper[] = withFullPapers(
  Object.keys(astInfo).map(Number).sort((a, b) => b - a).flatMap(year => AST_SUBJECTS
    .filter(([id, subject]) => astInfo[year]![subject] && hasData(`ast-${year}-${id}`))
    .map(([id, subject]): QuizPaper => {
      const info = astInfo[year]![subject]!
      return { id, exam: year <= 110 ? '指考' : '分科', subject, year, curriculum: info.curriculum, minutes: info.minutes, fullMarks: info.fullMarks, stats: astStats[year]![subject]!, parts: [] }
    })),
  'ast',
)

export const capPapers: QuizPaper[] = withFullPapers(
  Object.keys(capInfo).map(Number).sort((a, b) => b - a).flatMap(year => CAP_SUBJECTS
    .filter(([id, name]) => capInfo[year]![name] && hasData(`cap-${year}-${id}`))
    .map(([id, name, subject]): QuizPaper => {
      const info = capInfo[year]![name]!
      return { id, exam: '會考', subject, year, curriculum: info.curriculum, minutes: info.minutes, fullMarks: info.fullMarks, stats: capStats[year]![name]!, parts: [] }
    })),
  'cap',
)
