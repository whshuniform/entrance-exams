import { describe, it, expect } from 'vitest'
import { findExam } from '~/data/catalog'
import { paperQuestions } from '~/utils/paper'
import { itemStatsFor } from '~/utils/item-stats'
import { toLevel } from '~/utils/levels'
import { astInfo, astStats, capInfo, capStats } from '~/data/stats-ast-cap'

const ast = findExam('ast')!
const cap = findExam('cap')!
const paperOf = (exam: typeof ast, id: string, year: number) => exam.papers.find(paper => paper.id === id && paper.year === year)!
const numbersOf = (exam: typeof ast, id: string, year: number) => paperQuestions([paperOf(exam, id, year)]).map(q => q.number)

describe('分科測驗試卷', () => {
  it('AstPapers_ShouldFollowOriginalSubjectOrderWithExamTimeAndCurriculum', () => {
    // 115 分科 8 科，卷頭考試時間都是 80 分鐘；111 年起是 108課綱
    const rows = ast.papers.filter(paper => paper.year === 115).map(paper => [paper.id, paper.exam, paper.subject, paper.curriculum, paper.minutes, paper.fullMarks])

    expect(rows).toEqual([
      ['math-jia', '分科', '數學甲', '108課綱', 80, 100],
      ['math-yi', '分科', '數學乙', '108課綱', 80, 100],
      ['physics', '分科', '物理', '108課綱', 80, 100],
      ['chemistry', '分科', '化學', '108課綱', 80, 100],
      ['biology', '分科', '生物', '108課綱', 80, 100],
      ['history', '分科', '歷史', '108課綱', 80, 100],
      ['geography', '分科', '地理', '108課綱', 80, 100],
      ['civics', '分科', '公民與社會', '108課綱', 80, 100],
    ])
  })

  it('Ast115Physics_ShouldHaveEveryChoiceQuestionIncludingMixedPart', () => {
    // 單選 1–11、多選 12–17、混合題的選擇題 19、21、22、26（ast/stats/exam_specs.json）
    expect(numbersOf(ast, 'physics', 115)).toEqual([...Array.from({ length: 17 }, (_, i) => i + 1), 19, 21, 22, 26])
  })

  it('Ast115MathJia_ShouldSkipFillInQuestionsAndUseNumberedOptions', () => {
    const questions = paperQuestions([paperOf(ast, 'math-jia', 115)])

    expect(questions.map(q => q.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    expect(questions[0]!.options.map(option => option.key)).toEqual(['1', '2', '3', '4', '5'])
  })

  it('AstQuestionIds_ShouldStartWithExamSoTheyDoNotClashWithGsat', () => {
    expect(paperQuestions([paperOf(ast, 'physics', 115)])[0]!.id).toBe('ast-115-physics-1')
    expect(paperQuestions([paperOf(ast, 'math-jia', 115)])[3]!.id).toBe('ast-115-mathJia-4')
  })

  it('AstStats_ShouldUseSixtyLevelTable', () => {
    // 115 數學甲：66.5 分 → 44 級分（ast/scripts/score.py 的例子）
    const stats = paperOf(ast, 'math-jia', 115).stats

    expect(stats.levels).toHaveLength(60)
    expect(stats.levels.find(({ above }) => 66.5 > above)?.level).toBe(44)
  })

  it('AstQuestions_ShouldHaveOfficialOptionStats', () => {
    expect(itemStatsFor('ast-115-physics-1')?.key).toBe(paperQuestions([paperOf(ast, 'physics', 115)])[0]!.answer)
  })
})

describe('國中會考試卷', () => {
  it('CapPapers_ShouldListFiveSubjectsWithExamTime', () => {
    // 卷頭測驗時間：國文 70、英語（閱讀）60、數學 80、社會 70、自然 70 分鐘
    const rows = cap.papers.filter(paper => paper.year === 115).map(paper => [paper.id, paper.exam, paper.subject, paper.minutes])

    expect(rows).toEqual([
      ['chinese', '會考', '國文', 70],
      ['english', '會考', '英語（閱讀）', 60],
      ['math', '會考', '數學', 80],
      ['social', '會考', '社會', 70],
      ['science', '會考', '自然', 70],
    ])
  })

  it('Cap115_ShouldHaveEveryQuestionWithFourOptions', () => {
    expect(numbersOf(cap, 'chinese', 115)).toHaveLength(42)
    expect(numbersOf(cap, 'english', 115)).toHaveLength(43)
    expect(numbersOf(cap, 'math', 115)).toHaveLength(25)
    expect(numbersOf(cap, 'social', 115)).toHaveLength(54)
    expect(numbersOf(cap, 'science', 115)).toHaveLength(50)
    for (const question of paperQuestions(cap.papers)) {
      expect(question.type, question.id).toBe('single')
      expect(question.options.map(option => option.key), question.id).toEqual(['A', 'B', 'C', 'D'])
    }
  })

  it('CapScoring_ShouldCountCorrectAnswersExceptMathWeighting', () => {
    // 國文每題 1 分、滿分 42 題；數學選擇題占加權分數 85 分（每題 3.4），非選擇題 15 分
    expect(paperOf(cap, 'chinese', 115).fullMarks).toBe(42)
    expect(paperQuestions([paperOf(cap, 'chinese', 115)]).every(q => q.points === 1)).toBe(true)
    expect(paperOf(cap, 'math', 115).fullMarks).toBe(100)
    expect(paperQuestions([paperOf(cap, 'math', 115)])[0]!.points).toBeCloseTo(3.4)
  })

  it('CapStats_ShouldMapCorrectCountToLabels', () => {
    // 115 國文：答對 40 題 A++、39 題 A+、16 題 C（cap/stats/conversion.json）
    const stats = paperOf(cap, 'chinese', 115).stats
    const labelOf = (raw: number) => stats.levels.find(({ above }) => raw > above)?.label

    expect([labelOf(40), labelOf(39), labelOf(16), labelOf(0)]).toEqual(['A++', 'A+', 'C', 'C'])
    expect(stats.percentOnly).toBe(true)
  })

  it('CapQuestionIds_ShouldStartWithExam', () => {
    expect(paperQuestions([paperOf(cap, 'chinese', 115)])[0]!.id).toBe('cap-115-chinese-1')
    expect(itemStatsFor('cap-115-chinese-1')?.key).toBe(paperQuestions([paperOf(cap, 'chinese', 115)])[0]!.answer)
  })
})

describe('指考、舊年度會考的成績換算', () => {
  it('AstStats_ZhiKao_ShouldRankByRawScoreOnePointPerRow', () => {
    // 110 國文：原始分 1 分一格（ast/stats/distribution.json），成績單只看分數和名次
    const stats = astStats[110]!['國文']!

    expect(stats.rawScore).toBe(true)
    expect(toLevel(stats, 77)).toBe(77)
    expect(toLevel(stats, 76.99)).toBe(76)
    expect(stats.total).toBe(37392)
  })

  it('AstStats_Year91_ShouldHaveNoRankBecauseNoDistributionWasPublished', () => {
    expect(astStats[91]!['國文']!.noRank).toBe(true)
  })

  it('AstInfo_ShouldCarryCurriculumOfThatYear', () => {
    // 指考跟同年學測同一套課綱：110 歷史 101課綱、地理 99課綱；91 是 84年課程標準
    expect(astInfo[110]!['歷史']!.curriculum).toBe('101課綱')
    expect(astInfo[110]!['地理']!.curriculum).toBe('99課綱')
    expect(astInfo[91]!['物理']!.curriculum).toBe('84年課程標準')
    expect(astInfo[110]!['國文']!).toMatchObject({ fullMarks: 100, minutes: 80 })
  })

  it('CapStats_Year102_ShouldOnlyHaveThreeLevelsWithoutPercent', () => {
    // 102 試辦只公布精熟、基礎、待加強的答對題數範圍
    const stats = capStats[102]!['國文']!

    expect(stats.levels.map(level => level.label)).toEqual(['精熟', '基礎', '待加強'])
    expect(stats.noRank).toBe(true)
  })

  it('CapInfo_EnglishBefore104_ShouldCountListeningInFullMarks', () => {
    // 102、103 英語沒分聽力：整卷 60 題對照標示，網站只收閱讀 21–60 題
    expect(capInfo[103]!['英語']!.fullMarks).toBe(60)
    expect(capInfo[110]!['英語']!.fullMarks).toBeLessThan(60)
    expect(capInfo[103]!['數學']!.fullMarks).toBe(27)
    expect(capInfo[104]!['數學']!.fullMarks).toBe(100)
  })
})
