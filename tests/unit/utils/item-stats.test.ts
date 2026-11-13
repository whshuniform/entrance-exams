import { describe, it, expect } from 'vitest'
import { itemStatsFor, optionStatRows } from '~/utils/item-stats'
import type { ItemStats } from '~/types/quiz'

const stats: ItemStats = { p: 64, key: 'C', options: { A: 3, B: 14, C: 64, D: 19 }, blank: 0 }

describe('itemStatsFor — 大考中心公布的每題選項比例', () => {
  it('itemStatsFor_115ChineseQ1_ShouldMatchOfficialTable', () => {
    // 115 學測國文第 1 題：全體答對率 14%，選 A 49%、B 17%、C(正解) 14%、D 20%
    const result = itemStatsFor('115-chinese-1')

    expect(result).toEqual({ p: 14, key: 'C', options: { A: 49, B: 17, C: 14, D: 20 }, blank: 0 })
  })

  it('itemStatsFor_MultiQuestion_ShouldHaveFullCorrectRate', () => {
    // 115 數學A 第 7 題是多選：得分率 74%、全對 66%
    const result = itemStatsFor('115-mathA-7')

    expect(result).toMatchObject({ p: 74, full: 66, multi: true, key: '34' })
  })

  it('itemStatsFor_UnknownQuestion_ShouldBeUndefined', () => {
    expect(itemStatsFor('q1')).toBeUndefined()
  })
})

describe('optionStatRows', () => {
  it('optionStatRows_ShouldListEveryOptionWithPercentAndMarks', () => {
    // Arrange / Act
    const rows = optionStatRows(stats, ['A', 'B', 'C', 'D'], 'B')

    // Assert
    expect(rows).toEqual([
      { key: 'A', percent: 3, isAnswer: false, isPicked: false, isTop: false },
      { key: 'B', percent: 14, isAnswer: false, isPicked: true, isTop: false },
      { key: 'C', percent: 64, isAnswer: true, isPicked: false, isTop: true },
      { key: 'D', percent: 19, isAnswer: false, isPicked: false, isTop: false },
    ])
  })

  it('optionStatRows_OptionMissingFromTable_ShouldBeZero', () => {
    const rows = optionStatRows({ ...stats, options: { A: 3, B: 14, C: 64 } }, ['A', 'B', 'C', 'D'], '')

    expect(rows.at(-1)).toMatchObject({ key: 'D', percent: 0 })
  })
})
