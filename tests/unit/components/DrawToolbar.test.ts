import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DrawToolbar from '~/components/Quiz/DrawToolbar.vue'

describe('DrawToolbar', () => {
  it('DrawToolbar_Render_ShouldListFourToolsTopToBottom', async () => {
    const wrapper = await mountSuspended(DrawToolbar, { props: { modelValue: 'off' } })

    const buttons = wrapper.findAll('button')
    expect(buttons.map(button => button.attributes('data-test'))).toEqual([
      'tool-off', 'tool-highlighter', 'tool-pen', 'tool-eraser',
    ])
    expect(buttons.map(button => button.text())).toEqual(['關閉繪畫', '螢光筆', '原子筆', '橡皮擦'])
  })

  it('DrawToolbar_ModelValue_ShouldPressOnlyCurrentTool', async () => {
    const wrapper = await mountSuspended(DrawToolbar, { props: { modelValue: 'pen' } })

    expect(wrapper.find('[data-test="tool-pen"]').attributes('aria-pressed')).toBe('true')
    expect(wrapper.find('[data-test="tool-off"]').attributes('aria-pressed')).toBe('false')
  })

  it('DrawToolbar_ClickTool_ShouldEmitThatTool', async () => {
    const wrapper = await mountSuspended(DrawToolbar, { props: { modelValue: 'off' } })

    await wrapper.find('[data-test="tool-highlighter"]').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['highlighter'])
  })
})
