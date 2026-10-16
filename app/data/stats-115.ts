import type { LevelStats } from '~/types/quiz'

/**
 * 115 學年度學測級分換算與各級分人數（大考中心「學科能力測驗 統計資料」）。
 * 由 gsat/stats/conversion.json、distribution.json 轉出；試作只放用到的科目。
 * levels.above：原始得分「大於」此分數才達該級分。
 */
export const stats115: Record<'國文' | '數學A', LevelStats> = {
  國文: {
    levels: [
      { level: 15, above: 71.48 },
      { level: 14, above: 66.38 },
      { level: 13, above: 61.27 },
      { level: 12, above: 56.17 },
      { level: 11, above: 51.06 },
      { level: 10, above: 45.95 },
      { level: 9, above: 40.85 },
      { level: 8, above: 35.74 },
      { level: 7, above: 30.64 },
      { level: 6, above: 25.53 },
      { level: 5, above: 20.42 },
      { level: 4, above: 15.32 },
      { level: 3, above: 10.21 },
      { level: 2, above: 5.11 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 2563, 14: 5911, 13: 11802, 12: 17378, 11: 20529, 10: 19383, 9: 15452, 8: 10454,
      7: 6202, 6: 3535, 5: 2041, 4: 1222, 3: 929, 2: 575, 1: 42, 0: 8,
    },
    total: 118026,
  },
  '數學A': {
    levels: [
      { level: 15, above: 80.13 },
      { level: 14, above: 74.4 },
      { level: 13, above: 68.68 },
      { level: 12, above: 62.96 },
      { level: 11, above: 57.23 },
      { level: 10, above: 51.51 },
      { level: 9, above: 45.79 },
      { level: 8, above: 40.06 },
      { level: 7, above: 34.34 },
      { level: 6, above: 28.62 },
      { level: 5, above: 22.89 },
      { level: 4, above: 17.17 },
      { level: 3, above: 11.45 },
      { level: 2, above: 5.72 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 1112, 14: 1926, 13: 3383, 12: 5000, 11: 5644, 10: 8788, 9: 10360, 8: 9178,
      7: 11136, 6: 9949, 5: 8546, 4: 6103, 3: 5786, 2: 3016, 1: 632, 0: 20,
    },
    total: 90579,
  },
}
