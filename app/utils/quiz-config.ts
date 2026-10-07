import type { ExamKind, QuizConfig, QuizMode, QuizPaper, ResolvedQuiz } from '~/types/quiz'
import { paperQuestions } from './paper'

/** 隨機抽題預設抽幾題 */
export const DEFAULT_RANDOM_COUNT = 3
/** 計時最多幾分鐘 */
export const MAX_MINUTES = 300

function poolOf(paper: QuizPaper) {
  return paperQuestions([paper])
}

/** 隨機抽題的預設題數：3 題，題庫不夠就全抽 */
export function defaultCount(paper: QuizPaper) {
  return Math.min(DEFAULT_RANDOM_COUNT, poolOf(paper).length)
}

/**
 * 預設限時：整份考卷照原卷考試時間；隨機抽題照配分比例縮短
 * （抽到的題目平均配分 × 題數，占整卷滿分的比例 × 原卷考試時間），至少 1 分鐘。
 */
export function defaultMinutes(paper: QuizPaper, mode: QuizMode, count: number) {
  if (mode === 'full') return paper.minutes
  const pool = poolOf(paper)
  const averagePoints = pool.reduce((sum, question) => sum + question.points, 0) / Math.max(pool.length, 1)
  return Math.max(1, Math.round(paper.minutes * count * averagePoints / paper.fullMarks))
}

/** 設定轉成作答頁網址的 query；整份考卷不帶題數，不計時不帶分鐘 */
export function toQuizQuery(config: QuizConfig): Record<string, string> {
  const query: Record<string, string> = {
    exam: config.exam,
    year: String(config.year),
    subject: config.subject,
    mode: config.mode,
  }
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/** 從作答頁網址找出考試項目與試卷；找不到就回傳 null，題數、分鐘不合理時改成安全的值 */
export function parseQuizQuery(query: Record<string, unknown>, catalog: ExamKind[]): ResolvedQuiz | null {
  const exam = catalog.find(item => item.id === first(query.exam))
  const year = toInt(query.year)
  const paper = exam?.papers.find(item => item.year === year && item.id === first(query.subject))
  if (!exam || !paper) return null

  const mode: QuizMode = first(query.mode) === 'random' ? 'random' : 'full'
  const pool = poolOf(paper).length
  const count = mode === 'random' ? clamp(toInt(query.count) ?? defaultCount(paper), 1, pool) : pool
  const minutes = clamp(toInt(query.minutes) ?? 0, 0, MAX_MINUTES)

  return {
    config: { exam: exam.id, year: paper.year, subject: paper.id, mode, count, minutes },
    exam,
    paper,
  }
}
