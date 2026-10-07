import { describe, it, expect } from 'vitest'
import { addRange, buildSegments, eraseRange } from '~/utils/highlight'

describe('addRange', () => {
  it('addRange_EmptyList_ShouldAddRange', () => {
    expect(addRange([], { start: 2, end: 5 })).toEqual([{ start: 2, end: 5 }])
  })

  it('addRange_ReversedRange_ShouldNormalize', () => {
    // 從右往左拖也算
    expect(addRange([], { start: 5, end: 2 })).toEqual([{ start: 2, end: 5 }])
  })

  it('addRange_EmptyRange_ShouldIgnore', () => {
    const ranges = [{ start: 0, end: 3 }]

    expect(addRange(ranges, { start: 4, end: 4 })).toEqual(ranges)
  })

  it('addRange_OverlappingRange_ShouldMerge', () => {
    const result = addRange([{ start: 0, end: 3 }, { start: 8, end: 10 }], { start: 2, end: 6 })

    expect(result).toEqual([{ start: 0, end: 6 }, { start: 8, end: 10 }])
  })

  it('addRange_AdjacentRange_ShouldMerge', () => {
    expect(addRange([{ start: 0, end: 3 }], { start: 3, end: 5 })).toEqual([{ start: 0, end: 5 }])
  })

  it('addRange_AlreadyHighlighted_ShouldKeepIt', () => {
    // 螢光筆只負責畫，擦掉交給橡皮擦
    expect(addRange([{ start: 0, end: 10 }], { start: 3, end: 6 })).toEqual([{ start: 0, end: 10 }])
  })
})

describe('eraseRange', () => {
  it('eraseRange_InsideHighlight_ShouldSplitIt', () => {
    const result = eraseRange([{ start: 0, end: 10 }], { start: 3, end: 6 })

    expect(result).toEqual([{ start: 0, end: 3 }, { start: 6, end: 10 }])
  })

  it('eraseRange_ReversedRange_ShouldNormalize', () => {
    expect(eraseRange([{ start: 0, end: 10 }], { start: 10, end: 4 })).toEqual([{ start: 0, end: 4 }])
  })

  it('eraseRange_OutsideHighlights_ShouldKeepThem', () => {
    const ranges = [{ start: 0, end: 3 }]

    expect(eraseRange(ranges, { start: 5, end: 8 })).toEqual(ranges)
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

  it('buildSegments_FillInBlank_ShouldKeepBlankFlagAndOffsets', () => {
    const result = buildSegments('the ＿＿＿＿ that', [{ start: 2, end: 6 }])

    expect(result).toEqual([
      { text: 'th', start: 0, underline: false, highlight: false },
      { text: 'e ', start: 2, underline: false, highlight: true },
      { text: '＿＿', start: 4, underline: false, highlight: true, blank: true },
      { text: '＿＿', start: 6, underline: false, highlight: false, blank: true },
      { text: ' that', start: 8, underline: false, highlight: false },
    ])
  })
})
