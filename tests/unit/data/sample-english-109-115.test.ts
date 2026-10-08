import { describe, it, expect } from 'vitest'
import { sampleEnglish109To115 } from '~/data/sample-english-109-115'
import { paperQuestions } from '~/utils/paper'

describe('sampleEnglish109To115', () => {
  it('Papers_ShouldBeEnglish109To115OldestFirst', () => {
    expect(sampleEnglish109To115.map(paper => [paper.id, paper.year, paper.subject])).toEqual([
      ['english', 109, '英文'],
      ['english', 110, '英文'],
      ['english', 111, '英文'],
      ['english', 112, '英文'],
      ['english', 113, '英文'],
      ['english', 114, '英文'],
      ['english', 115, '英文'],
    ])
  })

  it('Papers_Headings_ShouldMatchEachYearsOriginalPaper', () => {
    // 原卷「說明︰」用的是全形冒號「︰」，照抄
    expect(sampleEnglish109To115.map(paper => [
      paper.year,
      paper.parts[0]!.title,
      paper.parts[0]!.groups[0]!.title,
      paper.parts[0]!.groups[0]!.note,
    ])).toEqual([
      [109, '第壹部分：單選題（占72分）', '一、詞彙題（占15分）', '說明︰第1題至第15題，每題有4個選項，其中只有一個是正確或最適當的選項，請畫記在答案卡之「選擇題答案區」。各題答對者，得1分；答錯、未作答或畫記多於一個選項者，該題以零分計算。'],
      [110, '第壹部分：單選題（占72分）', '一、詞彙題（占15分）', '說明︰第1題至第15題，每題有4個選項，其中只有一個是正確或最適當的選項，請劃記在答案卡之「選擇題答案區」。各題答對者，得1分；答錯、未作答或劃記多於一個選項者，該題以零分計算。'],
      [111, '第壹部分、選擇題（占62分）', '一、詞彙題（占10分）', '說明︰第1題至第10題，每題1分。'],
      [112, '第壹部分、選擇題（占62分）', '一、詞彙題（占10分）', '說明︰第1題至第10題為單選題，每題1分。'],
      [113, '第壹部分、選擇題（占62分）', '一、詞彙題（占10分）', '說明︰第1題至第10題為單選題，每題1分。'],
      [114, '第壹部分、選擇題（占62分）', '一、詞彙題（占10分）', '說明︰第1題至第10題為單選題，每題1分。'],
      [115, '第壹部分、選擇題（占62分）', '一、詞彙題（占10分）', '說明︰第1題至第10題為單選題，每題1分。'],
    ])
  })

  it('Papers_ShouldHaveEveryVocabularyQuestion', () => {
    expect(sampleEnglish109To115.map(paper => paperQuestions([paper]).length)).toEqual([15, 15, 10, 10, 10, 10, 10])
  })

  it('Papers_Answers_ShouldMatchCeecAnswerKeys', () => {
    // 依題號順序連起來；出自 gsat/answers/all_answers.json（大考中心公布之選擇題答案）
    expect(Object.fromEntries(sampleEnglish109To115.map(paper => [
      paper.year,
      paperQuestions([paper]).map(question => question.answer).join(''),
    ]))).toEqual({
      109: 'BBDDBACDCCAADAB',
      110: 'CCAADDBDACBAACB',
      111: 'BACAACBDDB',
      112: 'ACCBDDBAAD',
      113: 'BABBDCDCAB',
      114: 'CAACCDDABA',
      115: 'BCBADACBCD',
    })
  })

  it('Papers_EveryQuestion_ShouldBeOnePointSingleChoiceWithOneBlank', () => {
    for (const question of paperQuestions(sampleEnglish109To115)) {
      expect([question.type, question.points, question.options.map(option => option.key)], question.id).toEqual([
        'single', 1, ['A', 'B', 'C', 'D'],
      ])
      expect(question.stem.split('＿＿＿＿'), question.id).toHaveLength(2)
    }
  })

  it('Papers_Text_ShouldBeCopiedFromOriginalPaper', () => {
    const [first] = paperQuestions(sampleEnglish109To115.filter(paper => paper.year === 115))

    expect(first).toMatchObject({
      id: '115-english-1',
      number: 1,
      stem: 'The mayor has such a ＿＿＿＿ schedule that it takes weeks to arrange an interview with her.',
      answer: 'B',
    })
    expect(first!.options.map(option => option.text)).toEqual(['hasty', 'tight', 'diligent', 'routine'])
  })

  it('Papers_ShouldUseEnglishLevelTablesAndExamTime', () => {
    // 到考人數取自 gsat/stats/distribution.json 各年「英文」；原卷卷頭「考試時間：100 分鐘」
    expect(sampleEnglish109To115.map(paper => [paper.year, paper.curriculum, paper.fullMarks, paper.minutes, paper.stats.total])).toEqual([
      [109, '99課綱', 100, 100, 131054],
      [110, '99課綱', 100, 100, 125995],
      [111, '108課綱', 100, 100, 113756],
      [112, '108課綱', 100, 100, 115919],
      [113, '108課綱', 100, 100, 117106],
      [114, '108課綱', 100, 100, 117866],
      [115, '108課綱', 100, 100, 118169],
    ])
  })
})
