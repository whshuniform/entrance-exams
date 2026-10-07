import type { ExamKind, QuizConfig, QuizMode, QuizPaper, ResolvedQuiz } from '~/types/quiz'
import { paperQuestions } from './paper'

/** 隨機抽題預設抽幾題 */
export const DEFAULT_RANDOM_COUNT = 5
/** 計時最多幾分鐘 */
export const MAX_MINUTES = 300

/**
 * 預設限時：整份考卷照原卷考試時間；隨機抽題照配分比例縮短
 * （每題配分占整卷滿分的比例 × 該卷考試時間，取題庫平均 × 實際會出的題數），至少 1 分鐘。
 */
export function defaultMinutes(papers: QuizPaper[], mode: QuizMode, count: number) {
  if (mode === 'full') return papers[0]?.minutes ?? 0
  const perQuestion = papers.flatMap(paper =>
    paperQuestions([paper]).map(question => paper.minutes * question.points / paper.fullMarks),
  )
  const average = perQuestion.reduce((sum, minutes) => sum + minutes, 0) / Math.max(perQuestion.length, 1)
  return Math.max(1, Math.round(average * Math.min(count, perQuestion.length)))
}

/** 年度清單寫成「111–113、115」：連續的年度用 – 連起來 */
export function formatYears(years: number[]) {
  const sorted = [...new Set(years)].sort((a, b) => a - b)
  const runs: number[][] = []
  for (const year of sorted) {
    const run = runs.at(-1)
    if (run && run.at(-1) === year - 1) run.push(year)
    else runs.push([year])
  }
  return runs.map(run => (run.length > 1 ? `${run[0]}–${run.at(-1)}` : String(run[0]))).join('、')
}

/** 設定轉成作答頁網址的 query；依課綱時只帶課綱，整份考卷不帶題數，不計時不帶分鐘 */
export function toQuizQuery(config: QuizConfig): Record<string, string> {
  const query: Record<string, string> = { exam: config.exam, subject: config.subject, mode: config.mode }
  if (config.mode === 'random' && config.curriculum) query.curriculum = config.curriculum
  else query.years = config.years.join(',')
  if (config.mode === 'random') query.count = String(config.count)
  if (config.minutes > 0) query.minutes = String(config.minutes)
  return query
}

/** vue-router 的 query 值可能是字串、null 或陣列，取第一個字串 */
function first(value: unknown) {
  const item = Array.isArray(value) ? value[0] : value
  return typeof item === 'string' ? item : undefined
}

function toInt(value: unknown) {
  const text = first(value)
  return text && /^-?\d+$/.test(text) ? Number(text) : undefined
}

/** 「111,115」→ [111, 115]；看不懂的略過 */
function toYears(value: unknown) {
  return (first(value) ?? '').split(',').map(text => toInt(text.trim())).filter(year => year !== undefined)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/** 選定年度或課綱的試卷，年度由舊到新 */
function pickPapers(subjectPapers: QuizPaper[], mode: QuizMode, query: Record<string, unknown>) {
  const curriculum = mode === 'random' ? first(query.curriculum) : undefined
  if (curriculum) return { curriculum, papers: subjectPapers.filter(paper => paper.curriculum === curriculum) }

  const years = toYears(query.years)
  const wanted = mode === 'full' ? years.slice(0, 1) : years
  return { curriculum: undefined, papers: subjectPapers.filter(paper => wanted.includes(paper.year)) }
}

/** 從作答頁網址找出考試項目與試卷；找不到就回傳 null，題數、分鐘不合理時改成安全的值 */
export function parseQuizQuery(query: Record<string, unknown>, catalog: ExamKind[]): ResolvedQuiz | null {
  const exam = catalog.find(item => item.id === first(query.exam))
  const subject = first(query.subject)
  const subjectPapers = (exam?.papers ?? [])
    .filter(paper => paper.id === subject)
    .sort((a, b) => a.year - b.year)
  if (!exam || !subjectPapers.length) return null

  const mode: QuizMode = first(query.mode) === 'random' ? 'random' : 'full'
  const { curriculum, papers } = pickPapers(subjectPapers, mode, query)
  if (!papers.length) return null

  const count = mode === 'random'
    ? Math.max(1, toInt(query.count) ?? DEFAULT_RANDOM_COUNT)
    : paperQuestions(papers).length
  const minutes = clamp(toInt(query.minutes) ?? 0, 0, MAX_MINUTES)
  const years = papers.map(paper => paper.year)

  return {
    config: { exam: exam.id, subject: papers[0]!.id, mode, years, ...(curriculum ? { curriculum } : {}), count, minutes },
    exam,
    papers,
  }
}
