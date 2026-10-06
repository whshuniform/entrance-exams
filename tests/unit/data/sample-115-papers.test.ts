import { describe, it, expect } from 'vitest'
import { sample115Papers } from '~/data/sample-115-papers'

const groups = sample115Papers.flatMap(paper => paper.parts.flatMap(part => part.groups))

describe('sample115Papers', () => {
  it('Papers_Headings_ShouldMatchOriginalPdf', () => {
    const [chinese, math] = sample115Papers

    expect(chinese!.parts[0]!.title).toBe('第壹部分、選擇題（占76分）')
    expect(chinese!.parts[0]!.groups.map(group => [group.title, group.note])).toEqual([
      ['一、單選題（占48分）', '說明：第1題至第24題，每題2分。'],
      ['二、多選題（占28分）', '說明：第25題至第31題，每題4分。'],
    ])
    expect(math!.parts[0]!.title).toBe('第壹部分、選擇（填）題（占85分）')
    expect(math!.parts[0]!.groups.map(group => [group.title, group.note])).toEqual([
      ['一、單選題（占30分）', '說明：第1題至第6題，每題5分。'],
    ])
  })

  it('Papers_EachGroup_ShouldOnlyHoldItsQuestionType', () => {
    for (const group of groups) {
      const type = group.title.includes('單選題') ? 'single' : 'multi'
      expect(group.questions.every(question => question.type === type)).toBe(true)
    }
  })

  it('Papers_AllSampleQuestions_ShouldAppearOnceInOrder', () => {
    const ids = groups.flatMap(group => group.questions.map(question => question.id))

    expect(ids).toEqual([
      '115-chinese-1', '115-chinese-2', '115-chinese-5', '115-chinese-25', '115-chinese-26', '115-mathA-1',
    ])
  })
})
