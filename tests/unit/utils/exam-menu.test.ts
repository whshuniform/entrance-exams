import { describe, it, expect } from 'vitest'
import { examCatalog, findExam } from '~/data/catalog'
import { examActivities, examMenu } from '~/utils/exam-menu'

const exam = (id: string) => findExam(id)!

describe('exam-menu', () => {
  it('findExam_UnknownId_ShouldReturnUndefined', () => {
    expect(findExam('gsat')?.name).toBe('大學學測')
    expect(findExam('nope')).toBeUndefined()
  })

  it('examActivities_GsatWithoutVocabPage_ShouldLinkQuizAndMarkVocabComing', () => {
    expect(examActivities(exam('gsat'), { hasVocabPage: false })).toEqual([
      { id: 'quiz', title: '作試題', hint: '整份考卷或隨機抽題', to: '/gsat/practice' },
      { id: 'vocab', title: '背單字', hint: '準備中' },
    ])
  })

  it('examActivities_GsatWithVocabPage_ShouldLinkVocabOfThatExam', () => {
    expect(examActivities(exam('gsat'), { hasVocabPage: true })[1]).toEqual(
      { id: 'vocab', title: '背單字', hint: '大考中心參考詞彙表，排每天要背的字', to: '/vocab?exam=gsat' },
    )
  })

  it('examActivities_ExamWithoutPapers_ShouldMarkQuizComing', () => {
    expect(examActivities(exam('cap'), { hasVocabPage: true })).toEqual([
      { id: 'quiz', title: '作試題', hint: '準備中' },
      { id: 'vocab', title: '背單字', hint: '課綱基本 1,200 字，排每天要背的字', to: '/vocab?exam=cap' },
    ])
  })

  it('examActivities_AstHasNoEnglish_ShouldNotOfferVocab', () => {
    expect(examActivities(exam('ast'), { hasVocabPage: true }).map(item => item.id)).toEqual(['quiz'])
  })

  it('examMenu_WithoutVocabPage_ShouldLinkOnlyExamsThatHaveSomethingToDo', () => {
    expect(examMenu(examCatalog, { hasVocabPage: false })).toEqual([
      { id: 'gsat', title: '大學學測', hint: '學科能力測驗', to: '/gsat' },
      { id: 'ast', title: '分科測驗', hint: '準備中' },
      { id: 'cap', title: '國中會考', hint: '準備中' },
    ])
  })

  it('examMenu_WithVocabPage_ShouldLinkCapForVocab', () => {
    expect(examMenu(examCatalog, { hasVocabPage: true })[2]).toEqual(
      { id: 'cap', title: '國中會考', hint: '國中教育會考', to: '/cap' },
    )
  })
})
