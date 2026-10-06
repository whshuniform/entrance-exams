export type FlipDirection = 'next' | 'prev'

/** 試卷翻頁：目前第幾頁、往前或往後翻（決定翻頁動畫方向） */
export function usePaging(count: () => number) {
  const index = ref(0)
  const direction = ref<FlipDirection>('next')

  const isFirst = computed(() => index.value === 0)
  const isLast = computed(() => index.value >= count() - 1)

  function goTo(target: number) {
    const next = Math.min(Math.max(target, 0), Math.max(count() - 1, 0))
    if (next === index.value) return
    direction.value = next > index.value ? 'next' : 'prev'
    index.value = next
  }

  function next() {
    goTo(index.value + 1)
  }

  function prev() {
    goTo(index.value - 1)
  }

  return { index, direction, isFirst, isLast, goTo, next, prev }
}
