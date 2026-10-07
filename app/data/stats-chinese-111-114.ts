import type { LevelStats } from '~/types/quiz'

/**
 * 111–114 學年度學測「國文」級分換算與各級分人數（大考中心「學科能力測驗 統計資料」），
 * 由 gsat/stats/conversion.json、distribution.json 轉出，作法同 stats-115.ts。
 * 111 起國文級分只算國綜（國寫另計）；gsat/stats 裡 113、114 年國文級分表的分數區間相同（人數分布不同）。
 * levels.above：原始得分「大於」此分數才達該級分。
 */
export const chineseStats111To114: Record<number, LevelStats> = {
  111: {
    levels: [
      { level: 15, above: 74.76 },
      { level: 14, above: 69.42 },
      { level: 13, above: 64.08 },
      { level: 12, above: 58.74 },
      { level: 11, above: 53.4 },
      { level: 10, above: 48.06 },
      { level: 9, above: 42.72 },
      { level: 8, above: 37.38 },
      { level: 7, above: 32.04 },
      { level: 6, above: 26.7 },
      { level: 5, above: 21.36 },
      { level: 4, above: 16.02 },
      { level: 3, above: 10.68 },
      { level: 2, above: 5.34 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 2807, 14: 6195, 13: 11976, 12: 16307, 11: 18836, 10: 18637, 9: 14384, 8: 10128,
      7: 5971, 6: 3524, 5: 2221, 4: 1367, 3: 935, 2: 504, 1: 26, 0: 8,
    },
    total: 113826,
  },
  112: {
    levels: [
      { level: 15, above: 73.07 },
      { level: 14, above: 67.85 },
      { level: 13, above: 62.63 },
      { level: 12, above: 57.41 },
      { level: 11, above: 52.19 },
      { level: 10, above: 46.97 },
      { level: 9, above: 41.75 },
      { level: 8, above: 36.54 },
      { level: 7, above: 31.32 },
      { level: 6, above: 26.1 },
      { level: 5, above: 20.88 },
      { level: 4, above: 15.66 },
      { level: 3, above: 10.44 },
      { level: 2, above: 5.22 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 2948, 14: 7464, 13: 14388, 12: 19948, 11: 21182, 10: 16980, 9: 11923, 8: 7748,
      7: 5070, 6: 3222, 5: 2010, 4: 1280, 3: 1021, 2: 568, 1: 30, 0: 6,
    },
    total: 115788,
  },
  113: {
    levels: [
      { level: 15, above: 74.06 },
      { level: 14, above: 68.77 },
      { level: 13, above: 63.48 },
      { level: 12, above: 58.19 },
      { level: 11, above: 52.9 },
      { level: 10, above: 47.61 },
      { level: 9, above: 42.32 },
      { level: 8, above: 37.03 },
      { level: 7, above: 31.74 },
      { level: 6, above: 26.45 },
      { level: 5, above: 21.16 },
      { level: 4, above: 15.87 },
      { level: 3, above: 10.58 },
      { level: 2, above: 5.29 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 2970, 14: 7834, 13: 15216, 12: 20363, 11: 20584, 10: 17643, 9: 12151, 8: 7520,
      7: 4822, 6: 3004, 5: 2000, 4: 1344, 3: 935, 2: 590, 1: 36, 0: 4,
    },
    total: 117016,
  },
  114: {
    levels: [
      { level: 15, above: 74.06 },
      { level: 14, above: 68.77 },
      { level: 13, above: 63.48 },
      { level: 12, above: 58.19 },
      { level: 11, above: 52.9 },
      { level: 10, above: 47.61 },
      { level: 9, above: 42.32 },
      { level: 8, above: 37.03 },
      { level: 7, above: 31.74 },
      { level: 6, above: 26.45 },
      { level: 5, above: 21.16 },
      { level: 4, above: 15.87 },
      { level: 3, above: 10.58 },
      { level: 2, above: 5.29 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 2738, 14: 6399, 13: 11853, 12: 16578, 11: 18437, 10: 18120, 9: 14680, 8: 10508,
      7: 7187, 6: 4664, 5: 2858, 4: 1767, 3: 1240, 2: 741, 1: 40, 0: 7,
    },
    total: 117817,
  },
}
