import type { DrawTool, InkStroke, InkTool, TextRange } from '~/types/quiz'

interface Options {
  card: Ref<HTMLElement | null>
  canvas: Ref<HTMLCanvasElement | null>
  tool: () => DrawTool
  strokes: () => InkStroke[]
  hasHighlights: (fieldId: string) => boolean
  onStrokes: (strokes: InkStroke[]) => void
  onMark: (fieldId: string, range: TextRange) => void
  onErase: (fieldId: string, range: TextRange) => void
}

export interface TextPreview {
  fieldId: string
  range: TextRange
}

/** 橡皮擦擦螢光筆時，左右各取樣多遠（px），約為橡皮擦寬度的一半 */
const ERASE_REACH = 10
/** 兩次取樣在同一行內（垂直差距小於此 px）才把中間經過的字一起擦掉 */
const SAME_LINE = 8

/**
 * 題目卡片上的手寫：螢光筆在字上會對齊文字畫線，其他地方和原子筆、橡皮擦一樣是手寫筆跡。
 * 開啟繪畫時一指寫字，兩指上下滑動捲動頁面。
 */
export function useCardDrawing(options: Options) {
  const preview = ref<TextPreview | null>(null)
  let current: InkStroke | null = null
  let textDrag: { fieldId: string, el: Element, start: number } | null = null
  let lastErase: { fieldId: string, offset: number, y: number } | null = null
  let frame = 0
  let resizeObserver: ResizeObserver | null = null

  const touches = new Map<number, number>()
  let scrolling = false
  let lastAverageY = 0

  function isDrawing() {
    return options.tool() !== 'off'
  }

  function averageY() {
    const ys = [...touches.values()]
    return ys.reduce((sum, y) => sum + y, 0) / ys.length
  }

  /** 螢幕座標 → 卡片內座標（扣掉卡片手繪風的微旋轉）；x 以寬度比例表示 */
  function toLocal(x: number, y: number): [number, number] {
    const card = options.card.value!
    const rect = card.getBoundingClientRect()
    const transform = getComputedStyle(card).transform
    const matrix = transform && transform !== 'none' ? new DOMMatrix(transform) : new DOMMatrix()
    const point = matrix.inverse().transformPoint(
      new DOMPoint(x - (rect.left + rect.width / 2), y - (rect.top + rect.height / 2)),
    )
    const localX = point.x + card.offsetWidth / 2 - card.clientLeft
    const localY = point.y + card.offsetHeight / 2 - card.clientTop
    return [localX / card.clientWidth, localY]
  }

  function colorOf(cssVar: string) {
    const card = options.card.value
    return (card && getComputedStyle(card).getPropertyValue(cssVar).trim()) || '#22365c'
  }

  function redraw() {
    const el = options.canvas.value
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const ratio = window.devicePixelRatio || 1
    const width = el.clientWidth
    const height = el.clientHeight
    el.width = Math.round(width * ratio)
    el.height = Math.round(height * ratio)
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    const strokes = current ? [...options.strokes(), current] : options.strokes()
    for (const stroke of strokes) drawInkStroke(ctx, stroke, width, colorOf)
  }

  function scheduleRedraw() {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      redraw()
    })
  }

  function fieldAt(target: Element | null) {
    const field = target?.closest('[data-field]')
    return field && options.card.value?.contains(field) ? field : null
  }

  /** 橡皮擦經過字上：把那幾個字的螢光筆擦掉 */
  function eraseTextAt(x: number, y: number) {
    const field = fieldAt(document.elementFromPoint(x, y))
    const fieldId = field?.getAttribute('data-field')
    if (!field || !fieldId || !options.hasHighlights(fieldId)) {
      lastErase = null
      return
    }
    const samples = [x - ERASE_REACH, x, x + ERASE_REACH]
      .map(px => textOffsetAt(field, px, y))
      .filter((offset): offset is number => offset !== null)
    if (!samples.length) return
    // 同一行上一次取樣到這次之間經過的字也要擦（移動太快時事件之間會跳過幾個字）
    const reach = lastErase?.fieldId === fieldId && Math.abs(lastErase.y - y) < SAME_LINE
      ? [...samples, lastErase.offset]
      : samples
    lastErase = { fieldId, offset: samples[Math.floor(samples.length / 2)]!, y }
    const start = Math.min(...reach)
    const end = Math.max(...reach)
    if (start !== end) options.onErase(fieldId, { start, end })
  }

  function startScroll() {
    current = null
    textDrag = null
    preview.value = null
    scrolling = true
    lastAverageY = averageY()
    scheduleRedraw()
  }

  function onPointerDown(event: PointerEvent) {
    if (!isDrawing()) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const target = event.target as Element
    // 選項旁的 ✕、計算紙按鈕照常可以按
    if (target.closest('button')) return

    if (event.pointerType === 'touch') {
      touches.set(event.pointerId, event.clientY)
      if (touches.size >= 2) {
        // 第二根手指放下：取消第一根手指剛開始的筆畫，改成捲動
        startScroll()
        return
      }
    }
    if (scrolling) return
    event.preventDefault()
    options.card.value?.setPointerCapture?.(event.pointerId)

    const tool = options.tool() as InkTool
    if (tool === 'highlighter') {
      const field = fieldAt(target)
      const start = field ? textOffsetAt(field, event.clientX, event.clientY) : null
      if (field && start !== null) {
        textDrag = { fieldId: field.getAttribute('data-field')!, el: field, start }
        return
      }
    }
    current = { tool, points: [toLocal(event.clientX, event.clientY)] }
    if (tool === 'eraser') {
      lastErase = null
      eraseTextAt(event.clientX, event.clientY)
    }
    scheduleRedraw()
  }

  function onPointerMove(event: PointerEvent) {
    if (touches.has(event.pointerId)) touches.set(event.pointerId, event.clientY)
    if (scrolling) {
      const y = averageY()
      window.scrollBy(0, lastAverageY - y)
      lastAverageY = y
      return
    }
    if (textDrag) {
      const end = textOffsetAt(textDrag.el, event.clientX, event.clientY)
      if (end !== null) preview.value = { fieldId: textDrag.fieldId, range: { start: textDrag.start, end } }
      return
    }
    if (!current) return
    current.points.push(toLocal(event.clientX, event.clientY))
    if (current.tool === 'eraser') eraseTextAt(event.clientX, event.clientY)
    scheduleRedraw()
  }

  function onPointerUp(event: PointerEvent) {
    touches.delete(event.pointerId)
    if (scrolling) {
      if (touches.size === 0) scrolling = false
      else lastAverageY = averageY()
      return
    }
    if (textDrag) {
      const range = preview.value?.range
      if (range && range.start !== range.end) options.onMark(textDrag.fieldId, range)
      textDrag = null
      preview.value = null
      return
    }
    if (!current) return
    const stroke = current
    current = null
    // 沒有筆跡時，橡皮擦的軌跡不用留
    if (stroke.tool === 'eraser' && !options.strokes().length) return scheduleRedraw()
    options.onStrokes([...options.strokes(), stroke])
  }

  function onPointerCancel(event: PointerEvent) {
    touches.delete(event.pointerId)
    if (touches.size === 0) scrolling = false
    current = null
    textDrag = null
    preview.value = null
    scheduleRedraw()
  }

  /** 開啟繪畫時點到選項不作答（瀏覽器在拖曳後仍會送出 click） */
  function onClickCapture(event: MouseEvent) {
    if (!isDrawing()) return
    if ((event.target as Element).closest('button')) return
    event.preventDefault()
    event.stopPropagation()
  }

  watch(options.strokes, scheduleRedraw)

  onMounted(() => {
    redraw()
    if (typeof ResizeObserver !== 'undefined' && options.card.value) {
      resizeObserver = new ResizeObserver(() => redraw())
      resizeObserver.observe(options.card.value)
    }
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    if (frame) cancelAnimationFrame(frame)
  })

  return { preview, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onClickCapture }
}
