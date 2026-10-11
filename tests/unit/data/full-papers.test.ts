import { describe, it, expect } from 'vitest'
import { examCatalog } from '~/data/catalog'
import { paperQuestions } from '~/utils/paper'
import { fullPaper } from '~/data/full-papers'
import type { FullPaperData, TextPaperData } from '~/data/full-papers'
import type { QuizPaper } from '~/types/quiz'

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

  it('Full115Chinese_EveryQuestionShouldBeTextWithAnswerAndPoints', () => {
    // 整份考卷都轉成文字（site-prototype/text/115-chinese.json），不再用原卷截圖
    const questions = paperQuestions([paperOf('chinese', 115)])
    const third = questionOf('chinese', 115, 3)
    const multi = questionOf('chinese', 115, 27)

    expect(questions.filter(q => q.images?.length)).toEqual([])
    expect(questionOf('chinese', 115, 1).stem).toContain('讀音前後相同')
    expect([third.type, third.answer, third.points, third.options.map(option => option.key).join('')]).toEqual(['single', 'D', 2, 'ABCD'])
    expect([multi.type, multi.answer, multi.points, multi.options.map(option => option.key).join('')]).toEqual(['multi', 'ABD', 4, 'ABCDE'])
  })

  it('Full115Chinese_SetQuestionsShouldShareTheReading', () => {
    // 6-8 為題組：三題共用同一篇文章
    const lead = questionOf('chinese', 115, 6).lead

    expect(lead?.id).toBe('115-chinese-6-8')
    expect(questionOf('chinese', 115, 8).lead).toBe(lead)
    expect(questionOf('chinese', 115, 5).lead).toBeUndefined()
  })

  it('Full115English_BlanksInPassage_ShouldOfferTenCirclesWithWordBankInPassage', () => {
    // 文意選填 21–30：空格在文章裡，選項 (A)–(J) 印在文章最後，每題只有作答圈
    const blank = questionOf('english', 115, 22)
    const blocks = blank.lead!.blocks.filter(block => typeof block === 'string') as string[]

    expect(blank.lead?.id).toBe('115-english-21-30')
    expect(blocks.some(block => block.includes('[[22]]'))).toBe(true)
    expect(blocks.at(-1)).toMatch(/^\(J\) point to/)
    expect(blank.stem).toBe('')
    expect(blank.options.map(option => option.key).join('')).toBe('ABCDEFGHIJ')
    expect(blank.options.every(option => option.text === '')).toBe(true)
    expect(blank.answer).toBe('G')
  })

  it('Full115English_ShouldHaveEveryChoiceQuestion', () => {
    const numbers = paperQuestions([paperOf('english', 115)]).map(q => q.number)

    expect(numbers).toEqual([...Array.from({ length: 46 }, (_, i) => i + 1), 49])
  })
})

describe('fullPaper 轉成文字的題目', () => {
  const base = { id: 'english', exam: '學測', subject: '英文', year: 115, curriculum: '108課綱', minutes: 100, fullMarks: 100,
    stats: { levels: [], counts: {}, total: 0 }, parts: [] } as QuizPaper
  const data: FullPaperData = { year: 115, id: 'english', parts: [{ title: '第壹部分', groups: [{ title: '二、綜合測驗', note: '說明', questions: [
    { number: 11, type: 'single', points: 1, answer: 'B', pdfPage: 3, keys: ['A', 'B', 'C', 'D'], images: [{ src: 'papers/115/english/11-1.webp', width: 1, height: 1 }], numbered: true },
    { number: 12, type: 'single', points: 1, answer: 'C', pdfPage: 3, keys: ['A', 'B', 'C', 'D'], images: [], numbered: true },
    { number: 13, type: 'single', points: 1, answer: 'D', pdfPage: 3, keys: ['A', 'B', 'C', 'D'], images: [{ src: 'papers/115/english/13-1.webp', width: 1, height: 1 }], numbered: true },
  ] }] }] }
  const text: TextPaperData = {
    year: 115, id: 'english',
    sets: [{ id: '11-15', blocks: ['From the campfire [[11]] ...', 'A new study [[12]] ...'] }],
    questions: [
      { number: 11, set: '11-15', stem: '', options: ['what is more', 'it turns out', 'in other words', 'all in all'] },
      { number: 12, set: '11-15', stem: '', options: ['demonstrate', 'immigrate', 'communicate', 'manipulate'] },
    ],
  }
  const questions = paperQuestions([fullPaper(base, data, text)])

  it('fullPaper_TextQuestion_ShouldUseTextInsteadOfImages', () => {
    const q11 = questions[0]!

    expect(q11.images).toBeUndefined()
    expect(q11.numberInImage).toBeFalsy()
    expect(q11.options).toEqual([
      { key: 'A', text: 'what is more' }, { key: 'B', text: 'it turns out' }, { key: 'C', text: 'in other words' }, { key: 'D', text: 'all in all' },
    ])
    expect([q11.id, q11.answer, q11.points, q11.pdfPage]).toEqual(['115-english-11', 'B', 1, 3])
  })

  it('fullPaper_SetQuestions_ShouldShareOnePassage', () => {
    expect(questions[0]!.lead).toEqual({ id: '115-english-11-15', blocks: ['From the campfire [[11]] ...', 'A new study [[12]] ...'] })
    expect(questions[1]!.lead).toBe(questions[0]!.lead)
  })

  it('fullPaper_QuestionNotYetConverted_ShouldKeepImages', () => {
    expect(questions[2]!.images?.[0]?.src).toBe('papers/115/english/13-1.webp')
  })
})
