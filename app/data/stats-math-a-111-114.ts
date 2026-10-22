import type { LevelStats } from '~/types/quiz'

/**
 * 111–114 學年度學測「數學A」級分換算與各級分人數（大考中心「學科能力測驗 統計資料」），
 * 由 gsat/stats/conversion.json、distribution.json 轉出，作法同 stats-115.ts。
 */
export const mathAStats111To114: Record<number, LevelStats> = {
  111: {
    levels: [
      { level: 15, above: 77.86 },
      { level: 14, above: 72.3 },
      { level: 13, above: 66.74 },
      { level: 12, above: 61.17 },
      { level: 11, above: 55.61 },
      { level: 10, above: 50.05 },
      { level: 9, above: 44.49 },
      { level: 8, above: 38.93 },
      { level: 7, above: 33.37 },
      { level: 6, above: 27.81 },
      { level: 5, above: 22.25 },
      { level: 4, above: 16.68 },
      { level: 3, above: 11.12 },
      { level: 2, above: 5.56 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 789, 14: 782, 13: 1518, 12: 1893, 11: 3083, 10: 3733, 9: 5678, 8: 7481,
      7: 7580, 6: 10709, 5: 10074, 4: 12019, 3: 8063, 2: 5355, 1: 1051, 0: 26,
    },
    total: 79834,
  },
  112: {
    levels: [
      { level: 15, above: 89.25 },
      { level: 14, above: 82.87 },
      { level: 13, above: 76.5 },
      { level: 12, above: 70.12 },
      { level: 11, above: 63.75 },
      { level: 10, above: 57.37 },
      { level: 9, above: 51 },
      { level: 8, above: 44.62 },
      { level: 7, above: 38.25 },
      { level: 6, above: 31.87 },
      { level: 5, above: 25.5 },
      { level: 4, above: 19.12 },
      { level: 3, above: 12.75 },
      { level: 2, above: 6.37 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 1312, 14: 2080, 13: 2669, 12: 3624, 11: 5317, 10: 5796, 9: 7078, 8: 9980,
      7: 9765, 6: 12060, 5: 9553, 4: 7596, 3: 5582, 2: 2261, 1: 621, 0: 21,
    },
    total: 85315,
  },
  113: {
    levels: [
      { level: 15, above: 86.34 },
      { level: 14, above: 80.18 },
      { level: 13, above: 74.01 },
      { level: 12, above: 67.84 },
      { level: 11, above: 61.67 },
      { level: 10, above: 55.51 },
      { level: 9, above: 49.34 },
      { level: 8, above: 43.17 },
      { level: 7, above: 37 },
      { level: 6, above: 30.84 },
      { level: 5, above: 24.67 },
      { level: 4, above: 18.5 },
      { level: 3, above: 12.33 },
      { level: 2, above: 6.17 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 1333, 14: 1925, 13: 3212, 12: 5051, 11: 5387, 10: 6287, 9: 7125, 8: 7782,
      7: 8581, 6: 10598, 5: 9381, 4: 9448, 3: 7858, 2: 3897, 1: 810, 0: 19,
    },
    total: 88694,
  },
  114: {
    levels: [
      { level: 15, above: 85.77 },
      { level: 14, above: 79.65 },
      { level: 13, above: 73.52 },
      { level: 12, above: 67.39 },
      { level: 11, above: 61.27 },
      { level: 10, above: 55.14 },
      { level: 9, above: 49.01 },
      { level: 8, above: 42.89 },
      { level: 7, above: 36.76 },
      { level: 6, above: 30.63 },
      { level: 5, above: 24.51 },
      { level: 4, above: 18.38 },
      { level: 3, above: 12.25 },
      { level: 2, above: 6.13 },
      { level: 1, above: 0 },
    ],
    counts: {
      15: 1226, 14: 1479, 13: 2401, 12: 3378, 11: 4468, 10: 5345, 9: 6583, 8: 8998,
      7: 8688, 6: 9757, 5: 10885, 4: 11096, 3: 9568, 2: 5295, 1: 1370, 0: 39,
    },
    total: 90576,
  },
}
