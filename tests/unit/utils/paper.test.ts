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

  it('buildPages_Continuous_ShouldNumberAcrossAllPapers', () => {
    // 隨機抽題跨年度：整份練習卷從第 1 頁連續編到最後一頁
    const pages = buildPages(papers, { continuous: true })

    expect(pages.map(page => [page.paper.subject, page.pageNumber, page.pageCount])).toEqual([
      ['甲', 1, 4], ['甲', 2, 4], ['甲', 3, 4], ['乙', 4, 4],
    ])
  })
})

describe('pickQuestions', () => {
  const paper: QuizPaper = {
    id: 'x', exam: '學測', subject: '甲', year: 114, curriculum: '108課綱', minutes: 90, fullMarks: 100,
    stats: { levels: [], counts: {}, total: 0 },
    parts: [
      { title: 'p1', groups: [
        { title: 'g1', note: 'n1', questions: [question('a'), question('b')] },
        { title: 'g2', note: 'n2', questions: [question('c')] },
      ] },
      { title: 'p2', groups: [{ title: 'g3', note: 'n3', questions: [question('d'), question('e')] }] },
    ],
  }
  const other: QuizPaper = {
    ...paper,
    year: 115,
    parts: [{ title: 'q1', groups: [{ title: 'h1', note: 'm1', questions: [question('f'), question('g')] }] }],
  }
  const ids = (picked: QuizPaper[]) => paperQuestions(picked).map(q => q.id)

  it('pickQuestions_ShouldKeepCountQuestionsInPaperOrder', () => {
    for (let i = 0; i < 20; i++) {
      const picked = ids(pickQuestions([paper], 3))

      expect(picked).toHaveLength(3)
      expect([...picked].sort()).toEqual(picked)
      expect(picked.every(id => ['a', 'b', 'c', 'd', 'e'].includes(id))).toBe(true)
    }
  })

  it('pickQuestions_SeveralPapers_ShouldDrawFromAllAndKeepPaperOrder', () => {
    for (let i = 0; i < 20; i++) {
      const picked = ids(pickQuestions([paper, other], 4))

      expect(picked).toHaveLength(4)
      expect([...picked].sort()).toEqual(picked)
    }
  })

  it('pickQuestions_ManyDraws_ShouldReachEveryQuestionOfEveryPaper', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 300; i++) ids(pickQuestions([paper, other], 2)).forEach(id => seen.add(id))

    expect([...seen].sort()).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  })

  it('pickQuestions_ShouldUseGivenRandomSource', () => {
    // 亂數永遠取最大：洗牌不交換，抽到前兩題
    expect(ids(pickQuestions([paper, other], 2, () => 0.999))).toEqual(['a', 'b'])
  })

  it('pickQuestions_ShouldDropEmptyGroupsPartsAndPapersSoHeadingsStillMakeSense', () => {
    const picked = pickQuestions([paper, other], 2, () => 0.999)

    expect(picked.map(item => [item.year, item.parts.map(part => [part.title, part.groups.map(group => group.title)])])).toEqual([
      [114, [['p1', ['g1']]]],
    ])
    expect(buildPages(picked).map(page => [page.startsPart, page.startsGroup, page.pageNumber, page.pageCount])).toEqual([
      [true, true, 1, 2], [false, false, 2, 2],
    ])
  })

  it('pickQuestions_CountAtLeastPool_ShouldKeepEveryPaperWithoutChangingThem', () => {
    const picked = pickQuestions([paper, other], 99)

    expect(ids(picked)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    expect(paperQuestions([paper])).toHaveLength(5)
  })
})
