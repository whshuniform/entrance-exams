import type { ExamKind } from '~/types/quiz'

/**
 * 只留學測 109 年起的國文、英文、數學A/B、社會、自然（加入 83–110 舊卷之前的題庫）：
 * 設定表、抽題的測試用固定的年度和題數，舊卷陸續補上也不用改測試
 */
export function catalogFrom109(catalog: ExamKind[]): ExamKind[] {
  return catalog.map(exam => (exam.id === 'gsat' ? { ...exam, papers: exam.papers.filter(paper => paper.year >= 109 && paper.id !== 'math') } : exam))
}
