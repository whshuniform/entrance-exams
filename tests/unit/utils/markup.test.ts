import { describe, it, expect } from 'vitest'
import { parseMarkup } from '~/utils/markup'

describe('parseMarkup', () => {
  it('parseMarkup_PlainText_ShouldReturnSingleSegment', () => {
    expect(parseMarkup('下列文句')).toEqual([{ text: '下列文句', underline: false }])
  })

  it('parseMarkup_UnderlinedWord_ShouldSplitSegments', () => {
    const result = parseMarkup('官商__沆瀣一氣__，貪贓枉法')

    expect(result).toEqual([
      { text: '官商', underline: false },
      { text: '沆瀣一氣', underline: true },
      { text: '，貪贓枉法', underline: false },
    ])
  })
})
