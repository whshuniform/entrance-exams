import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Guide from '~/components/Quiz/Guide.vue'

describe('Guide', () => {
  it('Guide_Render_ShouldShowAnsweringAndDrawingExamples', async () => {
    const wrapper = await mountSuspended(Guide)

    const images = wrapper.findAll('svg[role="img"]')
    expect(images.map(image => image.attributes('aria-label'))).toEqual([
      expect.stringContaining('作答範例'),
      expect.stringContaining('繪畫範例'),
    ])
  })

  it('Guide_Render_ShouldExplainEachWayToAnswerAndDraw', async () => {
    const wrapper = await mountSuspended(Guide)
    const text = wrapper.find('[data-test="guide-steps"]').text()

    for (const word of ['單選題', '多選題', '螢光筆', '原子筆', '橡皮擦', '關閉繪畫', '兩指', '計算紙', '交卷批改']) {
      expect(text).toContain(word)
    }
  })

  it('Guide_Render_ShouldHaveTitleLikeThePaperCover', async () => {
    const wrapper = await mountSuspended(Guide)

    expect(wrapper.find('h2').text()).toContain('作答注意事項')
  })
})
