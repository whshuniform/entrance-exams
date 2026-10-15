export type VocabExamId = 'gsat' | 'cap'

export interface VocabWord {
  /** 字表上的寫法，例如 "accomplish(ment)"、"a/an" */
  word: string
  /** 詞性，例如 "v./(n.)"；會考字表沒有詞性 */
  pos?: string
  /** 大考中心詞彙表級別 1–6；會考字表沒有級別 */
  level?: number
  /** 中文意思，有詞性時以「v. 放棄；n. 放縱」分段 */
  zh?: string
}

export interface VocabExam {
  id: VocabExamId
  name: string
  /** 字表出處，頁面上要註明 */
  source: string
  /** 預填的考試日期（YYYY-MM-DD），考生可以改 */
  examDate: string
  /** 可選的級別；空陣列表示字表不分級 */
  levels: number[]
  words: VocabWord[]
}

/** 單字 → 背好的那一天（YYYY-MM-DD） */
export type LearnedMap = Record<string, string>

export interface DayPlan {
  date: string
  words: VocabWord[]
}
