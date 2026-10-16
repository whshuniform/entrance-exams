import type { DayPlan, LearnedMap, VocabWord } from '~/types/vocab'

const DAY_MS = 24 * 60 * 60 * 1000

/** 本地日期轉成 YYYY-MM-DD */
export function toDateKey(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** 用 UTC 算日期，不受時區與日光節約影響 */
function keyToUtc(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  return Date.UTC(year!, month! - 1, day!)
}

export function addDays(key: string, days: number) {
  return new Date(keyToUtc(key) + days * DAY_MS).toISOString().slice(0, 10)
}

export function daysBetween(from: string, to: string) {
  return Math.round((keyToUtc(to) - keyToUtc(from)) / DAY_MS)
}

/** 從今天背到考試前一天，共幾天；考試當天或已過為 0 */
export function studyDaysLeft(today: string, examDate: string) {
  return Math.max(0, daysBetween(today, examDate))
}

/** 只留選到的級別，再由易到難排（同級維持字表原本的順序）；字表不分級時全留 */
export function orderWords(words: VocabWord[], levels?: number[]) {
  const picked = levels ? words.filter(item => item.level === undefined || levels.includes(item.level)) : words
  return [...picked].sort((a, b) => (a.level ?? 0) - (b.level ?? 0))
}

interface PlanInput {
  /** 已排好順序的單字 */
  words: VocabWord[]
  learned: LearnedMap
  today: string
  examDate: string
}

/** 今天開始前還沒背的字，照順序 */
function leftAtStartOfToday({ words, learned, today }: PlanInput) {
  return words.filter(item => !learned[item.word] || learned[item.word]! >= today)
}

/**
 * 今天要背的字：把今天開始前還沒背的字平均分到考試前的每一天，每天進位。
 * 今天打勾的字不會讓今天的清單變短；沒背完的字隔天自動攤到剩下的天數。
 */
export function planToday(input: PlanInput) {
  const left = leftAtStartOfToday(input)
  const daysLeft = studyDaysLeft(input.today, input.examDate)
  const quota = daysLeft > 0 ? Math.ceil(left.length / daysLeft) : 0
  const words = left.slice(0, quota)
  return {
    daysLeft,
    quota,
    words,
    doneToday: words.filter(item => input.learned[item.word]).length,
    remaining: left.filter(item => !input.learned[item.word]).length,
  }
}

/** 照進度每天背完的話，從今天到考試前一天每天背哪些字（字背完就停） */
export function planSchedule(input: PlanInput): DayPlan[] {
  const today = planToday(input)
  const days: DayPlan[] = []
  if (today.words.length) days.push({ date: input.today, words: today.words })
  let left = leftAtStartOfToday(input).slice(today.words.length).filter(item => !input.learned[item.word])
  for (let day = 1; day < today.daysLeft && left.length; day++) {
    const count = Math.ceil(left.length / (today.daysLeft - day))
    days.push({ date: addDays(input.today, day), words: left.slice(0, count) })
    left = left.slice(count)
  }
  return days
}

/** 查字典用的字：去掉括號裡的衍生字和斜線後的其他寫法，例如 "accomplish(ment)" → "accomplish" */
export function lookupWord(word: string) {
  return word.split(/[/(]/)[0]!.trim()
}

/** 劍橋英漢（繁體）字典 */
export function dictionaryUrl(word: string) {
  const slug = lookupWord(word).toLowerCase().replace(/\s+/g, '-')
  return `https://dictionary.cambridge.org/zht/詞典/英語-漢語-繁體/${encodeURIComponent(slug)}`
}

const WEEKDAYS = '日一二三四五六'

/** 2027-01-10 → 1/10（日） */
export function formatDay(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  const weekday = new Date(Date.UTC(year!, month! - 1, day!)).getUTCDay()
  return `${month}/${day}（${WEEKDAYS[weekday]}）`
}

/** 一組字的級別範圍：「第 1 級」「第 1–2 級」；不分級回傳空字串 */
export function levelRange(words: VocabWord[]) {
  const levels = words.map(item => item.level).filter((level): level is number => level !== undefined)
  if (!levels.length) return ''
  const low = Math.min(...levels)
  const high = Math.max(...levels)
  return low === high ? `第 ${low} 級` : `第 ${low}–${high} 級`
}

/** 中文意思的一段：詞性標籤（不含句點，例如 n、v）和這個詞性的中文 */
export interface MeaningPart {
  pos: string[]
  text: string
}

/** 「n. 警報；鬧鐘；v. 使驚慌」裡每個詞性開頭的位置 */
const POS_IN_MEANING = /(?:^|；)\s*([a-z]+)\.\s+/g

/** 字表的詞性欄 "v./(n.)" → ['v', 'n'] */
function listPos(pos?: string) {
  return pos ? pos.split('/').map(item => item.replace(/[().\s]/g, '')).filter(Boolean) : []
}

/** 把中文意思拆成「詞性＋中文」幾段；中文裡沒寫詞性時用字表的詞性 */
export function meaningParts(item: VocabWord): MeaningPart[] {
  const zh = item.zh ?? ''
  const marks = [...zh.matchAll(POS_IN_MEANING)]
  if (!marks.length || marks[0]!.index !== 0) {
    const pos = listPos(item.pos)
    return zh || pos.length ? [{ pos, text: zh }] : []
  }
  return marks.map((mark, i) => ({
    pos: [mark[1]!],
    text: zh.slice(mark.index! + mark[0].length, marks[i + 1]?.index ?? zh.length),
  }))
}
