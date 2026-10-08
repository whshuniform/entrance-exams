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
// 倒數計時：橫跨畫面最上方的細長條，像貼在考卷頂端的紙膠帶
.quiz-timer {
  width: 100%;
  height: var(--timer-bar-height);

  padding: 0 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  overflow: hidden;

  background: var(--color-card);
  border-bottom: 2px solid var(--color-ink);
  box-shadow: 0 2px 0 var(--color-paper-line);

  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-ink);
  white-space: nowrap;

  &__icon {
    flex: none;
    width: 1.1rem;
    height: 1.1rem;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &__clock {
    display: inline-block;
    font-size: 1.05rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.05em;
  }

  &__note {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--color-pencil);
  }

  // 最後一分鐘和時間到：紅色螢光筆底
  &--warning,
  &--expired {
    background: var(--color-marker-answer);
    border-bottom-color: var(--color-pen-red);
    color: var(--color-pen-red);
  }

  &--warning &__clock {
    animation: quiz-timer-pulse 1s ease-in-out infinite;
  }

  &--stopped {
    color: var(--color-pencil);
  }

  @media (prefers-reduced-motion: reduce) {
    &--warning &__clock {
      animation: none;
    }
  }
}

@keyframes quiz-timer-pulse {
  50% {
    transform: scale(1.12);
  }
}
</style>
