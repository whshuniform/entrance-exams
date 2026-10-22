import type { QuizQuestion } from '~/types/quiz'

/** 題組最後的選項，例如「(A) retain」 */
const LEAD_OPTION = /^\(([A-Z])\)\s*(.+)$/

/**
 * 文意選填、篇章結構的選項文字印在題組最後，題目本身只有作答圈；
 * 跳出視窗作答時把題組裡的選項文字補回題目的選項。選項本來就有文字時原樣回傳。
 */
export function withLeadOptions(question: QuizQuestion): QuizQuestion {
  if (!question.lead || question.options.some(option => option.text !== '' || option.figure)) return question
  const texts = new Map<string, string>()
  for (const block of question.lead.blocks) {
    const match = typeof block === 'string' ? LEAD_OPTION.exec(block) : null
    if (match) texts.set(match[1]!, match[2]!)
  }
  if (!texts.size) return question
  return { ...question, options: question.options.map(option => ({ ...option, text: texts.get(option.key) ?? '' })) }
}

/** 選項文字在題組裡（文意選填、篇章結構）：同一組題目共用一份選項，每個選項只能用一次 */
function isPooled(question: QuizQuestion) {
  return withLeadOptions(question) !== question
}

/** 同一題組裡別題已經選走的選項（只有共用選項的題組才算） */
export function takenKeys(question: QuizQuestion, questions: QuizQuestion[], answers: Record<string, string>): string[] {
  const lead = question.lead
  if (!lead || !isPooled(question)) return []
  const keys = questions
    .filter(item => item.id !== question.id && item.lead?.id === lead.id)
    .flatMap(item => (answers[item.id] ?? '').split('').filter(Boolean))
  return [...new Set(keys)]
}
