import type { ExamKind } from '~/types/quiz'
import { sample115Papers } from './sample-115-papers'
import { sampleChinese109To114 } from './sample-chinese-109-114'
import { sampleEnglish109To115 } from './sample-english-109-115'

/** 學測科目照國、英、數的順序排，同一科年度由舊到新 */
const GSAT_SUBJECTS = ['chinese', 'english', 'math-a']
const gsatPapers = [...sampleChinese109To114, ...sampleEnglish109To115, ...sample115Papers]

/** 首頁可選的考試項目；分科、會考之後補上試卷 */
export const examCatalog: ExamKind[] = [
  {
    id: 'gsat',
    name: '大學學測',
    fullName: '學科能力測驗',
    papers: GSAT_SUBJECTS.flatMap(id => gsatPapers.filter(paper => paper.id === id)),
  },
  { id: 'ast', name: '分科測驗', fullName: '大學分科測驗', papers: [] },
  { id: 'cap', name: '國中會考', fullName: '國中教育會考', papers: [] },
]
