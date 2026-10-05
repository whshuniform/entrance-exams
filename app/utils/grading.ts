import type { GradeResult, QuizQuestion } from '~/types/quiz'

const toSet = (value: string) => new Set(value.replace(/[^A-Z0-9]/g, '').split('').filter(Boolean))

/**
 * 依學測計分方式批改一題。
 * 單選：答對得全分，其餘 0。
 * 多選：各選項獨立判定，錯 k 個得 (n-2k)/n，低於 0 或全未作答得 0。
 */
export function gradeQuestion(question: QuizQuestion, response: string): GradeResult {
  const picked = toSet(response)
  const answer = toSet(question.answer)
  const wrongCount = question.options.filter(({ key }) => picked.has(key) !== answer.has(key)).length
  const isCorrect = picked.size > 0 && wrongCount === 0

  if (question.type === 'single') {
    return { score: isCorrect ? question.points : 0, isCorrect, wrongCount }
  }

  if (picked.size === 0) {
    return { score: 0, isCorrect: false, wrongCount }
  }

  const n = question.options.length
  const score = Math.max(0, (question.points * (n - 2 * wrongCount)) / n)
  return { score, isCorrect, wrongCount }
}
