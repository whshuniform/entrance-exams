<template>
  <span
    data-test="level-stars"
    role="img"
    :data-level="level"
    :aria-label="label"
    :title="label"
    :class="$style['level-stars']"
  >
    <svg
      v-for="n in count"
      :key="n"
      data-test="level-star"
      :data-filled="n <= level"
      viewBox="0 0 24 24"
      aria-hidden="true"
      :class="[$style['level-stars__star'], n <= level && $style['level-stars__star--filled']]"
    >
      <!-- 手畫的星星：線條稍微歪一點，不要太工整 -->
      <path d="M12 2.6l2.75 6.05 6.55.62-4.95 4.4 1.5 6.5L12.1 16.8l-5.8 3.4 1.42-6.47L2.75 9.3l6.6-.68z" />
    </svg>
  </span>
</template>

<script setup lang="ts">
/** 大考中心詞彙表分 1–6 級，一級一顆星 */
const MAX_LEVEL = 6

const props = defineProps<{
  level: number
  /** 只畫實心星星（例如每天進度一行裡的級別範圍） */
  compact?: boolean
}>()

const count = computed(() => (props.compact ? props.level : MAX_LEVEL))
const label = computed(() =>
  props.compact ? `難度 ${props.level} 顆星` : `難度 ${props.level} 顆星（共 ${MAX_LEVEL} 顆）`,
)
</script>

<style module lang="scss">
// 像用黃色色鉛筆塗的星星，沒塗的只留鉛筆外框
.level-stars {
  display: inline-flex;
  align-items: center;
  gap: 0.05em;
  font-size: 0.85rem;
  line-height: 1;
  vertical-align: middle;

  &__star {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    fill: none;
    stroke: var(--color-star-empty);
    stroke-width: 1.6;
    stroke-linejoin: round;

    &--filled {
      fill: var(--color-star);
      stroke: var(--color-star-line);
    }
  }
}
</style>
