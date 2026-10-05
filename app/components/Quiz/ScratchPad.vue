<template>
  <div :class="$style['scratch-pad']">
    <div :class="$style['scratch-pad__tools']">
      <Button
        data-test="scratch-pen"
        label="鉛筆"
        size="small"
        :outlined="tool !== 'pen'"
        :aria-pressed="tool === 'pen' ? 'true' : 'false'"
        @click="tool = 'pen'"
      />
      <Button
        data-test="scratch-eraser"
        label="橡皮擦"
        size="small"
        :outlined="tool !== 'eraser'"
        :aria-pressed="tool === 'eraser' ? 'true' : 'false'"
        @click="tool = 'eraser'"
      />
      <Button
        data-test="scratch-clear"
        label="全部擦掉"
        size="small"
        severity="secondary"
        text
        @click="emit('update:strokes', [])"
      />
    </div>
    <canvas
      ref="canvas"
      :class="$style['scratch-pad__canvas']"
      :style="{ height: `${CANVAS_HEIGHT}px` }"
      aria-label="計算紙"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    />
  </div>
</template>

<script setup lang="ts">
import type { ScratchStroke, ScratchTool } from '~/types/quiz'

interface Props {
  strokes: ScratchStroke[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:strokes', value: ScratchStroke[]): void
}>()

const CANVAS_HEIGHT = 260

const canvas = ref<HTMLCanvasElement | null>(null)
const tool = ref<ScratchTool>('pen')
let current: ScratchStroke | null = null
let resizeObserver: ResizeObserver | null = null

function context() {
  return canvas.value?.getContext('2d') ?? null
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: ScratchStroke, width: number) {
  const [first, ...rest] = stroke.points
  if (!first) return
  ctx.save()
  ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over'
  ctx.strokeStyle = getComputedStyle(canvas.value!).color
  ctx.lineWidth = stroke.tool === 'eraser' ? 18 : 2.2
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(first[0] * width, first[1])
  for (const [x, y] of rest.length ? rest : [first]) ctx.lineTo(x * width, y)
  ctx.stroke()
  ctx.restore()
}

function redraw() {
  const el = canvas.value
  const ctx = context()
  if (!el || !ctx) return
  const ratio = window.devicePixelRatio || 1
  const width = el.clientWidth
  el.width = Math.round(width * ratio)
  el.height = Math.round(CANVAS_HEIGHT * ratio)
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  for (const stroke of props.strokes) drawStroke(ctx, stroke, width)
}

function pointFrom(event: PointerEvent): [number, number] {
  const rect = canvas.value!.getBoundingClientRect()
  return [(event.clientX - rect.left) / rect.width, event.clientY - rect.top]
}

function onPointerDown(event: PointerEvent) {
  if (event.pointerType === 'mouse' && event.button !== 0) return
  canvas.value?.setPointerCapture?.(event.pointerId)
  current = { tool: tool.value, points: [pointFrom(event)] }
}

function onPointerMove(event: PointerEvent) {
  const ctx = context()
  if (!current || !ctx || !canvas.value) return
  const last = current.points.at(-1)!
  const next = pointFrom(event)
  current.points.push(next)
  drawStroke(ctx, { tool: current.tool, points: [last, next] }, canvas.value.clientWidth)
}

function onPointerUp() {
  if (!current) return
  emit('update:strokes', [...props.strokes, current])
  current = null
}

watch(() => props.strokes, redraw)

onMounted(() => {
  redraw()
  if (typeof ResizeObserver !== 'undefined' && canvas.value) {
    resizeObserver = new ResizeObserver(() => redraw())
    resizeObserver.observe(canvas.value)
  }
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.scratch-pad {
  margin-top: 0.75rem;

  &__tools {
    margin-bottom: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__canvas {
    width: 100%;
    display: block;

    @include sketch-border(1.5px, true);

    // 方格計算紙
    background-color: var(--color-card);
    background-image:
      linear-gradient(var(--color-paper-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-paper-line) 1px, transparent 1px);
    background-size: 1.25rem 1.25rem;
    color: var(--color-ink);
    cursor: crosshair;
    touch-action: none;
  }
}
</style>
