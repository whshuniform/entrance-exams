import type { MarkupSegment } from '~/types/quiz'

/** 原卷的填空線，例如英文詞彙題的「＿＿＿＿」 */
const BLANK = /(＿+)/

/** 標記：\$ 一般的錢號、$數學式$、[[題號]] 空格、__底線__、**粗體**、*斜體* */
const TOKEN = /(\\\$|\$[^$]+\$|\[\[\d+\]\]|__[^_]+__|\*\*[^*]+\*\*|\*[^*]+\*)/

function token(part: string): MarkupSegment[] | undefined {
  if (part === '\\$') return [{ text: '$', underline: false }]
  if (part.length > 2 && part.startsWith('$') && part.endsWith('$')) return [{ text: part.slice(1, -1), underline: false, math: true }]
  if (part.startsWith('[[') && part.endsWith(']]')) return [{ text: part.slice(2, -2), underline: false, slot: true }]
  if (part.startsWith('__') && part.endsWith('__')) return [{ text: part.slice(2, -2), underline: true }]
  // 粗體、斜體裡可以再有底線，例如國文的「**__不是__**」
  if (part.startsWith('**') && part.endsWith('**')) return parseMarkup(part.slice(2, -2)).map(segment => ({ ...segment, bold: true }))
  if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return parseMarkup(part.slice(1, -1)).map(segment => ({ ...segment, italic: true }))
  return undefined
}

/** 把標記拆成片段、填空線拆成自己的片段，避免使用 v-html */
export function parseMarkup(text: string): MarkupSegment[] {
  return text
    .split(TOKEN)
    .filter(Boolean)
    .flatMap((part): MarkupSegment[] => {
      const marked = token(part)
      if (marked) return marked
      return part
        .split(BLANK)
        .filter(Boolean)
        .map(piece => (BLANK.test(piece) ? { text: piece, underline: false, blank: true } : { text: piece, underline: false }))
    })
}
