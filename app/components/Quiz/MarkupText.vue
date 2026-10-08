<template>
  <span :class="$style['markup-text']">
    <template v-for="segment in segments" :key="segment.start">
      <mark v-if="segment.highlight" :data-start="segment.start" :class="$style['markup-text__mark']">
        <u v-if="segment.underline" :class="$style['markup-text__underline']">{{ segment.text }}</u>
        <span v-else-if="segment.blank" data-test="blank" :class="$style['markup-text__blank']">{{ segment.text }}</span>
        <template v-else>{{ segment.text }}</template>
      </mark>
      <u v-else-if="segment.underline" :data-start="segment.start" :class="$style['markup-text__underline']">
        {{ segment.text }}
      </u>
      <span
        v-else-if="segment.blank"
        data-test="blank"
        :data-start="segment.start"
        :class="$style['markup-text__blank']"
      >{{ segment.text }}</span>
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

// data-start 讓外層由螢幕座標換算字元位置（見 utils/caret.ts）
const segments = computed(() => buildSegments(props.text, props.ranges))
</script>

<style module lang="scss">
.markup-text {
  &__mark {
    background: linear-gradient(transparent 40%, var(--color-marker) 40%, var(--color-marker) 95%, transparent 95%);
    color: inherit;
  }

  // 填空線由全形「＿」組成，瀏覽器會在字和字之間換行，整條要放在同一行
  &__blank {
    white-space: nowrap;
  }

  &__underline {
    text-decoration-color: var(--color-ink);
    text-decoration-style: wavy;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.25em;
  }
}
</style>
