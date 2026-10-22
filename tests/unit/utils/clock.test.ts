import { describe, it, expect } from 'vitest'
import { formatClock } from '~/utils/clock'

describe('formatClock', () => {
  it('formatClock_ShouldShowMinutesAndSecondsWithTwoDigits', () => {
    expect(formatClock(5400)).toBe('90:00')
    expect(formatClock(3725)).toBe('62:05')
    expect(formatClock(59)).toBe('00:59')
    expect(formatClock(0)).toBe('00:00')
  })

  it('formatClock_NegativeOrFraction_ShouldRoundUpAndStopAtZero', () => {
    expect(formatClock(-3)).toBe('00:00')
    expect(formatClock(59.2)).toBe('01:00')
  })
})
