import { describe, it, expect } from 'vitest'
import { buildPages, paperQuestions, pickQuestions } from '~/utils/paper'
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

describe('pickQuestions', () => {
  const paper: QuizPaper = {
    id: 'x', exam: '學測', subject: '甲', year: 115, minutes: 90, fullMarks: 100,
    stats: { levels: [], counts: {}, total: 0 },
    parts: [
      { title: 'p1', groups: [
        { title: 'g1', note: 'n1', questions: [question('a'), question('b')] },
        { title: 'g2', note: 'n2', questions: [question('c')] },
      ] },
      { title: 'p2', groups: [{ title: 'g3', note: 'n3', questions: [question('d'), question('e')] }] },
    ],
  }
  const ids = (picked: QuizPaper) => paperQuestions([picked]).map(q => q.id)

  it('pickQuestions_ShouldKeepCountQuestionsInPaperOrder', () => {
    for (let i = 0; i < 20; i++) {
      const picked = ids(pickQuestions(paper, 3))

      expect(picked).toHaveLength(3)
      expect([...picked].sort()).toEqual(picked)
      expect(picked.every(id => ['a', 'b', 'c', 'd', 'e'].includes(id))).toBe(true)
    }
  })

  it('pickQuestions_ManyDraws_ShouldReachEveryQuestion', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 200; i++) ids(pickQuestions(paper, 2)).forEach(id => seen.add(id))

    expect([...seen].sort()).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  it('pickQuestions_ShouldUseGivenRandomSource', () => {
    // 亂數永遠取最大：洗牌不交換，抽到前兩題
    expect(ids(pickQuestions(paper, 2, () => 0.999))).toEqual(['a', 'b'])
  })

  it('pickQuestions_ShouldDropEmptyGroupsAndPartsSoHeadingsStillMakeSense', () => {
    const picked = pickQuestions(paper, 2, () => 0.999)

    expect(picked.parts.map(part => [part.title, part.groups.map(group => group.title)])).toEqual([
      ['p1', ['g1']],
    ])
    expect(buildPages([picked]).map(page => [page.startsPart, page.startsGroup, page.pageNumber, page.pageCount])).toEqual([
      [true, true, 1, 2], [false, false, 2, 2],
    ])
  })

  it('pickQuestions_CountAtLeastPool_ShouldKeepWholePaperWithoutChangingIt', () => {
    const picked = pickQuestions(paper, 9)

    expect(ids(picked)).toEqual(['a', 'b', 'c', 'd', 'e'])
    expect(paperQuestions([paper])).toHaveLength(5)
  })
})
