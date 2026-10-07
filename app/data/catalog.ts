import type { ExamKind } from '~/types/quiz'
import { sample115Papers } from './sample-115-papers'
import { sampleChinese111To114 } from './sample-chinese-111-114'

/** 首頁可選的考試項目；分科、會考之後補上試卷 */
export const examCatalog: ExamKind[] = [
  { id: 'gsat', name: '大學學測', fullName: '學科能力測驗', papers: [...sample115Papers, ...sampleChinese111To114] },
  { id: 'ast', name: '分科測驗', fullName: '大學分科測驗', papers: [] },
  { id: 'cap', name: '國中會考', fullName: '國中教育會考', papers: [] },
]
