import { describe, it, expect } from 'vitest'
import { sampleChinese111To114 } from '~/data/sample-chinese-111-114'
import { paperQuestions } from '~/utils/paper'

describe('sampleChinese111To114', () => {
  it('Papers_Headings_ShouldMatchEachYearsOriginalPdf', () => {
    // 112 年卷面用冒號「第壹部分：」，照抄
    expect(sampleChinese111To114.map(paper => [
      paper.year,
      paper.parts[0]!.title,
      paper.parts[0]!.groups[0]!.title,
      paper.parts[0]!.groups[0]!.note,
    ])).toEqual([
      [111, '第壹部分、選擇題（占78分）', '一、單選題（占50分）', '說明：第1題至第25題，每題2分。'],
      [112, '第壹部分：選擇題（占78分）', '一、單選題（占50分）', '說明：第1題至第25題，每題2分。'],
      [113, '第壹部分、選擇題（占76分）', '一、單選題（占48分）', '說明：第1題至第24題，每題2分。'],
      [114, '第壹部分、選擇題（占76分）', '一、單選題（占48分）', '說明：第1題至第24題，每題2分。'],
    ])
  })

  it('Papers_Answers_ShouldMatchCeecAnswerKeys', () => {
    const answers = Object.fromEntries(paperQuestions(sampleChinese111To114).map(question => [question.id, question.answer]))

    expect(answers).toEqual({
      '111-chinese-1': 'A', '111-chinese-2': 'B', '111-chinese-3': 'A',
      '112-chinese-1': 'A', '112-chinese-2': 'C', '112-chinese-3': 'A',
      '113-chinese-1': 'A', '113-chinese-2': 'A', '113-chinese-3': 'C',
      '114-chinese-1': 'A', '114-chinese-2': 'D', '114-chinese-3': 'B',
    })
  })

  it('Papers_EveryQuestion_ShouldBeSingleChoiceWorthTwoPointsWithFourOptions', () => {
    for (const question of paperQuestions(sampleChinese111To114)) {
      expect([question.type, question.points, question.options.map(option => option.key)]).toEqual([
        'single', 2, ['A', 'B', 'C', 'D'],
      ])
    }
  })

  it('Papers_ShouldUseTheirOwnYearLevelTables', () => {
    // 到考人數取自 gsat/stats/distribution.json 各年「國文」
    expect(sampleChinese111To114.map(paper => [paper.year, paper.fullMarks, paper.minutes, paper.stats.total])).toEqual([
      [111, 100, 90, 113826],
      [112, 100, 90, 115788],
      [113, 100, 90, 117016],
      [114, 100, 90, 117817],
    ])
  })
})
