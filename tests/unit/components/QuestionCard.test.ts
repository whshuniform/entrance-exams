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
  })

  it('QuestionCard_Render_ShouldNotTagQuestionType', async () => {
    // 跟試題 PDF 一樣，題型標在分段標題，不貼在每一題
    const single1 = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })
    const multi1 = await mountSuspended(QuestionCard, { props: { question: multi, modelValue: '' } })

    expect(single1.text()).not.toContain('單選')
    expect(multi1.text()).not.toContain('多選')
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

  it('QuestionCard_Render_ShouldNotHaveEliminateButtons', async () => {
    // 刪去法改用原子筆在選項上劃掉
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })

    expect(wrapper.findAll('[data-test^="eliminate-"]')).toHaveLength(0)
    expect(wrapper.findAll('[data-test^="option-"] button')).toHaveLength(0)
  })

  it('QuestionCard_Highlights_ShouldMarkStemText', async () => {
    const wrapper = await mountSuspended(QuestionCard, {
      props: { question: single, modelValue: '', highlights: { 'q1:stem': [{ start: 2, end: 4 }] } },
    })

    expect(wrapper.find('mark').text()).toBe('讀音')
  })

  it('QuestionCard_ScratchToggle_ShouldSitBelowAllOptions', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })
    const lastOption = wrapper.find('[data-test="option-D"]').element
    const toggle = wrapper.find('[data-test="scratch-toggle"]').element

    expect(wrapper.find('header [data-test="scratch-toggle"]').exists()).toBe(false)
    expect(lastOption.compareDocumentPosition(toggle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('QuestionCard_ToggleScratch_ShouldShowScratchArea', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })
    expect(wrapper.find('[data-test="scratch-area"]').exists()).toBe(false)

    await wrapper.find('[data-test="scratch-toggle"]').trigger('click')

    expect(wrapper.find('[data-test="scratch-area"]').exists()).toBe(true)
  })

  it('QuestionCard_Render_ShouldHaveInkLayerOverCard', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })

    expect(wrapper.find('canvas[data-test="ink-layer"]').exists()).toBe(true)
  })

  it('QuestionCard_DefaultTool_ShouldNotBeDrawing', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })

    expect(wrapper.attributes('data-drawing')).toBeUndefined()
  })

  it('QuestionCard_DrawingTool_ShouldMarkCardAsDrawing', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '', tool: 'pen' } })

    expect(wrapper.attributes('data-drawing')).toBe('pen')
  })

  it('QuestionCard_ClickOptionWhileDrawing_ShouldCancelTheClick', async () => {
    const wrapper = await mountSuspended(QuestionCard, {
      props: { question: single, modelValue: '', tool: 'highlighter' },
    })
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    wrapper.find('[data-test="option-C"] input').element.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(true)
  })

  it('QuestionCard_ClickOptionWithDrawingOff_ShouldLetTheClickThrough', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    wrapper.find('[data-test="option-C"] input').element.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(false)
  })

  it('QuestionCard_ToggleScratchWhileDrawing_ShouldStillWork', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '', tool: 'pen' } })

    await wrapper.find('[data-test="scratch-toggle"]').trigger('click')

    expect(wrapper.find('[data-test="scratch-area"]').exists()).toBe(true)
  })

  it('QuestionCard_TextFields_ShouldExposeFieldIdsForMarking', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })

    expect(wrapper.find('[data-test="stem"]').attributes('data-field')).toBe('q1:stem')
    expect(wrapper.find('[data-test="option-B"] [data-test="option-text"]').attributes('data-field'))
      .toBe('q1:option:B')
  })
})
