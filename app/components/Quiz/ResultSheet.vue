<template>
  <div :class="$style['result-sheet']">
    <h2 :class="$style['result-sheet__title']">成績單</h2>
    <p v-if="props.timeUp" data-test="time-up" :class="$style['result-sheet__time-up']">時間到，已自動交卷批改</p>
    <ul :class="$style['result-sheet__list']">
      <li
        v-for="report in props.reports"
        :key="report.subject"
        :data-test="`report-${report.subject}`"
        :data-subject="report.subject"
        :class="$style['result-sheet__row']"
      >
        <div :class="$style['result-sheet__subject']">{{ report.subject }}</div>
        <div data-test="report-score" :class="$style['result-sheet__score']">
          <span>試作得分 {{ formatNumber(report.earned) }} / {{ report.sampleMax }} 分，</span>
          <span>整卷 {{ formatRange(report.scoreRange) }} / {{ report.fullMarks }} 分</span>
        </div>
        <div :class="$style['result-sheet__grade']">
          <span data-test="report-level" :class="$style['result-sheet__level']">
            {{ formatRange(report.levelRange) }} 級分
          </span>
          <span data-test="report-rank" :class="$style['result-sheet__rank']">
            全國第 {{ formatCount(report.rank.best) }}～{{ formatCount(report.rank.worst) }} 名
            <small>到考 {{ formatCount(report.rank.total) }} 人</small>
          </span>
        </div>
      </li>
    </ul>
    <p :class="$style['result-sheet__note']">
      試作每科只有幾題，沒考到的題目以全錯（0 分）到全對（滿分）估計，再查 115 年大考中心級分表與各級分人數，所以整卷分數、級分和名次都是範圍。
    </p>
  </div>
</template>

<script setup lang="ts">
import type { NumberRange, SubjectReport } from '~/types/quiz'

interface Props {
  reports: SubjectReport[]
  /** 計時作答時間到、自動交卷 */
  timeUp?: boolean
}

const props = withDefaults(defineProps<Props>(), { timeUp: false })

function formatNumber(value: number) {
  return String(Number(value.toFixed(2)))
}

/** 兩端相同時只寫一個數 */
function formatRange({ min, max }: NumberRange) {
  return min === max ? formatNumber(min) : `${formatNumber(min)}～${formatNumber(max)}`
}

function formatCount(value: number) {
  return value.toLocaleString('en-US')
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.result-sheet {
  position: relative;

  padding: 1.5rem 1.5rem 1rem;

  @include sketch-border(2px);

  background: var(--color-card);
  box-shadow: var(--shadow-sketch);

  transform: rotate(-0.3deg);

  &__title {
    margin: 0 0 0.75rem;
    font-size: 1.6rem;
    text-align: center;
  }

  // 紅筆蓋的章
  &__time-up {
    width: fit-content;
    margin: 0 auto 0.75rem;
    padding: 0.1rem 0.75rem;
    border: 2px solid var(--color-pen-red);
    border-radius: var(--radius-sketch-alt);
    font-weight: 700;
    color: var(--color-pen-red);
    transform: rotate(-2deg);
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__row {
    padding: 0.75rem 0;
    border-top: 1.5px dashed var(--color-pencil);

    &:first-child {
      border-top: 0;
    }
  }

  &__subject {
    font-size: 1.15rem;
    font-weight: 700;
  }

  &__score {
    font-size: 0.9rem;
    color: var(--color-ink-soft);

    // 兩段各自不斷行，窄螢幕時整段換到下一行
    span {
      display: inline-block;
    }
  }

  &__grade {
    margin-top: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem 1rem;
  }

  // 紅筆寫上去的級分
  &__level {
    padding: 0 0.3em;
    border-bottom: 3px double var(--color-pen-red);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-pen-red);
    transform: rotate(-4deg);
  }

  &__rank {
    color: var(--color-pen-red);

    small {
      display: block;
      font-size: 0.8rem;
      color: var(--color-pencil);
    }
  }

  &__note {
    margin: 0.75rem 0 0;
    font-size: 0.8rem;
    line-height: 1.6;
    color: var(--color-pencil);
  }

  @include respond-to('xs') {
    padding: 1.25rem 1rem 0.75rem;
  }
}
</style>
