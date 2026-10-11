<template>
  <span :class="$style['markup-text']">
    <template v-for="segment in segments" :key="segment.start">
      <!-- 數學式：KaTeX 由自己的題目資料產生，不含使用者輸入 -->
      <span
        v-if="segment.math"
        data-test="math"
        :data-start="segment.start"
        data-atomic
        :class="[$style['markup-text__math'], segment.highlight && $style['markup-text__mark']]"
        v-html="renderMath(segment.text)"
      />
      <span
        v-else-if="segment.slot"
        data-test="slot"
        :data-start="segment.start"
        data-atomic
        :class="[$style['markup-text__slot'], segment.highlight && $style['markup-text__mark']]"
      >{{ segment.text }}</span>
      <mark v-else-if="segment.highlight" :data-start="segment.start" :class="$style['markup-text__mark']">
        <component
          :is="tagOf(segment)"
          :data-test="segment.blank ? 'blank' : undefined"
          :class="[segment.underline && $style['markup-text__underline'], segment.blank && $style['markup-text__blank']]"
        >{{ segment.text }}</component>
      </mark>
      <component
        :is="tagOf(segment)"
        v-else
        :data-test="segment.blank ? 'blank' : undefined"
        :data-start="segment.start"
        :class="[segment.underline && $style['markup-text__underline'], segment.blank && $style['markup-text__blank']]"
      >{{ segment.text }}</component>
    </template>
  </span>
</template>

<script setup lang="ts">
import katex from 'katex'
import type { HighlightSegment, TextRange } from '~/types/quiz'

interface Props {
  text: string
  ranges?: TextRange[]
}

const props = withDefaults(defineProps<Props>(), {
  ranges: () => [],
})

// data-start 讓外層由螢幕座標換算字元位置（見 utils/caret.ts）
const segments = computed(() => buildSegments(props.text, props.ranges))

function tagOf(segment: HighlightSegment) {
  if (segment.underline) return 'u'
  if (segment.bold) return 'strong'
  if (segment.italic) return 'em'
  return 'span'
}

function renderMath(tex: string) {
  return katex.renderToString(tex, { throwOnError: false, output: 'html' })
}
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

  // 文章裡的編號空格：底線上置中印題號，像原卷「＿16＿」
  &__slot {
    display: inline-block;
    min-width: 3.5em;
    padding: 0 0.25em;
    border-bottom: 1px solid var(--color-ink);
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
  }

  &__math {
    white-space: nowrap;
  }
}
</style>
