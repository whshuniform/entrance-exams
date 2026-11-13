import type { QuizQuestion } from '~/types/quiz'

/**
 * 試作用題目：115 學年度學測數學 A 第 1 題（展示計算紙）。
 * 題目與答案出自大考中心公布之試題與選擇題答案（gsat/115/數學A）。
 */
export const sample115MathA: QuizQuestion[] = [
  {
    id: '115-mathA-1',
    number: 1,
    type: 'single',
    stem: '財神廟舉辦抽發財金活動：參加者抽兩次籤，每次抽籤出現「吉」、「祥」的機率皆為 1/3。'
      + '如果兩次都抽得「吉」，獲得獎金 180 元；如果兩次都抽得「祥」，獲得獎金 90 元；'
      + '其餘情況則無獎金。試問參加者可獲獎金的期望值為何？',
    options: [
      { key: '1', text: '20 元' },
      { key: '2', text: '30 元' },
      { key: '3', text: '45 元' },
      { key: '4', text: '60 元' },
      { key: '5', text: '90 元' },
    ],
    answer: '2',
    points: 5,
  },
]
