import type { QuizPaper } from '~/types/quiz'
import { sample115Chinese } from './sample-115-chinese'
import { sample115MathA } from './sample-115-math'
import { stats115 } from './stats-115'

/**
 * 試作用試卷：部分、題型標題與說明照抄 115 學年度學測試題（gsat/115/國綜、數學A 的 question.docx）。
 * 試作只放其中幾題，所以說明裡的題號範圍是原卷的範圍。
 */
export const sample115Papers: QuizPaper[] = [
  {
    subject: '國語文綜合能力測驗',
    year: 115,
    // 國綜整卷 100 分（第壹部分 76 分＋第貳部分 24 分），級分表為「國文」
    fullMarks: 100,
    stats: stats115.國文,
    parts: [
      {
        title: '第壹部分、選擇題（占76分）',
        groups: [
          {
            title: '一、單選題（占48分）',
            note: '說明：第1題至第24題，每題2分。',
            questions: sample115Chinese.filter(question => question.type === 'single'),
          },
          {
            title: '二、多選題（占28分）',
            note: '說明：第25題至第31題，每題4分。',
            questions: sample115Chinese.filter(question => question.type === 'multi'),
          },
        ],
      },
    ],
  },
  {
    subject: '數學A',
    year: 115,
    fullMarks: 100,
    stats: stats115['數學A'],
    parts: [
      {
        title: '第壹部分、選擇（填）題（占85分）',
        groups: [
          {
            title: '一、單選題（占30分）',
            note: '說明：第1題至第6題，每題5分。',
            questions: sample115MathA,
          },
        ],
      },
    ],
  },
]
