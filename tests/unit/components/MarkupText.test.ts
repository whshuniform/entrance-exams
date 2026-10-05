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

  it('MarkupText_PenMode_ShouldFlagRootForHighlighting', async () => {
    const wrapper = await mountSuspended(MarkupText, { props: { text: '題幹', penMode: true } })

    expect(wrapper.attributes('data-pen')).toBe('true')
  })
})
