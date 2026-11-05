/** 往上找第一個不是行內的外框，回傳它扣掉左右內距的寬度（px） */
function availableWidth(math: HTMLElement) {
  let box = math.parentElement
  while (box && getComputedStyle(box).display.startsWith('inline')) box = box.parentElement
  if (!box) return 0
  const style = getComputedStyle(box)
  return box.clientWidth - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight)
}

/**
 * 拆不開的長公式（例如分子分母是一長串中文的分式）在手機上放不下時縮小；縮到下限還放不下就讓它自己左右滑。
 * 量寬度用 offsetWidth：跳出視窗的放大動畫（transform）不影響。字型載入、轉螢幕後重新量。
 */
export function useFormulaFit(root: Ref<HTMLElement | null>, scrollClass: () => string | undefined, source: () => unknown) {
  function fit() {
    const maths = root.value?.querySelectorAll<HTMLElement>('[data-test="math"]') ?? []
    const scroll = scrollClass()
    for (const math of maths) {
      math.style.fontSize = ''
      if (scroll) math.classList.remove(scroll)
      const widest = Math.max(0, ...Array.from(math.querySelectorAll<HTMLElement>('.base'), base => base.offsetWidth))
      const result = formulaFit(widest, availableWidth(math))
      if (result.scale < 1) math.style.fontSize = `${result.scale}em`
      if (result.scroll && scroll) math.classList.add(scroll)
    }
  }

  onMounted(() => {
    fit()
    document.fonts?.ready.then(fit)
    window.addEventListener('resize', fit)
  })
  onBeforeUnmount(() => window.removeEventListener('resize', fit))
  watch(source, () => nextTick(fit))
}
