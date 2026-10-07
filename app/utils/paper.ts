import type { QuizPaper, QuizQuestion, QuizSheet } from '~/types/quiz'

/** 把各科試卷的題目依卷面順序攤平 */
export function paperQuestions(papers: QuizPaper[]): QuizQuestion[] {
  return papers.flatMap(paper => paper.parts.flatMap(part => part.groups.flatMap(group => group.questions)))
}

/** 一頁一題排成試卷頁面，並標出每科的頁碼與部分、題型段落的開頭 */
export function buildPages(papers: QuizPaper[]): QuizSheet[] {
  return papers.flatMap(paper => {
    const pages = paper.parts.flatMap(part => part.groups.flatMap(group =>
      group.questions.map((question, index) => ({
        paper,
        part,
        group,
        question,
        startsPart: index === 0 && part.groups[0] === group,
        startsGroup: index === 0,
      })),
    ))
    return pages.map((page, index) => ({ ...page, pageNumber: index + 1, pageCount: pages.length }))
  })
}

/**
 * 隨機抽題：從試卷抽 count 題，照原卷順序排；沒抽到題目的題型段落、部分整段拿掉，
 * 分段標題才不會印在空段落上。不會改到原本的試卷。
 */
export function pickQuestions(paper: QuizPaper, count: number, random: () => number = Math.random): QuizPaper {
  const ids = paperQuestions([paper]).map(question => question.id)
  // Fisher–Yates 洗牌後取前 count 題
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j]!, ids[i]!]
  }
  const picked = new Set(ids.slice(0, count))

  const parts = paper.parts
    .map(part => ({
      ...part,
      groups: part.groups
        .map(group => ({ ...group, questions: group.questions.filter(question => picked.has(question.id)) }))
        .filter(group => group.questions.length > 0),
    }))
    .filter(part => part.groups.length > 0)
  return { ...paper, parts }
}
