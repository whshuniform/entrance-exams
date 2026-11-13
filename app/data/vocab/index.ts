import type { VocabExam, VocabWord } from '~/types/vocab'
import gsatWords from './gsat.json'
import capWords from './cap.json'

/**
 * 必背單字表：
 * - 學測：大考中心《高中英文參考詞彙表（111學年度起適用）》第 1–6 級（非營利使用，須註明出處）
 * - 會考：108 課綱英語文附錄五表一基本 1,200 字（會考英語命題以此為準）
 * 分科測驗 111 年起沒有英文科，所以沒有字表。
 * 考試日期：116 學測 2027-01-22 起（大考中心簡章）；116 會考尚未公布，先填五月第三個週六。
 */
export const vocabExams: VocabExam[] = [
  {
    id: 'gsat',
    name: '大學學測',
    source: '大學入學考試中心《高中英文參考詞彙表（111學年度起適用）》',
    examDate: '2027-01-22',
    levels: [1, 2, 3, 4, 5, 6],
    words: gsatWords as VocabWord[],
  },
  {
    id: 'cap',
    name: '國中會考',
    source: '教育部《十二年國教課綱英語文領域》附錄五 基本 1,200 字',
    examDate: '2027-05-15',
    levels: [],
    words: capWords as VocabWord[],
  },
]
