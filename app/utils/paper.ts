import type { QuizPaper, QuizQuestion } from '~/types/quiz'

/** 把各科試卷的題目依卷面順序攤平 */
export function paperQuestions(papers: QuizPaper[]): QuizQuestion[] {
  return papers.flatMap(paper => paper.parts.flatMap(part => part.groups.flatMap(group => group.questions)))
}
