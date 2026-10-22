import type { InjectionKey } from 'vue'

/** 文章裡的編號空格（[[16]]）：點了跳出那一題的選項作答 */
export interface QuizSlots {
  /** 這個空格的題目目前的作答；undefined 表示這份練習卷沒有這一題（不能點） */
  answerOf: (number: number) => string | undefined
  open: (number: number) => void
}

const QUIZ_SLOTS: InjectionKey<QuizSlots> = Symbol('quiz-slots')

/** 題目卡片提供給底下的文章（MarkupText）使用 */
export function provideQuizSlots(slots: QuizSlots) {
  provide(QUIZ_SLOTS, slots)
}

export function useQuizSlots() {
  return inject(QUIZ_SLOTS, null)
}
