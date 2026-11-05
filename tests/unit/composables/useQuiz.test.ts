import { describe, it, expect } from 'vitest'
import { useQuiz } from '~/composables/useQuiz'
import type { QuizQuestion } from '~/types/quiz'

const options = ['A', 'B', 'C', 'D', 'E'].map(key => ({ key, text: key }))
const questions: QuizQuestion[] = [
  { id: 'q1', number: 1, type: 'single', stem: '一', options: options.slice(0, 4), answer: 'C', points: 2 },
  { id: 'q2', number: 2, type: 'single', stem: '二', options: options.slice(0, 4), answer: 'A', points: 2 },
  { id: 'q3', number: 25, type: 'multi', stem: '三', options, answer: 'BE', points: 4 },
]

describe('useQuiz', () => {
  it('useQuiz_Initial_ShouldHaveNoAnswersAndMaxScore', () => {
    const quiz = useQuiz(questions)

    expect(quiz.answeredCount.value).toBe(0)
    expect(quiz.maxScore.value).toBe(8)
    expect(quiz.submitted.value).toBe(false)
  })

  it('useQuiz_SetAnswer_ShouldCountAnswered', () => {
    const quiz = useQuiz(questions)

    quiz.setAnswer('q1', 'C')
    quiz.setAnswer('q3', 'B')

    expect(quiz.answeredCount.value).toBe(2)
  })

  it('useQuiz_Submit_ShouldGradeEveryQuestionAndSumScore', () => {
    const quiz = useQuiz(questions)
    quiz.setAnswer('q1', 'C') // +2
    quiz.setAnswer('q2', 'B') // 0
    quiz.setAnswer('q3', 'B') // 2.4

    quiz.submit()

    expect(quiz.submitted.value).toBe(true)
    expect(quiz.results.value.q1?.isCorrect).toBe(true)
    expect(quiz.results.value.q2?.isCorrect).toBe(false)
    expect(quiz.totalScore.value).toBeCloseTo(4.4)
  })

  it('useQuiz_SetAnswerAfterSubmit_ShouldBeIgnored', () => {
    const quiz = useQuiz(questions)
    quiz.submit()

    quiz.setAnswer('q1', 'C')

    expect(quiz.answers.value.q1 ?? '').toBe('')
  })

  it('useQuiz_Reset_ShouldClearAnswersAndResults', () => {
    const quiz = useQuiz(questions)
    quiz.setAnswer('q1', 'C')
    quiz.submit()

    quiz.reset()

    expect(quiz.submitted.value).toBe(false)
    expect(quiz.answeredCount.value).toBe(0)
    expect(quiz.totalScore.value).toBe(0)
  })
})
