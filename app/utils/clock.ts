/** 倒數計時顯示成「分:秒」，例如 5400 秒 → 90:00；不足一秒進位 */
export function formatClock(seconds: number) {
  const total = Math.max(0, Math.ceil(seconds))
  const minutes = Math.floor(total / 60)
  return `${String(minutes).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}
