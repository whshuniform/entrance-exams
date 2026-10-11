import { describe, it, expect } from 'vitest'
import { examCatalog } from '~/data/catalog'
import { paperQuestions } from '~/utils/paper'

const gsat = examCatalog[0]!
const paperOf = (id: string, year: number) => gsat.papers.find(paper => paper.id === id && paper.year === year)!
const questionOf = (id: string, year: number, number: number) => paperQuestions([paperOf(id, year)]).find(q => q.number === number)!

describe('完整考卷（原卷截圖＋已轉成文字的題目）', () => {
  it('Full115Chinese_ShouldHaveEveryChoiceQuestion', () => {
    // 115 國綜選擇題：單選 1–24、多選 25–31、混合題的選擇題 35、36（32–34 是非選擇題，不收）
    const numbers = paperQuestions([paperOf('chinese', 115)]).map(q => q.number)

    expect(numbers).toEqual([...Array.from({ length: 31 }, (_, i) => i + 1), 35, 36])
  })

  it('Full115Chinese_HeadingsShouldFollowOriginalPdf', () => {
    const paper = paperOf('chinese', 115)

    expect(paper.parts.map(part => part.title)).toEqual(['第壹部分、選擇題（占76分）', '第貳部分、混合題或非選擇題（占24分）'])
    expect(paper.parts[0]!.groups.map(group => group.title)).toEqual(['一、單選題（占48分）', '二、多選題（占28分）'])
  })

  it('Full115Chinese_TextQuestionsShouldStayText', () => {
    const first = questionOf('chinese', 115, 1)

    expect(first.stem).toContain('讀音前後相同')
    expect(first.images).toBeUndefined()
  })

  it('Full115Chinese_OtherQuestionsShouldBeCroppedImagesWithAnswerAndPoints', () => {
    const third = questionOf('chinese', 115, 3)
    const multi = questionOf('chinese', 115, 27)

    expect(third.images?.[0]?.src).toBe('papers/115/chinese/3-1.webp')
    expect(third.numberInImage).toBe(true)
    expect([third.type, third.answer, third.points, third.options.map(option => option.key).join('')]).toEqual(['single', 'D', 2, 'ABCD'])
    expect([multi.type, multi.answer, multi.points, multi.options.map(option => option.key).join('')]).toEqual(['multi', 'ABD', 4, 'ABCDE'])
  })

  it('Full115Chinese_GroupReadingShouldComeWithFirstQuestion', () => {
    // 6-8 為題組：文章接在第 6 題前面
    expect(questionOf('chinese', 115, 6).images).toHaveLength(2)
    expect(questionOf('chinese', 115, 7).images).toHaveLength(1)
  })

  it('Full115English_BlanksInPassage_ShouldOfferTenOptionsWithoutOwnImage', () => {
    // 文意選填 21–30：空格在文章裡，選項是 (A)–(J)
    const first = questionOf('english', 115, 21)
    const blank = questionOf('english', 115, 22)

    expect(first.images?.length).toBeGreaterThan(0)
    expect(first.numberInImage).toBe(false)
    expect(blank.images).toBeUndefined()
    expect(blank.options.map(option => option.key).join('')).toBe('ABCDEFGHIJ')
    expect(blank.answer).toBe('G')
  })

  it('Full115English_ShouldHaveEveryChoiceQuestion', () => {
    const numbers = paperQuestions([paperOf('english', 115)]).map(q => q.number)

    expect(numbers).toEqual([...Array.from({ length: 46 }, (_, i) => i + 1), 49])
  })
})
