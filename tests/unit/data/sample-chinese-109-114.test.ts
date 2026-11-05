import { describe, it, expect } from 'vitest'
import { sampleChinese109To114 } from '~/data/sample-chinese-109-114'
import { paperQuestions } from '~/utils/paper'

const byYear = (year: number) => sampleChinese109To114.find(paper => paper.year === year)!

describe('sampleChinese109To114', () => {
  it('Papers_ShouldCoverYears109To114OldestFirst', () => {
    expect(sampleChinese109To114.map(paper => paper.year)).toEqual([109, 110, 111, 112, 113, 114])
  })

  it('Papers_Headings_ShouldMatchEachYearsOriginalPaper', () => {
    // 109、110 年國文考科只有選擇題，沒有「第壹部分」標題；112 年卷面用冒號「第壹部分：」，110 年寫「劃記」，都照抄
    expect(sampleChinese109To114.map(paper => [
      paper.year,
      paper.parts[0]!.title,
      paper.parts[0]!.groups[0]!.title,
      paper.parts[0]!.groups[0]!.note,
    ])).toEqual([
      [109, '', '一、單選題（占68分）', '說明：第1題至第34題，每題有4個選項，其中只有一個是正確或最適當的選項，請畫記在答案卡之「選擇題答案區」。各題答對者，得2分；答錯、未作答或畫記多於一個選項者，該題以零分計算。'],
      [110, '', '一、單選題（占68分）', '說明：第1題至第34題，每題有4個選項，其中只有一個是正確或最適當的選項，請劃記在答案卡之「選擇題答案區」。各題答對者，得2分；答錯、未作答或劃記多於一個選項者，該題以零分計算。'],
      [111, '第壹部分、選擇題（占78分）', '一、單選題（占50分）', '說明：第1題至第25題，每題2分。'],
      [112, '第壹部分：選擇題（占78分）', '一、單選題（占50分）', '說明：第1題至第25題，每題2分。'],
      [113, '第壹部分、選擇題（占76分）', '一、單選題（占48分）', '說明：第1題至第24題，每題2分。'],
      [114, '第壹部分、選擇題（占76分）', '一、單選題（占48分）', '說明：第1題至第24題，每題2分。'],
    ])
  })

  it('Papers_ShouldOnlyKeepPlainTextStandaloneSingleChoiceQuestions', () => {
    // 有圖、表格、文字方塊的題目和題組先不收，所以題號會跳
    expect(Object.fromEntries(sampleChinese109To114.map(paper => [
      paper.year,
      paperQuestions([paper]).map(question => question.number),
    ]))).toEqual({
      109: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      110: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      111: [1, 2, 3, 5, 6, 8],
      112: [1, 2, 3, 6],
      113: [1, 2, 3],
      114: [1, 2, 3, 4],
    })
  })

  it('Papers_Answers_ShouldMatchCeecAnswerKeys', () => {
    // 依題號順序連起來；出自 gsat/answers/all_answers.json（大考中心公布之選擇題答案）
    expect(Object.fromEntries(sampleChinese109To114.map(paper => [
      paper.year,
      paperQuestions([paper]).map(question => question.answer).join(''),
    ]))).toEqual({
      109: 'ACBDBBCDADCC',
      110: 'BADCBCBABCCCA',
      111: 'ABAABB',
      112: 'ACAD',
      113: 'AAC',
      114: 'ADBC',
    })
  })

  it('Papers_EveryQuestion_ShouldBeSingleChoiceWorthTwoPointsWithFourOptions', () => {
    for (const question of paperQuestions(sampleChinese109To114)) {
      expect([question.type, question.points, question.options.map(option => option.key)]).toEqual([
        'single', 2, ['A', 'B', 'C', 'D'],
      ])
    }
  })

  it('Papers_QuestionIds_ShouldBeYearSubjectAndNumber', () => {
    expect(paperQuestions([byYear(111)]).map(question => question.id)).toEqual([
      '111-chinese-1', '111-chinese-2', '111-chinese-3', '111-chinese-5', '111-chinese-6', '111-chinese-8',
    ])
  })

  it('Papers_Text_ShouldBeCopiedFromOriginalPaper', () => {
    const [first] = paperQuestions([byYear(109)])

    expect(first!.stem).toBe('下列「」內的字，讀音前後相同的是：')
    expect(first!.options.map(option => option.text)).toEqual([
      '若分「畛」域／悉心問「診」',
      '靈「鼉」之鼓／木雕神「龕」',
      '莫得「遯」隱／鯨「豚」保育',
      '妝「奩」冠鏡／輕「謳」微吟',
    ])
  })

  it('Papers_Passage_ShouldPutEachListedItemOnItsOwnLine', () => {
    // 110 年第 3 題原卷把乙丙、丁戊排在同一行，拆成一行一項
    const sorting = paperQuestions([byYear(110)]).find(question => question.number === 3)!

    expect(sorting.passage?.slice(1, 6).map(line => line.slice(0, 2))).toEqual(['甲、', '乙、', '丙、', '丁、', '戊、'])
    for (const question of paperQuestions(sampleChinese109To114)) {
      for (const line of [question.stem, ...(question.passage ?? [])]) {
        expect(line, question.id).not.toMatch(/\n|\t|　{2,}/)
      }
    }
  })

  it('Papers_ShouldUseTheirOwnYearLevelTables', () => {
    // 到考人數取自 gsat/stats/distribution.json 各年「國文」；109、110 年國文級分只算國文考科（國寫另計）
    expect(sampleChinese109To114.map(paper => [paper.year, paper.fullMarks, paper.minutes, paper.stats.total])).toEqual([
      [109, 100, 80, 131272],
      [110, 100, 80, 126287],
      [111, 100, 90, 113826],
      [112, 100, 90, 115788],
      [113, 100, 90, 117016],
      [114, 100, 90, 117817],
    ])
  })
})
