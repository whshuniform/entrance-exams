import { describe, it, expect } from 'vitest'
import { examCatalog } from '~/data/catalog'
import { DEFAULT_RANDOM_COUNT, defaultMinutes, formatYears, parseQuizQuery, toQuizQuery } from '~/utils/quiz-config'
import type { QuizConfig } from '~/types/quiz'

const gsat = examCatalog[0]!
const chinese = (...years: number[]) => gsat.papers.filter(paper => paper.id === 'chinese' && years.includes(paper.year))
const math = gsat.papers.filter(paper => paper.id === 'math-a')

describe('DEFAULT_RANDOM_COUNT', () => {
  it('DefaultRandomCount_ShouldBeFive', () => {
    expect(DEFAULT_RANDOM_COUNT).toBe(5)
  })
})

describe('defaultMinutes', () => {
  it('defaultMinutes_FullPaper_ShouldUseOriginalExamTime', () => {
    expect(defaultMinutes(chinese(115), 'full', 5)).toBe(90)
    expect(defaultMinutes(math, 'full', 1)).toBe(100)
  })

  it('defaultMinutes_Random_ShouldScaleExamTimeByPoints', () => {
    // 115 國綜試作 5 題：3 題 2 分、2 題 4 分，每分 0.9 分鐘（90 分鐘 ÷ 100 分），平均每題 2.52 分鐘
    expect(defaultMinutes(chinese(115), 'random', 3)).toBe(8)
    expect(defaultMinutes(chinese(115), 'random', 5)).toBe(13)
  })

  it('defaultMinutes_RandomAcrossYears_ShouldAverageWholePool', () => {
    // 111–115 共 22 題，合計 43.2 分鐘，平均每題約 2 分鐘
    expect(defaultMinutes(chinese(111, 112, 113, 114, 115), 'random', 5)).toBe(10)
    // 109–110 國文考科 80 分鐘、每題 2 分，每題 1.6 分鐘
    expect(defaultMinutes(chinese(109, 110), 'random', 5)).toBe(8)
  })

  it('defaultMinutes_RandomMoreThanPool_ShouldOnlyCountQuestionsThatExist', () => {
    expect(defaultMinutes(chinese(115), 'random', 50)).toBe(13)
    expect(defaultMinutes(math, 'random', 5)).toBe(5)
  })

  it('defaultMinutes_Random_ShouldBeAtLeastOneMinute', () => {
    const tiny = math.map(paper => ({ ...paper, minutes: 1 }))

    expect(defaultMinutes(tiny, 'random', 1)).toBe(1)
  })
})

describe('formatYears', () => {
  it('formatYears_ShouldJoinRunsWithDashAndGapsWithComma', () => {
    expect(formatYears([115])).toBe('115')
    expect(formatYears([111, 112, 113, 115])).toBe('111–113、115')
    expect(formatYears([111, 113])).toBe('111、113')
  })

  it('formatYears_ShouldSortFirst', () => {
    expect(formatYears([115, 111, 112])).toBe('111–112、115')
  })
})

describe('toQuizQuery', () => {
  it('toQuizQuery_FullUntimed_ShouldOmitCountAndMinutes', () => {
    const config: QuizConfig = { exam: 'gsat', subject: 'chinese', mode: 'full', years: [115], count: 5, minutes: 0 }

    expect(toQuizQuery(config)).toEqual({ exam: 'gsat', subject: 'chinese', mode: 'full', years: '115' })
  })

  it('toQuizQuery_RandomByYearsTimed_ShouldListYearsAndKeepCountAndMinutes', () => {
    const config: QuizConfig = {
      exam: 'gsat', subject: 'chinese', mode: 'random', years: [111, 112, 115], count: 5, minutes: 10,
    }

    expect(toQuizQuery(config)).toEqual({
      exam: 'gsat', subject: 'chinese', mode: 'random', years: '111,112,115', count: '5', minutes: '10',
    })
  })

  it('toQuizQuery_RandomByCurriculum_ShouldCarryCurriculumInsteadOfYears', () => {
    const config: QuizConfig = {
      exam: 'gsat', subject: 'chinese', mode: 'random', curriculum: '108課綱', years: [111, 112, 113, 114, 115], count: 5, minutes: 0,
    }

    expect(toQuizQuery(config)).toEqual({
      exam: 'gsat', subject: 'chinese', mode: 'random', curriculum: '108課綱', count: '5',
    })
  })
})

describe('parseQuizQuery', () => {
  it('parseQuizQuery_RandomByYears_RoundTrip_ShouldFindThosePapersOldestFirst', () => {
    const config: QuizConfig = {
      exam: 'gsat', subject: 'chinese', mode: 'random', years: [111, 112, 115], count: 5, minutes: 10,
    }

    const quiz = parseQuizQuery(toQuizQuery(config), examCatalog)

    expect(quiz?.config).toEqual(config)
    expect(quiz?.exam.name).toBe('大學學測')
    expect(quiz?.papers.map(paper => [paper.id, paper.year])).toEqual([['chinese', 111], ['chinese', 112], ['chinese', 115]])
  })

  it('parseQuizQuery_RandomByCurriculum_RoundTrip_ShouldTakeEveryYearOfThatCurriculum', () => {
    const config: QuizConfig = {
      exam: 'gsat', subject: 'chinese', mode: 'random', curriculum: '108課綱', years: [111, 112, 113, 114, 115], count: 5, minutes: 0,
    }

    const quiz = parseQuizQuery(toQuizQuery(config), examCatalog)

    expect(quiz?.config).toEqual(config)
    expect(quiz?.papers.map(paper => paper.year)).toEqual([111, 112, 113, 114, 115])
  })

  it('parseQuizQuery_OldCurriculum_ShouldOnlyTakeThatCurriculumsYears', () => {
    const chineseQuiz = parseQuizQuery({ exam: 'gsat', subject: 'chinese', mode: 'random', curriculum: '101課綱' }, examCatalog)
    const englishQuiz = parseQuizQuery({ exam: 'gsat', subject: 'english', mode: 'random', curriculum: '99課綱' }, examCatalog)

    expect(chineseQuiz?.config).toMatchObject({ curriculum: '101課綱', years: [109, 110] })
    expect(englishQuiz?.config).toMatchObject({ curriculum: '99課綱', years: [109, 110] })
    expect(englishQuiz?.papers.map(paper => paper.subject)).toEqual(['英文', '英文'])
  })

  it('parseQuizQuery_FullPaper_ShouldTakeOneYearAndCountEveryQuestion', () => {
    const quiz = parseQuizQuery({ exam: 'gsat', subject: 'chinese', mode: 'full', years: '114' }, examCatalog)

    expect(quiz?.config).toEqual({ exam: 'gsat', subject: 'chinese', mode: 'full', years: [114], count: 4, minutes: 0 })
    expect(quiz?.papers.map(paper => paper.year)).toEqual([114])
  })

  it('parseQuizQuery_FullPaperWithSeveralYears_ShouldUseFirstYear', () => {
    const quiz = parseQuizQuery({ exam: 'gsat', subject: 'chinese', mode: 'full', years: '113,115' }, examCatalog)

    expect(quiz?.config.years).toEqual([113])
  })

  it('parseQuizQuery_MessyYears_ShouldSortDropDuplicatesAndUnknownYears', () => {
    const quiz = parseQuizQuery({ exam: 'gsat', subject: 'chinese', mode: 'random', years: '115,111,111,99,abc' }, examCatalog)

    expect(quiz?.config.years).toEqual([111, 115])
  })

  it('parseQuizQuery_UnknownExamYearSubjectOrCurriculum_ShouldReturnNull', () => {
    const base = { exam: 'gsat', subject: 'chinese', mode: 'full', years: '115' }

    expect(parseQuizQuery({ ...base, exam: 'nope' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, exam: 'cap' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, years: '99' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, years: '' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, subject: 'social' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, subject: 'math-a', years: '114' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({ ...base, mode: 'random', years: undefined, curriculum: '99課綱' }, examCatalog)).toBeNull()
    expect(parseQuizQuery({}, examCatalog)).toBeNull()
  })

  it('parseQuizQuery_BadModeOrCount_ShouldFallBackToSafeValues', () => {
    const base = { exam: 'gsat', subject: 'chinese', years: '115' }

    expect(parseQuizQuery({ ...base, mode: 'weird' }, examCatalog)?.config.mode).toBe('full')
    expect(parseQuizQuery({ ...base, mode: 'random' }, examCatalog)?.config.count).toBe(5)
    expect(parseQuizQuery({ ...base, mode: 'random', count: 'abc' }, examCatalog)?.config.count).toBe(5)
    expect(parseQuizQuery({ ...base, mode: 'random', count: '0' }, examCatalog)?.config.count).toBe(1)
  })

  it('parseQuizQuery_RandomCount_ShouldNotBeCappedByPool', () => {
    // 想做幾題就做幾題：題庫不夠時作答頁就全部出
    const quiz = parseQuizQuery({ exam: 'gsat', subject: 'chinese', mode: 'random', years: '115', count: '30' }, examCatalog)

    expect(quiz?.config.count).toBe(30)
  })

  it('parseQuizQuery_BadMinutes_ShouldMeanUntimedOrClampToLimit', () => {
    const base = { exam: 'gsat', subject: 'chinese', mode: 'full', years: '115' }

    expect(parseQuizQuery({ ...base, minutes: 'abc' }, examCatalog)?.config.minutes).toBe(0)
    expect(parseQuizQuery({ ...base, minutes: '-5' }, examCatalog)?.config.minutes).toBe(0)
    expect(parseQuizQuery({ ...base, minutes: '999' }, examCatalog)?.config.minutes).toBe(300)
  })

  it('parseQuizQuery_RepeatedKeys_ShouldUseFirstValue', () => {
    // vue-router 的 query 同一個 key 出現兩次時是陣列
    const quiz = parseQuizQuery({ exam: ['gsat', 'cap'], subject: 'math-a', mode: 'full', years: ['115', '114'] }, examCatalog)

    expect(quiz?.papers[0]?.subject).toBe('數學A')
  })
})
