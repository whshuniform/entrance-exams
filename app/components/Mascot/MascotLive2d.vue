<template>
  <canvas ref="canvas" :class="$style['mascot-live2d']" aria-hidden="true" />
</template>

<script setup lang="ts">
import type { Live2dStatus } from '~/composables/useLive2dMascot'

const emit = defineEmits<{ status: [Live2dStatus] }>()

const canvas = ref<HTMLCanvasElement | null>(null)
const { status, tap } = useLive2dMascot(canvas)
watch(status, value => emit('status', value), { immediate: true })

defineExpose({ tap })
</script>

<style module lang="scss">
// 畫布大小由外層決定，Live2D 依畫布大小縮放
.mascot-live2d {
  width: 100%;
  height: 100%;

  display: block;
}
</style>
