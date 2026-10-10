import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { useVocabPlan, VOCAB_STORAGE_KEY } from '~/composables/useVocabPlan'
import type { VocabExam } from '~/types/vocab'

const exams: VocabExam[] = [
  {
    id: 'gsat',
    name: '大學學測',
    source: '大考中心',
    examDate: '2027-01-22',
    levels: [1, 2],
    words: [
      { word: 'abroad', pos: 'adv.', level: 2 },
      { word: 'able', pos: 'adj.', level: 1 },
      { word: 'zoo', pos: 'n.', level: 1 },
      { word: 'absent', pos: 'adj.', level: 2 },
    ],
  },
  {
    id: 'cap',
    name: '國中會考',
    source: '108 課綱',
    examDate: '2027-05-15',
    levels: [],
    words: [{ word: 'apple' }, { word: 'ant' }],
  },
]
const today = () => '2027-01-20'

describe('useVocabPlan', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('useVocabPlan_FirstVisit_ShouldPickGsatWithItsExamDateAndAllLevels', () => {
    const vocab = useVocabPlan(exams, { today })

    expect(vocab.examId.value).toBe('gsat')
    expect(vocab.examDate.value).toBe('2027-01-22')
    expect(vocab.levels.value).toEqual([1, 2])
    expect(vocab.total.value).toBe(4)
    expect(vocab.plan.value.daysLeft).toBe(2)
    expect(vocab.plan.value.words.map(item => item.word)).toEqual(['able', 'zoo'])
  })

  it('useVocabPlan_ToggleWord_ShouldMarkLearnedTodayAndUnmarkAgain', () => {
    const vocab = useVocabPlan(exams, { today })

    vocab.toggle('able')
    expect(vocab.isLearned('able')).toBe(true)
    expect(vocab.learnedCount.value).toBe(1)
    expect(vocab.plan.value.doneToday).toBe(1)

    vocab.toggle('able')
    expect(vocab.isLearned('able')).toBe(false)
    expect(vocab.learnedCount.value).toBe(0)
  })

  it('useVocabPlan_PickLevels_ShouldPlanOnlyThoseLevels', () => {
    const vocab = useVocabPlan(exams, { today })

    vocab.levels.value = [2]

    expect(vocab.total.value).toBe(2)
    expect(vocab.plan.value.words.map(item => item.word)).toEqual(['abroad'])
  })

  it('useVocabPlan_SwitchExam_ShouldUseThatExamDateAndKeepEachProgressApart', () => {
    const vocab = useVocabPlan(exams, { today })
    vocab.toggle('able')

    vocab.examId.value = 'cap'

    expect(vocab.examDate.value).toBe('2027-05-15')
    expect(vocab.total.value).toBe(2)
    expect(vocab.learnedCount.value).toBe(0)
    vocab.examId.value = 'gsat'
    expect(vocab.isLearned('able')).toBe(true)
  })

  it('useVocabPlan_Change_ShouldSaveAndRestoreOnNextVisit', async () => {
    const first = useVocabPlan(exams, { today })
    first.examDate.value = '2027-01-30'
    first.levels.value = [1]
    first.toggle('zoo')
    await nextTick()

    const again = useVocabPlan(exams, { today })

    expect(again.examDate.value).toBe('2027-01-30')
    expect(again.levels.value).toEqual([1])
    expect(again.isLearned('zoo')).toBe(true)
  })

  it('useVocabPlan_BrokenSavedData_ShouldStartFresh', () => {
    localStorage.setItem(VOCAB_STORAGE_KEY, '{not json')

    const vocab = useVocabPlan(exams, { today })

    expect(vocab.examId.value).toBe('gsat')
    expect(vocab.learnedCount.value).toBe(0)
  })

  it('useVocabPlan_Reset_ShouldClearProgressOfCurrentExamOnly', () => {
    const vocab = useVocabPlan(exams, { today })
    vocab.toggle('able')
    vocab.examId.value = 'cap'
    vocab.toggle('ant')

    vocab.resetProgress()

    expect(vocab.learnedCount.value).toBe(0)
    vocab.examId.value = 'gsat'
    expect(vocab.learnedCount.value).toBe(1)
  })
})
