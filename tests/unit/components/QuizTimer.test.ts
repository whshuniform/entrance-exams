import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import QuizTimer from '~/components/Quiz/QuizTimer.vue'

describe('QuizTimer', () => {
  it('QuizTimer_Waiting_ShouldShowTimeLimitBeforeStart', async () => {
    const wrapper = await mountSuspended(QuizTimer, { props: { total: 5400, remaining: 5400, status: 'waiting' } })

    expect(wrapper.text()).toContain('限時 90 分鐘')
    expect(wrapper.attributes('data-state')).toBe('waiting')
  })

  it('QuizTimer_Running_ShouldShowRemainingClock', async () => {
    const wrapper = await mountSuspended(QuizTimer, { props: { total: 5400, remaining: 3599, status: 'running' } })

    expect(wrapper.find('[data-test="timer-clock"]').text()).toBe('59:59')
    expect(wrapper.attributes('role')).toBe('timer')
    expect(wrapper.attributes('data-state')).toBe('running')
  })

  it('QuizTimer_LastMinute_ShouldWarn', async () => {
    const wrapper = await mountSuspended(QuizTimer, { props: { total: 5400, remaining: 60, status: 'running' } })

    expect(wrapper.attributes('data-state')).toBe('warning')
  })

  it('QuizTimer_Expired_ShouldSayTimeUp', async () => {
    const wrapper = await mountSuspended(QuizTimer, { props: { total: 5400, remaining: 0, status: 'expired' } })

    expect(wrapper.text()).toContain('時間到')
    expect(wrapper.attributes('data-state')).toBe('expired')
  })

  it('QuizTimer_StoppedBySubmit_ShouldSayHandedIn', async () => {
    const wrapper = await mountSuspended(QuizTimer, { props: { total: 5400, remaining: 1234, status: 'stopped' } })

    expect(wrapper.text()).toContain('已交卷')
    expect(wrapper.attributes('data-state')).toBe('stopped')
  })
})
