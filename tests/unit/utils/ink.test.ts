import { describe, it, expect } from 'vitest'
import { inkStyle } from '~/utils/ink'

describe('inkStyle', () => {
  it('inkStyle_Pen_ShouldBeThinBallpointInk', () => {
    const style = inkStyle('pen')

    expect(style.width).toBeLessThan(4)
    expect(style.colorVar).toBe('--color-ballpoint')
    expect(style.composite).toBe('source-over')
  })

  it('inkStyle_Highlighter_ShouldBeWideAndKeepInkVisible', () => {
    const style = inkStyle('highlighter')

    expect(style.width).toBeGreaterThan(inkStyle('pen').width * 4)
    expect(style.colorVar).toBe('--color-marker')
    // 疊在原子筆上仍看得到筆跡
    expect(style.composite).toBe('multiply')
  })

  it('inkStyle_Eraser_ShouldCutOutInk', () => {
    const style = inkStyle('eraser')

    expect(style.width).toBeGreaterThan(inkStyle('highlighter').width)
    expect(style.composite).toBe('destination-out')
  })
})
