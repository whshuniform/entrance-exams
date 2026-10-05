import type { ScratchStroke, TextRange } from '~/types/quiz'

/** 考生在題本上的標記：螢光筆畫線、刪去法、計算紙 */
export function useMarks() {
  const highlights = ref<Record<string, TextRange[]>>({})
  const eliminated = ref<Record<string, string[]>>({})
  const scratch = ref<Record<string, ScratchStroke[]>>({})

  function markText(fieldId: string, range: TextRange) {
    highlights.value = {
      ...highlights.value,
      [fieldId]: toggleRange(highlights.value[fieldId] ?? [], range),
    }
  }

  function toggleEliminate(questionId: string, key: string) {
    const current = eliminated.value[questionId] ?? []
    const next = current.includes(key) ? current.filter(k => k !== key) : [...current, key].sort()
    eliminated.value = { ...eliminated.value, [questionId]: next }
  }

  function setScratch(questionId: string, strokes: ScratchStroke[]) {
    scratch.value = { ...scratch.value, [questionId]: strokes }
  }

  function clearAll() {
    highlights.value = {}
    eliminated.value = {}
    scratch.value = {}
  }

  return { highlights, eliminated, scratch, markText, toggleEliminate, setScratch, clearAll }
}
