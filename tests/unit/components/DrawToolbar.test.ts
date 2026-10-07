import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DrawToolbar from '~/components/Quiz/DrawToolbar.vue'

describe('DrawToolbar', () => {
  it('DrawToolbar_Render_ShouldListFourToolsThenToggleAtBottom', async () => {
    const wrapper = await mountSuspended(DrawToolbar, { props: { modelValue: 'off' } })

    const buttons = wrapper.findAll('button')
    expect(buttons.map(button => button.attributes('data-test'))).toEqual([
      'tool-off', 'tool-highlighter', 'tool-pen', 'tool-eraser', 'toolbar-toggle',
    ])
    expect(buttons.map(button => button.text())).toEqual(['關閉繪畫', '螢光筆', '原子筆', '橡皮擦', '隱藏工具'])
    expect(wrapper.find('[data-test="toolbar-toggle"]').attributes('aria-expanded')).toBe('true')
  })

  it('DrawToolbar_ClickToggle_ShouldEmitHidden', async () => {
    const wrapper = await mountSuspended(DrawToolbar, { props: { modelValue: 'off', visible: true } })

    await wrapper.find('[data-test="toolbar-toggle"]').trigger('click')

    expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([false])
  })

  it('DrawToolbar_Hidden_ShouldShowOnlyToggleToBringToolsBack', async () => {
    const wrapper = await mountSuspended(DrawToolbar, { props: { modelValue: 'off', visible: false } })

    expect(wrapper.findAll('[data-tool]')).toHaveLength(0)
    const toggle = wrapper.find('[data-test="toolbar-toggle"]')
    expect(toggle.text()).toBe('顯示工具')
    expect(toggle.attributes('aria-expanded')).toBe('false')

    await toggle.trigger('click')

    expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([true])
  })

  it('DrawToolbar_HideWhileDrawing_ShouldTurnDrawingOff', async () => {
    const wrapper = await mountSuspended(DrawToolbar, { props: { modelValue: 'pen', visible: true } })

    await wrapper.find('[data-test="toolbar-toggle"]').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['off'])
    expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([false])
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
