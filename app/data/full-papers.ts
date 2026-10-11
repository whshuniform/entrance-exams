import type { QuizImage, QuizPaper, QuizQuestion } from '~/types/quiz'

/** pdfcrop.py 輸出的一題：已轉成文字的題目只有題號、題型、配分和答案；其他題目附原卷截圖 */
interface FullQuestion {
  number: number
  type: string
  points: number
  answer: string
  pdfPage: number
  text?: boolean
  keys?: string[]
  images?: QuizImage[]
  numbered?: boolean
}

/** pdfcrop.py 輸出的整份考卷選擇題（/mnt/project-files/site-prototype/extract/pdfcrop.py） */
export interface FullPaperData {
  year: number
  id: string
  parts: { title: string, groups: { title: string, note: string, questions: FullQuestion[] }[] }[]
}

/** 題目 id 的科目段：數學A 沿用試作的「mathA」 */
const idPart = (id: string) => (id === 'math-a' ? 'mathA' : id)

/**
 * 整份考卷：部分、題型、說明和題目照原卷；base 是同年同科已轉成文字的試卷（提供科目名稱、課綱、考試時間、級分表，
 * 以及已經校對過的文字題目），其餘題目用原卷截圖。
 */
export function fullPaper(base: QuizPaper, data: FullPaperData): QuizPaper {
  const textQuestions = new Map(base.parts.flatMap(part => part.groups.flatMap(group => group.questions)).map(q => [q.number, q]))
  const toQuestion = (item: FullQuestion): QuizQuestion => {
    const text = item.text ? textQuestions.get(item.number) : undefined
    if (text) return { ...text, pdfPage: item.pdfPage }
    return {
      id: `${data.year}-${idPart(data.id)}-${item.number}`,
      number: item.number,
      type: item.type === 'multi' ? 'multi' : 'single',
      stem: '',
      options: (item.keys ?? []).map(key => ({ key, text: '' })),
      answer: item.answer,
      points: item.points,
      pdfPage: item.pdfPage,
      ...(item.images?.length ? { images: item.images } : {}),
      numberInImage: Boolean(item.images?.length) && item.numbered !== false,
    }
  }
  return {
    ...base,
    parts: data.parts.map(part => ({
      title: part.title,
      groups: part.groups.map(group => ({ title: group.title, note: group.note, questions: group.questions.map(toQuestion) })),
    })),
  }
}

/** 有整份考卷資料的年度與科目（app/data/full/<年度>-<科目代號>.json），key 為「年度-科目代號」 */
export const fullPaperData: Record<string, FullPaperData> = Object.fromEntries(
  Object.values(import.meta.glob<FullPaperData>('./full/*.json', { eager: true, import: 'default' }))
    .map(data => [`${data.year}-${data.id}`, data]),
)

/** 有整份考卷資料就換成整份考卷，沒有的維持原本的試作題目 */
export function withFullPapers(papers: QuizPaper[]): QuizPaper[] {
  return papers.map((paper) => {
    const data = fullPaperData[`${paper.year}-${paper.id}`]
    return data ? fullPaper(paper, data) : paper
  })
}
