import type { QuizPaper, QuizQuestion, QuizSheet, QuizSheetItem } from '~/types/quiz'

/** 把各科試卷的題目依卷面順序攤平 */
export function paperQuestions(papers: QuizPaper[]): QuizQuestion[] {
  return papers.flatMap(paper => paper.parts.flatMap(part => part.groups.flatMap(group => group.questions)))
}

/**
 * 排成試卷頁面：原試題 PDF 同一頁的題目排在同一頁（沒有頁碼資料的題目一題一頁），並標出部分、題型段落的開頭。
 * 頁碼預設每科（每份試卷）各自從 1 編起；continuous 時整份練習卷連續編號（隨機抽題跨年度用）。
 */
export function buildPages(papers: QuizPaper[], { continuous = false } = {}): QuizSheet[] {
  const perPaper = papers.map((paper) => {
    const items: QuizSheetItem[] = paper.parts.flatMap(part => part.groups.flatMap(group =>
      group.questions.map((question, index) => ({
        part,
        group,
        question,
        startsPart: index === 0 && part.groups[0] === group,
        startsGroup: index === 0,
        startsLead: false,
      })),
    ))
    // 題組文章印在題組（在這份卷裡）出現的第一題前面；跨頁的後半段不再重印，跟原卷一樣
    items.forEach((item, index) => {
      const lead = item.question.lead
      item.startsLead = Boolean(lead) && items[index - 1]?.question.lead?.id !== lead!.id
    })
    const sheets: Pick<QuizSheet, 'paper' | 'pdfPage' | 'items'>[] = []
    for (const item of items) {
      const pdfPage = item.question.pdfPage
      const last = sheets.at(-1)
      if (last && pdfPage !== undefined && last.pdfPage === pdfPage) last.items.push(item)
      else sheets.push({ paper, pdfPage, items: [item] })
    }
    return sheets
  })
  if (continuous) {
    const pages = perPaper.flat()
    return pages.map((page, index) => ({ ...page, pageNumber: index + 1, pageCount: pages.length }))
  }
  return perPaper.flatMap(pages => pages.map((page, index) => ({ ...page, pageNumber: index + 1, pageCount: pages.length })))
}

/**
 * 隨機抽題：從幾份試卷（例如同一科的幾個年度）一起抽 count 題，照試卷、原卷順序排；
 * 沒抽到題目的題型段落、部分、試卷整段拿掉，分段標題才不會印在空段落上。不會改到原本的試卷。
 */
export function pickQuestions(papers: QuizPaper[], count: number, random: () => number = Math.random): QuizPaper[] {
  const ids = paperQuestions(papers).map(question => question.id)
  // Fisher–Yates 洗牌後取前 count 題
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j]!, ids[i]!]
  }
  const picked = new Set(ids.slice(0, count))

  return papers
    .map(paper => ({
      ...paper,
      parts: paper.parts
        .map(part => ({
          ...part,
          groups: part.groups
            .map(group => ({ ...group, questions: group.questions.filter(question => picked.has(question.id)) }))
            .filter(group => group.questions.length > 0),
        }))
        .filter(part => part.groups.length > 0),
    }))
    .filter(paper => paper.parts.length > 0)
}
