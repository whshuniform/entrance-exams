import type { ItemStats, OptionStatRow } from '~/types/quiz'
import itemStats from '~/data/item-stats.json'

/** 每題官方選項比例；資料由 /mnt/project-files/item-stats/scripts/site_json.py 產生 */
const table = itemStats as Record<string, ItemStats>

/** 用網站題目 id（`115-chinese-1`）找大考中心公布的選項比例，沒有資料回 undefined */
export function itemStatsFor(questionId: string): ItemStats | undefined {
  return table[questionId]
}

/** 照題目選項順序列出每個選項被選的比例，標出正解、考生選的、選最多的 */
export function optionStatRows(stats: ItemStats, keys: string[], picked: string): OptionStatRow[] {
  const percents = keys.map(key => stats.options[key] ?? 0)
  const top = Math.max(...percents)
  return keys.map((key, index) => ({
    key,
    percent: percents[index]!,
    isAnswer: stats.key.includes(key),
    isPicked: picked.includes(key),
    isTop: percents[index] === top,
  }))
}
