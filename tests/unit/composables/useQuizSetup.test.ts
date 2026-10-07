import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { examCatalog } from '~/data/catalog'
import { useQuizSetup } from '~/composables/useQuizSetup'

const ALL_YEARS = [109, 110, 111, 112, 113, 114, 115]
const NEW_CURRICULUM_YEARS = [111, 112, 113, 114, 115]

describe('useQuizSetup', () => {
  it('useQuizSetup_Start_ShouldPickNewestWholePaperOfFirstSubjectUntimed', () => {
    const setup = useQuizSetup(examCatalog)

    expect(setup.config.value).toEqual({
      exam: 'gsat', subject: 'chinese', mode: 'full', years: [115], count: 5, minutes: 0,
    })
    expect(setup.minutes.value).toBe(90)
  })

  it('useQuizSetup_Exams_ShouldMarkExamsWithoutPapersUnavailable', () => {
    const setup = useQuizSetup(examCatalog)

    expect(setup.exams.value.map(exam => [exam.id, exam.available])).toEqual([
      ['gsat', true], ['ast', false], ['cap', false],
    ])
  })

  it('useQuizSetup_PickUnavailableExam_ShouldStayOnCurrentExam', () => {
    const setup = useQuizSetup(examCatalog)

    setup.examId.value = 'cap'

    expect(setup.examId.value).toBe('gsat')
  })

  it('useQuizSetup_Subjects_ShouldListEachSubjectOnceWithItsYearsAndQuestions', () => {
    const setup = useQuizSetup(examCatalog)

    expect(setup.subjects.value).toEqual([
      { id: 'chinese', name: '國語文綜合能力測驗', years: [115, 114, 113, 112, 111, 110, 109], questionCount: 47 },
      { id: 'english', name: '英文', years: [115, 114, 113, 112, 111, 110, 109], questionCount: 80 },
      { id: 'math-a', name: '數學A', years: [115], questionCount: 1 },
    ])
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
    expect(setup.poolSize.value).toBe(80)
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
    expect(setup.poolSize.value).toBe(4)
    expect(setup.config.value).toMatchObject({ mode: 'full', years: [114], count: 4 })
  })

  it('useQuizSetup_RandomMode_ShouldDefaultToAllYearsAndFiveQuestions', async () => {
    const setup = useQuizSetup(examCatalog)

    setup.mode.value = 'random'
    await nextTick()

    expect(setup.scope.value).toBe('years')
    expect(setup.poolSize.value).toBe(47)
    expect(setup.config.value).toEqual({
      exam: 'gsat', subject: 'chinese', mode: 'random', years: ALL_YEARS, count: 5, minutes: 0,
    })
    // 109–115 共 47 題合計 83.2 分鐘，平均每題約 1.8 分鐘，抽 5 題約 9 分鐘
    expect(setup.minutes.value).toBe(9)
  })

  it('useQuizSetup_RandomPickSomeYears_ShouldOnlyUseThoseYearsOldestFirst', async () => {
    const setup = useQuizSetup(examCatalog)
    setup.mode.value = 'random'
    await nextTick()

    setup.pickedYears.value = [115, 111]
    await nextTick()

    expect(setup.papers.value.map(paper => paper.year)).toEqual([111, 115])
    expect(setup.poolSize.value).toBe(11)
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
    expect(setup.poolSize.value).toBe(22)

    setup.curriculum.value = '101課綱'
    await nextTick()

    expect(setup.config.value).toMatchObject({ curriculum: '101課綱', years: [109, 110] })
    expect(setup.poolSize.value).toBe(25)
  })

  it('useQuizSetup_RandomCount_ShouldNotBeCappedByPool', async () => {
    const setup = useQuizSetup(examCatalog)
    setup.mode.value = 'random'
    await nextTick()

    setup.count.value = 60
    await nextTick()

    expect(setup.config.value.count).toBe(60)
    // 題庫只有 47 題，時間照 47 題算
    expect(setup.minutes.value).toBe(83)
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

    expect(setup.years.value).toEqual([115])
    expect(setup.pickedYears.value).toEqual([115])
    expect(setup.year.value).toBe(115)
    expect(setup.count.value).toBe(8)
    expect(setup.poolSize.value).toBe(1)
  })

  it('useQuizSetup_Timed_ShouldPutChosenMinutesIntoConfig', async () => {
    const setup = useQuizSetup(examCatalog)

    setup.timed.value = true
    setup.minutes.value = 30
    await nextTick()

    expect(setup.config.value.minutes).toBe(30)
  })
})
