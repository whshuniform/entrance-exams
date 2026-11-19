/** 看板娘小墨點一下換一句的鼓勵與小提醒 */
export const MASCOT_TIPS: readonly string[] = [
  '寫錯的題目才是寶藏，交卷後記得看詳解喔！',
  '背單字一天一點點就好，持之以恆最厲害～',
  '寫累了就喝口水，伸個懶腰再繼續！',
  '刪去法用原子筆劃掉不可能的選項，很好用喔。',
  '計時作答可以練習時間分配，試試看吧！',
  '相信自己，你比想像中更厲害！',
]

/** 依時段打招呼；半夜提醒早點睡 */
export function greeting(hour: number): string {
  if (hour >= 5 && hour <= 10) return '早安！今天也一起加油吧～'
  if (hour >= 11 && hour <= 13) return '午安！吃飽了再來寫一題？'
  if (hour >= 14 && hour <= 17) return '下午好～來份考古題提提神！'
  if (hour >= 18 && hour <= 22) return '晚上好，今天練習了嗎？'
  return '很晚了，寫完這題記得早點睡喔！'
}

/** 小墨要說的話：先打招呼，接著是這一頁專屬的話，再來是共用的小提醒 */
export function mascotLines(hour: number, pageLines: readonly string[] = []): string[] {
  return [greeting(hour), ...pageLines, ...MASCOT_TIPS]
}
