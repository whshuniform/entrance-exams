export const TOOLBAR_STORAGE_KEY = 'quiz-toolbar:v1'

function load(): boolean {
  try {
    return localStorage.getItem(TOOLBAR_STORAGE_KEY) !== 'hidden'
  } catch {
    return true
  }
}

function save(visible: boolean) {
  try {
    localStorage.setItem(TOOLBAR_STORAGE_KEY, visible ? 'shown' : 'hidden')
  } catch {
    // 無痕模式或空間不足時不存，畫面照常可用
  }
}

/**
 * 作答頁右下角繪畫工具列顯示與否，記在瀏覽器裡：
 * 使用者按「隱藏工具」後，下次開網頁仍是隱藏。
 * 作答頁只在瀏覽器畫（routeRules ssr:false），一開始就讀得到，不會先顯示再收起來。
 */
export function useToolbarVisible() {
  const visible = ref(typeof localStorage === 'undefined' ? true : load())
  watch(visible, save)
  return visible
}
