<template>
  <div :class="$style['plan-schedule']">
    <ol :class="$style['plan-schedule__list']">
      <li v-for="day in shown" :key="day.date" data-test="vocab-day" :class="$style['plan-schedule__day']">
        <span :class="$style['plan-schedule__date']">{{ formatDay(day.date) }}</span>
        <span :class="$style['plan-schedule__count']">{{ day.words.length }} 個字</span>
        <span :class="$style['plan-schedule__range']">
          {{ levelRange(day.words) }}
          {{ day.words[0]?.word }}～{{ day.words.at(-1)?.word }}
        </span>
      </li>
    </ol>
    <Button
      v-if="days.length > PREVIEW_DAYS"
      data-test="vocab-schedule-more"
      size="small"
      text
      :label="expanded ? '收起來' : `看全部 ${days.length} 天`"
      @click="expanded = !expanded"
    />
  </div>
</template>

<script setup lang="ts">
import type { DayPlan } from '~/types/vocab'

const PREVIEW_DAYS = 7

const props = defineProps<{ days: DayPlan[] }>()

const expanded = ref(false)
const shown = computed(() => (expanded.value ? props.days : props.days.slice(0, PREVIEW_DAYS)))
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.plan-schedule {
  &__list {
    margin: 0 0 0.5rem;
    padding: 0;
    list-style: none;
  }

  &__day {
    min-height: 2.5rem;
    display: grid;
    grid-template-columns: 7rem 5rem 1fr;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px dashed var(--color-paper-line);
  }

  &__date {
    font-weight: 700;
  }

  &__count {
    color: var(--color-pen-red);
  }

  &__range {
    min-width: 0;
    overflow: hidden;
    font-size: 0.85rem;
    color: var(--color-ink-soft);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @include respond-to('xs') {
    &__day {
      grid-template-columns: 6rem 4.5rem 1fr;
      font-size: 0.95rem;
    }
  }
}
</style>
