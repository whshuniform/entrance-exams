export type QuestionType = 'single' | 'multi'

export interface QuizOption {
  key: string
  text: string
  /** 選項本身是圖（例如四張圖選一張）；這時 text 為空 */
  figure?: QuizImage
}

/** 題組文章、題目裡的一段：文字段落、表格（第一列是表頭）或圖 */
export type QuizBlock = string | { table: string[][] } | { figure: QuizImage }

/** 題組共用的文章：同一題組的題目共用同一個物件 */
export interface QuizLead {
  /** 例如 115-english-16-20 */
  id: string
  blocks: QuizBlock[]
}

export interface QuizQuestion {
  id: string
  number: number
  type: QuestionType
  /** 題幹；以 __文字__ 標示畫底線處 */
  stem: string
  /** 題幹下方的引文或待排序句子，每行一段 */
  passage?: string[]
  /** 題幹後面、選項前面的其他段落、表格、圖 */
  body?: QuizBlock[]
  /** 所屬題組的文章；印在題組第一題（或隨機抽到的第一題）前面 */
  lead?: QuizLead
  options: QuizOption[]
  /** 正確答案，例如 "C"、"BE" */
  answer: string
  points: number
  /** 在原試題 PDF 的第幾頁；同一頁的題目在網站上也排在同一頁 */
  pdfPage?: number
  /** 原卷截圖（題組文章在前）；有截圖時 stem、選項文字為空，只留作答圈 */
  images?: QuizImage[]
  /** 截圖裡已經有題號，卡片不再印一次 */
  numberInImage?: boolean
}

/** 原卷截圖：src 為 public/ 下的路徑（不含網站 baseURL），寬高為像素 */
export interface QuizImage {
  src: string
  width: number
  height: number
}

/** 大考中心「選擇題選項分析」的一題：全體到考考生的百分比（整數） */
export interface ItemStats {
  /** 答對率；多選題是得分率 */
  p: number
  /** 官方表上打 * 的選項（多選題照字母排） */
  key: string
  /** 畫記各選項的 %；多選題各選項分開算，加總會超過 100 */
  options: Record<string, number>
  /** 未作答 % */
  blank: number
  multi?: boolean
  /** 多選題全對 % */
  full?: number | null
}

export interface OptionStatRow {
  key: string
  percent: number
  isAnswer: boolean
  isPicked: boolean
  /** 選的人最多 */
  isTop: boolean
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
  /** 原卷的填空線「＿＿＿＿」，整條不換行 */
  blank?: boolean
  bold?: boolean
  italic?: boolean
  /** 文章裡有編號的空格，text 是題號，例如綜合測驗的 [[16]] */
  slot?: boolean
  /** 數學式，text 是 KaTeX 原始碼 */
  math?: boolean
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
  blank?: boolean
  bold?: boolean
  italic?: boolean
  slot?: boolean
  math?: boolean
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
  /** 原卷沒有部分標題時（例如 109、110 年國文考科）為空字串，不顯示 */
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
  /** 命題依據的課綱，例如「108課綱」（gsat/stats/curriculum_by_year.csv） */
  curriculum: string
  /** 原試題卷頭的考試時間（分鐘） */
  minutes: number
  /** 整卷滿分（換算級分用） */
  fullMarks: number
  stats: LevelStats
  parts: QuizPart[]
}

/** 試卷頁上的一題，帶著它所在的部分、題型段落 */
export interface QuizSheetItem {
  part: QuizPart
  group: QuizGroup
  question: QuizQuestion
  /** 部分、題型段落從這題開始，要在這題前面印標題 */
  startsPart: boolean
  startsGroup: boolean
  /** 題組文章要印在這題前面（題組的第一題，或隨機抽題抽到的第一題） */
  startsLead: boolean
}

/** 試卷的一頁：跟原試題 PDF 同一頁的題目排在一起 */
export interface QuizSheet {
  paper: QuizPaper
  /** 原試題 PDF 的頁碼；題目沒有頁碼資料時為 undefined（一頁一題） */
  pdfPage?: number
  items: QuizSheetItem[]
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
  /** 查哪一年的級分表與各級分人數 */
  year: number
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

/** 考試項目：學測、分科、會考；還沒有題目的先顯示「準備中」 */
export interface ExamKind {
  /** 網址用的代號，例如 gsat */
  id: string
  name: string
  /** 正式名稱，例如「學科能力測驗」 */
  fullName: string
  papers: QuizPaper[]
  /** 有必背單字時，考試頁「背單字」卡片的說明；沒有就不出現背單字 */
  vocabHint?: string
}

/** full：整份考卷；random：從選定科目的幾個年度或一個課綱隨機抽題 */
export type QuizMode = 'full' | 'random'

/** 隨機抽題的範圍：依年度（可複選）或依課綱 */
export type RandomScope = 'years' | 'curriculum'

/** 首頁選好、帶到作答頁網址的設定 */
export interface QuizConfig {
  exam: string
  /** 試卷的科目代號（QuizPaper.id） */
  subject: string
  mode: QuizMode
  /** 選的年度，由舊到新；整份考卷只有一個 */
  years: number[]
  /** 隨機抽題依課綱選範圍時的課綱；這時 years 是該課綱的所有年度 */
  curriculum?: string
  /** 隨機抽題想做的題數（不設上限，題庫不夠就全出）；整份考卷時為全部題數 */
  count: number
  /** 限時幾分鐘；0 為不計時 */
  minutes: number
}

/** 從網址找到的考試項目與試卷（年度由舊到新） */
export interface ResolvedQuiz {
  config: QuizConfig
  exam: ExamKind
  papers: QuizPaper[]
}

/** 隨機抽題的成績：答對幾題、共幾題、答對率（整數百分比） */
export interface Accuracy {
  correct: number
  total: number
  rate: number
}

/** 倒數計時：waiting 還沒開始、stopped 提早交卷停下、expired 時間到 */
export type CountdownStatus = 'waiting' | 'running' | 'stopped' | 'expired'
