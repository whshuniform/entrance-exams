<template>
  <div role="timer" :data-state="state" :class="[$style['quiz-timer'], $style[`quiz-timer--${state}`]]">
    <!-- 手畫的鬧鐘 -->
    <svg :class="$style['quiz-timer__icon']" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="17.5" r="10.5" />
      <path d="M16 11 V17.5 L20.5 20" />
      <path d="M6 7.5 L9.5 4.5 M26 7.5 L22.5 4.5" />
    </svg>
    <template v-if="props.status === 'waiting'">
      <span>限時 {{ Math.round(props.total / 60) }} 分鐘</span>
      <small :class="$style['quiz-timer__note']">按「開始作答」開始計時</small>
    </template>
    <span v-else-if="props.status === 'expired'">時間到</span>
    <span v-else-if="props.status === 'stopped'">已交卷</span>
    <template v-else>
      <span>剩餘</span>
      <strong data-test="timer-clock" :class="$style['quiz-timer__clock']">{{ formatClock(props.remaining) }}</strong>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { CountdownStatus } from '~/types/quiz'

interface Props {
  /** 限時秒數 */
  total: number
  remaining: number
  status: CountdownStatus
}

const props = defineProps<Props>()

/** 最後一分鐘變紅色提醒 */
const WARNING_SECONDS = 60

const state = computed(() =>
  props.status === 'running' && props.remaining <= WARNING_SECONDS ? 'warning' : props.status,
)
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 倒數計時：像貼在考卷角落的便條
.quiz-timer {
  padding: 0.3rem 0.8rem;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 0.4rem;

  @include sketch-border(2px, true);

  background: var(--color-card);
  box-shadow: 2px 3px 0 var(--color-ink);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-ink);

  &__icon {
    width: 1.4rem;
    height: 1.4rem;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &__clock {
    font-size: 1.25rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.05em;
  }

  &__note {
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--color-pencil);
  }

  &--warning,
  &--expired {
    border-color: var(--color-pen-red);
    box-shadow: 2px 3px 0 var(--color-pen-red);
    color: var(--color-pen-red);
  }

  &--warning {
    animation: quiz-timer-pulse 1s ease-in-out infinite;
  }

  &--stopped {
    color: var(--color-pencil);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}

@keyframes quiz-timer-pulse {
  50% {
    transform: scale(1.06);
  }
}
</style>
