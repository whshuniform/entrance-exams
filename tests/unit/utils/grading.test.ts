import { describe, it, expect } from 'vitest'
import { gradeQuestion } from '~/utils/grading'
import type { QuizQuestion } from '~/types/quiz'

const options = ['A', 'B', 'C', 'D', 'E'].map(key => ({ key, text: `選項${key}` }))

const singleQuestion: QuizQuestion = {
  id: 's1', number: 1, type: 'single', stem: '單選題', options: options.slice(0, 4), answer: 'C', points: 2,
}

const multiQuestion: QuizQuestion = {
  id: 'm1', number: 25, type: 'multi', stem: '多選題', options, answer: 'BE', points: 4,
}

describe('gradeQuestion — 單選題', () => {
  it('gradeQuestion_SingleCorrect_ShouldGetFullPoints', () => {
    // Arrange / Act
    const result = gradeQuestion(singleQuestion, 'C')

    // Assert
    expect(result).toEqual({ score: 2, isCorrect: true, wrongCount: 0 })
  })

  it('gradeQuestion_SingleWrong_ShouldGetZero', () => {
    const result = gradeQuestion(singleQuestion, 'A')

    expect(result.score).toBe(0)
    expect(result.isCorrect).toBe(false)
  })

  it('gradeQuestion_SingleBlank_ShouldGetZero', () => {
    const result = gradeQuestion(singleQuestion, '')

    expect(result.score).toBe(0)
    expect(result.isCorrect).toBe(false)
  })
})

describe('gradeQuestion — 多選題（n-2k 計分）', () => {
  it('gradeQuestion_MultiAllCorrect_ShouldGetFullPoints', () => {
    const result = gradeQuestion(multiQuestion, 'EB')

    expect(result).toEqual({ score: 4, isCorrect: true, wrongCount: 0 })
  })

  it('gradeQuestion_MultiOneWrongOption_ShouldGetThreeFifths', () => {
    // 少選 E：錯 1 個選項 → (5-2)/5 × 4 = 2.4
    const result = gradeQuestion(multiQuestion, 'B')

    expect(result.score).toBeCloseTo(2.4)
    expect(result.wrongCount).toBe(1)
    expect(result.isCorrect).toBe(false)
  })

  it('gradeQuestion_MultiTwoWrongOptions_ShouldGetOneFifth', () => {
    // 多選 A、少選 E：錯 2 個 → (5-4)/5 × 4 = 0.8
    const result = gradeQuestion(multiQuestion, 'AB')

    expect(result.score).toBeCloseTo(0.8)
    expect(result.wrongCount).toBe(2)
  })

  it('gradeQuestion_MultiThreeWrongOptions_ShouldNotGoBelowZero', () => {
    const result = gradeQuestion(multiQuestion, 'ACD')

    expect(result.score).toBe(0)
  })

  it('gradeQuestion_MultiBlank_ShouldGetZero', () => {
    // 全未作答得 0，即使 n-2k 為正
    const result = gradeQuestion(multiQuestion, '')

    expect(result.score).toBe(0)
  })
})

describe('gradeQuestion — 數字選項（數學）', () => {
  const mathQuestion: QuizQuestion = {
    id: 'math1', number: 1, type: 'single', stem: '期望值為何？',
    options: ['1', '2', '3', '4', '5'].map(key => ({ key, text: key })),
    answer: '2', points: 5,
  }

  it('gradeQuestion_NumericKeyCorrect_ShouldGetFullPoints', () => {
    expect(gradeQuestion(mathQuestion, '2').score).toBe(5)
  })

  it('gradeQuestion_NumericKeyWrong_ShouldGetZero', () => {
    expect(gradeQuestion(mathQuestion, '3').score).toBe(0)
  })
})
