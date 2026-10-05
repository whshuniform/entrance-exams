import type { InkStroke, TextRange } from '~/types/quiz'

/** 考生在題本上的標記：螢光筆畫線、刪去法、原子筆筆跡 */
export function useMarks() {
  const highlights = ref<Record<string, TextRange[]>>({})
  const eliminated = ref<Record<string, string[]>>({})
  const ink = ref<Record<string, InkStroke[]>>({})

  function markText(fieldId: string, range: TextRange) {
    highlights.value = {
      ...highlights.value,
      [fieldId]: addRange(highlights.value[fieldId] ?? [], range),
    }
  }

  function eraseText(fieldId: string, range: TextRange) {
    const current = highlights.value[fieldId]
    if (!current?.length) return
    highlights.value = { ...highlights.value, [fieldId]: eraseRange(current, range) }
  }

  function toggleEliminate(questionId: string, key: string) {
    const current = eliminated.value[questionId] ?? []
    const next = current.includes(key) ? current.filter(k => k !== key) : [...current, key].sort()
    eliminated.value = { ...eliminated.value, [questionId]: next }
  }

  function setInk(questionId: string, strokes: InkStroke[]) {
    ink.value = { ...ink.value, [questionId]: strokes }
  }

  function clearAll() {
    highlights.value = {}
    eliminated.value = {}
    ink.value = {}
  }

  return { highlights, eliminated, ink, markText, eraseText, toggleEliminate, setInk, clearAll }
}
