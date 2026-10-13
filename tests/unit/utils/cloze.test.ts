import { describe, it, expect } from 'vitest'
import { takenKeys, withLeadOptions } from '~/utils/cloze'
import type { QuizQuestion } from '~/types/quiz'

const lead = {
  id: '115-english-21-30',
  blocks: ['Animals are [[21]] to their habitats.', '(A) retain', '(B) adapted', '(C) point to'],
}

describe('withLeadOptions', () => {
  it('WithLeadOptions_OptionsInLead_ShouldFillOptionTextFromPassage', () => {
    // 文意選填：選項文字印在題組最後，題目本身只有作答圈
    const question: QuizQuestion = {
      id: '115-english-21', number: 21, type: 'single', stem: '', lead,
      options: ['A', 'B', 'C'].map(key => ({ key, text: '' })),
      answer: 'B', points: 1,
    }

    expect(withLeadOptions(question).options.map(option => option.text)).toEqual(['retain', 'adapted', 'point to'])
  })

  it('WithLeadOptions_OptionsHaveText_ShouldKeepThem', () => {
    const question: QuizQuestion = {
      id: '115-english-16', number: 16, type: 'single', stem: '', lead,
      options: [{ key: 'A', text: 'accommodate' }, { key: 'B', text: 'compensate' }],
      answer: 'A', points: 1,
    }

    expect(withLeadOptions(question)).toBe(question)
  })
})

describe('takenKeys', () => {
  const pool = (number: number): QuizQuestion => ({
    id: `115-english-${number}`, number, type: 'single', stem: '', lead,
    options: ['A', 'B', 'C'].map(key => ({ key, text: '' })),
    answer: 'A', points: 1,
  })

  it('TakenKeys_PooledOptions_ShouldListKeysPickedByOtherQuestionsInTheSet', () => {
    // 文意選填：每個選項只能用一次，別題選走的要提醒
    const questions = [pool(21), pool(22), pool(23)]
    const answers = { '115-english-21': 'B', '115-english-22': 'C', '115-english-23': '' }

    expect(takenKeys(questions[1]!, questions, answers)).toEqual(['B'])
  })

  it('TakenKeys_OwnOptions_ShouldBeEmpty', () => {
    // 綜合測驗：每題有自己的選項，不會被別題選走
    const own = (number: number): QuizQuestion => ({
      ...pool(number), options: [{ key: 'A', text: 'accommodate' }, { key: 'B', text: 'compensate' }],
    })
    const questions = [own(16), own(17)]

    expect(takenKeys(questions[1]!, questions, { '115-english-16': 'A' })).toEqual([])
  })
})
