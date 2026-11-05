import { describe, it, expect } from 'vitest'
import { vocabExams } from '~/data/vocab'

describe('vocab 單字表', () => {
  it('vocabExams_List_ShouldOfferGsatAndCap', () => {
    expect(vocabExams.map(exam => exam.id)).toEqual(['gsat', 'cap'])
  })

  it('vocabExams_Gsat_ShouldHoldCeecSixLevelsOfAboutThousandEach', () => {
    const gsat = vocabExams.find(exam => exam.id === 'gsat')!

    expect(gsat.levels).toEqual([1, 2, 3, 4, 5, 6])
    for (const level of gsat.levels) {
      const count = gsat.words.filter(item => item.level === level).length
      expect(count).toBeGreaterThanOrEqual(995)
      expect(count).toBeLessThanOrEqual(1005)
    }
    expect(gsat.words.find(item => item.word === 'abandon')).toMatchObject({ word: 'abandon', pos: 'v.', level: 4 })
    expect(gsat.words.find(item => item.word === 'abandon')!.zh).toContain('放棄')
    expect(gsat.source).toContain('大學入學考試中心')
  })

  it('vocabExams_Cap_ShouldHoldCurriculumBasicWords', () => {
    const cap = vocabExams.find(exam => exam.id === 'cap')!

    expect(cap.levels).toEqual([])
    expect(cap.words.length).toBeGreaterThanOrEqual(1200)
    expect(cap.words.length).toBeLessThanOrEqual(1220)
    expect(cap.words[0]).toMatchObject({ word: 'a/an' })
    expect(cap.words.find(item => item.word === 'apple')!.zh).toContain('蘋果')
    expect(cap.source).toContain('附錄五')
  })

  it('vocabExams_DefaultDates_ShouldBeNextExamFirstDay', () => {
    expect(vocabExams.map(exam => exam.examDate)).toEqual(['2027-01-22', '2027-05-15'])
  })

  it('vocabExams_Words_ShouldAllHaveChineseMeaning', () => {
    for (const exam of vocabExams) {
      expect(exam.words.filter(item => !item.zh?.trim()).map(item => item.word)).toEqual([])
    }
  })

  it('vocabExams_Words_ShouldNotRepeat', () => {
    for (const exam of vocabExams) {
      expect(new Set(exam.words.map(item => item.word)).size).toBe(exam.words.length)
    }
  })
})
