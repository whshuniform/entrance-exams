import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import QuizSetup from '~/components/Home/QuizSetup.vue'

/** 考試在上一頁選好了，設定表只問作答方式之後的事 */
const props = { exam: 'gsat' }

const legends = (wrapper: Awaited<ReturnType<typeof mountSuspended>>) => wrapper.findAll('legend').map(legend => legend.text())

describe('QuizSetup', () => {
  it('QuizSetup_Render_ShouldNotAskExamAgain', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })

    expect(wrapper.find('[data-test^="exam-"]').exists()).toBe(false)
  })

  it('QuizSetup_FullMode_ShouldAskModeThenSubjectThenOneYear', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })

    expect(legends(wrapper)).toEqual(['1作答方式', '2選科目', '3選年度', '4計時'])
    expect(wrapper.find('[data-test="subject-chinese"]').text()).toContain('國語文綜合能力測驗')
    expect(wrapper.find('[data-test="subject-chinese"]').text()).toContain('109–115 年')
    expect(wrapper.find('[data-test="subject-chinese"]').text()).toContain('題庫 251 題')
    expect(wrapper.find('[data-test="subject-english"]').text()).toContain('英文')
    expect(wrapper.find('[data-test="subject-english"]').text()).toContain('109–115 年')
    expect(wrapper.find('[data-test="subject-math-a"]').text()).toContain('數學A')
    expect(wrapper.findAll('[data-test^="year-"]').map(year => year.attributes('data-test'))).toEqual([
      'year-115', 'year-114', 'year-113', 'year-112', 'year-111', 'year-110', 'year-109',
    ])
    expect(wrapper.find('[data-test="year-114"]').text()).toContain('114 學年度')
    expect(wrapper.find('[data-test="year-115"] input').attributes('type')).toBe('radio')
    expect(wrapper.find('[data-test="random-count"]').exists()).toBe(false)
  })

  it('QuizSetup_PickRandom_ShouldCheckEveryYearAndDefaultToFiveQuestions', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })

    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    expect(legends(wrapper)).toEqual(['1作答方式', '2選科目', '3選範圍', '4題數', '5計時'])
    const years = wrapper.findAll('[data-test^="year-"] input')
    expect(years).toHaveLength(7)
    expect(years.every(year => year.attributes('type') === 'checkbox')).toBe(true)
    expect(years.every(year => (year.element as HTMLInputElement).checked)).toBe(true)
    expect(wrapper.find('[data-test="random-count"] input').element).toHaveProperty('value', '5')
    expect(wrapper.find('[data-test="random-count"]').text()).toContain('251 題')
  })

  it('QuizSetup_RandomUncheckEveryYear_ShouldNotLetStart', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })
    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    for (const year of [115, 114, 113, 112, 111, 110, 109]) {
      await wrapper.find(`[data-test="year-${year}"] input`).setValue(false)
    }

    expect(wrapper.find('[data-test="start-quiz"]').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('至少選一個年度')
  })

  it('QuizSetup_RandomByCurriculum_ShouldOfferCurriculaInsteadOfYears', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })
    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    await wrapper.find('[data-test="scope-curriculum"] input').setValue(true)

    expect(wrapper.find('[data-test^="year-"]').exists()).toBe(false)
    const curriculum = wrapper.find('[data-test="curriculum-108課綱"]')
    expect(curriculum.text()).toContain('108課綱')
    expect(curriculum.text()).toContain('111–115 年')
    expect((curriculum.find('input').element as HTMLInputElement).checked).toBe(true)
    const old = wrapper.find('[data-test="curriculum-101課綱"]')
    expect(old.text()).toContain('109–110 年')
    expect((old.find('input').element as HTMLInputElement).checked).toBe(false)
  })

  it('QuizSetup_TurnOnTimer_ShouldShowMinutesFromExamTime', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })
    expect(wrapper.find('[data-test="timer-minutes"]').exists()).toBe(false)

    await wrapper.find('[data-test="timer-switch"] input').setValue(true)

    expect(wrapper.find('[data-test="timer-minutes"] input').element).toHaveProperty('value', '90')
  })

  it('QuizSetup_StartWholePaper_ShouldEmitChosenConfig', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })

    await wrapper.find('[data-test="subject-math-a"] input').setValue(true)
    await wrapper.find('[data-test="timer-switch"] input').setValue(true)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('start')?.at(-1)).toEqual([
      { exam: 'gsat', subject: 'math-a', mode: 'full', years: [115], count: 13, minutes: 100 },
    ])
  })

  it('QuizSetup_StartRandomBySomeYears_ShouldEmitThoseYears', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })
    await wrapper.find('[data-test="mode-random"] input').setValue(true)

    for (const year of [114, 113, 112, 110, 109]) {
      await wrapper.find(`[data-test="year-${year}"] input`).setValue(false)
    }
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('start')?.at(-1)).toEqual([
      { exam: 'gsat', subject: 'chinese', mode: 'random', years: [111, 115], count: 5, minutes: 0 },
    ])
  })

  it('QuizSetup_StartEnglishByOldCurriculum_ShouldEmitThatCurriculumsYears', async () => {
    const wrapper = await mountSuspended(QuizSetup, { props })
    await wrapper.find('[data-test="mode-random"] input').setValue(true)
    await wrapper.find('[data-test="subject-english"] input').setValue(true)
    await wrapper.find('[data-test="scope-curriculum"] input').setValue(true)

    await wrapper.find('[data-test="curriculum-99課綱"] input').setValue(true)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('start')?.at(-1)).toEqual([
      { exam: 'gsat', subject: 'english', mode: 'random', curriculum: '99課綱', years: [109, 110], count: 5, minutes: 0 },
    ])
  })
})
