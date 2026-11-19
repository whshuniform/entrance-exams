import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import MascotCorner from '~/components/Mascot/MascotCorner.vue'

// Live2D 要 WebGL，測試環境沒有：改用假的載入結果
const live2d = vi.hoisted(() => ({ status: 'ready' as 'loading' | 'ready' | 'failed', tap: () => {} }))
mockNuxtImport('useLive2dMascot', () => () => ({ status: ref(live2d.status), tap: live2d.tap }))

const lines = ['早安！', '先選一個考試吧！', '錯的題目才是寶藏喔。']

describe('MascotCorner', () => {
  beforeEach(() => {
    localStorage.clear()
    live2d.status = 'ready'
    live2d.tap = vi.fn()
  })

  it('MascotCorner_Mounted_ShouldSayFirstLine', async () => {
    // Act
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })

    // Assert
    expect(wrapper.find('[data-test="mascot-bubble"]').text()).toBe('早安！')
    expect(wrapper.find('[data-test="mascot-girl"] canvas').exists()).toBe(true)
  })

  it('MascotCorner_TapGirl_ShouldSayNextLineAndPlayMotion', async () => {
    // Arrange
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })
    const girl = wrapper.find('[data-test="mascot-girl"]')

    // Act
    await girl.trigger('click')

    // Assert
    expect(wrapper.find('[data-test="mascot-bubble"]').text()).toBe('先選一個考試吧！')
    expect(live2d.tap).toHaveBeenCalledTimes(1)
  })

  it('MascotCorner_TapPastLastLine_ShouldWrapAround', async () => {
    // Arrange
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })
    const girl = wrapper.find('[data-test="mascot-girl"]')

    // Act
    for (let i = 0; i < 3; i++) await girl.trigger('click')

    // Assert
    expect(wrapper.find('[data-test="mascot-bubble"]').text()).toBe('早安！')
  })

  it('MascotCorner_Hide_ShouldLeaveCallBackButton', async () => {
    // Arrange
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })

    // Act
    await wrapper.find('[data-test="mascot-hide"]').trigger('click')

    // Assert
    expect(wrapper.find('[data-test="mascot-girl"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="mascot-show"]').exists()).toBe(true)
  })

  it('MascotCorner_CallBack_ShouldShowGirlAgain', async () => {
    // Arrange
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })
    await wrapper.find('[data-test="mascot-hide"]').trigger('click')

    // Act
    await wrapper.find('[data-test="mascot-show"]').trigger('click')

    // Assert
    expect(wrapper.find('[data-test="mascot-girl"]').exists()).toBe(true)
  })

  it('MascotCorner_Live2dFailed_ShouldHideWholeMascot', async () => {
    // Arrange：瀏覽器不支援 WebGL 或載入失敗
    live2d.status = 'failed'

    // Act
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })

    // Assert
    expect(wrapper.find('[data-test="mascot"]').exists()).toBe(false)
  })

  it('MascotCorner_Live2dLoading_ShouldWaitBeforeTalking', async () => {
    // Arrange
    live2d.status = 'loading'

    // Act
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })

    // Assert
    expect(wrapper.find('[data-test="mascot-bubble"]').exists()).toBe(false)
  })
})
