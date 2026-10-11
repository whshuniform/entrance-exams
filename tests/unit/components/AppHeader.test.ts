import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppHeader from '~/components/AppHeader.vue'

describe('AppHeader', () => {
  it('AppHeader_WithBack_ShouldShowIosStyleBackLinkAndTitle', async () => {
    const wrapper = await mountSuspended(AppHeader, {
      props: { title: '作試題', back: { to: '/gsat', label: '大學學測' } },
    })

    const back = wrapper.find('[data-test="app-back"]')
    expect(back.element.tagName).toBe('A')
    expect(back.attributes('href')).toBe('/gsat')
    expect(back.attributes('aria-label')).toBe('返回大學學測')
    expect(back.text()).toBe('大學學測')
    // iOS 的返回箭頭
    expect(back.find('svg').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('作試題')
  })

  it('AppHeader_WithoutBack_ShouldShowOnlyTitle', async () => {
    const wrapper = await mountSuspended(AppHeader, { props: { title: '考古題' } })

    expect(wrapper.find('[data-test="app-back"]').exists()).toBe(false)
    expect(wrapper.find('h1').text()).toBe('考古題')
  })
})
