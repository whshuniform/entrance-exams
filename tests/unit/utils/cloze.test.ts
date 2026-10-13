import { describe, it, expect } from 'vitest'
import { withLeadOptions } from '~/utils/cloze'
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
