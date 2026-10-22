import type { LevelStats } from '~/types/quiz'

// 由 /mnt/project-files/site-prototype/extract/stats_gsat_old.py 產生，不要手改

/** 學測 83–110 級分換算與各級分人數（大考中心統計資料）：原始得分「大於」above 才達該級分 */
export const gsatOldStats: Record<number, Record<string, LevelStats>> = {
  83: {
    '國文': {
      levels: [{ level: 10, above: 78.3 }, { level: 9, above: 69.6 }, { level: 8, above: 60.9 }, { level: 7, above: 52.2 }, { level: 6, above: 43.5 }, { level: 5, above: 34.8 }, { level: 4, above: 26.1 }, { level: 3, above: 17.4 }, { level: 2, above: 8.7 }, { level: 1, above: 0 }],
      counts: { 10: 201, 9: 1412, 8: 2918, 7: 1845, 6: 715, 5: 210, 4: 31, 3: 2, 2: 0, 1: 0, 0: 0 },
      total: 7334,
    },
    '英文': {
      levels: [{ level: 10, above: 86.4 }, { level: 9, above: 76.8 }, { level: 8, above: 67.2 }, { level: 7, above: 57.6 }, { level: 6, above: 48 }, { level: 5, above: 38.4 }, { level: 4, above: 28.8 }, { level: 3, above: 19.2 }, { level: 2, above: 9.6 }, { level: 1, above: 0 }],
      counts: { 10: 89, 9: 451, 8: 1038, 7: 1198, 6: 1437, 5: 1223, 4: 950, 3: 611, 2: 317, 1: 21, 0: 0 },
      total: 7335,
    },
    '數學': {
      levels: [{ level: 10, above: 90 }, { level: 9, above: 80 }, { level: 8, above: 70 }, { level: 7, above: 60 }, { level: 6, above: 50 }, { level: 5, above: 40 }, { level: 4, above: 30 }, { level: 3, above: 20 }, { level: 2, above: 10 }, { level: 1, above: 0 }],
      counts: { 10: 132, 9: 371, 8: 593, 7: 951, 6: 1078, 5: 1141, 4: 1073, 3: 921, 2: 733, 1: 313, 0: 19 },
      total: 7325,
    },
    '社會': {
      levels: [{ level: 10, above: 135.9 }, { level: 9, above: 120.8 }, { level: 8, above: 105.7 }, { level: 7, above: 90.6 }, { level: 6, above: 75.5 }, { level: 5, above: 60.4 }, { level: 4, above: 45.3 }, { level: 3, above: 30.2 }, { level: 2, above: 15.1 }, { level: 1, above: 0 }],
      counts: { 10: 131, 9: 830, 8: 1771, 7: 1997, 6: 1665, 5: 780, 4: 137, 3: 10, 2: 4, 1: 0, 0: 0 },
      total: 7325,
    },
    '自然': {
      levels: [{ level: 10, above: 124.2 }, { level: 9, above: 110.4 }, { level: 8, above: 96.6 }, { level: 7, above: 82.8 }, { level: 6, above: 69 }, { level: 5, above: 55.2 }, { level: 4, above: 41.4 }, { level: 3, above: 27.6 }, { level: 2, above: 13.8 }, { level: 1, above: 0 }],
      counts: { 10: 114, 9: 761, 8: 1302, 7: 1725, 6: 1911, 5: 1173, 4: 314, 3: 19, 2: 0, 1: 0, 0: 0 },
      total: 7319,
    },
  },
  84: {
    '國文': {
      levels: [{ level: 10, above: 81.9 }, { level: 9, above: 72.8 }, { level: 8, above: 63.7 }, { level: 7, above: 54.6 }, { level: 6, above: 45.5 }, { level: 5, above: 36.4 }, { level: 4, above: 27.3 }, { level: 3, above: 18.2 }, { level: 2, above: 9.1 }, { level: 1, above: 0 }],
      counts: { 10: 91, 9: 1371, 8: 4727, 7: 6831, 6: 4860, 5: 2055, 4: 531, 3: 88, 2: 10, 1: 3, 0: 0 },
      total: 20567,
    },
    '英文': {
      levels: [{ level: 10, above: 85.95 }, { level: 9, above: 76.4 }, { level: 8, above: 66.85 }, { level: 7, above: 57.3 }, { level: 6, above: 47.75 }, { level: 5, above: 38.2 }, { level: 4, above: 28.65 }, { level: 3, above: 19.1 }, { level: 2, above: 9.55 }, { level: 1, above: 0 }],
      counts: { 10: 73, 9: 672, 8: 2205, 7: 3895, 6: 4926, 5: 4193, 4: 2817, 3: 1428, 2: 364, 1: 13, 0: 0 },
      total: 20586,
    },
    '數學': {
      levels: [{ level: 10, above: 90 }, { level: 9, above: 80 }, { level: 8, above: 70 }, { level: 7, above: 60 }, { level: 6, above: 50 }, { level: 5, above: 40 }, { level: 4, above: 30 }, { level: 3, above: 20 }, { level: 2, above: 10 }, { level: 1, above: 0 }],
      counts: { 10: 561, 9: 1119, 8: 1807, 7: 2493, 6: 3225, 5: 3545, 4: 3289, 3: 2487, 2: 1509, 1: 430, 0: 26 },
      total: 20491,
    },
    '社會': {
      levels: [{ level: 10, above: 139.5 }, { level: 9, above: 124 }, { level: 8, above: 108.5 }, { level: 7, above: 93 }, { level: 6, above: 77.5 }, { level: 5, above: 62 }, { level: 4, above: 46.5 }, { level: 3, above: 31 }, { level: 2, above: 15.5 }, { level: 1, above: 0 }],
      counts: { 10: 236, 9: 2061, 8: 4768, 7: 5133, 6: 4876, 5: 2379, 4: 851, 3: 161, 2: 19, 1: 1, 0: 2 },
      total: 20487,
    },
    '自然': {
      levels: [{ level: 10, above: 86.85 }, { level: 9, above: 77.2 }, { level: 8, above: 67.55 }, { level: 7, above: 57.9 }, { level: 6, above: 48.25 }, { level: 5, above: 38.6 }, { level: 4, above: 28.95 }, { level: 3, above: 19.3 }, { level: 2, above: 9.65 }, { level: 1, above: 0 }],
      counts: { 10: 107, 9: 756, 8: 1880, 7: 3753, 6: 3888, 5: 5186, 4: 3807, 3: 1008, 2: 62, 1: 1, 0: 1 },
      total: 20449,
    },
  },
  85: {
    '國文': {
      levels: [{ level: 10, above: 79.65 }, { level: 9, above: 70.8 }, { level: 8, above: 61.95 }, { level: 7, above: 53.1 }, { level: 6, above: 44.25 }, { level: 5, above: 35.4 }, { level: 4, above: 26.55 }, { level: 3, above: 17.7 }, { level: 2, above: 8.85 }, { level: 1, above: 0 }],
      counts: { 10: 493, 9: 5733, 8: 13016, 7: 9791, 6: 4883, 5: 1657, 4: 448, 3: 93, 2: 14, 1: 0, 0: 2 },
      total: 36130,
    },
    '英文': {
      levels: [{ level: 10, above: 86.85 }, { level: 9, above: 77.2 }, { level: 8, above: 67.55 }, { level: 7, above: 57.9 }, { level: 6, above: 48.25 }, { level: 5, above: 38.6 }, { level: 4, above: 28.95 }, { level: 3, above: 19.3 }, { level: 2, above: 9.65 }, { level: 1, above: 0 }],
      counts: { 10: 59, 9: 658, 8: 2666, 7: 6032, 6: 7379, 5: 6562, 4: 5539, 3: 4341, 2: 2753, 1: 170, 0: 0 },
      total: 36159,
    },
    '數學': {
      levels: [{ level: 10, above: 90 }, { level: 9, above: 80 }, { level: 8, above: 70 }, { level: 7, above: 60 }, { level: 6, above: 50 }, { level: 5, above: 40 }, { level: 4, above: 30 }, { level: 3, above: 20 }, { level: 2, above: 10 }, { level: 1, above: 0 }],
      counts: { 10: 597, 9: 1285, 8: 2183, 7: 3234, 6: 4762, 5: 6155, 4: 6917, 3: 6167, 2: 3563, 1: 1062, 0: 37 },
      total: 35962,
    },
    '社會': {
      levels: [{ level: 10, above: 133.2 }, { level: 9, above: 118.4 }, { level: 8, above: 103.6 }, { level: 7, above: 88.8 }, { level: 6, above: 74 }, { level: 5, above: 59.2 }, { level: 4, above: 44.4 }, { level: 3, above: 29.6 }, { level: 2, above: 14.8 }, { level: 1, above: 0 }],
      counts: { 10: 120, 9: 1970, 8: 6247, 7: 9638, 6: 9192, 5: 5997, 4: 2278, 3: 581, 2: 52, 1: 1, 0: 1 },
      total: 36077,
    },
    '自然': {
      levels: [{ level: 10, above: 117 }, { level: 9, above: 104 }, { level: 8, above: 91 }, { level: 7, above: 78 }, { level: 6, above: 65 }, { level: 5, above: 52 }, { level: 4, above: 39 }, { level: 3, above: 26 }, { level: 2, above: 13 }, { level: 1, above: 0 }],
      counts: { 10: 154, 9: 896, 8: 2724, 7: 4011, 6: 5750, 5: 7479, 4: 8026, 3: 2294, 2: 170, 1: 2, 0: 25 },
      total: 31531,
    },
  },
  86: {
    '國文': {
      levels: [{ level: 10, above: 79.65 }, { level: 9, above: 70.8 }, { level: 8, above: 61.95 }, { level: 7, above: 53.1 }, { level: 6, above: 44.25 }, { level: 5, above: 35.4 }, { level: 4, above: 26.55 }, { level: 3, above: 17.7 }, { level: 2, above: 8.85 }, { level: 1, above: 0 }],
      counts: { 10: 33, 9: 1255, 8: 8597, 7: 15592, 6: 13188, 5: 5400, 4: 1562, 3: 445, 2: 70, 1: 8, 0: 3 },
      total: 46153,
    },
    '英文': {
      levels: [{ level: 10, above: 89.1 }, { level: 9, above: 79.2 }, { level: 8, above: 69.3 }, { level: 7, above: 59.4 }, { level: 6, above: 49.5 }, { level: 5, above: 39.6 }, { level: 4, above: 29.7 }, { level: 3, above: 19.8 }, { level: 2, above: 9.9 }, { level: 1, above: 0 }],
      counts: { 10: 84, 9: 790, 8: 2480, 7: 4920, 6: 7128, 5: 9633, 4: 9556, 3: 8489, 2: 3078, 1: 39, 0: 2 },
      total: 46199,
    },
    '數學': {
      levels: [{ level: 10, above: 90 }, { level: 9, above: 80 }, { level: 8, above: 70 }, { level: 7, above: 60 }, { level: 6, above: 50 }, { level: 5, above: 40 }, { level: 4, above: 30 }, { level: 3, above: 20 }, { level: 2, above: 10 }, { level: 1, above: 0 }],
      counts: { 10: 84, 9: 432, 8: 1203, 7: 2396, 6: 3878, 5: 5672, 4: 7404, 3: 9530, 2: 10531, 1: 4386, 0: 214 },
      total: 45730,
    },
    '社會': {
      levels: [{ level: 10, above: 138.6 }, { level: 9, above: 123.2 }, { level: 8, above: 107.8 }, { level: 7, above: 92.4 }, { level: 6, above: 77 }, { level: 5, above: 61.6 }, { level: 4, above: 46.2 }, { level: 3, above: 30.8 }, { level: 2, above: 15.4 }, { level: 1, above: 0 }],
      counts: { 10: 329, 9: 3005, 8: 7641, 7: 9881, 6: 11480, 5: 9197, 4: 3454, 3: 949, 2: 117, 1: 5, 0: 3 },
      total: 46061,
    },
    '自然': {
      levels: [{ level: 10, above: 118.8 }, { level: 9, above: 105.6 }, { level: 8, above: 92.4 }, { level: 7, above: 79.2 }, { level: 6, above: 66 }, { level: 5, above: 52.8 }, { level: 4, above: 39.6 }, { level: 3, above: 26.4 }, { level: 2, above: 13.2 }, { level: 1, above: 0 }],
      counts: { 10: 251, 9: 1860, 8: 3406, 7: 5550, 6: 6881, 5: 11951, 4: 9939, 3: 2352, 2: 154, 1: 3, 0: 1 },
      total: 42348,
    },
  },
  87: {
    '國文': {
      levels: [{ level: 10, above: 82.8 }, { level: 9, above: 73.6 }, { level: 8, above: 64.4 }, { level: 7, above: 55.2 }, { level: 6, above: 46 }, { level: 5, above: 36.8 }, { level: 4, above: 27.6 }, { level: 3, above: 18.4 }, { level: 2, above: 9.2 }, { level: 1, above: 0 }],
      counts: { 10: 54, 9: 1527, 8: 9801, 7: 18398, 6: 16118, 5: 8302, 4: 2848, 3: 851, 2: 121, 1: 12, 0: 4 },
      total: 58036,
    },
    '英文': {
      levels: [{ level: 10, above: 88.65 }, { level: 9, above: 78.8 }, { level: 8, above: 68.95 }, { level: 7, above: 59.1 }, { level: 6, above: 49.25 }, { level: 5, above: 39.4 }, { level: 4, above: 29.55 }, { level: 3, above: 19.7 }, { level: 2, above: 9.85 }, { level: 1, above: 0 }],
      counts: { 10: 237, 9: 2072, 8: 5531, 7: 8700, 6: 11770, 5: 11883, 4: 8683, 3: 6362, 2: 2765, 1: 51, 0: 1 },
      total: 58055,
    },
    '數學': {
      levels: [{ level: 10, above: 90 }, { level: 9, above: 80 }, { level: 8, above: 70 }, { level: 7, above: 60 }, { level: 6, above: 50 }, { level: 5, above: 40 }, { level: 4, above: 30 }, { level: 3, above: 20 }, { level: 2, above: 10 }, { level: 1, above: 0 }],
      counts: { 10: 314, 9: 1038, 8: 2529, 7: 4482, 6: 6562, 5: 8359, 4: 9822, 3: 10093, 2: 9137, 1: 4973, 0: 349 },
      total: 57658,
    },
    '社會': {
      levels: [{ level: 10, above: 131.4 }, { level: 9, above: 116.8 }, { level: 8, above: 102.2 }, { level: 7, above: 87.6 }, { level: 6, above: 73 }, { level: 5, above: 58.4 }, { level: 4, above: 43.8 }, { level: 3, above: 29.2 }, { level: 2, above: 14.6 }, { level: 1, above: 0 }],
      counts: { 10: 92, 9: 2093, 8: 7371, 7: 13463, 6: 14987, 5: 13183, 4: 5377, 3: 1055, 2: 110, 1: 9, 0: 3 },
      total: 57743,
    },
    '自然': {
      levels: [{ level: 10, above: 120.6 }, { level: 9, above: 107.2 }, { level: 8, above: 93.8 }, { level: 7, above: 80.4 }, { level: 6, above: 67 }, { level: 5, above: 53.6 }, { level: 4, above: 40.2 }, { level: 3, above: 26.8 }, { level: 2, above: 13.4 }, { level: 1, above: 0 }],
      counts: { 10: 556, 9: 2319, 8: 4779, 7: 5923, 6: 9035, 5: 13549, 4: 12337, 3: 5998, 2: 492, 1: 8, 0: 13 },
      total: 55009,
    },
  },
  88: {
    '國文': {
      levels: [{ level: 15, above: 77.73 }, { level: 14, above: 72.18 }, { level: 13, above: 66.63 }, { level: 12, above: 61.07 }, { level: 11, above: 55.52 }, { level: 10, above: 49.97 }, { level: 9, above: 44.41 }, { level: 8, above: 38.86 }, { level: 7, above: 33.31 }, { level: 6, above: 27.76 }, { level: 5, above: 22.2 }, { level: 4, above: 16.65 }, { level: 3, above: 11.1 }, { level: 2, above: 5.54 }, { level: 1, above: -0.01 }],
      counts: { 15: 2412, 14: 6627, 13: 13387, 12: 17780, 11: 16645, 10: 12808, 9: 7166, 8: 4147, 7: 2481, 6: 1540, 5: 924, 4: 454, 3: 169, 2: 37, 1: 6, 0: 3 },
      total: 86586,
    },
    '英文': {
      levels: [{ level: 15, above: 80.49 }, { level: 14, above: 74.74 }, { level: 13, above: 68.99 }, { level: 12, above: 63.24 }, { level: 11, above: 57.49 }, { level: 10, above: 51.74 }, { level: 9, above: 45.99 }, { level: 8, above: 40.24 }, { level: 7, above: 34.49 }, { level: 6, above: 28.74 }, { level: 5, above: 22.99 }, { level: 4, above: 17.24 }, { level: 3, above: 11.49 }, { level: 2, above: 5.74 }, { level: 1, above: -0.01 }],
      counts: { 15: 1393, 14: 2376, 13: 3908, 12: 6203, 11: 8006, 10: 11093, 9: 11386, 8: 12432, 7: 9762, 6: 8234, 5: 5749, 4: 4556, 3: 1448, 2: 90, 1: 1, 0: 3 },
      total: 86640,
    },
    '數學': {
      levels: [{ level: 15, above: 92.67 }, { level: 14, above: 86.05 }, { level: 13, above: 79.43 }, { level: 12, above: 72.81 }, { level: 11, above: 66.19 }, { level: 10, above: 59.57 }, { level: 9, above: 52.95 }, { level: 8, above: 46.33 }, { level: 7, above: 39.71 }, { level: 6, above: 33.09 }, { level: 5, above: 26.47 }, { level: 4, above: 19.85 }, { level: 3, above: 13.23 }, { level: 2, above: 6.61 }, { level: 1, above: -0.01 }],
      counts: { 15: 2023, 14: 3417, 13: 5001, 12: 4296, 11: 7478, 10: 8387, 9: 5812, 8: 9104, 7: 9195, 6: 5909, 5: 8282, 4: 7172, 3: 3807, 2: 3816, 1: 1176, 0: 286 },
      total: 85161,
    },
    '社會': {
      levels: [{ level: 15, above: 116.81 }, { level: 14, above: 108.46 }, { level: 13, above: 100.12 }, { level: 12, above: 91.77 }, { level: 11, above: 83.43 }, { level: 10, above: 75.09 }, { level: 9, above: 66.74 }, { level: 8, above: 58.4 }, { level: 7, above: 50.05 }, { level: 6, above: 41.71 }, { level: 5, above: 33.37 }, { level: 4, above: 25.02 }, { level: 3, above: 16.68 }, { level: 2, above: 8.34 }, { level: 1, above: -0.01 }],
      counts: { 15: 1942, 14: 3643, 13: 6275, 12: 9978, 11: 10792, 10: 11289, 9: 12601, 8: 9848, 7: 8006, 6: 6123, 5: 3199, 4: 1513, 3: 367, 2: 24, 1: 2, 0: 9 },
      total: 85611,
    },
    '自然': {
      levels: [{ level: 15, above: 108.98 }, { level: 14, above: 101.2 }, { level: 13, above: 93.41 }, { level: 12, above: 85.63 }, { level: 11, above: 77.84 }, { level: 10, above: 70.06 }, { level: 9, above: 62.27 }, { level: 8, above: 54.49 }, { level: 7, above: 46.7 }, { level: 6, above: 38.92 }, { level: 5, above: 31.13 }, { level: 4, above: 23.35 }, { level: 3, above: 15.56 }, { level: 2, above: 7.78 }, { level: 1, above: -0.01 }],
      counts: { 15: 1307, 14: 1867, 13: 3177, 12: 4360, 11: 5413, 10: 5525, 9: 8801, 8: 12113, 7: 14805, 6: 13140, 5: 8118, 4: 3654, 3: 660, 2: 36, 1: 4, 0: 4 },
      total: 82984,
    },
  },
  89: {
    '國文': {
      levels: [{ level: 15, above: 76.89 }, { level: 14, above: 71.4 }, { level: 13, above: 65.91 }, { level: 12, above: 60.41 }, { level: 11, above: 54.92 }, { level: 10, above: 49.43 }, { level: 9, above: 43.94 }, { level: 8, above: 38.44 }, { level: 7, above: 32.95 }, { level: 6, above: 27.46 }, { level: 5, above: 21.96 }, { level: 4, above: 16.47 }, { level: 3, above: 10.98 }, { level: 2, above: 5.48 }, { level: 1, above: -0.01 }],
      counts: { 15: 3371, 14: 9218, 13: 16711, 12: 20807, 11: 19565, 10: 14654, 9: 9542, 8: 5552, 7: 3390, 6: 2015, 5: 1230, 4: 630, 3: 233, 2: 67, 1: 5, 0: 3 },
      total: 106993,
    },
    '英文': {
      levels: [{ level: 15, above: 82.02 }, { level: 14, above: 76.16 }, { level: 13, above: 70.3 }, { level: 12, above: 64.44 }, { level: 11, above: 58.58 }, { level: 10, above: 52.72 }, { level: 9, above: 46.86 }, { level: 8, above: 41 }, { level: 7, above: 35.15 }, { level: 6, above: 29.29 }, { level: 5, above: 23.43 }, { level: 4, above: 17.57 }, { level: 3, above: 11.71 }, { level: 2, above: 5.85 }, { level: 1, above: -0.01 }],
      counts: { 15: 2212, 14: 4198, 13: 6825, 12: 9045, 11: 10027, 10: 11955, 9: 12137, 8: 10460, 7: 10324, 6: 8997, 5: 8714, 4: 7474, 3: 3426, 2: 338, 1: 13, 0: 8 },
      total: 106153,
    },
    '數學': {
      levels: [{ level: 15, above: 92.77 }, { level: 14, above: 86.14 }, { level: 13, above: 79.52 }, { level: 12, above: 72.89 }, { level: 11, above: 66.26 }, { level: 10, above: 59.63 }, { level: 9, above: 53.01 }, { level: 8, above: 46.38 }, { level: 7, above: 39.75 }, { level: 6, above: 33.13 }, { level: 5, above: 26.5 }, { level: 4, above: 19.87 }, { level: 3, above: 13.25 }, { level: 2, above: 6.62 }, { level: 1, above: -0.01 }],
      counts: { 15: 2621, 14: 3793, 13: 7946, 12: 6175, 11: 10147, 10: 12974, 9: 8311, 8: 11238, 7: 10979, 6: 6305, 5: 7884, 4: 7545, 3: 4341, 2: 4493, 1: 1433, 0: 370 },
      total: 106555,
    },
    '社會': {
      levels: [{ level: 15, above: 118.57 }, { level: 14, above: 110.1 }, { level: 13, above: 101.63 }, { level: 12, above: 93.16 }, { level: 11, above: 84.69 }, { level: 10, above: 76.22 }, { level: 9, above: 67.75 }, { level: 8, above: 59.28 }, { level: 7, above: 50.81 }, { level: 6, above: 42.34 }, { level: 5, above: 33.87 }, { level: 4, above: 25.4 }, { level: 3, above: 16.93 }, { level: 2, above: 8.46 }, { level: 1, above: -0.01 }],
      counts: { 15: 1894, 14: 3525, 13: 8370, 12: 11718, 11: 17201, 10: 17253, 9: 17799, 8: 12116, 7: 8799, 6: 4285, 5: 2364, 4: 613, 3: 103, 2: 9, 1: 4, 0: 16 },
      total: 106069,
    },
    '自然': {
      levels: [{ level: 15, above: 116.37 }, { level: 14, above: 108.06 }, { level: 13, above: 99.75 }, { level: 12, above: 91.43 }, { level: 11, above: 83.12 }, { level: 10, above: 74.81 }, { level: 9, above: 66.49 }, { level: 8, above: 58.18 }, { level: 7, above: 49.87 }, { level: 6, above: 41.56 }, { level: 5, above: 33.24 }, { level: 4, above: 24.93 }, { level: 3, above: 16.62 }, { level: 2, above: 8.3 }, { level: 1, above: -0.01 }],
      counts: { 15: 2227, 14: 3427, 13: 6167, 12: 6336, 11: 7345, 10: 9517, 9: 11684, 8: 14381, 7: 17884, 6: 11433, 5: 7424, 4: 3747, 3: 954, 2: 80, 1: 3, 0: 20 },
      total: 102629,
    },
  },
  90: {
    '國文': {
      levels: [{ level: 15, above: 79.09 }, { level: 14, above: 73.44 }, { level: 13, above: 67.79 }, { level: 12, above: 62.14 }, { level: 11, above: 56.49 }, { level: 10, above: 50.84 }, { level: 9, above: 45.19 }, { level: 8, above: 39.54 }, { level: 7, above: 33.89 }, { level: 6, above: 28.24 }, { level: 5, above: 22.59 }, { level: 4, above: 16.94 }, { level: 3, above: 11.29 }, { level: 2, above: 5.64 }, { level: 1, above: -0.01 }],
      counts: { 15: 2830, 14: 9030, 13: 15090, 12: 18420, 11: 17390, 10: 14170, 9: 8500, 8: 5270, 7: 3780, 6: 2320, 5: 1660, 4: 990, 3: 410, 2: 120, 1: 10, 0: 10 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
    '英文': {
      levels: [{ level: 15, above: 82.45 }, { level: 14, above: 76.56 }, { level: 13, above: 70.67 }, { level: 12, above: 64.78 }, { level: 11, above: 58.89 }, { level: 10, above: 53 }, { level: 9, above: 47.11 }, { level: 8, above: 41.22 }, { level: 7, above: 35.33 }, { level: 6, above: 29.44 }, { level: 5, above: 23.55 }, { level: 4, above: 17.66 }, { level: 3, above: 11.77 }, { level: 2, above: 5.88 }, { level: 1, above: -0.01 }],
      counts: { 15: 2160, 14: 3220, 13: 5020, 12: 6200, 11: 7300, 10: 7680, 9: 9380, 8: 10640, 7: 11520, 6: 11370, 5: 9590, 4: 9130, 3: 5740, 2: 1010, 1: 30, 0: 10 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
    '數學': {
      levels: [{ level: 15, above: 89.11 }, { level: 14, above: 82.75 }, { level: 13, above: 76.38 }, { level: 12, above: 70.02 }, { level: 11, above: 63.65 }, { level: 10, above: 57.29 }, { level: 9, above: 50.92 }, { level: 8, above: 44.55 }, { level: 7, above: 38.19 }, { level: 6, above: 31.82 }, { level: 5, above: 25.45 }, { level: 4, above: 19.09 }, { level: 3, above: 12.72 }, { level: 2, above: 6.36 }, { level: 1, above: -0.01 }],
      counts: { 15: 1540, 14: 1220, 13: 2920, 12: 2660, 11: 5400, 10: 7560, 9: 6300, 8: 11270, 7: 8480, 6: 13450, 5: 8930, 4: 12580, 3: 7550, 2: 7620, 1: 2060, 0: 460 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
    '社會': {
      levels: [{ level: 15, above: 125.05 }, { level: 14, above: 116.12 }, { level: 13, above: 107.19 }, { level: 12, above: 98.25 }, { level: 11, above: 89.32 }, { level: 10, above: 80.39 }, { level: 9, above: 71.45 }, { level: 8, above: 62.52 }, { level: 7, above: 53.59 }, { level: 6, above: 44.66 }, { level: 5, above: 35.72 }, { level: 4, above: 26.79 }, { level: 3, above: 17.86 }, { level: 2, above: 8.92 }, { level: 1, above: -0.01 }],
      counts: { 15: 2240, 14: 5190, 13: 8790, 12: 11690, 11: 13470, 10: 13830, 9: 13040, 8: 10910, 7: 8860, 6: 6630, 5: 3880, 4: 1270, 3: 170, 2: 10, 1: 0, 0: 20 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
    '自然': {
      levels: [{ level: 15, above: 114.31 }, { level: 14, above: 106.15 }, { level: 13, above: 97.98 }, { level: 12, above: 89.82 }, { level: 11, above: 81.65 }, { level: 10, above: 73.48 }, { level: 9, above: 65.32 }, { level: 8, above: 57.15 }, { level: 7, above: 48.99 }, { level: 6, above: 40.82 }, { level: 5, above: 32.66 }, { level: 4, above: 24.49 }, { level: 3, above: 16.32 }, { level: 2, above: 8.16 }, { level: 1, above: -0.01 }],
      counts: { 15: 2370, 14: 3640, 13: 6420, 12: 6550, 11: 7330, 10: 8580, 9: 10890, 8: 13460, 7: 14710, 6: 11700, 5: 8290, 4: 4610, 3: 1320, 2: 100, 1: 10, 0: 20 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
  },
  91: {
    '國文': {
      levels: [{ level: 15, above: 78.82 }, { level: 14, above: 73.19 }, { level: 13, above: 67.56 }, { level: 12, above: 61.93 }, { level: 11, above: 56.3 }, { level: 10, above: 50.67 }, { level: 9, above: 45.04 }, { level: 8, above: 39.41 }, { level: 7, above: 33.78 }, { level: 6, above: 28.15 }, { level: 5, above: 22.51 }, { level: 4, above: 16.88 }, { level: 3, above: 11.25 }, { level: 2, above: 5.62 }, { level: 1, above: -0.01 }],
      counts: { 15: 2230, 14: 5720, 13: 11460, 12: 18170, 11: 17560, 10: 14740, 9: 10410, 8: 7430, 7: 4340, 6: 3040, 5: 2110, 4: 1610, 3: 780, 2: 340, 1: 50, 0: 0 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
    '英文': {
      levels: [{ level: 15, above: 85.04 }, { level: 14, above: 78.97 }, { level: 13, above: 72.89 }, { level: 12, above: 66.82 }, { level: 11, above: 60.74 }, { level: 10, above: 54.67 }, { level: 9, above: 48.59 }, { level: 8, above: 42.52 }, { level: 7, above: 36.44 }, { level: 6, above: 30.37 }, { level: 5, above: 24.29 }, { level: 4, above: 18.22 }, { level: 3, above: 12.14 }, { level: 2, above: 6.07 }, { level: 1, above: -0.01 }],
      counts: { 15: 3190, 14: 7160, 13: 8550, 12: 9180, 11: 9440, 10: 9200, 9: 9020, 8: 8540, 7: 8620, 6: 7310, 5: 6460, 4: 6480, 3: 5430, 2: 1350, 1: 50, 0: 0 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
    '數學': {
      levels: [{ level: 15, above: 91 }, { level: 14, above: 84.5 }, { level: 13, above: 78 }, { level: 12, above: 71.5 }, { level: 11, above: 65 }, { level: 10, above: 58.5 }, { level: 9, above: 52 }, { level: 8, above: 45.5 }, { level: 7, above: 39 }, { level: 6, above: 32.5 }, { level: 5, above: 25.99 }, { level: 4, above: 19.49 }, { level: 3, above: 12.99 }, { level: 2, above: 6.49 }, { level: 1, above: -0.01 }],
      counts: { 15: 1840, 14: 3060, 13: 2830, 12: 5480, 11: 4600, 10: 8000, 9: 9480, 8: 6950, 7: 11610, 6: 7910, 5: 11720, 4: 11100, 3: 6370, 2: 6320, 1: 2100, 0: 630 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
    '社會': {
      levels: [{ level: 15, above: 119.17 }, { level: 14, above: 110.66 }, { level: 13, above: 102.15 }, { level: 12, above: 93.63 }, { level: 11, above: 85.12 }, { level: 10, above: 76.61 }, { level: 9, above: 68.09 }, { level: 8, above: 59.58 }, { level: 7, above: 51.07 }, { level: 6, above: 42.56 }, { level: 5, above: 34.04 }, { level: 4, above: 25.53 }, { level: 3, above: 17.02 }, { level: 2, above: 8.5 }, { level: 1, above: -0.01 }],
      counts: { 15: 8700, 14: 18870, 13: 20970, 12: 19090, 11: 10380, 10: 7820, 9: 5580, 8: 4670, 7: 2240, 6: 1140, 5: 410, 4: 110, 3: 10, 2: 0, 1: 0, 0: 10 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
    '自然': {
      levels: [{ level: 15, above: 110.41 }, { level: 14, above: 102.52 }, { level: 13, above: 94.63 }, { level: 12, above: 86.75 }, { level: 11, above: 78.86 }, { level: 10, above: 70.97 }, { level: 9, above: 63.09 }, { level: 8, above: 55.2 }, { level: 7, above: 47.31 }, { level: 6, above: 39.43 }, { level: 5, above: 31.54 }, { level: 4, above: 23.65 }, { level: 3, above: 15.77 }, { level: 2, above: 7.88 }, { level: 1, above: -0.01 }],
      counts: { 15: 2370, 14: 4200, 13: 6340, 12: 8230, 11: 10530, 10: 12880, 9: 13930, 8: 14580, 7: 12170, 6: 8500, 5: 4640, 4: 1430, 3: 190, 2: 10, 1: 10, 0: 0 },
      total: 100000,
      percentOnly: true,
      totalUnknown: true,
    },
  },
  92: {
    '國文': {
      levels: [{ level: 15, above: 74.37 }, { level: 14, above: 69.06 }, { level: 13, above: 63.75 }, { level: 12, above: 58.43 }, { level: 11, above: 53.12 }, { level: 10, above: 47.81 }, { level: 9, above: 42.5 }, { level: 8, above: 37.18 }, { level: 7, above: 31.87 }, { level: 6, above: 26.56 }, { level: 5, above: 21.24 }, { level: 4, above: 15.93 }, { level: 3, above: 10.62 }, { level: 2, above: 5.3 }, { level: 1, above: -0.01 }],
      counts: { 15: 3460, 14: 7652, 13: 16628, 12: 24441, 11: 25382, 10: 26569, 9: 19704, 8: 15502, 7: 10106, 6: 5844, 5: 3798, 4: 1870, 3: 779, 2: 198, 1: 19, 0: 11 },
      total: 161963,
    },
    '英文': {
      levels: [{ level: 15, above: 84.8 }, { level: 14, above: 78.74 }, { level: 13, above: 72.69 }, { level: 12, above: 66.63 }, { level: 11, above: 60.57 }, { level: 10, above: 54.51 }, { level: 9, above: 48.46 }, { level: 8, above: 42.4 }, { level: 7, above: 36.34 }, { level: 6, above: 30.28 }, { level: 5, above: 24.22 }, { level: 4, above: 18.16 }, { level: 3, above: 12.11 }, { level: 2, above: 6.05 }, { level: 1, above: -0.01 }],
      counts: { 15: 3818, 14: 6180, 13: 8987, 12: 10641, 11: 11938, 10: 12639, 9: 14305, 8: 13748, 7: 14209, 6: 15137, 5: 15362, 4: 16343, 3: 14396, 2: 3756, 1: 131, 0: 9 },
      total: 161599,
    },
    '數學': {
      levels: [{ level: 15, above: 90.47 }, { level: 14, above: 84.01 }, { level: 13, above: 77.55 }, { level: 12, above: 71.08 }, { level: 11, above: 64.62 }, { level: 10, above: 58.16 }, { level: 9, above: 51.7 }, { level: 8, above: 45.23 }, { level: 7, above: 38.77 }, { level: 6, above: 32.31 }, { level: 5, above: 25.84 }, { level: 4, above: 19.38 }, { level: 3, above: 12.92 }, { level: 2, above: 6.45 }, { level: 1, above: -0.01 }],
      counts: { 15: 2194, 14: 2829, 13: 2457, 12: 4725, 11: 6551, 10: 5743, 9: 10428, 8: 8504, 7: 15178, 6: 17915, 5: 13711, 4: 23286, 3: 16812, 2: 21935, 1: 7598, 0: 1902 },
      total: 161768,
    },
    '社會': {
      levels: [{ level: 15, above: 110.63 }, { level: 14, above: 102.73 }, { level: 13, above: 94.83 }, { level: 12, above: 86.92 }, { level: 11, above: 79.02 }, { level: 10, above: 71.12 }, { level: 9, above: 63.22 }, { level: 8, above: 55.31 }, { level: 7, above: 47.41 }, { level: 6, above: 39.51 }, { level: 5, above: 31.6 }, { level: 4, above: 23.7 }, { level: 3, above: 15.8 }, { level: 2, above: 7.89 }, { level: 1, above: -0.01 }],
      counts: { 15: 7087, 14: 20325, 13: 29864, 12: 30634, 11: 25907, 10: 19265, 9: 12997, 8: 8505, 7: 4588, 6: 1865, 5: 546, 4: 88, 3: 13, 2: 4, 1: 2, 0: 13 },
      total: 161703,
    },
    '自然': {
      levels: [{ level: 15, above: 107.78 }, { level: 14, above: 100.08 }, { level: 13, above: 92.38 }, { level: 12, above: 84.68 }, { level: 11, above: 76.98 }, { level: 10, above: 69.28 }, { level: 9, above: 61.58 }, { level: 8, above: 53.88 }, { level: 7, above: 46.19 }, { level: 6, above: 38.49 }, { level: 5, above: 30.79 }, { level: 4, above: 23.09 }, { level: 3, above: 15.39 }, { level: 2, above: 7.69 }, { level: 1, above: -0.01 }],
      counts: { 15: 3708, 14: 4882, 13: 10714, 12: 16500, 11: 22134, 10: 24467, 9: 25913, 8: 21945, 7: 13362, 6: 11488, 5: 4949, 4: 975, 3: 86, 2: 4, 1: 8, 0: 8 },
      total: 161143,
    },
  },
  93: {
    '國文': {
      levels: [{ level: 15, above: 75.32 }, { level: 14, above: 69.94 }, { level: 13, above: 64.56 }, { level: 12, above: 59.18 }, { level: 11, above: 53.8 }, { level: 10, above: 48.42 }, { level: 9, above: 43.04 }, { level: 8, above: 37.66 }, { level: 7, above: 32.28 }, { level: 6, above: 26.9 }, { level: 5, above: 21.52 }, { level: 4, above: 16.14 }, { level: 3, above: 10.76 }, { level: 2, above: 5.38 }, { level: 1, above: 0 }],
      counts: { 15: 3373, 14: 8423, 13: 15929, 12: 26071, 11: 30226, 10: 26777, 9: 17365, 8: 12007, 7: 7092, 6: 3844, 5: 1890, 4: 956, 3: 389, 2: 123, 1: 8, 0: 5 },
      total: 154478,
    },
    '英文': {
      levels: [{ level: 15, above: 86.66 }, { level: 14, above: 80.47 }, { level: 13, above: 74.28 }, { level: 12, above: 68.09 }, { level: 11, above: 61.9 }, { level: 10, above: 55.71 }, { level: 9, above: 49.52 }, { level: 8, above: 43.33 }, { level: 7, above: 37.14 }, { level: 6, above: 30.95 }, { level: 5, above: 24.76 }, { level: 4, above: 18.57 }, { level: 3, above: 12.38 }, { level: 2, above: 6.19 }, { level: 1, above: 0 }],
      counts: { 15: 3986, 14: 6327, 13: 7697, 12: 9091, 11: 11500, 10: 12260, 9: 13545, 8: 15949, 7: 15246, 6: 16506, 5: 14083, 4: 13980, 3: 11572, 2: 2228, 1: 67, 0: 5 },
      total: 154042,
    },
    '數學': {
      levels: [{ level: 15, above: 91.14 }, { level: 14, above: 84.63 }, { level: 13, above: 78.12 }, { level: 12, above: 71.61 }, { level: 11, above: 65.1 }, { level: 10, above: 58.59 }, { level: 9, above: 52.08 }, { level: 8, above: 45.57 }, { level: 7, above: 39.06 }, { level: 6, above: 32.55 }, { level: 5, above: 26.04 }, { level: 4, above: 19.53 }, { level: 3, above: 13.02 }, { level: 2, above: 6.51 }, { level: 1, above: 0 }],
      counts: { 15: 2473, 14: 3654, 13: 3187, 12: 5982, 11: 5193, 10: 9627, 9: 11767, 8: 9467, 7: 17003, 6: 13158, 5: 21517, 4: 21389, 3: 12663, 2: 13169, 1: 3441, 0: 599 },
      total: 154289,
    },
    '社會': {
      levels: [{ level: 15, above: 106.12 }, { level: 14, above: 98.54 }, { level: 13, above: 90.96 }, { level: 12, above: 83.38 }, { level: 11, above: 75.8 }, { level: 10, above: 68.22 }, { level: 9, above: 60.64 }, { level: 8, above: 53.06 }, { level: 7, above: 45.48 }, { level: 6, above: 37.9 }, { level: 5, above: 30.32 }, { level: 4, above: 22.74 }, { level: 3, above: 15.16 }, { level: 2, above: 7.58 }, { level: 1, above: 0 }],
      counts: { 15: 2971, 14: 7597, 13: 15147, 12: 23820, 11: 29029, 10: 21227, 9: 23119, 8: 16322, 7: 9654, 6: 4265, 5: 920, 4: 203, 3: 23, 2: 0, 1: 4, 0: 0 },
      total: 154301,
    },
    '自然': {
      levels: [{ level: 15, above: 113.68 }, { level: 14, above: 105.56 }, { level: 13, above: 97.44 }, { level: 12, above: 89.32 }, { level: 11, above: 81.2 }, { level: 10, above: 73.08 }, { level: 9, above: 64.96 }, { level: 8, above: 56.84 }, { level: 7, above: 48.72 }, { level: 6, above: 40.6 }, { level: 5, above: 32.48 }, { level: 4, above: 24.36 }, { level: 3, above: 16.24 }, { level: 2, above: 8.12 }, { level: 1, above: 0 }],
      counts: { 15: 4571, 14: 7225, 13: 12058, 12: 17560, 11: 22721, 10: 25086, 9: 24115, 8: 16545, 7: 11506, 6: 7460, 5: 3619, 4: 1164, 3: 136, 2: 6, 1: 1, 0: 0 },
      total: 153773,
    },
  },
  94: {
    '國文': {
      levels: [{ level: 15, above: 77.28 }, { level: 14, above: 71.76 }, { level: 13, above: 66.24 }, { level: 12, above: 60.72 }, { level: 11, above: 55.2 }, { level: 10, above: 49.68 }, { level: 9, above: 44.16 }, { level: 8, above: 38.64 }, { level: 7, above: 33.12 }, { level: 6, above: 27.6 }, { level: 5, above: 22.08 }, { level: 4, above: 16.56 }, { level: 3, above: 11.04 }, { level: 2, above: 5.52 }, { level: 1, above: 0 }],
      counts: { 15: 3141, 14: 6776, 13: 13664, 12: 20570, 11: 24810, 10: 24424, 9: 21063, 8: 15920, 7: 11082, 6: 7365, 5: 4584, 4: 2413, 3: 1130, 2: 404, 1: 55, 0: 4 },
      total: 157405,
    },
    '英文': {
      levels: [{ level: 15, above: 85.82 }, { level: 14, above: 79.69 }, { level: 13, above: 73.56 }, { level: 12, above: 67.43 }, { level: 11, above: 61.3 }, { level: 10, above: 55.17 }, { level: 9, above: 49.04 }, { level: 8, above: 42.91 }, { level: 7, above: 36.78 }, { level: 6, above: 30.65 }, { level: 5, above: 24.52 }, { level: 4, above: 18.39 }, { level: 3, above: 12.26 }, { level: 2, above: 6.13 }, { level: 1, above: 0 }],
      counts: { 15: 4580, 14: 7253, 13: 9003, 12: 10696, 11: 10792, 10: 11670, 9: 12445, 8: 14217, 7: 14242, 6: 14481, 5: 15264, 4: 17518, 3: 12369, 2: 2288, 1: 65, 0: 4 },
      total: 156887,
    },
    '數學': {
      levels: [{ level: 15, above: 89.74 }, { level: 14, above: 83.33 }, { level: 13, above: 76.92 }, { level: 12, above: 70.51 }, { level: 11, above: 64.1 }, { level: 10, above: 57.69 }, { level: 9, above: 51.28 }, { level: 8, above: 44.87 }, { level: 7, above: 38.46 }, { level: 6, above: 32.05 }, { level: 5, above: 25.64 }, { level: 4, above: 19.23 }, { level: 3, above: 12.82 }, { level: 2, above: 6.41 }, { level: 1, above: 0 }],
      counts: { 15: 3161, 14: 2359, 13: 4526, 12: 4176, 11: 8116, 10: 6607, 9: 11996, 8: 15343, 7: 12150, 6: 20578, 5: 14476, 4: 21183, 3: 12782, 2: 14613, 1: 4304, 0: 768 },
      total: 157138,
    },
    '社會': {
      levels: [{ level: 15, above: 109.9 }, { level: 14, above: 102.05 }, { level: 13, above: 94.2 }, { level: 12, above: 86.35 }, { level: 11, above: 78.5 }, { level: 10, above: 70.65 }, { level: 9, above: 62.8 }, { level: 8, above: 54.95 }, { level: 7, above: 47.1 }, { level: 6, above: 39.25 }, { level: 5, above: 31.4 }, { level: 4, above: 23.55 }, { level: 3, above: 15.7 }, { level: 2, above: 7.85 }, { level: 1, above: 0 }],
      counts: { 15: 5161, 14: 8020, 13: 18823, 12: 26313, 11: 27219, 10: 23299, 9: 17926, 8: 13467, 7: 9599, 6: 5226, 5: 1788, 4: 303, 3: 23, 2: 2, 1: 2, 0: 2 },
      total: 157173,
    },
    '自然': {
      levels: [{ level: 15, above: 111.72 }, { level: 14, above: 103.74 }, { level: 13, above: 95.76 }, { level: 12, above: 87.78 }, { level: 11, above: 79.8 }, { level: 10, above: 71.82 }, { level: 9, above: 63.84 }, { level: 8, above: 55.86 }, { level: 7, above: 47.88 }, { level: 6, above: 39.9 }, { level: 5, above: 31.92 }, { level: 4, above: 23.94 }, { level: 3, above: 15.96 }, { level: 2, above: 7.98 }, { level: 1, above: 0 }],
      counts: { 15: 4940, 14: 8241, 13: 11695, 12: 14408, 11: 17543, 10: 20411, 9: 21324, 8: 19580, 7: 16064, 6: 12236, 5: 7598, 4: 2334, 3: 298, 2: 8, 1: 7, 0: 0 },
      total: 156687,
    },
  },
  95: {
    '國文': {
      levels: [{ level: 15, above: 78.82 }, { level: 14, above: 73.19 }, { level: 13, above: 67.56 }, { level: 12, above: 61.93 }, { level: 11, above: 56.3 }, { level: 10, above: 50.67 }, { level: 9, above: 45.04 }, { level: 8, above: 39.41 }, { level: 7, above: 33.78 }, { level: 6, above: 28.15 }, { level: 5, above: 22.52 }, { level: 4, above: 16.89 }, { level: 3, above: 11.26 }, { level: 2, above: 5.63 }, { level: 1, above: 0 }],
      counts: { 15: 3207, 14: 7020, 13: 13899, 12: 22783, 11: 24612, 10: 23532, 9: 19575, 8: 15899, 7: 10317, 6: 7283, 5: 4919, 4: 3258, 3: 1311, 2: 529, 1: 80, 0: 2 },
      total: 158226,
    },
    '英文': {
      levels: [{ level: 15, above: 87.5 }, { level: 14, above: 81.25 }, { level: 13, above: 75 }, { level: 12, above: 68.75 }, { level: 11, above: 62.5 }, { level: 10, above: 56.25 }, { level: 9, above: 50 }, { level: 8, above: 43.75 }, { level: 7, above: 37.5 }, { level: 6, above: 31.25 }, { level: 5, above: 25 }, { level: 4, above: 18.75 }, { level: 3, above: 12.5 }, { level: 2, above: 6.25 }, { level: 1, above: 0 }],
      counts: { 15: 5417, 14: 9353, 13: 10146, 12: 12020, 11: 11601, 10: 12893, 9: 12280, 8: 13753, 7: 13711, 6: 15057, 5: 13332, 4: 14737, 3: 11152, 2: 2225, 1: 61, 0: 7 },
      total: 157745,
    },
    '數學': {
      levels: [{ level: 15, above: 93.38 }, { level: 14, above: 86.71 }, { level: 13, above: 80.04 }, { level: 12, above: 73.37 }, { level: 11, above: 66.7 }, { level: 10, above: 60.03 }, { level: 9, above: 53.36 }, { level: 8, above: 46.69 }, { level: 7, above: 40.02 }, { level: 6, above: 33.35 }, { level: 5, above: 26.68 }, { level: 4, above: 20.01 }, { level: 3, above: 13.34 }, { level: 2, above: 6.67 }, { level: 1, above: 0 }],
      counts: { 15: 5313, 14: 6926, 13: 4921, 12: 8143, 11: 9409, 10: 7212, 9: 12164, 8: 13690, 7: 10094, 6: 16485, 5: 17194, 4: 11521, 3: 16946, 2: 12080, 1: 4500, 0: 1411 },
      total: 158009,
    },
    '社會': {
      levels: [{ level: 15, above: 108.78 }, { level: 14, above: 101.01 }, { level: 13, above: 93.24 }, { level: 12, above: 85.47 }, { level: 11, above: 77.7 }, { level: 10, above: 69.93 }, { level: 9, above: 62.16 }, { level: 8, above: 54.39 }, { level: 7, above: 46.62 }, { level: 6, above: 38.85 }, { level: 5, above: 31.08 }, { level: 4, above: 23.31 }, { level: 3, above: 15.54 }, { level: 2, above: 7.77 }, { level: 1, above: 0 }],
      counts: { 15: 3173, 14: 6345, 13: 12151, 12: 18534, 11: 24017, 10: 25258, 9: 17728, 8: 20428, 7: 15562, 6: 9995, 5: 4048, 4: 753, 3: 59, 2: 3, 1: 1, 0: 5 },
      total: 158060,
    },
    '自然': {
      levels: [{ level: 15, above: 112 }, { level: 14, above: 104 }, { level: 13, above: 96 }, { level: 12, above: 88 }, { level: 11, above: 80 }, { level: 10, above: 72 }, { level: 9, above: 64 }, { level: 8, above: 56 }, { level: 7, above: 48 }, { level: 6, above: 40 }, { level: 5, above: 32 }, { level: 4, above: 24 }, { level: 3, above: 16 }, { level: 2, above: 8 }, { level: 1, above: 0 }],
      counts: { 15: 3439, 14: 5267, 13: 7084, 12: 9171, 11: 11635, 10: 15489, 9: 20367, 8: 23852, 7: 23053, 6: 18858, 5: 12515, 4: 5519, 3: 1201, 2: 88, 1: 12, 0: 11 },
      total: 157561,
    },
  },
  96: {
    '國文': {
      levels: [{ level: 15, above: 82.04 }, { level: 14, above: 76.18 }, { level: 13, above: 70.32 }, { level: 12, above: 64.46 }, { level: 11, above: 58.6 }, { level: 10, above: 52.74 }, { level: 9, above: 46.88 }, { level: 8, above: 41.02 }, { level: 7, above: 35.16 }, { level: 6, above: 29.3 }, { level: 5, above: 23.44 }, { level: 4, above: 17.58 }, { level: 3, above: 11.72 }, { level: 2, above: 5.86 }, { level: 1, above: 0 }],
      counts: { 15: 3940, 14: 12147, 13: 24381, 12: 30193, 11: 24347, 10: 19263, 9: 12416, 8: 7639, 7: 5931, 6: 4309, 5: 2876, 4: 1784, 3: 1083, 2: 447, 1: 39, 0: 2 },
      total: 150797,
    },
    '英文': {
      levels: [{ level: 15, above: 87.5 }, { level: 14, above: 81.25 }, { level: 13, above: 75 }, { level: 12, above: 68.75 }, { level: 11, above: 62.5 }, { level: 10, above: 56.25 }, { level: 9, above: 50 }, { level: 8, above: 43.75 }, { level: 7, above: 37.5 }, { level: 6, above: 31.25 }, { level: 5, above: 25 }, { level: 4, above: 18.75 }, { level: 3, above: 12.5 }, { level: 2, above: 6.25 }, { level: 1, above: 0 }],
      counts: { 15: 4928, 14: 8956, 13: 10212, 12: 11814, 11: 11008, 10: 12320, 9: 11752, 8: 12972, 7: 12507, 6: 14039, 5: 12857, 4: 14570, 3: 10336, 2: 2036, 1: 48, 0: 5 },
      total: 150360,
    },
    '數學': {
      levels: [{ level: 15, above: 87.78 }, { level: 14, above: 81.51 }, { level: 13, above: 75.24 }, { level: 12, above: 68.97 }, { level: 11, above: 62.7 }, { level: 10, above: 56.43 }, { level: 9, above: 50.16 }, { level: 8, above: 43.89 }, { level: 7, above: 37.62 }, { level: 6, above: 31.35 }, { level: 5, above: 25.08 }, { level: 4, above: 18.81 }, { level: 3, above: 12.54 }, { level: 2, above: 6.27 }, { level: 1, above: 0 }],
      counts: { 15: 1865, 14: 2919, 13: 2717, 12: 5581, 11: 4870, 10: 9751, 9: 8464, 8: 16094, 7: 12910, 6: 21771, 5: 14960, 4: 20645, 3: 11532, 2: 12351, 1: 3558, 0: 693 },
      total: 150681,
    },
    '社會': {
      levels: [{ level: 15, above: 102.34 }, { level: 14, above: 95.03 }, { level: 13, above: 87.72 }, { level: 12, above: 80.41 }, { level: 11, above: 73.1 }, { level: 10, above: 65.79 }, { level: 9, above: 58.48 }, { level: 8, above: 51.17 }, { level: 7, above: 43.86 }, { level: 6, above: 36.55 }, { level: 5, above: 29.24 }, { level: 4, above: 21.93 }, { level: 3, above: 14.62 }, { level: 2, above: 7.31 }, { level: 1, above: 0 }],
      counts: { 15: 3090, 14: 8710, 13: 16607, 12: 17238, 11: 26483, 10: 25551, 9: 16053, 8: 16161, 7: 11742, 6: 5554, 5: 2987, 4: 449, 3: 31, 2: 8, 1: 1, 0: 5 },
      total: 150670,
    },
    '自然': {
      levels: [{ level: 15, above: 111.58 }, { level: 14, above: 103.61 }, { level: 13, above: 95.64 }, { level: 12, above: 87.67 }, { level: 11, above: 79.7 }, { level: 10, above: 71.73 }, { level: 9, above: 63.76 }, { level: 8, above: 55.79 }, { level: 7, above: 47.82 }, { level: 6, above: 39.85 }, { level: 5, above: 31.88 }, { level: 4, above: 23.91 }, { level: 3, above: 15.94 }, { level: 2, above: 7.97 }, { level: 1, above: 0 }],
      counts: { 15: 4187, 14: 6046, 13: 8653, 12: 11612, 11: 14253, 10: 16852, 9: 18557, 8: 18698, 7: 17198, 6: 14454, 5: 11749, 4: 6468, 3: 1461, 2: 100, 1: 6, 0: 8 },
      total: 150302,
    },
  },
  97: {
    '國文': {
      levels: [{ level: 15, above: 81.76 }, { level: 14, above: 75.92 }, { level: 13, above: 70.08 }, { level: 12, above: 64.24 }, { level: 11, above: 58.4 }, { level: 10, above: 52.56 }, { level: 9, above: 46.72 }, { level: 8, above: 40.88 }, { level: 7, above: 35.04 }, { level: 6, above: 29.2 }, { level: 5, above: 23.36 }, { level: 4, above: 17.52 }, { level: 3, above: 11.68 }, { level: 2, above: 5.84 }, { level: 1, above: 0 }],
      counts: { 15: 3627, 14: 9903, 13: 17638, 12: 26011, 11: 26521, 10: 20102, 9: 15966, 8: 10496, 7: 6478, 6: 4738, 5: 3110, 4: 1678, 3: 895, 2: 316, 1: 32, 0: 7 },
      total: 147518,
    },
    '英文': {
      levels: [{ level: 15, above: 89.04 }, { level: 14, above: 82.68 }, { level: 13, above: 76.32 }, { level: 12, above: 69.96 }, { level: 11, above: 63.6 }, { level: 10, above: 57.24 }, { level: 9, above: 50.88 }, { level: 8, above: 44.52 }, { level: 7, above: 38.16 }, { level: 6, above: 31.8 }, { level: 5, above: 25.44 }, { level: 4, above: 19.08 }, { level: 3, above: 12.72 }, { level: 2, above: 6.36 }, { level: 1, above: 0 }],
      counts: { 15: 8629, 14: 14225, 13: 14760, 12: 13573, 11: 11370, 10: 11433, 9: 10665, 8: 9332, 7: 9834, 6: 9842, 5: 10255, 4: 10822, 3: 10607, 2: 1683, 1: 48, 0: 7 },
      total: 147085,
    },
    '數學': {
      levels: [{ level: 15, above: 91.14 }, { level: 14, above: 84.63 }, { level: 13, above: 78.12 }, { level: 12, above: 71.61 }, { level: 11, above: 65.1 }, { level: 10, above: 58.59 }, { level: 9, above: 52.08 }, { level: 8, above: 45.57 }, { level: 7, above: 39.06 }, { level: 6, above: 32.55 }, { level: 5, above: 26.04 }, { level: 4, above: 19.53 }, { level: 3, above: 13.02 }, { level: 2, above: 6.51 }, { level: 1, above: 0 }],
      counts: { 15: 2921, 14: 4022, 13: 3303, 12: 6322, 11: 5209, 10: 9526, 9: 11452, 8: 9043, 7: 15215, 6: 10893, 5: 16786, 4: 17257, 3: 12086, 2: 16570, 1: 5679, 0: 1173 },
      total: 147457,
    },
    '社會': {
      levels: [{ level: 15, above: 96.88 }, { level: 14, above: 89.96 }, { level: 13, above: 83.04 }, { level: 12, above: 76.12 }, { level: 11, above: 69.2 }, { level: 10, above: 62.28 }, { level: 9, above: 55.36 }, { level: 8, above: 48.44 }, { level: 7, above: 41.52 }, { level: 6, above: 34.6 }, { level: 5, above: 27.68 }, { level: 4, above: 20.76 }, { level: 3, above: 13.84 }, { level: 2, above: 6.92 }, { level: 1, above: 0 }],
      counts: { 15: 2516, 14: 6137, 13: 9172, 12: 13489, 11: 23389, 10: 19458, 9: 25076, 8: 16463, 7: 17289, 6: 8825, 5: 4816, 4: 696, 3: 82, 2: 1, 1: 0, 0: 6 },
      total: 147415,
    },
    '自然': {
      levels: [{ level: 15, above: 112.28 }, { level: 14, above: 104.26 }, { level: 13, above: 96.24 }, { level: 12, above: 88.22 }, { level: 11, above: 80.2 }, { level: 10, above: 72.18 }, { level: 9, above: 64.16 }, { level: 8, above: 56.14 }, { level: 7, above: 48.12 }, { level: 6, above: 40.1 }, { level: 5, above: 32.08 }, { level: 4, above: 24.06 }, { level: 3, above: 16.04 }, { level: 2, above: 8.02 }, { level: 1, above: 0 }],
      counts: { 15: 3938, 14: 6390, 13: 9021, 12: 11584, 11: 14932, 10: 17880, 9: 19103, 8: 17985, 7: 15230, 6: 12289, 5: 10259, 4: 6305, 3: 1842, 2: 188, 1: 16, 0: 12 },
      total: 146974,
    },
  },
  98: {
    '國文': {
      levels: [{ level: 15, above: 83.16 }, { level: 14, above: 77.22 }, { level: 13, above: 71.28 }, { level: 12, above: 65.34 }, { level: 11, above: 59.4 }, { level: 10, above: 53.46 }, { level: 9, above: 47.52 }, { level: 8, above: 41.58 }, { level: 7, above: 35.64 }, { level: 6, above: 29.7 }, { level: 5, above: 23.76 }, { level: 4, above: 17.82 }, { level: 3, above: 11.88 }, { level: 2, above: 5.94 }, { level: 1, above: 0 }],
      counts: { 15: 4244, 14: 12640, 13: 22872, 12: 26429, 11: 22841, 10: 16383, 9: 10569, 8: 8042, 7: 5723, 6: 4389, 5: 2901, 4: 1685, 3: 794, 2: 300, 1: 42, 0: 4 },
      total: 139858,
    },
    '英文': {
      levels: [{ level: 15, above: 87.5 }, { level: 14, above: 81.25 }, { level: 13, above: 75 }, { level: 12, above: 68.75 }, { level: 11, above: 62.5 }, { level: 10, above: 56.25 }, { level: 9, above: 50 }, { level: 8, above: 43.75 }, { level: 7, above: 37.5 }, { level: 6, above: 31.25 }, { level: 5, above: 25 }, { level: 4, above: 18.75 }, { level: 3, above: 12.5 }, { level: 2, above: 6.25 }, { level: 1, above: 0 }],
      counts: { 15: 4895, 14: 8541, 13: 8890, 12: 10168, 11: 9629, 10: 10930, 9: 10481, 8: 11946, 7: 11145, 6: 12053, 5: 11274, 4: 14649, 3: 12190, 2: 2631, 1: 83, 0: 7 },
      total: 139512,
    },
    '數學': {
      levels: [{ level: 15, above: 83.58 }, { level: 14, above: 77.61 }, { level: 13, above: 71.64 }, { level: 12, above: 65.67 }, { level: 11, above: 59.7 }, { level: 10, above: 53.73 }, { level: 9, above: 47.76 }, { level: 8, above: 41.79 }, { level: 7, above: 35.82 }, { level: 6, above: 29.85 }, { level: 5, above: 23.88 }, { level: 4, above: 17.91 }, { level: 3, above: 11.94 }, { level: 2, above: 5.97 }, { level: 1, above: 0 }],
      counts: { 15: 1745, 14: 1612, 13: 3722, 12: 3905, 11: 8721, 10: 7438, 9: 8732, 8: 14461, 7: 10877, 6: 18105, 5: 13325, 4: 14094, 3: 18232, 2: 9205, 1: 4487, 0: 1093 },
      total: 139754,
    },
    '社會': {
      levels: [{ level: 15, above: 119.84 }, { level: 14, above: 111.28 }, { level: 13, above: 102.72 }, { level: 12, above: 94.16 }, { level: 11, above: 85.6 }, { level: 10, above: 77.04 }, { level: 9, above: 68.48 }, { level: 8, above: 59.92 }, { level: 7, above: 51.36 }, { level: 6, above: 42.8 }, { level: 5, above: 34.24 }, { level: 4, above: 25.68 }, { level: 3, above: 17.12 }, { level: 2, above: 8.56 }, { level: 1, above: 0 }],
      counts: { 15: 5485, 14: 11481, 13: 18383, 12: 22698, 11: 27718, 10: 17655, 9: 12503, 8: 11270, 7: 6322, 6: 3818, 5: 1734, 4: 586, 3: 40, 2: 1, 1: 3, 0: 2 },
      total: 139699,
    },
    '自然': {
      levels: [{ level: 15, above: 110.74 }, { level: 14, above: 102.83 }, { level: 13, above: 94.92 }, { level: 12, above: 87.01 }, { level: 11, above: 79.1 }, { level: 10, above: 71.19 }, { level: 9, above: 63.28 }, { level: 8, above: 55.37 }, { level: 7, above: 47.46 }, { level: 6, above: 39.55 }, { level: 5, above: 31.64 }, { level: 4, above: 23.73 }, { level: 3, above: 15.82 }, { level: 2, above: 7.91 }, { level: 1, above: 0 }],
      counts: { 15: 2888, 14: 5177, 13: 8390, 12: 10549, 11: 14976, 10: 19196, 9: 20871, 8: 18726, 7: 14844, 6: 11344, 5: 7824, 4: 3873, 3: 726, 2: 47, 1: 7, 0: 3 },
      total: 139441,
    },
  },
  99: {
    '國文': {
      levels: [{ level: 15, above: 81.9 }, { level: 14, above: 76.05 }, { level: 13, above: 70.2 }, { level: 12, above: 64.35 }, { level: 11, above: 58.5 }, { level: 10, above: 52.65 }, { level: 9, above: 46.8 }, { level: 8, above: 40.95 }, { level: 7, above: 35.1 }, { level: 6, above: 29.25 }, { level: 5, above: 23.4 }, { level: 4, above: 17.55 }, { level: 3, above: 11.7 }, { level: 2, above: 5.85 }, { level: 1, above: 0 }],
      counts: { 15: 4009, 14: 8964, 13: 17524, 12: 22379, 11: 20432, 10: 18872, 9: 14263, 8: 10290, 7: 7095, 6: 5943, 5: 4785, 4: 3130, 3: 1981, 2: 641, 1: 72, 0: 5 },
      total: 140385,
    },
    '英文': {
      levels: [{ level: 15, above: 86.8 }, { level: 14, above: 80.6 }, { level: 13, above: 74.4 }, { level: 12, above: 68.2 }, { level: 11, above: 62 }, { level: 10, above: 55.8 }, { level: 9, above: 49.6 }, { level: 8, above: 43.4 }, { level: 7, above: 37.2 }, { level: 6, above: 31 }, { level: 5, above: 24.8 }, { level: 4, above: 18.6 }, { level: 3, above: 12.4 }, { level: 2, above: 6.2 }, { level: 1, above: 0 }],
      counts: { 15: 4667, 14: 7852, 13: 10959, 12: 10993, 11: 11300, 10: 12443, 9: 11281, 8: 11731, 7: 10625, 6: 10418, 5: 11991, 4: 12996, 3: 10618, 2: 2109, 1: 64, 0: 7 },
      total: 140054,
    },
    '數學': {
      levels: [{ level: 15, above: 88.48 }, { level: 14, above: 82.16 }, { level: 13, above: 75.84 }, { level: 12, above: 69.52 }, { level: 11, above: 63.2 }, { level: 10, above: 56.88 }, { level: 9, above: 50.56 }, { level: 8, above: 44.24 }, { level: 7, above: 37.92 }, { level: 6, above: 31.6 }, { level: 5, above: 25.28 }, { level: 4, above: 18.96 }, { level: 3, above: 12.64 }, { level: 2, above: 6.32 }, { level: 1, above: 0 }],
      counts: { 15: 2059, 14: 2918, 13: 2652, 12: 4734, 11: 3925, 10: 7106, 9: 5477, 8: 9568, 7: 7723, 6: 13942, 5: 10998, 4: 20419, 3: 15843, 2: 22386, 1: 8439, 0: 2106 },
      total: 140295,
    },
    '社會': {
      levels: [{ level: 15, above: 118.3 }, { level: 14, above: 109.85 }, { level: 13, above: 101.4 }, { level: 12, above: 92.95 }, { level: 11, above: 84.5 }, { level: 10, above: 76.05 }, { level: 9, above: 67.6 }, { level: 8, above: 59.15 }, { level: 7, above: 50.7 }, { level: 6, above: 42.25 }, { level: 5, above: 33.8 }, { level: 4, above: 25.35 }, { level: 3, above: 16.9 }, { level: 2, above: 8.45 }, { level: 1, above: 0 }],
      counts: { 15: 4030, 14: 14177, 13: 20214, 12: 24023, 11: 22681, 10: 18262, 9: 15558, 8: 9143, 7: 6255, 6: 3726, 5: 1847, 4: 275, 3: 31, 2: 5, 1: 4, 0: 1 },
      total: 140232,
    },
    '自然': {
      levels: [{ level: 15, above: 113.4 }, { level: 14, above: 105.3 }, { level: 13, above: 97.2 }, { level: 12, above: 89.1 }, { level: 11, above: 81 }, { level: 10, above: 72.9 }, { level: 9, above: 64.8 }, { level: 8, above: 56.7 }, { level: 7, above: 48.6 }, { level: 6, above: 40.5 }, { level: 5, above: 32.4 }, { level: 4, above: 24.3 }, { level: 3, above: 16.2 }, { level: 2, above: 8.1 }, { level: 1, above: 0 }],
      counts: { 15: 4516, 14: 7156, 13: 9098, 12: 11036, 11: 13059, 10: 17260, 9: 17081, 8: 16816, 7: 14977, 6: 12583, 5: 9646, 4: 5247, 3: 1360, 2: 136, 1: 5, 0: 9 },
      total: 139985,
    },
  },
  100: {
    '國文': {
      levels: [{ level: 15, above: 78.26 }, { level: 14, above: 72.67 }, { level: 13, above: 67.08 }, { level: 12, above: 61.49 }, { level: 11, above: 55.9 }, { level: 10, above: 50.31 }, { level: 9, above: 44.72 }, { level: 8, above: 39.13 }, { level: 7, above: 33.54 }, { level: 6, above: 27.95 }, { level: 5, above: 22.36 }, { level: 4, above: 16.77 }, { level: 3, above: 11.18 }, { level: 2, above: 5.59 }, { level: 1, above: 0 }],
      counts: { 15: 3897, 14: 10521, 13: 20224, 12: 25972, 11: 24647, 10: 19543, 9: 13631, 8: 9287, 7: 6647, 6: 4445, 5: 2854, 4: 1704, 3: 773, 2: 149, 1: 10, 0: 5 },
      total: 144309,
    },
    '英文': {
      levels: [{ level: 15, above: 89.04 }, { level: 14, above: 82.68 }, { level: 13, above: 76.32 }, { level: 12, above: 69.96 }, { level: 11, above: 63.6 }, { level: 10, above: 57.24 }, { level: 9, above: 50.88 }, { level: 8, above: 44.52 }, { level: 7, above: 38.16 }, { level: 6, above: 31.8 }, { level: 5, above: 25.44 }, { level: 4, above: 19.08 }, { level: 3, above: 12.72 }, { level: 2, above: 6.36 }, { level: 1, above: 0 }],
      counts: { 15: 8420, 14: 15188, 13: 15806, 12: 14689, 11: 12183, 10: 11808, 9: 10754, 8: 9051, 7: 8962, 6: 8534, 5: 8309, 4: 8770, 3: 9432, 2: 1895, 1: 46, 0: 5 },
      total: 143852,
    },
    '數學': {
      levels: [{ level: 15, above: 93.38 }, { level: 14, above: 86.71 }, { level: 13, above: 80.04 }, { level: 12, above: 73.37 }, { level: 11, above: 66.7 }, { level: 10, above: 60.03 }, { level: 9, above: 53.36 }, { level: 8, above: 46.69 }, { level: 7, above: 40.02 }, { level: 6, above: 33.35 }, { level: 5, above: 26.68 }, { level: 4, above: 20.01 }, { level: 3, above: 13.34 }, { level: 2, above: 6.67 }, { level: 1, above: 0 }],
      counts: { 15: 5869, 14: 6788, 13: 6686, 12: 8597, 11: 9637, 10: 9013, 9: 11472, 8: 11957, 7: 10296, 6: 12458, 5: 13091, 4: 12107, 3: 14160, 2: 9725, 1: 2303, 0: 37 },
      total: 144196,
    },
    '社會': {
      levels: [{ level: 15, above: 113.26 }, { level: 14, above: 105.17 }, { level: 13, above: 97.08 }, { level: 12, above: 88.99 }, { level: 11, above: 80.9 }, { level: 10, above: 72.81 }, { level: 9, above: 64.72 }, { level: 8, above: 56.63 }, { level: 7, above: 48.54 }, { level: 6, above: 40.45 }, { level: 5, above: 32.36 }, { level: 4, above: 24.27 }, { level: 3, above: 16.18 }, { level: 2, above: 8.09 }, { level: 1, above: 0 }],
      counts: { 15: 3498, 14: 7199, 13: 13141, 12: 18138, 11: 20696, 10: 20819, 9: 18326, 8: 15244, 7: 12483, 6: 9211, 5: 4307, 4: 981, 3: 80, 2: 3, 1: 0, 0: 3 },
      total: 144129,
    },
    '自然': {
      levels: [{ level: 15, above: 117.18 }, { level: 14, above: 108.81 }, { level: 13, above: 100.44 }, { level: 12, above: 92.07 }, { level: 11, above: 83.7 }, { level: 10, above: 75.33 }, { level: 9, above: 66.96 }, { level: 8, above: 58.59 }, { level: 7, above: 50.22 }, { level: 6, above: 41.85 }, { level: 5, above: 33.48 }, { level: 4, above: 25.11 }, { level: 3, above: 16.74 }, { level: 2, above: 8.37 }, { level: 1, above: 0 }],
      counts: { 15: 7589, 14: 9522, 13: 10863, 12: 12036, 11: 13585, 10: 15046, 9: 16190, 8: 16134, 7: 14847, 6: 12465, 5: 9481, 4: 4897, 3: 1052, 2: 70, 1: 3, 0: 5 },
      total: 143785,
    },
  },
  101: {
    '國文': {
      levels: [{ level: 15, above: 86.1 }, { level: 14, above: 79.95 }, { level: 13, above: 73.8 }, { level: 12, above: 67.65 }, { level: 11, above: 61.5 }, { level: 10, above: 55.35 }, { level: 9, above: 49.2 }, { level: 8, above: 43.05 }, { level: 7, above: 36.9 }, { level: 6, above: 30.75 }, { level: 5, above: 24.6 }, { level: 4, above: 18.45 }, { level: 3, above: 12.3 }, { level: 2, above: 6.15 }, { level: 1, above: 0 }],
      counts: { 15: 4749, 14: 13749, 13: 23602, 12: 27332, 11: 23828, 10: 17822, 9: 12498, 8: 9145, 7: 6676, 6: 5199, 5: 3572, 4: 2505, 3: 1466, 2: 613, 1: 37, 0: 7 },
      total: 152800,
    },
    '英文': {
      levels: [{ level: 15, above: 89.32 }, { level: 14, above: 82.94 }, { level: 13, above: 76.56 }, { level: 12, above: 70.18 }, { level: 11, above: 63.8 }, { level: 10, above: 57.42 }, { level: 9, above: 51.04 }, { level: 8, above: 44.66 }, { level: 7, above: 38.28 }, { level: 6, above: 31.9 }, { level: 5, above: 25.52 }, { level: 4, above: 19.14 }, { level: 3, above: 12.76 }, { level: 2, above: 6.38 }, { level: 1, above: 0 }],
      counts: { 15: 8372, 14: 14193, 13: 14106, 12: 15187, 11: 14593, 10: 13795, 9: 11293, 8: 10740, 7: 9328, 6: 8421, 5: 7980, 4: 10708, 3: 11303, 2: 2255, 1: 62, 0: 4 },
      total: 152340,
    },
    '數學': {
      levels: [{ level: 15, above: 91.98 }, { level: 14, above: 85.41 }, { level: 13, above: 78.84 }, { level: 12, above: 72.27 }, { level: 11, above: 65.7 }, { level: 10, above: 59.13 }, { level: 9, above: 52.56 }, { level: 8, above: 45.99 }, { level: 7, above: 39.42 }, { level: 6, above: 32.85 }, { level: 5, above: 26.28 }, { level: 4, above: 19.71 }, { level: 3, above: 13.14 }, { level: 2, above: 6.57 }, { level: 1, above: 0 }],
      counts: { 15: 5867, 14: 7415, 13: 9499, 12: 8383, 11: 10884, 10: 9811, 9: 11446, 8: 12125, 7: 10729, 6: 13512, 5: 12992, 4: 16120, 3: 12684, 2: 9188, 1: 1935, 0: 50 },
      total: 152640,
    },
    '社會': {
      levels: [{ level: 15, above: 119.7 }, { level: 14, above: 111.15 }, { level: 13, above: 102.6 }, { level: 12, above: 94.05 }, { level: 11, above: 85.5 }, { level: 10, above: 76.95 }, { level: 9, above: 68.4 }, { level: 8, above: 59.85 }, { level: 7, above: 51.3 }, { level: 6, above: 42.75 }, { level: 5, above: 34.2 }, { level: 4, above: 25.65 }, { level: 3, above: 17.1 }, { level: 2, above: 8.55 }, { level: 1, above: 0 }],
      counts: { 15: 5902, 14: 13466, 13: 22574, 12: 26525, 11: 29112, 10: 16513, 9: 12255, 8: 11523, 7: 6982, 6: 4620, 5: 2297, 4: 773, 3: 51, 2: 3, 1: 1, 0: 3 },
      total: 152600,
    },
    '自然': {
      levels: [{ level: 15, above: 114.94 }, { level: 14, above: 106.73 }, { level: 13, above: 98.52 }, { level: 12, above: 90.31 }, { level: 11, above: 82.1 }, { level: 10, above: 73.89 }, { level: 9, above: 65.68 }, { level: 8, above: 57.47 }, { level: 7, above: 49.26 }, { level: 6, above: 41.05 }, { level: 5, above: 32.84 }, { level: 4, above: 24.63 }, { level: 3, above: 16.42 }, { level: 2, above: 8.21 }, { level: 1, above: 0 }],
      counts: { 15: 7299, 14: 11973, 13: 11568, 12: 12316, 11: 12140, 10: 13605, 9: 13810, 8: 14786, 7: 13696, 6: 14230, 5: 13494, 4: 10181, 3: 2922, 2: 258, 1: 11, 0: 5 },
      total: 152294,
    },
  },
  102: {
    '國文': {
      levels: [{ level: 15, above: 82.6 }, { level: 14, above: 76.7 }, { level: 13, above: 70.8 }, { level: 12, above: 64.9 }, { level: 11, above: 59 }, { level: 10, above: 53.1 }, { level: 9, above: 47.2 }, { level: 8, above: 41.3 }, { level: 7, above: 35.4 }, { level: 6, above: 29.5 }, { level: 5, above: 23.6 }, { level: 4, above: 17.7 }, { level: 3, above: 11.8 }, { level: 2, above: 5.9 }, { level: 1, above: 0 }],
      counts: { 15: 3777, 14: 9920, 13: 19029, 12: 24155, 11: 22911, 10: 18733, 9: 14653, 8: 11068, 7: 8446, 6: 6120, 5: 4297, 4: 2731, 3: 1581, 2: 574, 1: 63, 0: 2 },
      total: 148060,
    },
    '英文': {
      levels: [{ level: 15, above: 88.34 }, { level: 14, above: 82.03 }, { level: 13, above: 75.72 }, { level: 12, above: 69.41 }, { level: 11, above: 63.1 }, { level: 10, above: 56.79 }, { level: 9, above: 50.48 }, { level: 8, above: 44.17 }, { level: 7, above: 37.86 }, { level: 6, above: 31.55 }, { level: 5, above: 25.24 }, { level: 4, above: 18.93 }, { level: 3, above: 12.62 }, { level: 2, above: 6.31 }, { level: 1, above: 0 }],
      counts: { 15: 7713, 14: 13606, 13: 16781, 12: 15194, 11: 12201, 10: 11417, 9: 10288, 8: 8864, 7: 9398, 6: 8463, 5: 9626, 4: 12001, 3: 10002, 2: 2122, 1: 66, 0: 8 },
      total: 147750,
    },
    '數學': {
      levels: [{ level: 15, above: 89.88 }, { level: 14, above: 83.46 }, { level: 13, above: 77.04 }, { level: 12, above: 70.62 }, { level: 11, above: 64.2 }, { level: 10, above: 57.78 }, { level: 9, above: 51.36 }, { level: 8, above: 44.94 }, { level: 7, above: 38.52 }, { level: 6, above: 32.1 }, { level: 5, above: 25.68 }, { level: 4, above: 19.26 }, { level: 3, above: 12.84 }, { level: 2, above: 6.42 }, { level: 1, above: 0 }],
      counts: { 15: 2881, 14: 3569, 13: 4687, 12: 7641, 11: 8410, 10: 12334, 9: 12270, 8: 15857, 7: 13527, 6: 13324, 5: 14253, 4: 11716, 3: 14222, 2: 9683, 1: 3504, 0: 107 },
      total: 147985,
    },
    '社會': {
      levels: [{ level: 15, above: 124.04 }, { level: 14, above: 115.18 }, { level: 13, above: 106.32 }, { level: 12, above: 97.46 }, { level: 11, above: 88.6 }, { level: 10, above: 79.74 }, { level: 9, above: 70.88 }, { level: 8, above: 62.02 }, { level: 7, above: 53.16 }, { level: 6, above: 44.3 }, { level: 5, above: 35.44 }, { level: 4, above: 26.58 }, { level: 3, above: 17.72 }, { level: 2, above: 8.86 }, { level: 1, above: 0 }],
      counts: { 15: 5054, 14: 15181, 13: 18228, 12: 25888, 11: 19595, 10: 20216, 9: 12274, 8: 10222, 7: 10785, 6: 6174, 5: 3621, 4: 618, 3: 71, 2: 5, 1: 2, 0: 1 },
      total: 147935,
    },
    '自然': {
      levels: [{ level: 15, above: 114.24 }, { level: 14, above: 106.08 }, { level: 13, above: 97.92 }, { level: 12, above: 89.76 }, { level: 11, above: 81.6 }, { level: 10, above: 73.44 }, { level: 9, above: 65.28 }, { level: 8, above: 57.12 }, { level: 7, above: 48.96 }, { level: 6, above: 40.8 }, { level: 5, above: 32.64 }, { level: 4, above: 24.48 }, { level: 3, above: 16.32 }, { level: 2, above: 8.16 }, { level: 1, above: 0 }],
      counts: { 15: 4566, 14: 6997, 13: 9473, 12: 11662, 11: 13521, 10: 14864, 9: 15384, 8: 15116, 7: 14927, 6: 14741, 5: 14790, 4: 9099, 3: 2259, 2: 221, 1: 17, 0: 6 },
      total: 147643,
    },
  },
  103: {
    '國文': {
      levels: [{ level: 15, above: 83.02 }, { level: 14, above: 77.09 }, { level: 13, above: 71.16 }, { level: 12, above: 65.23 }, { level: 11, above: 59.3 }, { level: 10, above: 53.37 }, { level: 9, above: 47.44 }, { level: 8, above: 41.51 }, { level: 7, above: 35.58 }, { level: 6, above: 29.65 }, { level: 5, above: 23.72 }, { level: 4, above: 17.79 }, { level: 3, above: 11.86 }, { level: 2, above: 5.93 }, { level: 1, above: 0 }],
      counts: { 15: 4138, 14: 11470, 13: 19908, 12: 24330, 11: 23101, 10: 18494, 9: 13149, 8: 9380, 7: 7027, 6: 5304, 5: 4095, 4: 3053, 3: 1769, 2: 632, 1: 47, 0: 3 },
      total: 145900,
    },
    '英文': {
      levels: [{ level: 15, above: 88.34 }, { level: 14, above: 82.03 }, { level: 13, above: 75.72 }, { level: 12, above: 69.41 }, { level: 11, above: 63.1 }, { level: 10, above: 56.79 }, { level: 9, above: 50.48 }, { level: 8, above: 44.17 }, { level: 7, above: 37.86 }, { level: 6, above: 31.55 }, { level: 5, above: 25.24 }, { level: 4, above: 18.93 }, { level: 3, above: 12.62 }, { level: 2, above: 6.31 }, { level: 1, above: 0 }],
      counts: { 15: 7728, 14: 12503, 13: 15359, 12: 14845, 11: 12616, 10: 12483, 9: 11291, 8: 9688, 7: 9473, 6: 8267, 5: 9036, 4: 11581, 3: 8827, 2: 1821, 1: 55, 0: 2 },
      total: 145575,
    },
    '數學': {
      levels: [{ level: 15, above: 93.38 }, { level: 14, above: 86.71 }, { level: 13, above: 80.04 }, { level: 12, above: 73.37 }, { level: 11, above: 66.7 }, { level: 10, above: 60.03 }, { level: 9, above: 53.36 }, { level: 8, above: 46.69 }, { level: 7, above: 40.02 }, { level: 6, above: 33.35 }, { level: 5, above: 26.68 }, { level: 4, above: 20.01 }, { level: 3, above: 13.34 }, { level: 2, above: 6.67 }, { level: 1, above: 0 }],
      counts: { 15: 6749, 14: 7476, 13: 8352, 12: 10289, 11: 11792, 10: 10878, 9: 13413, 8: 13014, 7: 10492, 6: 11481, 5: 11085, 4: 9413, 3: 11082, 2: 7968, 1: 2306, 0: 27 },
      total: 145817,
    },
    '社會': {
      levels: [{ level: 15, above: 123.34 }, { level: 14, above: 114.53 }, { level: 13, above: 105.72 }, { level: 12, above: 96.91 }, { level: 11, above: 88.1 }, { level: 10, above: 79.29 }, { level: 9, above: 70.48 }, { level: 8, above: 61.67 }, { level: 7, above: 52.86 }, { level: 6, above: 44.05 }, { level: 5, above: 35.24 }, { level: 4, above: 26.43 }, { level: 3, above: 17.62 }, { level: 2, above: 8.81 }, { level: 1, above: 0 }],
      counts: { 15: 5975, 14: 12659, 13: 24500, 12: 21550, 11: 20466, 10: 21170, 9: 13028, 8: 12568, 7: 7215, 6: 4233, 5: 2031, 4: 358, 3: 37, 2: 2, 1: 0, 0: 0 },
      total: 145792,
    },
    '自然': {
      levels: [{ level: 15, above: 117.46 }, { level: 14, above: 109.07 }, { level: 13, above: 100.68 }, { level: 12, above: 92.29 }, { level: 11, above: 83.9 }, { level: 10, above: 75.51 }, { level: 9, above: 67.12 }, { level: 8, above: 58.73 }, { level: 7, above: 50.34 }, { level: 6, above: 41.95 }, { level: 5, above: 33.56 }, { level: 4, above: 25.17 }, { level: 3, above: 16.78 }, { level: 2, above: 8.39 }, { level: 1, above: 0 }],
      counts: { 15: 7084, 14: 8305, 13: 9428, 12: 10720, 11: 11727, 10: 13735, 9: 15237, 8: 15883, 7: 15430, 6: 14417, 5: 13134, 4: 8165, 3: 2113, 2: 125, 1: 15, 0: 2 },
      total: 145520,
    },
  },
  104: {
    '國文': {
      levels: [{ level: 15, above: 82.6 }, { level: 14, above: 76.7 }, { level: 13, above: 70.8 }, { level: 12, above: 64.9 }, { level: 11, above: 59 }, { level: 10, above: 53.1 }, { level: 9, above: 47.2 }, { level: 8, above: 41.3 }, { level: 7, above: 35.4 }, { level: 6, above: 29.5 }, { level: 5, above: 23.6 }, { level: 4, above: 17.7 }, { level: 3, above: 11.8 }, { level: 2, above: 5.9 }, { level: 1, above: 0 }],
      counts: { 15: 4402, 14: 12882, 13: 23824, 12: 27459, 11: 23486, 10: 16778, 9: 11015, 8: 7548, 7: 5475, 6: 4185, 5: 3165, 4: 2223, 3: 1356, 2: 417, 1: 30, 0: 5 },
      total: 144250,
    },
    '英文': {
      levels: [{ level: 15, above: 88.48 }, { level: 14, above: 82.16 }, { level: 13, above: 75.84 }, { level: 12, above: 69.52 }, { level: 11, above: 63.2 }, { level: 10, above: 56.88 }, { level: 9, above: 50.56 }, { level: 8, above: 44.24 }, { level: 7, above: 37.92 }, { level: 6, above: 31.6 }, { level: 5, above: 25.28 }, { level: 4, above: 18.96 }, { level: 3, above: 12.64 }, { level: 2, above: 6.32 }, { level: 1, above: 0 }],
      counts: { 15: 6850, 14: 10673, 13: 13148, 12: 12699, 11: 13784, 10: 12564, 9: 10463, 8: 10089, 7: 9571, 6: 8775, 5: 10431, 4: 13243, 3: 9451, 2: 2081, 1: 55, 0: 6 },
      total: 143883,
    },
    '數學': {
      levels: [{ level: 15, above: 91.42 }, { level: 14, above: 84.89 }, { level: 13, above: 78.36 }, { level: 12, above: 71.83 }, { level: 11, above: 65.3 }, { level: 10, above: 58.77 }, { level: 9, above: 52.24 }, { level: 8, above: 45.71 }, { level: 7, above: 39.18 }, { level: 6, above: 32.65 }, { level: 5, above: 26.12 }, { level: 4, above: 19.59 }, { level: 3, above: 13.06 }, { level: 2, above: 6.53 }, { level: 1, above: 0 }],
      counts: { 15: 2984, 14: 4140, 13: 4893, 12: 6682, 11: 7618, 10: 10544, 9: 10409, 8: 13671, 7: 12918, 6: 15738, 5: 13520, 4: 15059, 3: 11572, 2: 10588, 1: 3643, 0: 82 },
      total: 144061,
    },
    '社會': {
      levels: [{ level: 15, above: 126.84 }, { level: 14, above: 117.78 }, { level: 13, above: 108.72 }, { level: 12, above: 99.66 }, { level: 11, above: 90.6 }, { level: 10, above: 81.54 }, { level: 9, above: 72.48 }, { level: 8, above: 63.42 }, { level: 7, above: 54.36 }, { level: 6, above: 45.3 }, { level: 5, above: 36.24 }, { level: 4, above: 27.18 }, { level: 3, above: 18.12 }, { level: 2, above: 9.06 }, { level: 1, above: 0 }],
      counts: { 15: 6496, 14: 17450, 13: 19416, 12: 25958, 11: 18380, 10: 17873, 9: 10487, 8: 9884, 7: 6205, 6: 6383, 5: 3548, 4: 1712, 3: 191, 2: 17, 1: 2, 0: 7 },
      total: 144009,
    },
    '自然': {
      levels: [{ level: 15, above: 116.62 }, { level: 14, above: 108.29 }, { level: 13, above: 99.96 }, { level: 12, above: 91.63 }, { level: 11, above: 83.3 }, { level: 10, above: 74.97 }, { level: 9, above: 66.64 }, { level: 8, above: 58.31 }, { level: 7, above: 49.98 }, { level: 6, above: 41.65 }, { level: 5, above: 33.32 }, { level: 4, above: 24.99 }, { level: 3, above: 16.66 }, { level: 2, above: 8.33 }, { level: 1, above: 0 }],
      counts: { 15: 6004, 14: 7504, 13: 9370, 12: 10223, 11: 11994, 10: 12952, 9: 14249, 8: 14988, 7: 14916, 6: 13853, 5: 13854, 4: 10267, 3: 3286, 2: 238, 1: 10, 0: 10 },
      total: 143718,
    },
  },
  105: {
    '國文': {
      levels: [{ level: 15, above: 78.82 }, { level: 14, above: 73.19 }, { level: 13, above: 67.56 }, { level: 12, above: 61.93 }, { level: 11, above: 56.3 }, { level: 10, above: 50.67 }, { level: 9, above: 45.04 }, { level: 8, above: 39.41 }, { level: 7, above: 33.78 }, { level: 6, above: 28.15 }, { level: 5, above: 22.52 }, { level: 4, above: 16.89 }, { level: 3, above: 11.26 }, { level: 2, above: 5.63 }, { level: 1, above: 0 }],
      counts: { 15: 2740, 14: 7265, 13: 13955, 12: 19881, 11: 22235, 10: 20417, 9: 16096, 8: 11323, 7: 7617, 6: 4887, 5: 3319, 4: 2186, 3: 1308, 2: 485, 1: 45, 0: 2 },
      total: 133761,
    },
    '英文': {
      levels: [{ level: 15, above: 88.76 }, { level: 14, above: 82.42 }, { level: 13, above: 76.08 }, { level: 12, above: 69.74 }, { level: 11, above: 63.4 }, { level: 10, above: 57.06 }, { level: 9, above: 50.72 }, { level: 8, above: 44.38 }, { level: 7, above: 38.04 }, { level: 6, above: 31.7 }, { level: 5, above: 25.36 }, { level: 4, above: 19.02 }, { level: 3, above: 12.68 }, { level: 2, above: 6.34 }, { level: 1, above: 0 }],
      counts: { 15: 6193, 14: 10843, 13: 11469, 12: 12294, 11: 12251, 10: 10752, 9: 11101, 8: 10321, 7: 9189, 6: 9982, 5: 9638, 4: 9229, 3: 8420, 2: 1457, 1: 44, 0: 1 },
      total: 133184,
    },
    '數學': {
      levels: [{ level: 15, above: 90.72 }, { level: 14, above: 84.24 }, { level: 13, above: 77.76 }, { level: 12, above: 71.28 }, { level: 11, above: 64.8 }, { level: 10, above: 58.32 }, { level: 9, above: 51.84 }, { level: 8, above: 45.36 }, { level: 7, above: 38.88 }, { level: 6, above: 32.4 }, { level: 5, above: 25.92 }, { level: 4, above: 19.44 }, { level: 3, above: 12.96 }, { level: 2, above: 6.48 }, { level: 1, above: 0 }],
      counts: { 15: 2815, 14: 3157, 13: 5427, 12: 5965, 11: 8522, 10: 8655, 9: 11296, 8: 10157, 7: 12512, 6: 10479, 5: 12994, 4: 12362, 3: 16120, 2: 10161, 1: 2847, 0: 50 },
      total: 133519,
    },
    '社會': {
      levels: [{ level: 15, above: 119.42 }, { level: 14, above: 110.89 }, { level: 13, above: 102.36 }, { level: 12, above: 93.83 }, { level: 11, above: 85.3 }, { level: 10, above: 76.77 }, { level: 9, above: 68.24 }, { level: 8, above: 59.71 }, { level: 7, above: 51.18 }, { level: 6, above: 42.65 }, { level: 5, above: 34.12 }, { level: 4, above: 25.59 }, { level: 3, above: 17.06 }, { level: 2, above: 8.53 }, { level: 1, above: 0 }],
      counts: { 15: 4591, 14: 8464, 13: 13321, 12: 21309, 11: 18713, 10: 18011, 9: 15326, 8: 14697, 7: 8482, 6: 5866, 5: 3363, 4: 1236, 3: 84, 2: 7, 1: 4, 0: 3 },
      total: 133477,
    },
    '自然': {
      levels: [{ level: 15, above: 117.04 }, { level: 14, above: 108.68 }, { level: 13, above: 100.32 }, { level: 12, above: 91.96 }, { level: 11, above: 83.6 }, { level: 10, above: 75.24 }, { level: 9, above: 66.88 }, { level: 8, above: 58.52 }, { level: 7, above: 50.16 }, { level: 6, above: 41.8 }, { level: 5, above: 33.44 }, { level: 4, above: 25.08 }, { level: 3, above: 16.72 }, { level: 2, above: 8.36 }, { level: 1, above: 0 }],
      counts: { 15: 5947, 14: 7406, 13: 8737, 12: 10055, 11: 10428, 10: 11682, 9: 12557, 8: 13490, 7: 14314, 6: 14955, 5: 13437, 4: 7781, 3: 2077, 2: 186, 1: 15, 0: 6 },
      total: 133073,
    },
  },
  106: {
    '國文': {
      levels: [{ level: 15, above: 81.34 }, { level: 14, above: 75.53 }, { level: 13, above: 69.72 }, { level: 12, above: 63.91 }, { level: 11, above: 58.1 }, { level: 10, above: 52.29 }, { level: 9, above: 46.48 }, { level: 8, above: 40.67 }, { level: 7, above: 34.86 }, { level: 6, above: 29.05 }, { level: 5, above: 23.24 }, { level: 4, above: 17.43 }, { level: 3, above: 11.62 }, { level: 2, above: 5.81 }, { level: 1, above: 0 }],
      counts: { 15: 3398, 14: 9043, 13: 16408, 12: 20134, 11: 20042, 10: 16456, 9: 12801, 8: 9511, 7: 6755, 6: 4983, 5: 3500, 4: 2254, 3: 1355, 2: 460, 1: 32, 0: 5 },
      total: 127137,
    },
    '英文': {
      levels: [{ level: 15, above: 87.92 }, { level: 14, above: 81.64 }, { level: 13, above: 75.36 }, { level: 12, above: 69.08 }, { level: 11, above: 62.8 }, { level: 10, above: 56.52 }, { level: 9, above: 50.24 }, { level: 8, above: 43.96 }, { level: 7, above: 37.68 }, { level: 6, above: 31.4 }, { level: 5, above: 25.12 }, { level: 4, above: 18.84 }, { level: 3, above: 12.56 }, { level: 2, above: 6.28 }, { level: 1, above: 0 }],
      counts: { 15: 4714, 14: 7069, 13: 9180, 12: 8779, 11: 9576, 10: 9134, 9: 9880, 8: 10197, 7: 10119, 6: 11942, 5: 11958, 4: 13479, 3: 8990, 2: 1628, 1: 54, 0: 3 },
      total: 126702,
    },
    '數學': {
      levels: [{ level: 15, above: 88.06 }, { level: 14, above: 81.77 }, { level: 13, above: 75.48 }, { level: 12, above: 69.19 }, { level: 11, above: 62.9 }, { level: 10, above: 56.61 }, { level: 9, above: 50.32 }, { level: 8, above: 44.03 }, { level: 7, above: 37.74 }, { level: 6, above: 31.45 }, { level: 5, above: 25.16 }, { level: 4, above: 18.87 }, { level: 3, above: 12.58 }, { level: 2, above: 6.29 }, { level: 1, above: 0 }],
      counts: { 15: 1791, 14: 2533, 13: 3343, 12: 4156, 11: 6433, 10: 6669, 9: 7571, 8: 9070, 7: 11993, 6: 11371, 5: 12518, 4: 17092, 3: 16044, 2: 12235, 1: 4006, 0: 85 },
      total: 126910,
    },
    '社會': {
      levels: [{ level: 15, above: 122.5 }, { level: 14, above: 113.75 }, { level: 13, above: 105 }, { level: 12, above: 96.25 }, { level: 11, above: 87.5 }, { level: 10, above: 78.75 }, { level: 9, above: 70 }, { level: 8, above: 61.25 }, { level: 7, above: 52.5 }, { level: 6, above: 43.75 }, { level: 5, above: 35 }, { level: 4, above: 26.25 }, { level: 3, above: 17.5 }, { level: 2, above: 8.75 }, { level: 1, above: 0 }],
      counts: { 15: 5005, 14: 15134, 13: 16804, 12: 16951, 11: 19534, 10: 13265, 9: 11526, 8: 12127, 7: 7834, 6: 5859, 5: 2076, 4: 638, 3: 92, 2: 3, 1: 2, 0: 3 },
      total: 126853,
    },
    '自然': {
      levels: [{ level: 15, above: 115.92 }, { level: 14, above: 107.64 }, { level: 13, above: 99.36 }, { level: 12, above: 91.08 }, { level: 11, above: 82.8 }, { level: 10, above: 74.52 }, { level: 9, above: 66.24 }, { level: 8, above: 57.96 }, { level: 7, above: 49.68 }, { level: 6, above: 41.4 }, { level: 5, above: 33.12 }, { level: 4, above: 24.84 }, { level: 3, above: 16.56 }, { level: 2, above: 8.28 }, { level: 1, above: 0 }],
      counts: { 15: 5692, 14: 7628, 13: 9445, 12: 9596, 11: 9837, 10: 10172, 9: 11134, 8: 11722, 7: 13302, 6: 13881, 5: 13160, 4: 8653, 3: 2252, 2: 123, 1: 3, 0: 4 },
      total: 126604,
    },
  },
  107: {
    '國文': {
      levels: [{ level: 15, above: 73.92 }, { level: 14, above: 68.64 }, { level: 13, above: 63.36 }, { level: 12, above: 58.08 }, { level: 11, above: 52.8 }, { level: 10, above: 47.52 }, { level: 9, above: 42.24 }, { level: 8, above: 36.96 }, { level: 7, above: 31.68 }, { level: 6, above: 26.4 }, { level: 5, above: 21.12 }, { level: 4, above: 15.84 }, { level: 3, above: 10.56 }, { level: 2, above: 5.28 }, { level: 1, above: 0 }],
      counts: { 15: 3764, 14: 9637, 13: 16699, 12: 21590, 11: 22303, 10: 19679, 9: 15209, 8: 10377, 7: 6699, 6: 4076, 5: 2396, 4: 1263, 3: 798, 2: 171, 1: 12, 0: 4 },
      total: 134677,
    },
    '英文': {
      levels: [{ level: 15, above: 88.76 }, { level: 14, above: 82.42 }, { level: 13, above: 76.08 }, { level: 12, above: 69.74 }, { level: 11, above: 63.4 }, { level: 10, above: 57.06 }, { level: 9, above: 50.72 }, { level: 8, above: 44.38 }, { level: 7, above: 38.04 }, { level: 6, above: 31.7 }, { level: 5, above: 25.36 }, { level: 4, above: 19.02 }, { level: 3, above: 12.68 }, { level: 2, above: 6.34 }, { level: 1, above: 0 }],
      counts: { 15: 7407, 14: 13220, 13: 12992, 12: 13365, 11: 11971, 10: 9741, 9: 9566, 8: 8886, 7: 7715, 6: 8332, 5: 9146, 4: 9556, 3: 10426, 2: 1890, 1: 60, 0: 4 },
      total: 134277,
    },
    '數學': {
      levels: [{ level: 15, above: 93.1 }, { level: 14, above: 86.45 }, { level: 13, above: 79.8 }, { level: 12, above: 73.15 }, { level: 11, above: 66.5 }, { level: 10, above: 59.85 }, { level: 9, above: 53.2 }, { level: 8, above: 46.55 }, { level: 7, above: 39.9 }, { level: 6, above: 33.25 }, { level: 5, above: 26.6 }, { level: 4, above: 19.95 }, { level: 3, above: 13.3 }, { level: 2, above: 6.65 }, { level: 1, above: 0 }],
      counts: { 15: 3700, 14: 4630, 13: 5766, 12: 5919, 11: 7891, 10: 9198, 9: 8931, 8: 10317, 7: 10823, 6: 10690, 5: 14298, 4: 16533, 3: 14033, 2: 9732, 1: 1975, 0: 59 },
      total: 134495,
    },
    '社會': {
      levels: [{ level: 15, above: 124.32 }, { level: 14, above: 115.44 }, { level: 13, above: 106.56 }, { level: 12, above: 97.68 }, { level: 11, above: 88.8 }, { level: 10, above: 79.92 }, { level: 9, above: 71.04 }, { level: 8, above: 62.16 }, { level: 7, above: 53.28 }, { level: 6, above: 44.4 }, { level: 5, above: 35.52 }, { level: 4, above: 26.64 }, { level: 3, above: 17.76 }, { level: 2, above: 8.88 }, { level: 1, above: 0 }],
      counts: { 15: 4267, 14: 11161, 13: 13097, 12: 19349, 11: 16323, 10: 19509, 9: 13689, 8: 11700, 7: 11466, 6: 6833, 5: 5214, 4: 1562, 3: 289, 2: 10, 1: 4, 0: 7 },
      total: 134480,
    },
    '自然': {
      levels: [{ level: 15, above: 112 }, { level: 14, above: 104 }, { level: 13, above: 96 }, { level: 12, above: 88 }, { level: 11, above: 80 }, { level: 10, above: 72 }, { level: 9, above: 64 }, { level: 8, above: 56 }, { level: 7, above: 48 }, { level: 6, above: 40 }, { level: 5, above: 32 }, { level: 4, above: 24 }, { level: 3, above: 16 }, { level: 2, above: 8 }, { level: 1, above: 0 }],
      counts: { 15: 2912, 14: 4594, 13: 6788, 12: 8793, 11: 10090, 10: 11626, 9: 13121, 8: 14574, 7: 16672, 6: 17764, 5: 15373, 4: 9244, 3: 2477, 2: 171, 1: 8, 0: 6 },
      total: 134213,
    },
  },
  108: {
    '國文': {
      levels: [{ level: 15, above: 78.82 }, { level: 14, above: 73.19 }, { level: 13, above: 67.56 }, { level: 12, above: 61.93 }, { level: 11, above: 56.3 }, { level: 10, above: 50.67 }, { level: 9, above: 45.04 }, { level: 8, above: 39.41 }, { level: 7, above: 33.78 }, { level: 6, above: 28.15 }, { level: 5, above: 22.52 }, { level: 4, above: 16.89 }, { level: 3, above: 11.26 }, { level: 2, above: 5.63 }, { level: 1, above: 0 }],
      counts: { 15: 4438, 14: 11530, 13: 18939, 12: 22431, 11: 21832, 10: 18576, 9: 13429, 8: 8982, 7: 6069, 6: 4058, 5: 2741, 4: 1658, 3: 1036, 2: 437, 1: 26, 0: 7 },
      total: 136189,
    },
    '英文': {
      levels: [{ level: 15, above: 89.32 }, { level: 14, above: 82.94 }, { level: 13, above: 76.56 }, { level: 12, above: 70.18 }, { level: 11, above: 63.8 }, { level: 10, above: 57.42 }, { level: 9, above: 51.04 }, { level: 8, above: 44.66 }, { level: 7, above: 38.28 }, { level: 6, above: 31.9 }, { level: 5, above: 25.52 }, { level: 4, above: 19.14 }, { level: 3, above: 12.76 }, { level: 2, above: 6.38 }, { level: 1, above: 0 }],
      counts: { 15: 7689, 14: 13395, 13: 13511, 12: 12908, 11: 10781, 10: 9806, 9: 8658, 8: 8246, 7: 7993, 6: 8727, 5: 9546, 4: 12025, 3: 10525, 2: 2082, 1: 47, 0: 9 },
      total: 135948,
    },
    '數學': {
      levels: [{ level: 15, above: 93.38 }, { level: 14, above: 86.71 }, { level: 13, above: 80.04 }, { level: 12, above: 73.37 }, { level: 11, above: 66.7 }, { level: 10, above: 60.03 }, { level: 9, above: 53.36 }, { level: 8, above: 46.69 }, { level: 7, above: 40.02 }, { level: 6, above: 33.35 }, { level: 5, above: 26.68 }, { level: 4, above: 20.01 }, { level: 3, above: 13.34 }, { level: 2, above: 6.67 }, { level: 1, above: 0 }],
      counts: { 15: 7782, 14: 8846, 13: 8937, 12: 10403, 11: 10927, 10: 9332, 9: 11577, 8: 10842, 7: 8929, 6: 10210, 5: 10508, 4: 9559, 3: 9799, 2: 5095, 1: 906, 0: 41 },
      total: 133693,
    },
    '社會': {
      levels: [{ level: 15, above: 114.24 }, { level: 14, above: 106.08 }, { level: 13, above: 97.92 }, { level: 12, above: 89.76 }, { level: 11, above: 81.6 }, { level: 10, above: 73.44 }, { level: 9, above: 65.28 }, { level: 8, above: 57.12 }, { level: 7, above: 48.96 }, { level: 6, above: 40.8 }, { level: 5, above: 32.64 }, { level: 4, above: 24.48 }, { level: 3, above: 16.32 }, { level: 2, above: 8.16 }, { level: 1, above: 0 }],
      counts: { 15: 2575, 14: 6157, 13: 15142, 12: 17074, 11: 18823, 10: 17769, 9: 14670, 8: 11017, 7: 8056, 6: 5669, 5: 3064, 4: 1076, 3: 119, 2: 9, 1: 3, 0: 9 },
      total: 121232,
    },
    '自然': {
      levels: [{ level: 15, above: 115.78 }, { level: 14, above: 107.51 }, { level: 13, above: 99.24 }, { level: 12, above: 90.97 }, { level: 11, above: 82.7 }, { level: 10, above: 74.43 }, { level: 9, above: 66.16 }, { level: 8, above: 57.89 }, { level: 7, above: 49.62 }, { level: 6, above: 41.35 }, { level: 5, above: 33.08 }, { level: 4, above: 24.81 }, { level: 3, above: 16.54 }, { level: 2, above: 8.27 }, { level: 1, above: 0 }],
      counts: { 15: 4135, 14: 5623, 13: 6631, 12: 7317, 11: 7752, 10: 7892, 9: 8549, 8: 9539, 7: 11344, 6: 14026, 5: 14131, 4: 9064, 3: 2349, 2: 140, 1: 12, 0: 11 },
      total: 108515,
    },
  },
  109: {
    '國文': {
      levels: [{ level: 15, above: 76.58 }, { level: 14, above: 71.11 }, { level: 13, above: 65.64 }, { level: 12, above: 60.17 }, { level: 11, above: 54.7 }, { level: 10, above: 49.23 }, { level: 9, above: 43.76 }, { level: 8, above: 38.29 }, { level: 7, above: 32.82 }, { level: 6, above: 27.35 }, { level: 5, above: 21.88 }, { level: 4, above: 16.41 }, { level: 3, above: 10.94 }, { level: 2, above: 5.47 }, { level: 1, above: 0 }],
      counts: { 15: 4274, 14: 11069, 13: 19540, 12: 23182, 11: 21439, 10: 17564, 9: 11878, 8: 7769, 7: 5254, 6: 3627, 5: 2544, 4: 1771, 3: 1059, 2: 276, 1: 19, 0: 7 },
      total: 131272,
    },
    '英文': {
      levels: [{ level: 15, above: 88.9 }, { level: 14, above: 82.55 }, { level: 13, above: 76.2 }, { level: 12, above: 69.85 }, { level: 11, above: 63.5 }, { level: 10, above: 57.15 }, { level: 9, above: 50.8 }, { level: 8, above: 44.45 }, { level: 7, above: 38.1 }, { level: 6, above: 31.75 }, { level: 5, above: 25.4 }, { level: 4, above: 19.05 }, { level: 3, above: 12.7 }, { level: 2, above: 6.35 }, { level: 1, above: 0 }],
      counts: { 15: 6025, 14: 10439, 13: 12916, 12: 12129, 11: 11272, 10: 10580, 9: 9657, 8: 9164, 7: 8629, 6: 9088, 5: 10073, 4: 10314, 3: 9097, 2: 1626, 1: 41, 0: 4 },
      total: 131054,
    },
    '數學': {
      levels: [{ level: 15, above: 93.38 }, { level: 14, above: 86.71 }, { level: 13, above: 80.04 }, { level: 12, above: 73.37 }, { level: 11, above: 66.7 }, { level: 10, above: 60.03 }, { level: 9, above: 53.36 }, { level: 8, above: 46.69 }, { level: 7, above: 40.02 }, { level: 6, above: 33.35 }, { level: 5, above: 26.68 }, { level: 4, above: 20.01 }, { level: 3, above: 13.34 }, { level: 2, above: 6.67 }, { level: 1, above: 0 }],
      counts: { 15: 14489, 14: 11334, 13: 8828, 12: 8891, 11: 9098, 10: 8050, 9: 9400, 8: 9173, 7: 7804, 6: 9107, 5: 9116, 4: 8330, 3: 8928, 2: 5336, 1: 1147, 0: 56 },
      total: 129087,
    },
    '社會': {
      levels: [{ level: 15, above: 123.48 }, { level: 14, above: 114.66 }, { level: 13, above: 105.84 }, { level: 12, above: 97.02 }, { level: 11, above: 88.2 }, { level: 10, above: 79.38 }, { level: 9, above: 70.56 }, { level: 8, above: 61.74 }, { level: 7, above: 52.92 }, { level: 6, above: 44.1 }, { level: 5, above: 35.28 }, { level: 4, above: 26.46 }, { level: 3, above: 17.64 }, { level: 2, above: 8.82 }, { level: 1, above: 0 }],
      counts: { 15: 4206, 14: 7392, 13: 14018, 12: 13762, 11: 14660, 10: 17234, 9: 11813, 8: 11628, 7: 7078, 6: 5250, 5: 3423, 4: 564, 3: 58, 2: 8, 1: 7, 0: 0 },
      total: 111101,
    },
    '自然': {
      levels: [{ level: 15, above: 116.9 }, { level: 14, above: 108.55 }, { level: 13, above: 100.2 }, { level: 12, above: 91.85 }, { level: 11, above: 83.5 }, { level: 10, above: 75.15 }, { level: 9, above: 66.8 }, { level: 8, above: 58.45 }, { level: 7, above: 50.1 }, { level: 6, above: 41.75 }, { level: 5, above: 33.4 }, { level: 4, above: 25.05 }, { level: 3, above: 16.7 }, { level: 2, above: 8.35 }, { level: 1, above: 0 }],
      counts: { 15: 4313, 14: 5505, 13: 6874, 12: 7525, 11: 7699, 10: 7794, 9: 7305, 8: 7935, 7: 9495, 6: 12038, 5: 12947, 4: 8463, 3: 1989, 2: 129, 1: 3, 0: 9 },
      total: 100023,
    },
  },
  110: {
    '國文': {
      levels: [{ level: 15, above: 75.32 }, { level: 14, above: 69.94 }, { level: 13, above: 64.56 }, { level: 12, above: 59.18 }, { level: 11, above: 53.8 }, { level: 10, above: 48.42 }, { level: 9, above: 43.04 }, { level: 8, above: 37.66 }, { level: 7, above: 32.28 }, { level: 6, above: 26.9 }, { level: 5, above: 21.52 }, { level: 4, above: 16.14 }, { level: 3, above: 10.76 }, { level: 2, above: 5.38 }, { level: 1, above: 0 }],
      counts: { 15: 4064, 14: 10241, 13: 17091, 12: 21250, 11: 21015, 10: 18078, 9: 13073, 8: 8428, 7: 5248, 6: 3279, 5: 2110, 4: 1269, 3: 878, 2: 247, 1: 8, 0: 8 },
      total: 126287,
    },
    '英文': {
      levels: [{ level: 15, above: 87.22 }, { level: 14, above: 80.99 }, { level: 13, above: 74.76 }, { level: 12, above: 68.53 }, { level: 11, above: 62.3 }, { level: 10, above: 56.07 }, { level: 9, above: 49.84 }, { level: 8, above: 43.61 }, { level: 7, above: 37.38 }, { level: 6, above: 31.15 }, { level: 5, above: 24.92 }, { level: 4, above: 18.69 }, { level: 3, above: 12.46 }, { level: 2, above: 6.23 }, { level: 1, above: 0 }],
      counts: { 15: 4895, 14: 8232, 13: 9309, 12: 10199, 11: 10234, 10: 9804, 9: 9485, 8: 9116, 7: 9084, 6: 9654, 5: 11143, 4: 12489, 3: 10061, 2: 2214, 1: 66, 0: 10 },
      total: 125995,
    },
    '數學': {
      levels: [{ level: 15, above: 84.42 }, { level: 14, above: 78.39 }, { level: 13, above: 72.36 }, { level: 12, above: 66.33 }, { level: 11, above: 60.3 }, { level: 10, above: 54.27 }, { level: 9, above: 48.24 }, { level: 8, above: 42.21 }, { level: 7, above: 36.18 }, { level: 6, above: 30.15 }, { level: 5, above: 24.12 }, { level: 4, above: 18.09 }, { level: 3, above: 12.06 }, { level: 2, above: 6.03 }, { level: 1, above: 0 }],
      counts: { 15: 1558, 14: 1942, 13: 3110, 12: 4225, 11: 5662, 10: 7071, 9: 8730, 8: 10626, 7: 12580, 6: 14702, 5: 16149, 4: 15354, 3: 12551, 2: 7724, 1: 1758, 0: 44 },
      total: 123786,
    },
    '社會': {
      levels: [{ level: 15, above: 116.62 }, { level: 14, above: 108.29 }, { level: 13, above: 99.96 }, { level: 12, above: 91.63 }, { level: 11, above: 83.3 }, { level: 10, above: 74.97 }, { level: 9, above: 66.64 }, { level: 8, above: 58.31 }, { level: 7, above: 49.98 }, { level: 6, above: 41.65 }, { level: 5, above: 33.32 }, { level: 4, above: 24.99 }, { level: 3, above: 16.66 }, { level: 2, above: 8.33 }, { level: 1, above: 0 }],
      counts: { 15: 2600, 14: 5442, 13: 11877, 12: 12459, 11: 13969, 10: 14089, 9: 13048, 8: 11303, 7: 10784, 6: 5485, 5: 2932, 4: 774, 3: 105, 2: 8, 1: 2, 0: 12 },
      total: 104889,
    },
    '自然': {
      levels: [{ level: 15, above: 115.78 }, { level: 14, above: 107.51 }, { level: 13, above: 99.24 }, { level: 12, above: 90.97 }, { level: 11, above: 82.7 }, { level: 10, above: 74.43 }, { level: 9, above: 66.16 }, { level: 8, above: 57.89 }, { level: 7, above: 49.62 }, { level: 6, above: 41.35 }, { level: 5, above: 33.08 }, { level: 4, above: 24.81 }, { level: 3, above: 16.54 }, { level: 2, above: 8.27 }, { level: 1, above: 0 }],
      counts: { 15: 4062, 14: 5824, 13: 6393, 12: 7209, 11: 7594, 10: 7495, 9: 7828, 8: 8765, 7: 9499, 6: 11271, 5: 9950, 4: 6072, 3: 1560, 2: 97, 1: 10, 0: 10 },
      total: 93639,
    },
  },
}

/** 學測 83–110 各科試卷：滿分（含非選擇題）、考試時間（分鐘）、課綱 */
export const gsatOldInfo: Record<number, Record<string, { fullMarks: number, minutes: number, curriculum: string }>> = {
  83: {
    '國文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '社會': { fullMarks: 160, minutes: 100, curriculum: '72年課程標準' },
    '自然': { fullMarks: 138, minutes: 100, curriculum: '72年課程標準' },
  },
  84: {
    '國文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '社會': { fullMarks: 160, minutes: 100, curriculum: '72年課程標準' },
    '自然': { fullMarks: 134, minutes: 100, curriculum: '72年課程標準' },
  },
  85: {
    '國文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '社會': { fullMarks: 160, minutes: 100, curriculum: '72年課程標準' },
    '自然': { fullMarks: 130, minutes: 100, curriculum: '72年課程標準' },
  },
  86: {
    '國文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '社會': { fullMarks: 160, minutes: 100, curriculum: '72年課程標準' },
    '自然': { fullMarks: 132, minutes: 100, curriculum: '72年課程標準' },
  },
  87: {
    '國文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '社會': { fullMarks: 160, minutes: 100, curriculum: '72年課程標準' },
    '自然': { fullMarks: 136, minutes: 100, curriculum: '72年課程標準' },
  },
  88: {
    '國文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '社會': { fullMarks: 150, minutes: 100, curriculum: '72年課程標準' },
    '自然': { fullMarks: 132, minutes: 100, curriculum: '72年課程標準' },
  },
  89: {
    '國文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '社會': { fullMarks: 158, minutes: 100, curriculum: '72年課程標準' },
    '自然': { fullMarks: 132, minutes: 100, curriculum: '72年課程標準' },
  },
  90: {
    '國文': { fullMarks: 99, minutes: 100, curriculum: '72年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '72年課程標準' },
    '社會': { fullMarks: 150, minutes: 100, curriculum: '72年課程標準' },
    '自然': { fullMarks: 130, minutes: 100, curriculum: '72年課程標準' },
  },
  91: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '84年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '社會': { fullMarks: 132, minutes: 100, curriculum: '84年課程標準' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '84年課程標準' },
  },
  92: {
    '國文': { fullMarks: 102, minutes: 120, curriculum: '84年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '社會': { fullMarks: 132, minutes: 100, curriculum: '84年課程標準' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '84年課程標準' },
  },
  93: {
    '國文': { fullMarks: 102, minutes: 120, curriculum: '84年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '社會': { fullMarks: 132, minutes: 100, curriculum: '84年課程標準' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '84年課程標準' },
  },
  94: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '84年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '社會': { fullMarks: 132, minutes: 100, curriculum: '84年課程標準' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '84年課程標準' },
  },
  95: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '84年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '社會': { fullMarks: 132, minutes: 100, curriculum: '84年課程標準' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '84年課程標準' },
  },
  96: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '84年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '社會': { fullMarks: 132, minutes: 100, curriculum: '84年課程標準' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '84年課程標準' },
  },
  97: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '84年課程標準' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '84年課程標準' },
    '社會': { fullMarks: 132, minutes: 100, curriculum: '84年課程標準' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '84年課程標準' },
  },
  98: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '95暫綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '95暫綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '95暫綱' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '95暫綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '95暫綱' },
  },
  99: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '95暫綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '95暫綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '95暫綱' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '95暫綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '95暫綱' },
  },
  100: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '95暫綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '95暫綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '95暫綱' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '95暫綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '95暫綱' },
  },
  101: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '95暫綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '95暫綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '95暫綱' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '95暫綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '95暫綱' },
  },
  102: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '95暫綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '99課綱' },
  },
  103: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '95暫綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '99課綱' },
  },
  104: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '101課綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '99課綱' },
  },
  105: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '101課綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '99課綱' },
  },
  106: {
    '國文': { fullMarks: 108, minutes: 120, curriculum: '101課綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱微調' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '99課綱微調' },
  },
  107: {
    '國文': { fullMarks: 100, minutes: 80, curriculum: '101課綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱微調' },
    '社會': { fullMarks: 144, minutes: 100, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 100, curriculum: '99課綱微調' },
  },
  108: {
    '國文': { fullMarks: 100, minutes: 80, curriculum: '101課綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱微調' },
    '社會': { fullMarks: 144, minutes: 110, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 110, curriculum: '99課綱微調' },
  },
  109: {
    '國文': { fullMarks: 100, minutes: 80, curriculum: '101課綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱微調' },
    '社會': { fullMarks: 144, minutes: 110, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 110, curriculum: '99課綱微調' },
  },
  110: {
    '國文': { fullMarks: 100, minutes: 80, curriculum: '101課綱' },
    '英文': { fullMarks: 100, minutes: 100, curriculum: '99課綱' },
    '數學': { fullMarks: 100, minutes: 100, curriculum: '99課綱微調' },
    '社會': { fullMarks: 144, minutes: 110, curriculum: '99課綱' },
    '自然': { fullMarks: 128, minutes: 110, curriculum: '99課綱微調' },
  },
}
