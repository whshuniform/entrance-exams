import { describe, it, expect } from 'vitest'
import { buildPages, paperQuestions } from '~/utils/paper'
import type { QuizPaper, QuizQuestion } from '~/types/quiz'

const question = (id: string): QuizQuestion => ({
  id, number: 1, type: 'single', stem: '', options: [], answer: 'A', points: 1,
})

describe('paperQuestions', () => {
  it('paperQuestions_NestedPapers_ShouldFlattenInPaperOrder', () => {
    const papers: QuizPaper[] = [
      { subject: '甲', year: 115, fullMarks: 100, stats: { levels: [], counts: {}, total: 0 }, parts: [{ title: 'p1', groups: [
        { title: 'g1', note: '', questions: [question('a'), question('b')] },
        { title: 'g2', note: '', questions: [question('c')] },
      ] }] },
      { subject: '乙', year: 115, fullMarks: 100, stats: { levels: [], counts: {}, total: 0 }, parts: [
        { title: 'p2', groups: [{ title: 'g3', note: '', questions: [question('d')] }] },
      ] },
    ]

    expect(paperQuestions(papers).map(q => q.id)).toEqual(['a', 'b', 'c', 'd'])
  })
})

describe('buildPages', () => {
  const papers: QuizPaper[] = [
    { subject: '甲', year: 115, fullMarks: 100, stats: { levels: [], counts: {}, total: 0 }, parts: [
      { title: 'p1', groups: [
        { title: 'g1', note: 'n1', questions: [question('a'), question('b')] },
        { title: 'g2', note: 'n2', questions: [question('c')] },
      ] },
    ] },
    { subject: '乙', year: 115, fullMarks: 100, stats: { levels: [], counts: {}, total: 0 }, parts: [
      { title: 'p2', groups: [{ title: 'g3', note: 'n3', questions: [question('d')] }] },
    ] },
  ]

  it('buildPages_ShouldPutOneQuestionPerPageInOrder', () => {
    expect(buildPages(papers).map(page => page.question.id)).toEqual(['a', 'b', 'c', 'd'])
  })

  it('buildPages_ShouldMarkWherePartsAndGroupsStart', () => {
    const pages = buildPages(papers)

    expect(pages.map(page => [page.startsPart, page.startsGroup])).toEqual([
      [true, true], [false, false], [false, true], [true, true],
    ])
  })

  it('buildPages_ShouldNumberPagesWithinEachSubject', () => {
    const pages = buildPages(papers)

    expect(pages.map(page => [page.paper.subject, page.pageNumber, page.pageCount])).toEqual([
      ['甲', 1, 3], ['甲', 2, 3], ['甲', 3, 3], ['乙', 1, 1],
    ])
  })
})
