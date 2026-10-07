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

/** 試卷裡的一個題型段落，例如「一、單選題（占48分）」 */
export interface QuizGroup {
  title: string
  /** 標題下的說明，例如「說明：第1題至第24題，每題2分。」 */
  note: string
  questions: QuizQuestion[]
}

/** 試卷的一個部分，例如「第壹部分、選擇題（占76分）」 */
export interface QuizPart {
  title: string
  groups: QuizGroup[]
}

/** 某年某科的級分換算表與各級分人數（大考中心統計資料） */
export interface LevelStats {
  /** 由 15 級分排到 1 級分；原始得分「大於」above 才達該級分 */
  levels: { level: number, above: number }[]
  /** 各級分人數 */
  counts: Record<number, number>
  /** 到考人數 */
  total: number
}

/** 全國名次區間：同級分的人無法再細分 */
export interface RankRange {
  best: number
  worst: number
  total: number
}

/** 一科試卷，依原試題 PDF 的部分、題型分段 */
export interface QuizPaper {
  /** 網址用的科目代號，例如 chinese、math-a */
  id: string
  /** 卷頭的考試簡稱，例如「學測」 */
  exam: string
  subject: string
  year: number
  /** 原試題卷頭的考試時間（分鐘） */
  minutes: number
  /** 整卷滿分（換算級分用） */
  fullMarks: number
  stats: LevelStats
  parts: QuizPart[]
}

/** 試卷的一頁：一頁一題 */
export interface QuizSheet {
  paper: QuizPaper
  part: QuizPart
  group: QuizGroup
  question: QuizQuestion
  /** 部分、題型段落從這頁開始，要印標題 */
  startsPart: boolean
  startsGroup: boolean
  /** 在該科試卷中的第幾頁、共幾頁 */
  pageNumber: number
  pageCount: number
}

export interface NumberRange {
  min: number
  max: number
}

/** 交卷後的一科成績 */
export interface SubjectReport {
  subject: string
  /** 試作題目的得分與滿分 */
  earned: number
  sampleMax: number
  fullMarks: number
  /** 整卷分數範圍：沒考到的題目全錯（min）到全對（max） */
  scoreRange: NumberRange
  levelRange: NumberRange
  /** 最好名次取最高級分、最差名次取最低級分 */
  rank: RankRange
}

/** 考試項目：學測、分科、會考；還沒有題目的先顯示「即將推出」 */
export interface ExamKind {
  /** 網址用的代號，例如 gsat */
  id: string
  name: string
  /** 正式名稱，例如「學科能力測驗」 */
  fullName: string
  papers: QuizPaper[]
}

/** full：整份考卷；random：從這份考卷隨機抽幾題 */
export type QuizMode = 'full' | 'random'

/** 首頁選好、帶到作答頁網址的設定 */
export interface QuizConfig {
  exam: string
  year: number
  /** 試卷的科目代號（QuizPaper.id） */
  subject: string
  mode: QuizMode
  /** 隨機抽題的題數；整份考卷時為全部題數 */
  count: number
  /** 限時幾分鐘；0 為不計時 */
  minutes: number
}

/** 從網址找到的考試項目與試卷 */
export interface ResolvedQuiz {
  config: QuizConfig
  exam: ExamKind
  paper: QuizPaper
}

/** 倒數計時：waiting 還沒開始、stopped 提早交卷停下、expired 時間到 */
export type CountdownStatus = 'waiting' | 'running' | 'stopped' | 'expired'
