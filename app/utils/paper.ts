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
