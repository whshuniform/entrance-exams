import type { InkStroke, TextRange } from '~/types/quiz'

/** 考生在題本上的標記：螢光筆畫線、原子筆筆跡（刪去法也是用原子筆劃） */
export function useMarks() {
  const highlights = ref<Record<string, TextRange[]>>({})
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

  function setInk(questionId: string, strokes: InkStroke[]) {
    ink.value = { ...ink.value, [questionId]: strokes }
  }

  function clearAll() {
    highlights.value = {}
    ink.value = {}
  }

  return { highlights, ink, markText, eraseText, setInk, clearAll }
}
