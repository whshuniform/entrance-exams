import type { QuizPaper } from '~/types/quiz'
import { fullPaperData, textPaperData, withFullPapers } from './full-papers'
import { gsatOldInfo, gsatOldStats } from './stats-gsat-83-110'

/** 學測 110 年以前的科目：國文（106 年以前整份國文、107–110 國文考科）、英文、數學（110 年以前只有一份）、社會、自然 */
const OLD_SUBJECTS: [string, string][] = [['chinese', '國文'], ['english', '英文'], ['math', '數學'], ['social', '社會'], ['science', '自然']]

/** 109、110 年除了數學，其他科原本就有（sample-chinese-109-114、sample-english-109-115、math-b-social-science） */
const isNew = (id: string, year: number) => year <= 108 || id === 'math'

/**
 * 學測 83–110 舊卷：題目全部轉成文字（app/data/full、app/data/text 的 <年>-<科目>.json），兩個檔都有的年度科目才放上網站；
 * 試卷資料（滿分、考試時間、課綱、級分表）在 stats-gsat-83-110.ts。
 */
export const gsatOlderPapers: QuizPaper[] = withFullPapers(
  Object.keys(gsatOldStats).map(Number).flatMap(year => OLD_SUBJECTS
    .filter(([id]) => isNew(id, year) && fullPaperData[`${year}-${id}`] && textPaperData[`${year}-${id}`])
    .map(([id, subject]): QuizPaper => {
      const info = gsatOldInfo[year]![subject]!
      return { id, exam: '學測', subject, year, curriculum: info.curriculum, minutes: info.minutes, fullMarks: info.fullMarks, stats: gsatOldStats[year]![subject]!, parts: [] }
    })),
)
