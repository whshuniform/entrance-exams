import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MascotCorner from '~/components/Mascot/MascotCorner.vue'

const lines = ['早安！', '先選一個考試吧！', '錯的題目才是寶藏喔。']

describe('MascotCorner', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('MascotCorner_Mounted_ShouldSayFirstLine', async () => {
    // Act
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })

    // Assert
    expect(wrapper.find('[data-test="mascot-bubble"]').text()).toBe('早安！')
    expect(wrapper.find('[data-test="mascot-girl"]').attributes('aria-label')).toContain('小墨')
  })

  it('MascotCorner_TapGirl_ShouldSayNextLineAndWrapAround', async () => {
    // Arrange
    const wrapper = await mountSuspended(MascotCorner, { props: { lines } })
    const girl = wrapper.find('[data-test="mascot-girl"]')

    // Act & Assert
    await girl.trigger('click')
    expect(wrapper.find('[data-test="mascot-bubble"]').text()).toBe('先選一個考試吧！')
    await girl.trigger('click')
    await girl.trigger('click')
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
})
