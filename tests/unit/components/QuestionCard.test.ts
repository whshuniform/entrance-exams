import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import QuestionCard from '~/components/Quiz/QuestionCard.vue'
import type { QuizQuestion } from '~/types/quiz'

const single: QuizQuestion = {
  id: 'q1', number: 1, type: 'single', stem: '下列讀音前後相同的是：',
  options: [
    { key: 'A', text: '甲' }, { key: 'B', text: '乙' }, { key: 'C', text: '丙' }, { key: 'D', text: '丁' },
  ],
  answer: 'C', points: 2,
}

const multi: QuizQuestion = {
  id: 'q25', number: 25, type: 'multi', stem: '下列__詞語__運用適當的是：',
  options: ['A', 'B', 'C', 'D', 'E'].map(key => ({ key, text: `選項${key}` })),
  answer: 'BE', points: 4,
}

describe('QuestionCard', () => {
  it('QuestionCard_Render_ShouldShowNumberStemAndOptions', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })

    expect(wrapper.text()).toContain('1.')
    expect(wrapper.text()).toContain('下列讀音前後相同的是')
    expect(wrapper.findAll('[data-test="option"]')).toHaveLength(4)
    expect(wrapper.text()).toContain('單選')
  })

  it('QuestionCard_Render_ShouldUnderlineMarkedWords', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: multi, modelValue: '' } })

    expect(wrapper.find('u').text()).toBe('詞語')
  })

  it('QuestionCard_PickSingleOption_ShouldEmitThatKey', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })

    await wrapper.find('[data-test="option-C"] input').setValue(true)

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['C'])
  })

  it('QuestionCard_PickMultiOptions_ShouldEmitSortedKeys', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: multi, modelValue: 'E' } })

    await wrapper.find('[data-test="option-B"] input').setValue(true)

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['BE'])
  })

  it('QuestionCard_Submitted_ShouldMarkCorrectAnswerAndShowScore', async () => {
    const wrapper = await mountSuspended(QuestionCard, {
      props: {
        question: single, modelValue: 'A', submitted: true,
        result: { score: 0, isCorrect: false, wrongCount: 1 },
      },
    })

    expect(wrapper.find('[data-test="option-C"]').attributes('data-state')).toBe('answer')
    expect(wrapper.find('[data-test="option-A"]').attributes('data-state')).toBe('wrong')
    expect(wrapper.find('[data-test="question-score"]').text()).toContain('0')
    expect(wrapper.find('[data-test="option-C"] input').attributes('disabled')).toBeDefined()
  })
})
