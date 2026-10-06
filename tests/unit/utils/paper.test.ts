import { describe, it, expect } from 'vitest'
import { paperQuestions } from '~/utils/paper'
import type { QuizPaper, QuizQuestion } from '~/types/quiz'

const question = (id: string): QuizQuestion => ({
  id, number: 1, type: 'single', stem: '', options: [], answer: 'A', points: 1,
})

describe('paperQuestions', () => {
  it('paperQuestions_NestedPapers_ShouldFlattenInPaperOrder', () => {
    const papers: QuizPaper[] = [
      { subject: '甲', parts: [{ title: 'p1', groups: [
        { title: 'g1', note: '', questions: [question('a'), question('b')] },
        { title: 'g2', note: '', questions: [question('c')] },
      ] }] },
      { subject: '乙', parts: [{ title: 'p2', groups: [{ title: 'g3', note: '', questions: [question('d')] }] }] },
    ]

    expect(paperQuestions(papers).map(q => q.id)).toEqual(['a', 'b', 'c', 'd'])
  })
})
