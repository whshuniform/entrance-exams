import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import QuizSetup from '~/components/Home/QuizSetup.vue'

const legends = (wrapper: Awaited<ReturnType<typeof mountSuspended>>) => wrapper.findAll('legend').map(legend => legend.text())

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

  it('QuizSetup_FullMode_ShouldAskModeThenSubjectThenOneYear', async () => {
    const wrapper = await mountSuspended(QuizSetup)

    expect(legends(wrapper)).toEqual(['1選考試', '2作答方式', '3選科目', '4選年度', '5計時'])
    expect(wrapper.find('[data-test="subject-chinese"]').text()).toContain('國語文綜合能力測驗')
    expect(wrapper.find('[data-test="subject-chinese"]').text()).toContain('111–115 年')
    expect(wrapper.find('[data-test="subject-math-a"]').text()).toContain('數學A')
    expect(wrapper.findAll('[data-test^="year-"]').map(year => year.attributes('data-test'))).toEqual([
      'year-115', 'year-114', 'year-113', 'year-112', 'year-111',
    ])
    expect(wrapper.find('[data-test="year-114"]').text()).toContain('114 學年度')
    expect(wrapper.find('[data-test="year-115"] input').attributes('type')).toBe('radio')
    expect(wrapper.find('[data-test="random-count"]').exists()).toBe(false)
  })

  it('QuizSetup_PickRandom_ShouldCheckEveryYearAndDefaultToFiveQuestions', async () => {
    const wrapper = await mountSuspended(QuizSetup)

    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    expect(legends(wrapper)).toEqual(['1選考試', '2作答方式', '3選科目', '4選範圍', '5題數', '6計時'])
    const years = wrapper.findAll('[data-test^="year-"] input')
    expect(years).toHaveLength(5)
    expect(years.every(year => year.attributes('type') === 'checkbox')).toBe(true)
    expect(years.every(year => (year.element as HTMLInputElement).checked)).toBe(true)
    expect(wrapper.find('[data-test="random-count"] input').element).toHaveProperty('value', '5')
    expect(wrapper.find('[data-test="random-count"]').text()).toContain('17 題')
  })

  it('QuizSetup_RandomUncheckEveryYear_ShouldNotLetStart', async () => {
    const wrapper = await mountSuspended(QuizSetup)
    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    for (const year of [115, 114, 113, 112, 111]) {
      await wrapper.find(`[data-test="year-${year}"] input`).setValue(false)
    }

    expect(wrapper.find('[data-test="start-quiz"]').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('至少選一個年度')
  })

  it('QuizSetup_RandomByCurriculum_ShouldOfferCurriculaInsteadOfYears', async () => {
    const wrapper = await mountSuspended(QuizSetup)
    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    await wrapper.find('[data-test="scope-curriculum"] input').setValue(true)

    expect(wrapper.find('[data-test^="year-"]').exists()).toBe(false)
    const curriculum = wrapper.find('[data-test="curriculum-108課綱"]')
    expect(curriculum.text()).toContain('108課綱')
    expect(curriculum.text()).toContain('111–115 年')
    expect((curriculum.find('input').element as HTMLInputElement).checked).toBe(true)
  })

  it('QuizSetup_TurnOnTimer_ShouldShowMinutesFromExamTime', async () => {
    const wrapper = await mountSuspended(QuizSetup)
    expect(wrapper.find('[data-test="timer-minutes"]').exists()).toBe(false)

    await wrapper.find('[data-test="timer-switch"] input').setValue(true)

    expect(wrapper.find('[data-test="timer-minutes"] input').element).toHaveProperty('value', '90')
  })

  it('QuizSetup_StartWholePaper_ShouldEmitChosenConfig', async () => {
    const wrapper = await mountSuspended(QuizSetup)

    await wrapper.find('[data-test="subject-math-a"] input').setValue(true)
    await wrapper.find('[data-test="timer-switch"] input').setValue(true)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('start')?.at(-1)).toEqual([
      { exam: 'gsat', subject: 'math-a', mode: 'full', years: [115], count: 1, minutes: 100 },
    ])
  })

  it('QuizSetup_StartRandomBySomeYears_ShouldEmitThoseYears', async () => {
    const wrapper = await mountSuspended(QuizSetup)
    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    for (const year of [114, 113, 112]) {
      await wrapper.find(`[data-test="year-${year}"] input`).setValue(false)
    }
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('start')?.at(-1)).toEqual([
      { exam: 'gsat', subject: 'chinese', mode: 'random', years: [111, 115], count: 5, minutes: 0 },
    ])
  })
})
