import { describe, it, expect } from 'vitest'
import { usePaging } from '~/composables/usePaging'

describe('usePaging', () => {
  it('usePaging_Start_ShouldBeOnFirstPage', () => {
    const paging = usePaging(() => 3)

    expect(paging.index.value).toBe(0)
    expect(paging.isFirst.value).toBe(true)
    expect(paging.isLast.value).toBe(false)
  })

  it('usePaging_NextAndPrev_ShouldFlipAndRememberDirection', () => {
    const paging = usePaging(() => 3)

    paging.next()
    expect(paging.index.value).toBe(1)
    expect(paging.direction.value).toBe('next')

    paging.prev()
    expect(paging.index.value).toBe(0)
    expect(paging.direction.value).toBe('prev')
  })

  it('usePaging_AtEdges_ShouldNotGoPastFirstOrLast', () => {
    const paging = usePaging(() => 2)

    paging.prev()
    expect(paging.index.value).toBe(0)

    paging.next()
    paging.next()
    expect(paging.index.value).toBe(1)
    expect(paging.isLast.value).toBe(true)
  })

  it('usePaging_GoTo_ShouldJumpAndSetDirection', () => {
    const paging = usePaging(() => 5)

    paging.goTo(3)
    expect(paging.index.value).toBe(3)
    expect(paging.direction.value).toBe('next')

    paging.goTo(0)
    expect(paging.direction.value).toBe('prev')
  })
})
