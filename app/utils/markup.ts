import type { MarkupSegment } from '~/types/quiz'

/** 原卷的填空線，例如英文詞彙題的「＿＿＿＿」 */
const BLANK = /(＿+)/

/** 把 __文字__ 拆成畫底線片段、填空線拆成自己的片段，避免使用 v-html */
export function parseMarkup(text: string): MarkupSegment[] {
  return text
    .split(/(__[^_]+__)/)
    .filter(Boolean)
    .flatMap((part): MarkupSegment[] => {
      if (part.startsWith('__') && part.endsWith('__')) return [{ text: part.slice(2, -2), underline: true }]
      return part
        .split(BLANK)
        .filter(Boolean)
        .map(piece => (BLANK.test(piece) ? { text: piece, underline: false, blank: true } : { text: piece, underline: false }))
    })
}
