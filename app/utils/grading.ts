import type { Accuracy, GradeResult, QuizQuestion } from '~/types/quiz'

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

/** 隨機抽題的成績：只算整題答對的題數（多選題要全對），沒作答算錯；答對率取整數百分比 */
export function buildAccuracy(questions: QuizQuestion[], results: Record<string, GradeResult>): Accuracy {
  const correct = questions.filter(question => results[question.id]?.isCorrect).length
  const total = questions.length
  return { correct, total, rate: total ? Math.round(correct / total * 100) : 0 }
}
