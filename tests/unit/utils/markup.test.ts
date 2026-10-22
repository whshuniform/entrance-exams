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

  it('parseMarkup_FillInBlank_ShouldBeItsOwnSegment', () => {
    // 英文填空線「＿＿＿＿」要整段一起換行，所以拆成自己的片段
    expect(parseMarkup('reached the ＿＿＿＿ that')).toEqual([
      { text: 'reached the ', underline: false },
      { text: '＿＿＿＿', underline: false, blank: true },
      { text: ' that', underline: false },
    ])
  })
  it('parseMarkup_BoldAndItalic_ShouldBeTheirOwnSegments', () => {
    // 英文閱讀測驗題目裡的粗體片語、斜體書名照原卷
    expect(parseMarkup('closest to "**exacerbated the situation**" in *dim sum*')).toEqual([
      { text: 'closest to "', underline: false },
      { text: 'exacerbated the situation', underline: false, bold: true },
      { text: '" in ', underline: false },
      { text: 'dim sum', underline: false, italic: true },
    ])
  })

  it('parseMarkup_NumberedSlot_ShouldKeepOnlyTheNumber', () => {
    // 綜合測驗文章裡的第 16 題空格
    expect(parseMarkup('sprang up to [[16]] the weary')).toEqual([
      { text: 'sprang up to ', underline: false },
      { text: '16', underline: false, slot: true },
      { text: ' the weary', underline: false },
    ])
  })

  it('parseMarkup_Math_ShouldKeepTexSource', () => {
    expect(parseMarkup('機率皆為 $\\frac{1}{3}$。')).toEqual([
      { text: '機率皆為 ', underline: false },
      { text: '\\frac{1}{3}', underline: false, math: true },
      { text: '。', underline: false },
    ])
  })
  it('parseMarkup_EscapedDollar_ShouldStayPlainMoneySign', () => {
    // 英文、社會的金額（105 英文「$2,000」）寫成 \$，不是數學式
    const segments = parseMarkup('a ransom of \\$2,000 and \\$250 more')

    expect(segments.some(segment => segment.math)).toBe(false)
    expect(segments.map(segment => segment.text).join('')).toBe('a ransom of $2,000 and $250 more')
  })

  it('parseMarkup_BoldUnderline_ShouldKeepBoth', () => {
    expect(parseMarkup('下列何者**__不是__**')).toEqual([
      { text: '下列何者', underline: false },
      { text: '不是', underline: true, bold: true },
    ])
  })
})
