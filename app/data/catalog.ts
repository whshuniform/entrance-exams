import type { ExamKind } from '~/types/quiz'
import { sample115Papers } from './sample-115-papers'
import { sampleChinese109To114 } from './sample-chinese-109-114'
import { sampleEnglish109To115 } from './sample-english-109-115'
import { withFullPapers } from './full-papers'
import { mathA111To114 } from './math-a-111-114'
import { mathBSocialScience } from './math-b-social-science'
import { astPapers, capPapers } from './ast-cap-papers'

/** 學測科目照國、英、數的順序排，同一科年度由舊到新 */
const GSAT_SUBJECTS = ['chinese', 'english', 'math-a', 'math-b', 'social', 'science']
// 有整份考卷資料的年度科目換成整份（原卷截圖＋已轉成文字的題目）
const gsatPapers = withFullPapers([...sampleChinese109To114, ...sampleEnglish109To115, ...mathA111To114, ...mathBSocialScience, ...sample115Papers])

const CEEC = '大學入學考試中心'

/** 首頁可選的考試項目。分科 111 年起沒有英文，不背單字 */
export const examCatalog: ExamKind[] = [
  {
    id: 'gsat',
    name: '大學學測',
    fullName: '大學學科能力測驗',
    source: CEEC,
    papers: GSAT_SUBJECTS.flatMap(id => gsatPapers.filter(paper => paper.id === id)),
    vocabHint: '大考中心參考詞彙表，排每天要背的字',
  },
  { id: 'ast', name: '分科測驗', fullName: '大學分科測驗', source: CEEC, papers: astPapers },
  { id: 'cap', name: '國中會考', fullName: '國中教育會考', source: '國家教育研究院心理與教育測驗研究發展中心', papers: capPapers, vocabHint: '課綱基本 1,200 字，排每天要背的字' },
]

/** 網址上的考試代號找考試；找不到回傳 undefined */
export function findExam(id: string) {
  return examCatalog.find(exam => exam.id === id)
}
