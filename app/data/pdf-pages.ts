import type { QuizQuestion } from '~/types/quiz'

/**
 * 原試題 PDF 每一頁從第幾題開始（gsat/<年度>/<科目>/question.pdf，用 pdftotext 逐頁找題號）。
 * key 為「年度-科目代號」，值為 { PDF 頁碼: 該頁第一題的題號 }；網站依此把同一頁的題目排在同一頁。
 */
const PAGE_STARTS: Record<string, Record<number, number>> = {
  '109-chinese': { 2: 1, 3: 7, 4: 12, 5: 16, 6: 19, 7: 22, 8: 26, 9: 29, 10: 31, 11: 35, 12: 39 },
  '110-chinese': { 2: 1, 3: 6, 4: 11, 5: 15, 6: 20, 7: 22, 8: 26, 9: 29, 10: 33, 11: 37 },
  '111-chinese': { 2: 1, 3: 7, 4: 11, 5: 14, 6: 20, 7: 23, 8: 27, 9: 30, 10: 33, 11: 34, 12: 35 },
  '112-chinese': { 2: 1, 3: 6, 4: 10, 5: 13, 6: 18, 7: 22, 8: 26, 9: 30, 10: 31, 11: 33, 12: 36 },
  '113-chinese': { 2: 1, 3: 6, 4: 9, 5: 12, 6: 16, 7: 18, 8: 23, 9: 27, 10: 30, 11: 32, 12: 33 },
  '114-chinese': { 2: 1, 3: 6, 4: 9, 5: 13, 6: 15, 7: 17, 8: 22, 9: 26, 10: 29, 12: 32 },
  '115-chinese': { 2: 1, 3: 6, 4: 9, 5: 11, 6: 16, 7: 19, 8: 22, 9: 26, 10: 30, 11: 32, 12: 33 },
  '109-english': { 2: 1 },
  '110-english': { 2: 1 },
  '111-english': { 2: 1, 3: 11 },
  '112-english': { 2: 1, 3: 11 },
  '113-english': { 2: 1, 3: 11 },
  '114-english': { 2: 1, 3: 11 },
  '115-english': { 2: 1, 3: 11 },
  '115-math-a': { 2: 1, 3: 5 },
}

/** 某年某科第 number 題在原試題 PDF 的第幾頁；沒有資料時為 undefined */
export function pdfPageOf(year: number, subjectId: string, number: number): number | undefined {
  const starts = PAGE_STARTS[`${year}-${subjectId}`]
  if (!starts) return undefined
  const pages = Object.entries(starts).filter(([, first]) => first <= number).map(([page]) => Number(page))
  return pages.length ? Math.max(...pages) : undefined
}

/** 幫題目標上它在原試題 PDF 的第幾頁（不改到原本的題目） */
export function withPdfPages(year: number, subjectId: string, questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map((question) => {
    const pdfPage = pdfPageOf(year, subjectId, question.number)
    return pdfPage ? { ...question, pdfPage } : question
  })
}
