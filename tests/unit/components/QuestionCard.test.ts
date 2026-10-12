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

const pictured: QuizQuestion = {
  id: '115-chinese-3', number: 3, type: 'single', stem: '',
  options: ['A', 'B', 'C', 'D'].map(key => ({ key, text: '' })),
  answer: 'D', points: 2,
  images: [{ src: 'papers/115/chinese/3-1.webp', width: 1200, height: 380 }],
  numberInImage: true,
}

describe('QuestionCard', () => {
  it('QuestionCard_Pictured_ShouldShowOriginalPaperImageAndAnswerCircles', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: pictured, modelValue: '' } })

    const image = wrapper.find('[data-test="question-image"]')
    expect(image.attributes('src')).toMatch(/papers\/115\/chinese\/3-1\.webp$/)
    expect(image.attributes('alt')).toBe('第 3 題（原卷）')
    // 題號已經在圖裡，不再印一次；選項文字也在圖裡，只留作答圈
    expect(wrapper.find('[data-test="number"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="stem"]').exists()).toBe(false)
    expect(wrapper.findAll('[data-test="option"]').map(option => option.text())).toEqual(['(A)', '(B)', '(C)', '(D)'])
  })

  it('QuestionCard_BlankInPassage_ShouldShowNumberAndCirclesOnly', async () => {
    // 英文文意選填的空格：題目在前一題的文章裡，這題只有題號和作答圈
    const blank: QuizQuestion = { ...pictured, id: '115-english-22', number: 22, images: undefined, numberInImage: false }
    const wrapper = await mountSuspended(QuestionCard, { props: { question: blank, modelValue: '' } })

    expect(wrapper.find('[data-test="number"]').text()).toBe('22.')
    expect(wrapper.find('[data-test="question-image"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="stem"]').exists()).toBe(false)
  })

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

  it('QuestionCard_SubmittedWithStats_ShouldShowHowOthersAnswered', async () => {
    // 批改完成後，在選項下面列出全體考生選各選項的比例（大考中心選項分析）
    const stats = { p: 64, key: 'C', options: { A: 3, B: 14, C: 64, D: 19 }, blank: 0 }
    const before = await mountSuspended(QuestionCard, { props: { question: single, modelValue: 'A', stats } })
    const after = await mountSuspended(QuestionCard, {
      props: { question: single, modelValue: 'A', submitted: true, result: { score: 0, isCorrect: false, wrongCount: 1 }, stats },
    })

    expect(before.find('[data-test="option-stats"]').exists()).toBe(false)
    expect(after.find('[data-test="option-stats"]').exists()).toBe(true)
    expect(after.find('[data-test="stats-option-A"]').attributes('data-picked')).toBe('true')
  })

  it('QuestionCard_AccuracyScoring_ShouldSayRightOrWrongInsteadOfPoints', async () => {
    // 隨機抽題只看答對率：每題標答對或答錯，多選題部分給分也算答錯
    const right = await mountSuspended(QuestionCard, {
      props: {
        question: single, modelValue: 'C', submitted: true, scoring: 'accuracy',
        result: { score: 2, isCorrect: true, wrongCount: 0 },
      },
    })
    const partly = await mountSuspended(QuestionCard, {
      props: {
        question: multi, modelValue: 'B', submitted: true, scoring: 'accuracy',
        result: { score: 2.4, isCorrect: false, wrongCount: 1 },
      },
    })

    expect(right.find('[data-test="question-score"]').text()).toBe('答對')
    expect(partly.find('[data-test="question-score"]').text()).toBe('答錯')
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

  it('QuestionCard_ScratchOpenModel_ShouldFollowParent', async () => {
    // 翻頁後再回來，計算紙開關由外層記住
    const wrapper = await mountSuspended(QuestionCard, {
      props: { question: single, modelValue: '', scratchOpen: true },
    })
    expect(wrapper.find('[data-test="scratch-area"]').exists()).toBe(true)

    await wrapper.find('[data-test="scratch-toggle"]').trigger('click')

    expect(wrapper.emitted('update:scratchOpen')?.at(-1)).toEqual([false])
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

  it('QuestionCard_ClickOptionTextWhileDrawing_ShouldCancelTheClick', async () => {
    // 開啟繪畫時在選項文字上畫線（刪去法）不會作答
    const wrapper = await mountSuspended(QuestionCard, {
      props: { question: single, modelValue: '', tool: 'highlighter' },
    })
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    wrapper.find('[data-test="option-C"] [data-test="option-text"]').element.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(true)
  })

  it('QuestionCard_ClickRadioWhileDrawing_ShouldStillAnswer', async () => {
    // YZ：繪畫時作答圈（radio、checkbox）也要能點
    const wrapper = await mountSuspended(QuestionCard, {
      props: { question: single, modelValue: '', tool: 'pen' },
    })
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    wrapper.find('[data-test="option-C"] input').element.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(false)
  })

  it('QuestionCard_ClickCheckboxWhileDrawing_ShouldStillAnswer', async () => {
    const wrapper = await mountSuspended(QuestionCard, {
      props: { question: multi, modelValue: '', tool: 'highlighter' },
    })

    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    wrapper.find('[data-test="option-B"] input').element.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(false)
  })

  it('QuestionCard_TouchMoveWhileDrawing_ShouldNotScrollThePage', async () => {
    // YZ：畫筆上下移動不要讓頁面跟著滑（iOS 不一定照 touch-action 擋捲動）
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '', tool: 'pen' } })
    const move = new Event('touchmove', { bubbles: true, cancelable: true })

    wrapper.find('[data-test="stem"]').element.dispatchEvent(move)

    expect(move.defaultPrevented).toBe(true)
  })

  it('QuestionCard_TouchMoveWithDrawingOff_ShouldScrollAsUsual', async () => {
    const wrapper = await mountSuspended(QuestionCard, { props: { question: single, modelValue: '' } })
    const move = new Event('touchmove', { bubbles: true, cancelable: true })

    wrapper.find('[data-test="stem"]').element.dispatchEvent(move)

    expect(move.defaultPrevented).toBe(false)
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
  describe('轉成文字的整份考卷', () => {
    const lead = {
      id: '115-english-16-20',
      blocks: ['The history of *dim sum* ... to [[16]] the weary travelers.', 'Dim sum is more than ...'],
    }
    const cloze: QuizQuestion = {
      id: '115-english-16', number: 16, type: 'single', stem: '',
      options: ['accommodate', 'compensate', 'anticipate', 'reinforce'].map((text, i) => ({ key: 'ABCD'[i]!, text })),
      answer: 'A', points: 1, lead,
    }

    it('QuestionCard_ShowLead_ShouldPrintPassageParagraphsBeforeQuestion', async () => {
      const wrapper = await mountSuspended(QuestionCard, { props: { question: cloze, modelValue: '', showLead: true } })

      const paragraphs = wrapper.findAll('[data-test="lead"] p')
      expect(paragraphs.map(p => p.attributes('data-field'))).toEqual(['115-english-16:lead:0', '115-english-16:lead:1'])
      expect(wrapper.find('[data-test="lead"] [data-test="slot"]').text()).toBe('16')
    })

    it('QuestionCard_LeadAlreadyShown_ShouldNotRepeatPassage', async () => {
      const wrapper = await mountSuspended(QuestionCard, { props: { question: cloze, modelValue: '' } })

      expect(wrapper.find('[data-test="lead"]').exists()).toBe(false)
    })

    it('QuestionCard_BlankWithWordOptions_ShouldShowNumberAndOptionTextWithoutStem', async () => {
      // 綜合測驗：題目就是文章裡的空格，沒有題幹，但選項有文字
      const wrapper = await mountSuspended(QuestionCard, { props: { question: cloze, modelValue: '' } })

      expect(wrapper.find('[data-test="number"]').text()).toBe('16.')
      expect(wrapper.find('[data-test="stem"]').exists()).toBe(false)
      expect(wrapper.findAll('[data-test="option-text"]').map(option => option.text())).toEqual(['accommodate', 'compensate', 'anticipate', 'reinforce'])
    })

    it('QuestionCard_BodyBlocks_ShouldPrintParagraphTableAndFigureAfterStem', async () => {
      const question: QuizQuestion = {
        ...single,
        id: '114-mathA-1',
        stem: '袋中有藍、綠色球，其顆數如下表。',
        body: [
          { table: [['', '藍', '綠'], ['$1$號', '$2$', '$4$']] },
          { figure: { src: 'papers/114/math-a/text/1-1.webp', width: 600, height: 300 } },
          '試問 $k$ 值為何？',
        ],
      }
      const wrapper = await mountSuspended(QuestionCard, { props: { question, modelValue: '' } })

      const rows = wrapper.findAll('[data-test="table"] tr')
      expect(rows.map(row => row.findAll('th, td').length)).toEqual([3, 3])
      expect(rows[0]!.findAll('th').map(cell => cell.text())).toEqual(['', '藍', '綠'])
      expect(wrapper.find('[data-test="figure"]').attributes('src')).toMatch(/papers\/114\/math-a\/text\/1-1\.webp$/)
      expect(wrapper.find('[data-test="body"] p').attributes('data-field')).toBe('114-mathA-1:body:2')
    })

    it('QuestionCard_FigureOption_ShouldShowImageInsteadOfText', async () => {
      const question: QuizQuestion = {
        ...single,
        options: [
          { key: 'A', text: '', figure: { src: 'papers/x/a.webp', width: 200, height: 100 } },
          { key: 'B', text: '乙' }, { key: 'C', text: '丙' }, { key: 'D', text: '丁' },
        ],
      }
      const wrapper = await mountSuspended(QuestionCard, { props: { question, modelValue: '' } })

      expect(wrapper.find('[data-test="option-A"] img').attributes('src')).toMatch(/papers\/x\/a\.webp$/)
    })
  })
})
