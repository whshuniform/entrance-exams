import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LevelStars from '~/components/Vocab/LevelStars.vue'

describe('LevelStars', () => {
  it('LevelStars_Level4_ShouldFillFourOfSixStars', async () => {
    const wrapper = await mountSuspended(LevelStars, { props: { level: 4 } })

    const stars = wrapper.find('[data-test="level-stars"]')
    expect(stars.attributes('aria-label')).toBe('難度 4 顆星（共 6 顆）')
    expect(stars.attributes('data-level')).toBe('4')
    expect(wrapper.findAll('[data-test="level-star"]')).toHaveLength(6)
    expect(wrapper.findAll('[data-test="level-star"][data-filled="true"]')).toHaveLength(4)
  })

  it('LevelStars_Compact_ShouldOnlyDrawFilledStars', async () => {
    const wrapper = await mountSuspended(LevelStars, { props: { level: 2, compact: true } })

    expect(wrapper.find('[data-test="level-stars"]').attributes('aria-label')).toBe('難度 2 顆星')
    expect(wrapper.findAll('[data-test="level-star"]')).toHaveLength(2)
    expect(wrapper.findAll('[data-test="level-star"][data-filled="true"]')).toHaveLength(2)
  })

  it('LevelStars_Render_ShouldNotAddFormInputs', async () => {
    const wrapper = await mountSuspended(LevelStars, { props: { level: 3 } })

    expect(wrapper.findAll('input')).toHaveLength(0)
  })
})
