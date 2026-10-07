import { describe, it, expect } from 'vitest'
import { examCatalog } from '~/data/catalog'
import { defaultCount, defaultMinutes, parseQuizQuery, toQuizQuery } from '~/utils/quiz-config'
import type { QuizConfig } from '~/types/quiz'

const [chinese, math] = examCatalog[0]!.papers

describe('defaultCount', () => {
  it('defaultCount_ShouldPickThreeOrWholePoolIfSmaller', () => {
    expect(defaultCount(chinese!)).toBe(3)
    expect(defaultCount(math!)).toBe(1)
  })
})

describe('defaultMinutes', () => {
  it('defaultMinutes_FullPaper_ShouldUseOriginalExamTime', () => {
    expect(defaultMinutes(chinese!, 'full', 5)).toBe(90)
    expect(defaultMinutes(math!, 'full', 1)).toBe(100)
  })

  it('defaultMinutes_Random_ShouldScaleExamTimeByPoints', () => {
    // 國綜試作 5 題共 14 分，平均每題 2.8 分；抽 3 題約 8.4 分，占整卷 100 分的 8.4%，90 分鐘 × 8.4% ≈ 8 分鐘
    expect(defaultMinutes(chinese!, 'random', 3)).toBe(8)
    // 數學A 1 題 5 分：100 分鐘 × 5% = 5 分鐘
    expect(defaultMinutes(math!, 'random', 1)).toBe(5)
  })

  it('defaultMinutes_Random_ShouldBeAtLeastOneMinute', () => {
    const tiny = { ...math!, minutes: 1 }

    expect(defaultMinutes(tiny, 'random', 1)).toBe(1)
  })
})

describe('toQuizQuery', () => {
  it('toQuizQuery_FullUntimed_ShouldOmitCountAndMinutes', () => {
    const config: QuizConfig = { exam: 'gsat', year: 115, subject: 'chinese', mode: 'full', count: 5, minutes: 0 }

    expect(toQuizQuery(config)).toEqual({ exam: 'gsat', year: '115', subject: 'chinese', mode: 'full' })
  })

  it('toQuizQuery_RandomTimed_ShouldKeepCountAndMinutes', () => {
    const config: QuizConfig = { exam: 'gsat', year: 115, subject: 'chinese', mode: 'random', count: 3, minutes: 8 }

    expect(toQuizQuery(config)).toEqual({
      exam: 'gsat', year: '115', subject: 'chinese', mode: 'random', count: '3', minutes: '8',
    })
  })
})

describe('parseQuizQuery', () => {
  it('parseQuizQuery_RoundTrip_ShouldFindExamAndPaper', () => {
    const config: QuizConfig = { exam: 'gsat', year: 115, subject: 'chinese', mode: 'random', count: 3, minutes: 8 }

    const quiz = parseQuizQuery(toQuizQuery(config), examCatalog)

    expect(quiz?.config).toEqual(config)
    expect(quiz?.exam.name).toBe('大學學測')
    expect(quiz?.paper.subject).toBe('國語文綜合能力測驗')
  })

  it('parseQuizQuery_FullPaper_ShouldCountEveryQuestion', () => {
    const quiz = parseQuizQuery({ exam: 'gsat', year: '115', subject: 'chinese', mode: 'full' }, examCatalog)

    expect(quiz?.config).toEqual({ exam: 'gsat', year: 115, subject: 'chinese', mode: 'full', count: 5, minutes: 0 })
  })

  it('parseQuizQuery_UnknownExamYearOrSubject_ShouldReturnNull', () => {
    const base = { exam: 'gsat', year: '115', subject: 'chinese', mode: 'full' }

    expect(parseQuizQuery({ ...base, exam: 'nope' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, exam: 'cap' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, year: '114' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, subject: 'english' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({}, examCatalog)).toBeNull()
  })

  it('parseQuizQuery_BadModeOrCount_ShouldFallBackToSafeValues', () => {
    const base = { exam: 'gsat', year: '115', subject: 'chinese' }

    expect(parseQuizQuery({ ...base, mode: 'weird' }, examCatalog)?.config.mode).toBe('full')
    expect(parseQuizQuery({ ...base, mode: 'random' }, examCatalog)?.config.count).toBe(3)
    expect(parseQuizQuery({ ...base, mode: 'random', count: '99' }, examCatalog)?.config.count).toBe(5)
    expect(parseQuizQuery({ ...base, mode: 'random', count: '0' }, examCatalog)?.config.count).toBe(1)
  })

  it('parseQuizQuery_BadMinutes_ShouldMeanUntimedOrClampToLimit', () => {
    const base = { exam: 'gsat', year: '115', subject: 'chinese', mode: 'full' }

    expect(parseQuizQuery({ ...base, minutes: 'abc' }, examCatalog)?.config.minutes).toBe(0)
    expect(parseQuizQuery({ ...base, minutes: '-5' }, examCatalog)?.config.minutes).toBe(0)
    expect(parseQuizQuery({ ...base, minutes: '999' }, examCatalog)?.config.minutes).toBe(300)
  })

  it('parseQuizQuery_RepeatedKeys_ShouldUseFirstValue', () => {
    // vue-router 的 query 同一個 key 出現兩次時是陣列
    const quiz = parseQuizQuery({ exam: ['gsat', 'cap'], year: '115', subject: 'math-a', mode: 'full' }, examCatalog)

    expect(quiz?.paper.subject).toBe('數學A')
  })
})
