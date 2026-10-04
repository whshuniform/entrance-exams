import type { MarkupSegment } from '~/types/quiz'

/** 把 __文字__ 拆成畫底線片段，避免使用 v-html */
export function parseMarkup(text: string): MarkupSegment[] {
  return text
    .split(/(__[^_]+__)/)
    .filter(Boolean)
    .map(part => {
      const underline = part.startsWith('__') && part.endsWith('__')
      return { text: underline ? part.slice(2, -2) : part, underline }
    })
}
