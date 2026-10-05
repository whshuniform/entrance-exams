<template>
  <span
    ref="root"
    :class="$style['markup-text']"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="cancelDrag"
    @click.capture="onClick"
  >
    <template v-for="segment in segments" :key="segment.start">
      <mark v-if="segment.highlight" :data-start="segment.start" :class="$style['markup-text__mark']">
        <u v-if="segment.underline" :class="$style['markup-text__underline']">{{ segment.text }}</u>
        <template v-else>{{ segment.text }}</template>
      </mark>
      <u v-else-if="segment.underline" :data-start="segment.start" :class="$style['markup-text__underline']">
        {{ segment.text }}
      </u>
      <span v-else :data-start="segment.start">{{ segment.text }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
import type { TextRange } from '~/types/quiz'

interface Props {
  text: string
  ranges?: TextRange[]
}

const props = withDefaults(defineProps<Props>(), {
  ranges: () => [],
})

/** 移動超過這個距離（px）才算拖曳畫線，否則當作點擊（例如點選項作答） */
const DRAG_THRESHOLD = 6

const emit = defineEmits<{
  (e: 'mark', range: TextRange): void
}>()

const root = ref<HTMLElement | null>(null)
const dragStart = ref<number | null>(null)
const dragEnd = ref<number | null>(null)
let downX = 0
let downY = 0
let dragging = false
let suppressClick = false

// 拖曳中即時預覽畫線結果
const segments = computed(() => {
  const preview = dragStart.value !== null && dragEnd.value !== null && dragStart.value !== dragEnd.value
    ? toggleRange(props.ranges, { start: dragStart.value, end: dragEnd.value })
    : props.ranges
  return buildSegments(props.text, preview)
})

type CaretDocument = Document & {
  caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node, offset: number } | null
  caretRangeFromPoint?: (x: number, y: number) => Range | null
}

/** 由螢幕座標找出在純文字中的字元位置 */
function offsetAt(x: number, y: number): number | null {
  const doc = document as CaretDocument
  let node: Node | null | undefined
  let offset = 0
  if (doc.caretPositionFromPoint) {
    const position = doc.caretPositionFromPoint(x, y)
    node = position?.offsetNode
    offset = position?.offset ?? 0
  } else if (doc.caretRangeFromPoint) {
    const range = doc.caretRangeFromPoint(x, y)
    node = range?.startContainer
    offset = range?.startOffset ?? 0
  }
  if (!node || !root.value?.contains(node)) return null

  const isText = node.nodeType === Node.TEXT_NODE
  const holder = (isText ? node.parentElement : (node as Element))?.closest('[data-start]')
  if (!holder || !root.value.contains(holder)) return null
  return Number(holder.getAttribute('data-start')) + (isText ? offset : 0)
}

function cancelDrag() {
  dragStart.value = null
  dragEnd.value = null
  dragging = false
}

function onPointerDown(event: PointerEvent) {
  if (event.pointerType === 'mouse' && event.button !== 0) return
  downX = event.clientX
  downY = event.clientY
  dragging = false
  dragStart.value = offsetAt(event.clientX, event.clientY)
  dragEnd.value = dragStart.value
}

function onPointerMove(event: PointerEvent) {
  if (dragStart.value === null) return
  if (!dragging) {
    if (Math.hypot(event.clientX - downX, event.clientY - downY) < DRAG_THRESHOLD) return
    dragging = true
    root.value?.setPointerCapture?.(event.pointerId)
  }
  dragEnd.value = offsetAt(event.clientX, event.clientY) ?? dragEnd.value
}

function onPointerUp(event: PointerEvent) {
  if (dragStart.value === null) return
  const start = dragStart.value
  const end = dragging ? offsetAt(event.clientX, event.clientY) ?? dragEnd.value ?? start : start
  const wasDragging = dragging
  cancelDrag()

  // 只是點一下：交給選項作答，不畫線
  if (!wasDragging || start === end) return
  suppressClick = true
  emit('mark', { start, end })
}

/** 拖曳畫線結束後瀏覽器仍會送出 click，擋下來避免順便選到選項 */
function onClick(event: MouseEvent) {
  if (!suppressClick) return
  suppressClick = false
  event.preventDefault()
  event.stopPropagation()
}
</script>

<style module lang="scss">
.markup-text {
  // 拖曳就是畫線，關掉瀏覽器原生選取；touch-action 對行內元素無效，由外層區塊設定 pan-y
  user-select: none;
  -webkit-user-select: none;

  &__mark {
    background: linear-gradient(transparent 40%, var(--color-marker) 40%, var(--color-marker) 95%, transparent 95%);
    color: inherit;
  }

  &__underline {
    text-decoration-color: var(--color-ink);
    text-decoration-style: wavy;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.25em;
  }
}
</style>
