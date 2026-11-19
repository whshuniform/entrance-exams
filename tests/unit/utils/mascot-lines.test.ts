import { describe, it, expect } from 'vitest'
import { greeting, mascotLines, MASCOT_TIPS } from '~/utils/mascot-lines'

describe('greeting', () => {
  it.each([
    [5, '早安'],
    [10, '早安'],
    [11, '午安'],
    [13, '午安'],
    [14, '下午好'],
    [17, '下午好'],
    [18, '晚上好'],
    [22, '晚上好'],
  ])('greeting_Hour%i_ShouldSay%s', (hour, word) => {
    // Act & Assert
    expect(greeting(hour)).toContain(word)
  })

  it.each([23, 0, 4])('greeting_LateNightHour%i_ShouldRemindToSleep', (hour) => {
    // Act & Assert
    expect(greeting(hour)).toContain('早點睡')
  })
})

describe('mascotLines', () => {
  it('mascotLines_Default_ShouldStartWithGreetingThenTips', () => {
    // Act
    const lines = mascotLines(9)

    // Assert
    expect(lines[0]).toBe(greeting(9))
    expect(lines.slice(1)).toEqual(MASCOT_TIPS)
  })

  it('mascotLines_PageLines_ShouldComeRightAfterGreeting', () => {
    // Act
    const lines = mascotLines(9, ['先選一個考試吧！'])

    // Assert
    expect(lines.slice(0, 2)).toEqual([greeting(9), '先選一個考試吧！'])
    expect(lines.slice(2)).toEqual(MASCOT_TIPS)
  })

  it('MASCOT_TIPS_ShouldNotBeEmpty', () => {
    expect(MASCOT_TIPS.length).toBeGreaterThan(3)
  })
})
