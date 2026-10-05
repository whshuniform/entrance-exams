import type { HighlightSegment, TextRange } from '~/types/quiz'

function normalize({ start, end }: TextRange): TextRange {
  return { start: Math.min(start, end), end: Math.max(start, end) }
}

function merge(ranges: TextRange[]): TextRange[] {
  const sorted = [...ranges].sort((a, b) => a.start - b.start)
  return sorted.reduce<TextRange[]>((acc, range) => {
    const last = acc.at(-1)
    if (last && range.start <= last.end) {
      last.end = Math.max(last.end, range.end)
    } else {
      acc.push({ ...range })
    }
    return acc
  }, [])
}

function subtract(ranges: TextRange[], cut: TextRange): TextRange[] {
  return ranges.flatMap(range => {
    if (range.end <= cut.start || range.start >= cut.end) return [range]
    const pieces: TextRange[] = []
    if (range.start < cut.start) pieces.push({ start: range.start, end: cut.start })
    if (range.end > cut.end) pieces.push({ start: cut.end, end: range.end })
    return pieces
  })
}

/**
 * 螢光筆畫一段：若整段已畫過就擦掉，否則加上並與相鄰區間合併。
 */
export function toggleRange(ranges: TextRange[], range: TextRange): TextRange[] {
  const target = normalize(range)
  if (target.start === target.end) return ranges

  const covered = ranges.some(r => r.start <= target.start && r.end >= target.end)
  return covered ? subtract(ranges, target) : merge([...ranges, target])
}

/** 把含 __底線__ 標記的文字，依畫線區間切成可渲染的片段 */
export function buildSegments(markup: string, ranges: TextRange[]): HighlightSegment[] {
  let offset = 0
  return parseMarkup(markup).flatMap(({ text, underline }) => {
    const segmentStart = offset
    const segmentEnd = offset + text.length
    offset = segmentEnd

    const cuts = ranges
      .flatMap(r => [r.start, r.end])
      .filter(point => point > segmentStart && point < segmentEnd)
    const points = [...new Set([segmentStart, ...cuts, segmentEnd])].sort((a, b) => a - b)

    return points.slice(0, -1).map((start, index) => ({
      text: text.slice(start - segmentStart, points[index + 1]! - segmentStart),
      start,
      underline,
      highlight: ranges.some(r => r.start <= start && start < r.end),
    }))
  })
}
