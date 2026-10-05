import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ScratchPad from '~/components/Quiz/ScratchPad.vue'

const strokes = [{ tool: 'pen' as const, points: [[0.1, 10], [0.5, 40]] as [number, number][] }]

describe('ScratchPad', () => {
  it('ScratchPad_Render_ShouldShowCanvasAndTools', async () => {
    const wrapper = await mountSuspended(ScratchPad, { props: { strokes: [] } })

    expect(wrapper.find('canvas').exists()).toBe(true)
    expect(wrapper.text()).toContain('鉛筆')
    expect(wrapper.text()).toContain('橡皮擦')
    expect(wrapper.text()).toContain('全部擦掉')
  })

  it('ScratchPad_ClickEraser_ShouldSwitchTool', async () => {
    const wrapper = await mountSuspended(ScratchPad, { props: { strokes: [] } })

    await wrapper.find('[data-test="scratch-eraser"]').trigger('click')

    expect(wrapper.find('[data-test="scratch-eraser"]').attributes('aria-pressed')).toBe('true')
    expect(wrapper.find('[data-test="scratch-pen"]').attributes('aria-pressed')).toBe('false')
  })

  it('ScratchPad_ClickClear_ShouldEmitEmptyStrokes', async () => {
    const wrapper = await mountSuspended(ScratchPad, { props: { strokes } })

    await wrapper.find('[data-test="scratch-clear"]').trigger('click')

    expect(wrapper.emitted('update:strokes')?.at(-1)).toEqual([[]])
  })
})
