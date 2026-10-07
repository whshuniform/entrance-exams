import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCountdown } from '~/composables/useCountdown'

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('useCountdown_BeforeStart_ShouldWaitWithFullTime', () => {
    const timer = useCountdown(() => 90, vi.fn())

    vi.advanceTimersByTime(10_000)

    expect(timer.remaining.value).toBe(90)
    expect(timer.status.value).toBe('waiting')
  })

  it('useCountdown_Start_ShouldCountDownEachSecond', () => {
    const timer = useCountdown(() => 90, vi.fn())

    timer.start()
    vi.advanceTimersByTime(30_000)

    expect(timer.remaining.value).toBe(60)
    expect(timer.status.value).toBe('running')
  })

  it('useCountdown_TimeUp_ShouldExpireAndCallBackOnce', () => {
    const onExpire = vi.fn()
    const timer = useCountdown(() => 90, onExpire)

    timer.start()
    vi.advanceTimersByTime(90_000)
    vi.advanceTimersByTime(10_000)

    expect(timer.remaining.value).toBe(0)
    expect(timer.status.value).toBe('expired')
    expect(onExpire).toHaveBeenCalledTimes(1)
  })

  it('useCountdown_Stop_ShouldFreezeRemainingAndNeverExpire', () => {
    const onExpire = vi.fn()
    const timer = useCountdown(() => 90, onExpire)

    timer.start()
    vi.advanceTimersByTime(20_000)
    timer.stop()
    vi.advanceTimersByTime(120_000)

    expect(timer.remaining.value).toBe(70)
    expect(timer.status.value).toBe('stopped')
    expect(onExpire).not.toHaveBeenCalled()
  })

  it('useCountdown_StartAgain_ShouldRestartFromFullTime', () => {
    const timer = useCountdown(() => 90, vi.fn())

    timer.start()
    vi.advanceTimersByTime(90_000)
    timer.start()
    vi.advanceTimersByTime(1_000)

    expect(timer.remaining.value).toBe(89)
    expect(timer.status.value).toBe('running')
  })

  it('useCountdown_Reset_ShouldWaitAgainWithFullTime', () => {
    const timer = useCountdown(() => 90, vi.fn())

    timer.start()
    vi.advanceTimersByTime(5_000)
    timer.reset()

    expect(timer.remaining.value).toBe(90)
    expect(timer.status.value).toBe('waiting')
  })
})
