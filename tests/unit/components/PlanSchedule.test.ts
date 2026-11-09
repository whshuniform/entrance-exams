import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PlanSchedule from '~/components/Vocab/PlanSchedule.vue'
import type { DayPlan } from '~/types/vocab'

const days: DayPlan[] = Array.from({ length: 10 }, (_, i) => ({
  date: `2027-01-${String(10 + i).padStart(2, '0')}`,
  words: [{ word: `a${i}`, level: i < 5 ? 1 : 2 }, { word: `b${i}`, level: i === 4 ? 2 : (i < 5 ? 1 : 2) }],
}))

describe('PlanSchedule', () => {
  it('PlanSchedule_ManyDays_ShouldShowFirstWeekWithCountAndLevels', async () => {
    const wrapper = await mountSuspended(PlanSchedule, { props: { days } })

    const rows = wrapper.findAll('[data-test="vocab-day"]')
    expect(rows).toHaveLength(7)
    expect(rows[0]!.text()).toContain('1/10（日）')
    expect(rows[0]!.text()).toContain('2 個字')
    const levelsOf = (row: (typeof rows)[number]) =>
      row.findAll('[data-test="level-stars"]').map(stars => stars.attributes('data-level'))
    expect(levelsOf(rows[0]!)).toEqual(['1'])
    expect(levelsOf(rows[4]!)).toEqual(['1', '2'])
    expect(rows[0]!.text()).not.toContain('級')
    expect(wrapper.find('[data-test="vocab-schedule-more"]').text()).toContain('10 天')
  })

  it('PlanSchedule_ClickMore_ShouldShowEveryDay', async () => {
    const wrapper = await mountSuspended(PlanSchedule, { props: { days } })

    await wrapper.find('[data-test="vocab-schedule-more"]').trigger('click')

    expect(wrapper.findAll('[data-test="vocab-day"]')).toHaveLength(10)
  })

  it('PlanSchedule_FewDays_ShouldNotOfferMore', async () => {
    const wrapper = await mountSuspended(PlanSchedule, { props: { days: days.slice(0, 3) } })

    expect(wrapper.find('[data-test="vocab-schedule-more"]').exists()).toBe(false)
  })
})
