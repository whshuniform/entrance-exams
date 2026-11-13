<template>
  <div :class="$style['vocab-setup']">
    <fieldset :class="$style['vocab-setup__step']">
      <legend :class="$style['vocab-setup__legend']">
        <span :class="$style['vocab-setup__number']">1</span>考試日期
      </legend>
      <div data-test="vocab-exam-date" :class="$style['vocab-setup__date']">
        <DatePicker
          :model-value="dateValue"
          :input-id="`${uid}-date`"
          date-format="yy/mm/dd"
          :min-date="tomorrow"
          show-icon
          icon-display="input"
          :manual-input="false"
          @update:model-value="onDate"
        />
        <p :class="$style['vocab-setup__hint']">已先填好最近一次考試的第一天，可以改成自己的日期。</p>
      </div>
    </fieldset>

    <fieldset v-if="exam.levels.length" :class="$style['vocab-setup__step']">
      <legend :class="$style['vocab-setup__legend']">
        <span :class="$style['vocab-setup__number']">2</span>要背的級別
      </legend>
      <div :class="$style['vocab-setup__levels']">
        <label
          v-for="level in exam.levels"
          :key="level"
          :data-test="`vocab-level-${level}`"
          :for="`${uid}-level-${level}`"
          :class="[$style['vocab-setup__level'], levels.includes(level) && $style['vocab-setup__level--checked']]"
        >
          <Checkbox
            :model-value="levels"
            :input-id="`${uid}-level-${level}`"
            name="vocab-level"
            :value="level"
            @update:model-value="emit('update:levels', $event)"
          />
          <span>第 {{ level }} 級</span>
        </label>
      </div>
      <p :class="$style['vocab-setup__hint']">第 1 級最簡單、第 6 級最難，從簡單的開始排。</p>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import type { VocabExam } from '~/types/vocab'

const props = defineProps<{
  /** 從考試頁帶進來的考試，這裡不再讓人選 */
  exam: VocabExam
  /** YYYY-MM-DD */
  examDate: string
  levels: number[]
}>()

const emit = defineEmits<{
  'update:examDate': [date: string]
  'update:levels': [levels: number[]]
}>()

const uid = useId()

const dateValue = computed(() => {
  const [year, month, day] = props.examDate.split('-').map(Number)
  return new Date(year!, month! - 1, day!)
})
const tomorrow = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date
})

function onDate(value: unknown) {
  if (value instanceof Date) emit('update:examDate', toDateKey(value))
}
</script>

<style module lang="scss">
.vocab-setup {
  &__step {
    min-width: 0;
    margin: 0 0 1.25rem;
    padding: 0;
    border: 0;
  }

  &__legend {
    margin-bottom: 0.5rem;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.15rem;
    font-weight: 700;
  }

  // 手寫圈起來的步驟編號
  &__number {
    width: 1.8rem;
    height: 1.8rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--color-pen-red);
    border-radius: 52% 48% 55% 45% / 47% 55% 45% 53%;
    font-size: 1rem;
    color: var(--color-pen-red);
  }

  &__date {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  &__levels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  // 級別像手寫圈選的小標籤
  &__level {
    padding: 0.3rem 0.9rem 0.3rem 0.6rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1.5px solid var(--color-ink);
    border-radius: 999px;
    background: var(--color-paper);
    font-size: 0.95rem;
    cursor: pointer;

    &--checked {
      background: var(--color-marker);
      font-weight: 700;
    }
  }

  &__hint {
    width: 100%;
    margin: 0.4rem 0 0;
    font-size: 0.85rem;
    color: var(--color-pencil);
  }
}
</style>
