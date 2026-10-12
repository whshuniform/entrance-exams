<template>
  <section data-test="option-stats" :class="$style['option-stats']" aria-label="全體考生選答比例">
    <p :class="$style['option-stats__head']">
      <span :class="$style['option-stats__title']">大家怎麼選</span>
      <span data-test="stats-summary" :class="$style['option-stats__summary']">{{ summary }}</span>
    </p>

    <ul :class="$style['option-stats__list']">
      <li
        v-for="row in rows"
        :key="row.key"
        :data-test="`stats-option-${row.key}`"
        :data-answer="row.isAnswer ? 'true' : undefined"
        :data-picked="row.isPicked ? 'true' : undefined"
        :class="[
          $style['option-stats__row'],
          row.isAnswer && $style['option-stats__row--answer'],
          row.isPicked && !row.isAnswer && $style['option-stats__row--wrong'],
        ]"
      >
        <span :class="$style['option-stats__key']">({{ row.key }})</span>
        <span :class="$style['option-stats__track']">
          <span data-test="stats-bar" :class="$style['option-stats__bar']" :style="{ width: `${row.percent}%` }" />
        </span>
        <span :class="[$style['option-stats__percent'], row.isTop && $style['option-stats__percent--top']]">{{ row.percent }}%</span>
        <span :class="$style['option-stats__tags']">
          <span v-if="row.isAnswer">正解</span>
          <span v-if="row.isPicked">你選的</span>
        </span>
      </li>
    </ul>

    <p v-if="props.stats.multi" data-test="stats-note" :class="$style['option-stats__note']">
      多選題每個選項分開算，加起來會超過 100%。
    </p>
  </section>
</template>

<script setup lang="ts">
import type { ItemStats } from '~/types/quiz'

interface Props {
  stats: ItemStats
  /** 題目的選項順序 */
  keys: string[]
  /** 考生的作答，例如 'B'、'34' */
  picked: string
}

const props = defineProps<Props>()

const rows = computed(() => optionStatRows(props.stats, props.keys, props.picked))
const summary = computed(() => (props.stats.multi && props.stats.full != null
  ? `全體考生 ${props.stats.full}% 全對`
  : `全體考生 ${props.stats.p}% 答對`))
</script>

<style module lang="scss">
.option-stats {
  margin: 0.75rem 0 0;
  padding: 0.5rem 0.75rem;

  border: 1.5px dashed var(--color-ink-soft);
  border-radius: 6px 10px 7px 12px;

  font-size: 0.875rem;
  color: var(--color-ink-soft);

  &__head {
    margin: 0 0 0.375rem;

    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem 0.75rem;
  }

  &__title {
    font-weight: 700;
    color: var(--color-ink);
  }

  &__list {
    margin: 0;
    padding: 0;

    display: grid;
    gap: 0.25rem;

    list-style: none;
  }

  &__row {
    display: grid;
    grid-template-columns: 2.25rem 1fr 2.75rem 4.5rem;
    align-items: center;
    gap: 0.5rem;

    &--answer {
      font-weight: 700;
      color: var(--color-pen-red);
    }

    &--wrong {
      color: var(--color-ink);
    }
  }

  &__track {
    height: 0.625rem;

    background: var(--color-paper-line);
    border-radius: 999px;
    overflow: hidden;
  }

  &__bar {
    height: 100%;

    display: block;

    background: var(--color-pen-gray);
    border-radius: 999px;
  }

  &__row--answer &__bar {
    background: var(--color-pen-red);
  }

  &__percent {
    text-align: right;

    &--top {
      text-decoration: underline wavy;
    }
  }

  &__tags {
    display: flex;
    gap: 0.25rem;

    font-size: 0.75rem;
    white-space: nowrap;
  }

  &__note {
    margin: 0.375rem 0 0;

    font-size: 0.75rem;
  }
}
</style>
