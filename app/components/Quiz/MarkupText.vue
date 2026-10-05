<template>
  <span
    ref="root"
    :class="[$style['markup-text'], props.penMode && $style['markup-text--pen']]"
    :data-pen="props.penMode ? 'true' : undefined"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="dragStart = null"
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
  penMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ranges: () => [],
  penMode: false,
})

const emit = defineEmits<{
  (e: 'mark', range: TextRange): void
}>()

const root = ref<HTMLElement | null>(null)
const dragStart = ref<number | null>(null)
const dragEnd = ref<number | null>(null)

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

function onPointerDown(event: PointerEvent) {
  if (!props.penMode || event.button !== 0) return
  event.preventDefault()
  dragStart.value = offsetAt(event.clientX, event.clientY)
  dragEnd.value = dragStart.value
  root.value?.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (dragStart.value === null) return
  dragEnd.value = offsetAt(event.clientX, event.clientY) ?? dragEnd.value
}

function onPointerUp(event: PointerEvent) {
  if (dragStart.value === null) return
  const start = dragStart.value
  const end = offsetAt(event.clientX, event.clientY) ?? dragEnd.value ?? start
  dragStart.value = null
  dragEnd.value = null

  if (start !== end) {
    emit('mark', { start, end })
    return
  }
  // 點一下已畫線處 = 擦掉那一段
  const hit = props.ranges.find(r => r.start <= start && start < r.end)
  if (hit) emit('mark', hit)
}
</script>

<style module lang="scss">
.markup-text {
  // touch-action 對行內元素無效，由外層區塊（題幹、選項）設定 pan-y
  &--pen {
    cursor: crosshair;
    user-select: none;
    -webkit-user-select: none;
  }

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
