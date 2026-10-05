import { describe, it, expect } from 'vitest'
import { buildSegments, toggleRange } from '~/utils/highlight'

describe('toggleRange', () => {
  it('toggleRange_EmptyList_ShouldAddRange', () => {
    expect(toggleRange([], { start: 2, end: 5 })).toEqual([{ start: 2, end: 5 }])
  })

  it('toggleRange_ReversedRange_ShouldNormalize', () => {
    // 從右往左拖也算
    expect(toggleRange([], { start: 5, end: 2 })).toEqual([{ start: 2, end: 5 }])
  })

  it('toggleRange_EmptyRange_ShouldIgnore', () => {
    const ranges = [{ start: 0, end: 3 }]

    expect(toggleRange(ranges, { start: 4, end: 4 })).toEqual(ranges)
  })

  it('toggleRange_OverlappingRange_ShouldMerge', () => {
    const result = toggleRange([{ start: 0, end: 3 }, { start: 8, end: 10 }], { start: 2, end: 6 })

    expect(result).toEqual([{ start: 0, end: 6 }, { start: 8, end: 10 }])
  })

  it('toggleRange_AdjacentRange_ShouldMerge', () => {
    expect(toggleRange([{ start: 0, end: 3 }], { start: 3, end: 5 })).toEqual([{ start: 0, end: 5 }])
  })

  it('toggleRange_AlreadyHighlighted_ShouldErase', () => {
    // 在已畫線處再畫一次 = 擦掉那一段
    const result = toggleRange([{ start: 0, end: 10 }], { start: 3, end: 6 })

    expect(result).toEqual([{ start: 0, end: 3 }, { start: 6, end: 10 }])
  })
})

describe('buildSegments', () => {
  it('buildSegments_NoRanges_ShouldKeepUnderlineSegmentsWithOffsets', () => {
    const result = buildSegments('官商__沆瀣一氣__，貪', [])

    expect(result).toEqual([
      { text: '官商', start: 0, underline: false, highlight: false },
      { text: '沆瀣一氣', start: 2, underline: true, highlight: false },
      { text: '，貪', start: 6, underline: false, highlight: false },
    ])
  })

  it('buildSegments_RangeAcrossUnderline_ShouldSplitAtBoundaries', () => {
    const result = buildSegments('官商__沆瀣一氣__，貪', [{ start: 1, end: 4 }])

    expect(result).toEqual([
      { text: '官', start: 0, underline: false, highlight: false },
      { text: '商', start: 1, underline: false, highlight: true },
      { text: '沆瀣', start: 2, underline: true, highlight: true },
      { text: '一氣', start: 4, underline: true, highlight: false },
      { text: '，貪', start: 6, underline: false, highlight: false },
    ])
  })
})
