import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MenuLinks from '~/components/Home/MenuLinks.vue'

const items = [
  { id: 'gsat', title: '大學學測', hint: '學科能力測驗', to: '/gsat' },
  { id: 'ast', title: '分科測驗', hint: '準備中' },
]

describe('MenuLinks', () => {
  it('MenuLinks_ItemWithLink_ShouldRenderClickableLink', async () => {
    const wrapper = await mountSuspended(MenuLinks, { props: { items } })

    const gsat = wrapper.find('[data-test="menu-gsat"]')
    expect(gsat.element.tagName).toBe('A')
    expect(gsat.attributes('href')).toBe('/gsat')
    expect(gsat.text()).toContain('大學學測')
    expect(gsat.text()).toContain('學科能力測驗')
  })

  it('MenuLinks_ItemWithoutLink_ShouldShowComingAndNotBeLink', async () => {
    const wrapper = await mountSuspended(MenuLinks, { props: { items } })

    const ast = wrapper.find('[data-test="menu-ast"]')
    expect(ast.element.tagName).not.toBe('A')
    expect(ast.attributes('aria-disabled')).toBe('true')
    expect(ast.text()).toContain('準備中')
  })
})
