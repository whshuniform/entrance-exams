export const MASCOT_STORAGE_KEY = 'mascot:v1'

function read(): boolean {
  try {
    return localStorage.getItem(MASCOT_STORAGE_KEY) !== 'hidden'
  } catch {
    return true
  }
}

function save(visible: boolean) {
  try {
    localStorage.setItem(MASCOT_STORAGE_KEY, visible ? 'shown' : 'hidden')
  } catch {
    // 無痕模式或空間不足時不存，畫面照常可用
  }
}

/**
 * 看板娘要不要出現，記在瀏覽器裡：按「收起」後下次開網頁仍收起。
 * 首頁是預先產生的靜態頁，要等掛載後再 load()，免得伺服器與瀏覽器畫的不一樣。
 */
export function useMascotVisible() {
  const value = ref(true)
  const load = () => {
    value.value = read()
  }
  // sync：load() 後馬上改回原值也要存到
  watch(value, save, { flush: 'sync' })
  return { value, load }
}
