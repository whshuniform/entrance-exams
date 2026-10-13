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
