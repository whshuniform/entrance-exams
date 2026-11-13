import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { useToolbarVisible, TOOLBAR_STORAGE_KEY } from '~/composables/useToolbarVisible'

describe('useToolbarVisible', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('useToolbarVisible_FirstVisit_ShouldShowTools', () => {
    // Act
    const visible = useToolbarVisible()

    // Assert
    expect(visible.value).toBe(true)
  })

  it('useToolbarVisible_Hide_ShouldStayHiddenNextVisit', async () => {
    // Arrange
    const visible = useToolbarVisible()

    // Act
    visible.value = false
    await nextTick()

    // Assert
    expect(useToolbarVisible().value).toBe(false)
  })

  it('useToolbarVisible_ShowAgain_ShouldStayShownNextVisit', async () => {
    // Arrange
    localStorage.setItem(TOOLBAR_STORAGE_KEY, 'hidden')
    const visible = useToolbarVisible()

    // Act
    visible.value = true
    await nextTick()

    // Assert
    expect(useToolbarVisible().value).toBe(true)
  })

  it('useToolbarVisible_UnknownSavedValue_ShouldShowTools', () => {
    // Arrange
    localStorage.setItem(TOOLBAR_STORAGE_KEY, 'garbage')

    // Act & Assert
    expect(useToolbarVisible().value).toBe(true)
  })

  it('useToolbarVisible_StorageBlocked_ShouldStillToggle', async () => {
    // Arrange：無痕模式等讀寫都丟錯
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    const visible = useToolbarVisible()

    // Act
    visible.value = false
    await nextTick()

    // Assert
    expect(visible.value).toBe(false)
  })
})
