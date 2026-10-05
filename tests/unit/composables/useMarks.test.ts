import { describe, it, expect } from 'vitest'
import { useMarks } from '~/composables/useMarks'
import type { InkStroke } from '~/types/quiz'

const stroke: InkStroke = { tool: 'pen', points: [[0.1, 10], [0.2, 20]] }

describe('useMarks', () => {
  it('useMarks_MarkText_ShouldStoreRangesPerField', () => {
    const marks = useMarks()

    marks.markText('q1:stem', { start: 0, end: 4 })

    expect(marks.highlights.value['q1:stem']).toEqual([{ start: 0, end: 4 }])
    expect(marks.highlights.value['q1:option:A']).toBeUndefined()
  })

  it('useMarks_MarkSameRangeTwice_ShouldKeepHighlight', () => {
    const marks = useMarks()

    marks.markText('q1:stem', { start: 0, end: 4 })
    marks.markText('q1:stem', { start: 0, end: 4 })

    expect(marks.highlights.value['q1:stem']).toEqual([{ start: 0, end: 4 }])
  })

  it('useMarks_EraseText_ShouldRemoveThatPart', () => {
    const marks = useMarks()
    marks.markText('q1:stem', { start: 0, end: 6 })

    marks.eraseText('q1:stem', { start: 2, end: 4 })

    expect(marks.highlights.value['q1:stem']).toEqual([{ start: 0, end: 2 }, { start: 4, end: 6 }])
  })

  it('useMarks_ToggleEliminate_ShouldCrossOutAndRestore', () => {
    const marks = useMarks()

    marks.toggleEliminate('q1', 'B')
    marks.toggleEliminate('q1', 'D')
    expect(marks.eliminated.value.q1).toEqual(['B', 'D'])

    marks.toggleEliminate('q1', 'B')
    expect(marks.eliminated.value.q1).toEqual(['D'])
  })

  it('useMarks_SetInk_ShouldKeepStrokesPerQuestion', () => {
    const marks = useMarks()

    marks.setInk('q1', [stroke])

    expect(marks.ink.value.q1).toEqual([stroke])
    expect(marks.ink.value.q2).toBeUndefined()
  })

  it('useMarks_ClearAll_ShouldRemoveEveryMark', () => {
    const marks = useMarks()
    marks.markText('q1:stem', { start: 0, end: 4 })
    marks.toggleEliminate('q1', 'B')
    marks.setInk('q1', [stroke])

    marks.clearAll()

    expect(marks.highlights.value).toEqual({})
    expect(marks.eliminated.value).toEqual({})
    expect(marks.ink.value).toEqual({})
  })
})
