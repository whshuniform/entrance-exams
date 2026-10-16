import type { CountdownStatus } from '~/types/quiz'

/** 每 0.25 秒對一次時鐘，畫面上的秒數才不會因為計時器延遲而跳秒 */
const TICK_MS = 250

/**
 * 作答倒數計時：start() 開始（再呼叫一次從頭開始）、stop() 提早交卷時停下、reset() 回到還沒開始。
 * 剩餘秒數以截止時刻和現在時間相減，分頁在背景被暫停也不會算錯。
 */
export function useCountdown(seconds: () => number, onExpire: () => void) {
  const remaining = ref(seconds())
  const status = ref<CountdownStatus>('waiting')
  let deadline = 0
  let handle: ReturnType<typeof setInterval> | undefined

  function clear() {
    if (handle !== undefined) clearInterval(handle)
    handle = undefined
  }

  function tick() {
    remaining.value = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
    if (remaining.value > 0) return
    clear()
    status.value = 'expired'
    onExpire()
  }

  function start() {
    clear()
    deadline = Date.now() + seconds() * 1000
    remaining.value = seconds()
    status.value = 'running'
    handle = setInterval(tick, TICK_MS)
  }

  function stop() {
    if (status.value !== 'running') return
    tick()
    if (status.value !== 'running') return
    clear()
    status.value = 'stopped'
  }

  function reset() {
    clear()
    remaining.value = seconds()
    status.value = 'waiting'
  }

  if (getCurrentScope()) onScopeDispose(clear)

  return { remaining, status, start, stop, reset }
}
