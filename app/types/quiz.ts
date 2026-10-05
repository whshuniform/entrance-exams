export type QuestionType = 'single' | 'multi'

export interface QuizOption {
  key: string
  text: string
}

export interface QuizQuestion {
  id: string
  number: number
  type: QuestionType
  /** 題幹；以 __文字__ 標示畫底線處 */
  stem: string
  /** 題幹下方的引文或待排序句子，每行一段 */
  passage?: string[]
  options: QuizOption[]
  /** 正確答案，例如 "C"、"BE" */
  answer: string
  points: number
}

export interface GradeResult {
  score: number
  isCorrect: boolean
  /** 判錯的選項數（多選題 n-2k 的 k） */
  wrongCount: number
}

export interface MarkupSegment {
  text: string
  underline: boolean
}

/** 純文字（去掉 __ 標記後）的字元區間，end 不含 */
export interface TextRange {
  start: number
  end: number
}

export interface HighlightSegment {
  text: string
  /** 此片段在純文字中的起始位置 */
  start: number
  underline: boolean
  highlight: boolean
}

/** 右下角工具列：off 為關閉繪畫（可作答、正常捲動） */
export type DrawTool = 'off' | 'highlighter' | 'pen' | 'eraser'

export type InkTool = Exclude<DrawTool, 'off'>

/** 題目卡片上的一筆手寫筆跡 */
export interface InkStroke {
  tool: InkTool
  /** x 為卡片寬度比例（0–1），y 為距卡片上緣的 px */
  points: [number, number][]
}
