import { describe, it, expect } from 'vitest'
import { useMarks } from '~/composables/useMarks'

describe('useMarks', () => {
  it('useMarks_MarkText_ShouldStoreRangesPerField', () => {
    const marks = useMarks()

    marks.markText('q1:stem', { start: 0, end: 4 })

    expect(marks.highlights.value['q1:stem']).toEqual([{ start: 0, end: 4 }])
    expect(marks.highlights.value['q1:option:A']).toBeUndefined()
  })

  it('useMarks_MarkSameRangeTwice_ShouldErase', () => {
    const marks = useMarks()

    marks.markText('q1:stem', { start: 0, end: 4 })
    marks.markText('q1:stem', { start: 0, end: 4 })

    expect(marks.highlights.value['q1:stem']).toEqual([])
  })

  it('useMarks_ToggleEliminate_ShouldCrossOutAndRestore', () => {
    const marks = useMarks()

    marks.toggleEliminate('q1', 'B')
    marks.toggleEliminate('q1', 'D')
    expect(marks.eliminated.value.q1).toEqual(['B', 'D'])

    marks.toggleEliminate('q1', 'B')
    expect(marks.eliminated.value.q1).toEqual(['D'])
  })

  it('useMarks_SetScratch_ShouldKeepStrokesPerQuestion', () => {
    const marks = useMarks()
    const strokes = [{ tool: 'pen' as const, points: [[0.1, 10], [0.2, 20]] as [number, number][] }]

    marks.setScratch('q1', strokes)

    expect(marks.scratch.value.q1).toEqual(strokes)
  })

  it('useMarks_ClearAll_ShouldRemoveEveryMark', () => {
    const marks = useMarks()
    marks.markText('q1:stem', { start: 0, end: 4 })
    marks.toggleEliminate('q1', 'B')
    marks.setScratch('q1', [{ tool: 'pen', points: [[0, 0]] }])

    marks.clearAll()

    expect(marks.highlights.value).toEqual({})
    expect(marks.eliminated.value).toEqual({})
    expect(marks.scratch.value).toEqual({})
  })
})
