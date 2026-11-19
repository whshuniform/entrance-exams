import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { useMascotVisible, MASCOT_STORAGE_KEY } from '~/composables/useMascotVisible'

describe('useMascotVisible', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('useMascotVisible_FirstVisit_ShouldShowMascot', () => {
    // Act
    const visible = useMascotVisible()
    visible.load()

    // Assert
    expect(visible.value.value).toBe(true)
  })

  it('useMascotVisible_Hide_ShouldStayHiddenNextVisit', async () => {
    // Arrange
    const visible = useMascotVisible()
    visible.load()

    // Act
    visible.value.value = false
    await nextTick()

    // Assert
    const again = useMascotVisible()
    again.load()
    expect(again.value.value).toBe(false)
  })

  it('useMascotVisible_ShowAgain_ShouldStayShownNextVisit', async () => {
    // Arrange
    localStorage.setItem(MASCOT_STORAGE_KEY, 'hidden')
    const visible = useMascotVisible()
    visible.load()

    // Act
    visible.value.value = true
    await nextTick()

    // Assert
    const again = useMascotVisible()
    again.load()
    expect(again.value.value).toBe(true)
  })

  it('useMascotVisible_StorageBlocked_ShouldStillToggle', async () => {
    // Arrange：無痕模式等讀寫都丟錯
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    const visible = useMascotVisible()
    visible.load()

    // Act
    visible.value.value = false
    await nextTick()

    // Assert
    expect(visible.value.value).toBe(false)
  })
})
