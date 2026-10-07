import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { examCatalog } from '~/data/catalog'
import { useQuizSetup } from '~/composables/useQuizSetup'

describe('useQuizSetup', () => {
  it('useQuizSetup_Start_ShouldPickFirstPaperWholeAndUntimed', () => {
    const setup = useQuizSetup(examCatalog)

    expect(setup.config.value).toEqual({
      exam: 'gsat', year: 115, subject: 'chinese', mode: 'full', count: 3, minutes: 0,
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

  it('useQuizSetup_YearsAndSubjects_ShouldComeFromSelectedExam', () => {
    const setup = useQuizSetup(examCatalog)

    expect(setup.years.value).toEqual([115])
    expect(setup.papers.value.map(paper => paper.id)).toEqual(['chinese', 'math-a'])
    expect(setup.poolSize.value).toBe(5)
  })

  it('useQuizSetup_RandomMode_ShouldDefaultTimeByPickedQuestions', async () => {
    const setup = useQuizSetup(examCatalog)

    setup.mode.value = 'random'
    await nextTick()
    expect(setup.minutes.value).toBe(8)

    setup.count.value = 5
    await nextTick()
    expect(setup.minutes.value).toBe(13)
  })

  it('useQuizSetup_ChangeSubject_ShouldClampCountAndResetTime', async () => {
    const setup = useQuizSetup(examCatalog)

    setup.subject.value = 'math-a'
    await nextTick()

    expect(setup.poolSize.value).toBe(1)
    expect(setup.count.value).toBe(1)
    expect(setup.minutes.value).toBe(100)
  })

  it('useQuizSetup_Timed_ShouldPutChosenMinutesIntoConfig', async () => {
    const setup = useQuizSetup(examCatalog)

    setup.timed.value = true
    setup.minutes.value = 30
    await nextTick()

    expect(setup.config.value.minutes).toBe(30)
  })
})
