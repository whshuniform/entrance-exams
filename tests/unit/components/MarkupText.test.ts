import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MarkupText from '~/components/Quiz/MarkupText.vue'

describe('MarkupText', () => {
  it('MarkupText_WithRanges_ShouldRenderHighlightsAsMark', async () => {
    const wrapper = await mountSuspended(MarkupText, {
      props: { text: '官商__沆瀣一氣__，貪', ranges: [{ start: 2, end: 4 }] },
    })

    expect(wrapper.find('mark').text()).toBe('沆瀣')
    expect(wrapper.findAll('u').map(u => u.text()).join('')).toBe('沆瀣一氣')
  })

  it('MarkupText_FillInBlank_ShouldRenderBlankAsOneUnbreakablePiece', async () => {
    const wrapper = await mountSuspended(MarkupText, {
      props: { text: 'reached the ＿＿＿＿ that we would go' },
    })

    expect(wrapper.findAll('[data-test="blank"]').map(blank => blank.text())).toEqual(['＿＿＿＿'])
    expect(wrapper.text()).toBe('reached the ＿＿＿＿ that we would go')
  })
  it('MarkupText_BoldItalic_ShouldRenderStrongAndEm', async () => {
    const wrapper = await mountSuspended(MarkupText, { props: { text: 'the **phrase** in *dim sum*' } })

    expect(wrapper.find('strong').text()).toBe('phrase')
    expect(wrapper.find('em').text()).toBe('dim sum')
  })

  it('MarkupText_NumberedSlot_ShouldShowNumberOnBlankLine', async () => {
    const wrapper = await mountSuspended(MarkupText, { props: { text: 'sprang up to [[16]] the weary' } })

    expect(wrapper.find('[data-test="slot"]').text()).toBe('16')
  })

  it('MarkupText_Math_ShouldRenderWithKatex', async () => {
    const wrapper = await mountSuspended(MarkupText, { props: { text: '機率為 $\\frac{1}{3}$' } })

    const math = wrapper.find('[data-test="math"]')
    expect(math.find('.katex').exists()).toBe(true)
    expect(math.attributes('data-start')).toBe('4')
  })
})
