import { describe, it, expect } from 'vitest'
import { inkStyle, PEN_COLORS } from '~/utils/ink'

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

  it('inkStyle_PenWithColor_ShouldUseThatInk', () => {
    expect(inkStyle('pen', 'red').colorVar).toBe('--color-pen-red')
    expect(inkStyle('pen', 'black').colorVar).toBe('--color-pen-black')
    expect(inkStyle('pen', 'green').colorVar).toBe('--color-pen-green')
    expect(inkStyle('pen', 'blue').colorVar).toBe('--color-ballpoint')
  })

  it('inkStyle_HighlighterWithColor_ShouldIgnorePenColor', () => {
    expect(inkStyle('highlighter', 'red').colorVar).toBe('--color-marker')
  })

  it('PEN_COLORS_ShouldOfferBlueRedBlackGreenWithBlueFirst', () => {
    expect(PEN_COLORS.map(color => [color.value, color.label])).toEqual([
      ['blue', '藍'], ['red', '紅'], ['black', '黑'], ['green', '綠'],
    ])
  })
})
