import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import OptionStats from '~/components/Quiz/OptionStats.vue'
import type { ItemStats } from '~/types/quiz'

const single: ItemStats = { p: 64, key: 'C', options: { A: 3, B: 14, C: 64, D: 19 }, blank: 0 }
const multi: ItemStats = { p: 74, full: 66, multi: true, key: '34', options: { 1: 13, 2: 16, 3: 84, 4: 90, 5: 19 }, blank: 0 }

describe('OptionStats', () => {
  it('OptionStats_Single_ShouldShowCorrectRateAndEachOptionPercent', async () => {
    const wrapper = await mountSuspended(OptionStats, { props: { stats: single, keys: ['A', 'B', 'C', 'D'], picked: 'B' } })

    expect(wrapper.find('[data-test="stats-summary"]').text()).toBe('全體考生 64% 答對')
    expect(wrapper.find('[data-test="stats-option-A"]').text()).toContain('3%')
    expect(wrapper.find('[data-test="stats-option-C"]').text()).toContain('64%')
  })

  it('OptionStats_ShouldMarkAnswerAndPickedOption', async () => {
    const wrapper = await mountSuspended(OptionStats, { props: { stats: single, keys: ['A', 'B', 'C', 'D'], picked: 'B' } })

    expect(wrapper.find('[data-test="stats-option-C"]').attributes('data-answer')).toBe('true')
    expect(wrapper.find('[data-test="stats-option-B"]').attributes('data-picked')).toBe('true')
    expect(wrapper.find('[data-test="stats-option-B"]').text()).toContain('你選的')
    expect(wrapper.find('[data-test="stats-option-A"]').attributes('data-picked')).toBeUndefined()
  })

  it('OptionStats_Multi_ShouldShowFullCorrectRate', async () => {
    const wrapper = await mountSuspended(OptionStats, { props: { stats: multi, keys: ['1', '2', '3', '4', '5'], picked: '34' } })

    expect(wrapper.find('[data-test="stats-summary"]').text()).toBe('全體考生 66% 全對')
    expect(wrapper.find('[data-test="stats-note"]').text()).toContain('每個選項分開算')
  })

  it('OptionStats_BarWidth_ShouldFollowPercent', async () => {
    const wrapper = await mountSuspended(OptionStats, { props: { stats: single, keys: ['A', 'B', 'C', 'D'], picked: '' } })

    expect(wrapper.find('[data-test="stats-option-C"] [data-test="stats-bar"]').attributes('style')).toContain('width: 64%')
  })
})
