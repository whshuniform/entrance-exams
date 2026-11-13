import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { examCatalog as fullCatalog } from '~/data/catalog'
import { useQuizSetup } from '~/composables/useQuizSetup'
import { catalogFrom109 } from '../fixtures/catalog-109'

const examCatalog = catalogFrom109(fullCatalog)

const ALL_YEARS = [109, 110, 111, 112, 113, 114, 115]
const NEW_CURRICULUM_YEARS = [111, 112, 113, 114, 115]

describe('useQuizSetup', () => {
  it('useQuizSetup_Start_ShouldPickNewestWholePaperOfFirstSubjectUntimed', () => {
    const setup = useQuizSetup(examCatalog)

    expect(setup.config.value).toEqual({
      exam: 'gsat', subject: 'chinese', mode: 'full', years: [115], count: 33, minutes: 0,
    })
    expect(setup.minutes.value).toBe(90)
  })

  it('useQuizSetup_Exams_ShouldMarkExamsWithoutPapersUnavailable', () => {
    const setup = useQuizSetup(examCatalog.map(exam => (exam.id === 'gsat' ? exam : { ...exam, papers: [] })))

    expect(setup.exams.value.map(exam => [exam.id, exam.available])).toEqual([
      ['gsat', true], ['ast', false], ['cap', false],
    ])
  })

  it('useQuizSetup_PickUnavailableExam_ShouldStayOnCurrentExam', () => {
    const setup = useQuizSetup(examCatalog.map(exam => (exam.id === 'cap' ? { ...exam, papers: [] } : exam)))

    setup.examId.value = 'cap'

    expect(setup.examId.value).toBe('gsat')
  })

  it('useQuizSetup_Subjects_ShouldListEachSubjectOnceWithItsYearsAndQuestions', () => {
    const setup = useQuizSetup(examCatalog)

    expect(setup.subjects.value).toEqual([
      { id: 'chinese', name: '國語文綜合能力測驗', years: [115, 114, 113, 112, 111, 110, 109], questionCount: 251 },
      { id: 'english', name: '英文', years: [115, 114, 113, 112, 111, 110, 109], questionCount: 347 },
      { id: 'math-a', name: '數學A', years: [115, 114, 113, 112, 111], questionCount: 65 },
      { id: 'math-b', name: '數學B', years: [115, 114, 113, 112, 111], questionCount: 64 },
      { id: 'social', name: '社會', years: [115, 114, 113, 112, 111, 110, 109], questionCount: 416 },
      { id: 'science', name: '自然', years: [115, 114, 113, 112, 111, 110, 109], questionCount: 383 },
    ])
  })

  it('useQuizSetup_OlderPapers_ShouldAddOldMathAndEarlierYears', () => {
    // 加入舊卷後：110 年以前的「數學」排在英文後面；國文、英文往前多了 108 年以前的年度
    const setup = useQuizSetup(fullCatalog)
    const subject = (id: string) => setup.subjects.value.find(item => item.id === id)!

    expect(setup.subjects.value.map(item => item.id).slice(0, 4)).toEqual(['chinese', 'english', 'math', 'math-a'])
    expect(subject('math')).toMatchObject({ name: '數學' })
    expect(subject('math').years).toEqual(expect.arrayContaining([110, 109, 108]))
    expect(subject('chinese').years).toEqual(expect.arrayContaining([115, 109, 108, 104]))
  })

  it('useQuizSetup_SubjectName_ShouldComeFromNewestYear', () => {
    // 國文 109–110 年叫「國文」，111 年起叫「國語文綜合能力測驗」；不管試卷排序，科目名稱用最新一年的
    const chinese = examCatalog[0]!.papers.filter(paper => paper.id === 'chinese')
    const oldestFirst = [{ ...examCatalog[0]!, papers: [...chinese].sort((a, b) => a.year - b.year) }]

    const setup = useQuizSetup(oldestFirst)

    expect(setup.subjects.value[0]).toMatchObject({ id: 'chinese', name: '國語文綜合能力測驗' })
  })

  it('useQuizSetup_ChooseEnglish_ShouldOfferItsYearsAndCurricula', async () => {
    const setup = useQuizSetup(examCatalog)
    setup.mode.value = 'random'
    setup.subject.value = 'english'
    await nextTick()

    expect(setup.pickedYears.value).toEqual([115, 114, 113, 112, 111, 110, 109])
    expect(setup.poolSize.value).toBe(347)
    expect(setup.curricula.value).toEqual([
      { name: '108課綱', years: [115, 114, 113, 112, 111] },
      { name: '99課綱', years: [110, 109] },
    ])
  })

  it('useQuizSetup_FullMode_ShouldPickOneYearOfChosenSubject', async () => {
    const setup = useQuizSetup(examCatalog)

    expect(setup.years.value).toEqual([115, 114, 113, 112, 111, 110, 109])
    setup.year.value = 114
    await nextTick()

    expect(setup.papers.value.map(paper => paper.year)).toEqual([114])
    expect(setup.poolSize.value).toBe(33)
    expect(setup.config.value).toMatchObject({ mode: 'full', years: [114], count: 33 })
  })

  it('useQuizSetup_RandomMode_ShouldDefaultToAllYearsAndFiveQuestions', async () => {
    const setup = useQuizSetup(examCatalog)

    setup.mode.value = 'random'
    await nextTick()

    expect(setup.scope.value).toBe('years')
    expect(setup.poolSize.value).toBe(251)
    expect(setup.config.value).toEqual({
      exam: 'gsat', subject: 'chinese', mode: 'random', years: ALL_YEARS, count: 5, minutes: 0,
    })
    // 109–115 共 251 題合計 523.6 分鐘，平均每題約 2.1 分鐘，抽 5 題約 10 分鐘
    expect(setup.minutes.value).toBe(10)
  })

  it('useQuizSetup_RandomPickSomeYears_ShouldOnlyUseThoseYearsOldestFirst', async () => {
    const setup = useQuizSetup(examCatalog)
    setup.mode.value = 'random'
    await nextTick()

    setup.pickedYears.value = [115, 111]
    await nextTick()

    expect(setup.papers.value.map(paper => paper.year)).toEqual([111, 115])
    expect(setup.poolSize.value).toBe(67)
    expect(setup.config.value.years).toEqual([111, 115])
    expect(setup.minutes.value).toBe(11)
  })

  it('useQuizSetup_RandomByCurriculum_ShouldTakeEveryYearOfThatCurriculum', async () => {
    const setup = useQuizSetup(examCatalog)
    setup.mode.value = 'random'
    setup.pickedYears.value = [115]
    await nextTick()

    setup.scope.value = 'curriculum'
    await nextTick()

    expect(setup.curricula.value).toEqual([
      { name: '108課綱', years: [115, 114, 113, 112, 111] },
      { name: '101課綱', years: [110, 109] },
    ])
    expect(setup.config.value).toMatchObject({ curriculum: '108課綱', years: NEW_CURRICULUM_YEARS })
    expect(setup.poolSize.value).toBe(167)

    setup.curriculum.value = '101課綱'
    await nextTick()

    expect(setup.config.value).toMatchObject({ curriculum: '101課綱', years: [109, 110] })
    expect(setup.poolSize.value).toBe(84)
  })

  it('useQuizSetup_RandomCount_ShouldNotBeCappedByPool', async () => {
    const setup = useQuizSetup(examCatalog)
    setup.mode.value = 'random'
    await nextTick()

    setup.count.value = 300
    await nextTick()

    expect(setup.config.value.count).toBe(300)
    // 題庫只有 251 題，時間照 251 題算（524 分鐘，超過計時上限 300 分鐘前的預設值）
    expect(setup.minutes.value).toBe(524)
  })

  it('useQuizSetup_RandomWithoutAnyYear_ShouldNotBeReadyToStart', async () => {
    const setup = useQuizSetup(examCatalog)
    setup.mode.value = 'random'
    await nextTick()
    expect(setup.canStart.value).toBe(true)

    setup.pickedYears.value = []
    await nextTick()

    expect(setup.poolSize.value).toBe(0)
    expect(setup.canStart.value).toBe(false)
  })

  it('useQuizSetup_ChangeSubject_ShouldResetYearsButKeepCount', async () => {
    const setup = useQuizSetup(examCatalog)
    setup.mode.value = 'random'
    setup.count.value = 8
    setup.pickedYears.value = [112]
    await nextTick()

    setup.subject.value = 'math-a'
    await nextTick()

    expect(setup.years.value).toEqual([115, 114, 113, 112, 111])
    expect(setup.pickedYears.value).toEqual([115, 114, 113, 112, 111])
    expect(setup.year.value).toBe(115)
    expect(setup.count.value).toBe(8)
    expect(setup.poolSize.value).toBe(65)
  })

  it('useQuizSetup_Timed_ShouldPutChosenMinutesIntoConfig', async () => {
    const setup = useQuizSetup(examCatalog)

    setup.timed.value = true
    setup.minutes.value = 30
    await nextTick()

    expect(setup.config.value.minutes).toBe(30)
  })
})
