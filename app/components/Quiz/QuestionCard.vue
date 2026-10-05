<template>
  <article
    class="quiz-question-card"
    :class="[
      $style['question-card'],
      props.question.number % 2 === 0 && $style['question-card--tilt'],
    ]"
    :data-test="`question-${props.question.id}`"
  >
    <header :class="$style['question-card__header']">
      <span :class="$style['question-card__number']">{{ props.question.number }}.</span>
      <span :class="$style['question-card__type']">{{ typeLabel }}</span>
      <span :class="$style['question-card__actions']">
        <Button
          data-test="scratch-toggle"
          :label="showScratch ? '收起計算紙' : '計算紙'"
          size="small"
          severity="secondary"
          text
          :aria-expanded="showScratch ? 'true' : 'false'"
          @click="showScratch = !showScratch"
        />
        <span
          v-if="props.submitted && props.result"
          data-test="question-score"
          :class="[$style['question-card__score'], props.result.isCorrect && $style['question-card__score--full']]"
        >
          {{ scoreText }}
        </span>
      </span>
    </header>

    <p data-test="stem" :class="[$style['question-card__stem'], $style['question-card__writable']]">
      <QuizMarkupText
        :text="props.question.stem"
        :ranges="rangesOf('stem')"
        @mark="emit('mark', fieldId('stem'), $event)"
      />
    </p>

    <ol v-if="props.question.passage?.length" :class="$style['question-card__passage']">
      <li v-for="(line, index) in props.question.passage" :key="line" :class="$style['question-card__writable']">
        <QuizMarkupText
          :text="line"
          :ranges="rangesOf(`passage:${index}`)"
          @mark="emit('mark', fieldId(`passage:${index}`), $event)"
        />
      </li>
    </ol>

    <ul :class="$style['question-card__options']">
      <li
        v-for="option in props.question.options"
        :key="option.key"
        :data-test="`option-${option.key}`"
        :data-state="optionState(option.key)"
        :data-eliminated="isEliminated(option.key) ? 'true' : undefined"
        :class="[
          $style['question-card__option'],
          optionState(option.key) && $style[`question-card__option--${optionState(option.key)}`],
          isEliminated(option.key) && $style['question-card__option--eliminated'],
        ]"
      >
        <label data-test="option" :for="inputId(option.key)" :class="$style['question-card__label']">
          <RadioButton
            v-if="props.question.type === 'single'"
            :input-id="inputId(option.key)"
            :name="props.question.id"
            :value="option.key"
            :model-value="props.modelValue"
            :disabled="props.submitted"
            @update:model-value="pickSingle"
          />
          <Checkbox
            v-else
            :input-id="inputId(option.key)"
            :name="props.question.id"
            :value="option.key"
            :model-value="selectedKeys"
            :disabled="props.submitted"
            @update:model-value="pickMulti"
          />
          <span :class="$style['question-card__key']">
            ({{ option.key }})
            <svg
              v-if="optionState(option.key) === 'answer' || optionState(option.key) === 'hit'"
              :class="$style['question-card__circle']"
              viewBox="0 0 44 34"
              aria-hidden="true"
            >
              <path d="M22 3C35 2 42 10 40 19C38 28 24 32 13 29C4 27 1 17 6 10C10 4 20 2 30 5" />
            </svg>
          </span>
          <span data-test="option-text" :class="[$style['question-card__text'], $style['question-card__writable']]">
            <span :class="$style['question-card__mark']">
              <QuizMarkupText
                :text="option.text"
                :ranges="rangesOf(`option:${option.key}`)"
                      @mark="emit('mark', fieldId(`option:${option.key}`), $event)"
              />
            </span>
          </span>
        </label>
        <button
          type="button"
          :data-test="`eliminate-${option.key}`"
          :aria-label="`刪去選項 (${option.key})`"
          :aria-pressed="isEliminated(option.key) ? 'true' : 'false'"
          :disabled="props.submitted"
          :class="[$style['question-card__eliminate'], isEliminated(option.key) && $style['question-card__eliminate--on']]"
          @click="emit('eliminate', option.key)"
        >
          ✕
        </button>
      </li>
    </ul>

    <QuizScratchPad
      v-if="showScratch"
      :strokes="props.scratch"
      @update:strokes="emit('update:scratch', $event)"
    />
  </article>
</template>

<script setup lang="ts">
import type { GradeResult, QuizQuestion, ScratchStroke, TextRange } from '~/types/quiz'

type OptionState = 'hit' | 'answer' | 'wrong' | undefined

interface Props {
  question: QuizQuestion
  modelValue: string
  submitted?: boolean
  result?: GradeResult
  /** key 為 `${題目 id}:stem`、`${題目 id}:option:A` 等 */
  highlights?: Record<string, TextRange[]>
  eliminated?: string[]
  scratch?: ScratchStroke[]
}

const props = withDefaults(defineProps<Props>(), {
  submitted: false,
  result: undefined,
  highlights: () => ({}),
  eliminated: () => [],
  scratch: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'mark', fieldId: string, range: TextRange): void
  (e: 'eliminate', key: string): void
  (e: 'update:scratch', value: ScratchStroke[]): void
}>()

const showScratch = ref(false)

const typeLabel = computed(() => (props.question.type === 'single' ? '單選' : '多選'))
const selectedKeys = computed(() => props.modelValue.split('').filter(Boolean))
const scoreText = computed(() => {
  const score = Number((props.result?.score ?? 0).toFixed(2))
  return score > 0 ? `+${score}` : '0'
})

function fieldId(part: string) {
  return `${props.question.id}:${part}`
}

function rangesOf(part: string) {
  return props.highlights[fieldId(part)] ?? []
}

function isEliminated(key: string) {
  return props.eliminated.includes(key)
}

function inputId(key: string) {
  return `${props.question.id}-${key}`
}

function optionState(key: string): OptionState {
  if (!props.submitted) return undefined
  const isAnswer = props.question.answer.includes(key)
  const isPicked = props.modelValue.includes(key)
  if (isAnswer) return isPicked ? 'hit' : 'answer'
  return isPicked ? 'wrong' : undefined
}

function pickSingle(value: string) {
  emit('update:modelValue', value)
}

function pickMulti(values: string[]) {
  emit('update:modelValue', [...values].sort().join(''))
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.question-card {
  position: relative;

  margin-bottom: 2rem;
  padding: 1.25rem 1.5rem 1rem;

  @include sketch-border(2px);

  background: var(--color-card);
  box-shadow: var(--shadow-sketch);

  transform: rotate(-0.4deg);

  // 紙膠帶
  &::before {
    position: absolute;
    top: -0.75rem;
    left: 50%;
    width: 5rem;
    height: 1.4rem;
    background: var(--color-tape);
    content: '';
    transform: translateX(-50%) rotate(-3deg);
  }

  &--tilt {
    @include sketch-border(2px, true);

    transform: rotate(0.35deg);
  }

  &__header {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
  }

  &__number {
    font-size: 1.5rem;
    font-weight: 700;
  }

  &__type {
    padding: 0 0.6em;
    border: 1.5px dashed var(--color-pencil);
    border-radius: 999px 900px 950px 990px;
    font-size: 0.85rem;
    color: var(--color-pencil);
  }

  &__actions {
    margin-left: auto;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  &__score {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-pen-red);
    transform: rotate(-8deg);

    &--full::after {
      content: ' ✓';
    }
  }

  &__stem {
    margin: 0.5rem 0;
  }

  &__passage {
    margin: 0 0 0.75rem;
    padding: 0.5rem 1rem 0.5rem 2rem;
    border-left: 3px solid var(--color-marker);
    list-style: none;
    color: var(--color-ink-soft);
  }

  &__options {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__option {
    margin: 0.25rem 0;
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
    border-radius: var(--radius-sketch-alt);

    &--wrong {
      text-decoration: line-through;
      text-decoration-color: var(--color-pen-red);
      text-decoration-thickness: 2px;
    }
  }

  &__label {
    flex: 1;
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    cursor: pointer;
  }

  &__key {
    position: relative;
    flex-shrink: 0;
    font-weight: 700;
  }

  &__circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.6em;
    height: 2em;
    fill: none;
    stroke: var(--color-pen-red);
    stroke-linecap: round;
    stroke-width: 2.5;
    transform: translate(-50%, -50%) rotate(-6deg);
    pointer-events: none;
  }

  &__text {
    flex: 1;
  }

  // 刪去法：鉛筆小叉叉
  &__eliminate {
    width: 1.9em;
    height: 1.9em;
    flex-shrink: 0;
    padding: 0;
    background: transparent;
    border: 1.5px dashed var(--color-pencil);
    border-radius: 52% 48% 55% 45% / 47% 55% 45% 53%;
    font-family: inherit;
    font-size: 0.8rem;
    color: var(--color-pencil);
    cursor: pointer;

    &--on {
      background: var(--color-pencil);
      border-style: solid;
      color: var(--color-card);
    }

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }

  &__option--eliminated &__label {
    opacity: 0.5;
  }

  &__option--eliminated &__text {
    text-decoration: line-through;
    text-decoration-color: var(--color-pencil);
    text-decoration-thickness: 1.5px;
  }

  // 文字上橫向拖曳畫線、直向仍可捲動
  &__writable {
    touch-action: pan-y;
  }

  // 批改後正解用紅色螢光筆逐行畫底（和考生自己的黃色螢光筆區分）
  &__option--hit &__mark,
  &__option--answer &__mark {
    background: linear-gradient(transparent 55%, var(--color-marker-answer) 55%, var(--color-marker-answer) 92%, transparent 92%);
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  @include respond-to('xs') {
    padding: 1rem 1rem 0.75rem;
  }
}
</style>

<!-- 覆寫 PrimeVue → 不加 module，限縮在根 class 下 -->
<style lang="scss">
.quiz-question-card .p-radiobutton,
.quiz-question-card .p-checkbox {
  margin-top: 0.3em;
}
</style>
