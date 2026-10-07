import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import QuizSetup from '~/components/Home/QuizSetup.vue'

describe('QuizSetup', () => {
  it('QuizSetup_Render_ShouldListExamsAndMarkComingOnes', async () => {
    const wrapper = await mountSuspended(QuizSetup)

    expect(wrapper.find('[data-test="exam-gsat"]').text()).toContain('大學學測')
    for (const id of ['ast', 'cap']) {
      const exam = wrapper.find(`[data-test="exam-${id}"]`)
      expect(exam.text()).toContain('即將推出')
      expect(exam.find('input').attributes('disabled')).toBeDefined()
    }
    expect(wrapper.find('[data-test="exam-gsat"] input').attributes('disabled')).toBeUndefined()
  })

  it('QuizSetup_Render_ShouldOfferYearAndSubjectsOfGsat', async () => {
    const wrapper = await mountSuspended(QuizSetup)

    expect(wrapper.find('[data-test="year-115"]').text()).toContain('115')
    expect(wrapper.find('[data-test="subject-chinese"]').text()).toContain('國語文綜合能力測驗')
    expect(wrapper.find('[data-test="subject-chinese"]').text()).toContain('90 分鐘')
    expect(wrapper.find('[data-test="subject-math-a"]').text()).toContain('數學A')
  })

  it('QuizSetup_PickRandom_ShouldAskHowManyQuestions', async () => {
    const wrapper = await mountSuspended(QuizSetup)
    expect(wrapper.find('[data-test="random-count"]').exists()).toBe(false)

    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    expect(wrapper.find('[data-test="random-count"] input').element).toHaveProperty('value', '3')
  })

  it('QuizSetup_TurnOnTimer_ShouldShowMinutesFromExamTime', async () => {
    const wrapper = await mountSuspended(QuizSetup)
    expect(wrapper.find('[data-test="timer-minutes"]').exists()).toBe(false)

    await wrapper.find('[data-test="timer-switch"] input').setValue(true)

    expect(wrapper.find('[data-test="timer-minutes"] input').element).toHaveProperty('value', '90')
  })

  it('QuizSetup_Start_ShouldEmitChosenConfig', async () => {
    const wrapper = await mountSuspended(QuizSetup)

    await wrapper.find('[data-test="subject-math-a"] input').setValue(true)
    await wrapper.find('[data-test="timer-switch"] input').setValue(true)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('start')?.at(-1)).toEqual([
      { exam: 'gsat', year: 115, subject: 'math-a', mode: 'full', count: 1, minutes: 100 },
    ])
  })
})
