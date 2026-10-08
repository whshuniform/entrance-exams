import type { QuizQuestion } from '~/types/quiz'

/**
 * 試作用題目：115 學年度學測國語文綜合能力測驗第 1、2、5、25、26 題。
 * 題目與答案出自大考中心公布之試題與選擇題答案（gsat/115/國綜）。
 */
export const sample115Chinese: QuizQuestion[] = [
  {
    id: '115-chinese-1',
    number: 1,
    type: 'single',
    stem: '下列各組「」內的字，讀音前後相同的是：',
    options: [
      { key: 'A', text: '取枕「攲」臥／風光「旖」旎' },
      { key: 'B', text: '略「諳」水性／「喑」啞難言' },
      { key: 'C', text: '「枇」杷甘美／「毗」鄰而居' },
      { key: 'D', text: '燎原莫「遏」／登門拜「謁」' },
    ],
    answer: 'C',
    points: 2,
  },
  {
    id: '115-chinese-2',
    number: 2,
    type: 'single',
    stem: '下列文句，完全沒有錯別字的是：',
    options: [
      { key: 'A', text: '詐騙行為絕不可姑息，方能以儆效尤' },
      { key: 'B', text: '人工智慧日新月異，影響力無遠弗界' },
      { key: 'C', text: '大伯退休後離群所居，仍常惦念老友' },
      { key: 'D', text: '老吳自詡滿腹經綸，卻昧於人情事故' },
    ],
    answer: 'A',
    points: 2,
  },
  {
    id: '115-chinese-5',
    number: 5,
    type: 'single',
    stem: '下列是一段古文，依據文意，甲、乙、丙、丁、戊排列順序最適當的是：',
    passage: [
      '夫三代之君，惟不忍鄙其民而欺之，',
      '甲、及其不可聽也',
      '乙、以觀其意之所嚮',
      '丙、而服其不然之心',
      '丁、故天下有故，而其議及於百姓',
      '戊、則又反覆而諭之，以窮極其說',
      '是以其民親而愛之。（蘇軾〈書論〉）',
    ],
    options: [
      { key: 'A', text: '乙丙丁戊甲' },
      { key: 'B', text: '丙丁戊甲乙' },
      { key: 'C', text: '丁乙甲戊丙' },
      { key: 'D', text: '戊丙甲乙丁' },
    ],
    answer: 'C',
    points: 2,
  },
  {
    id: '115-chinese-25',
    number: 25,
    type: 'multi',
    stem: '下列各組「」內的詞，意義前後相同的是：',
    options: [
      { key: 'A', text: '昔者，仲尼「與」於蜡賓／夫子喟然嘆曰，吾「與」點也' },
      { key: 'B', text: '今歲春雪甚盛，梅花「為」寒所勒／不者，若屬皆且「為」所虜' },
      { key: 'C', text: '以其無禮於晉，且貳「於」楚也／此非孟德之困「於」周郎者乎' },
      { key: 'D', text: '問今是何世，「乃」不知有漢／「乃」知真人之興也，非英雄所冀' },
      { key: 'E', text: '臣聞吏議逐客，「竊」以為過矣／「竊」慕管夫人之墨竹，紙上生風' },
    ],
    answer: 'BE',
    points: 4,
  },
  {
    id: '115-chinese-26',
    number: 26,
    type: 'multi',
    stem: '下列文句畫底線的詞語，運用適當的是：',
    options: [
      { key: 'A', text: '自古以來，官商__沆瀣一氣__，貪贓枉法之事層出不窮' },
      { key: 'B', text: '談判桌上務必謹言慎行，以免__授人以柄__而遭受意外損失' },
      { key: 'C', text: '老張一再競標失利，老闆裁示將他調離現職，__不次拔擢__' },
      { key: 'D', text: '籃球校隊屢嘗敗績，今年__秣馬厲兵__，誓言贏下比賽，一雪前恥' },
      { key: 'E', text: '王經理發現錯誤後，立即調整方向，__曲突徙薪__，有效解決問題' },
    ],
    answer: 'ABD',
    points: 4,
  },
]
