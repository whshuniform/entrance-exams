<template>
  <article
    ref="card"
    :class="[
      $style['question-card'],
      props.question.number % 2 === 0 && $style['question-card--tilt'],
      isDrawing && $style['question-card--drawing'],
    ]"
    :data-test="`question-${props.question.id}`"
    :data-drawing="isDrawing ? props.tool : undefined"
    @pointerdown="drawing.onPointerDown"
    @pointermove="drawing.onPointerMove"
    @pointerup="drawing.onPointerUp"
    @pointercancel="drawing.onPointerCancel"
    @click.capture="drawing.onClickCapture"
  >
    <!-- 跟原卷一樣：題目接在題號後面，換行和選項都對齊題目第一個字 -->
    <div :class="$style['question-card__body']">
      <span data-test="number" :class="$style['question-card__number']">{{ props.question.number }}.</span>
      <div :class="$style['question-card__content']">
        <span
          v-if="props.submitted && props.result"
          data-test="question-score"
          :class="[$style['question-card__score'], props.result.isCorrect && $style['question-card__score--full']]"
        >
          {{ scoreText }}
        </span>

        <p data-test="stem" :data-field="fieldId('stem')" :class="$style['question-card__stem']">
          <QuizMarkupText :text="props.question.stem" :ranges="rangesOf('stem')" />
        </p>

        <ol v-if="props.question.passage?.length" :class="$style['question-card__passage']">
          <li v-for="(line, index) in props.question.passage" :key="line" :data-field="fieldId(`passage:${index}`)">
            <QuizMarkupText :text="line" :ranges="rangesOf(`passage:${index}`)" />
          </li>
        </ol>

        <ul :class="$style['question-card__options']">
          <li
            v-for="option in props.question.options"
            :key="option.key"
            :data-test="`option-${option.key}`"
            :data-state="optionState(option.key)"
            :class="[
              $style['question-card__option'],
              optionState(option.key) && $style[`question-card__option--${optionState(option.key)}`],
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
              <span
                data-test="option-text"
                :data-field="fieldId(`option:${option.key}`)"
                :class="$style['question-card__text']"
              >
                <span :class="$style['question-card__mark']">
                  <QuizMarkupText :text="option.text" :ranges="rangesOf(`option:${option.key}`)" />
                </span>
              </span>
            </label>
          </li>
        </ul>

        <!-- 計算紙按鈕在所有選項下面；紙本身用整張卡片的寬度 -->
        <div :class="$style['question-card__scratch-bar']">
          <Button
            data-test="scratch-toggle"
            :label="showScratch ? '收起計算紙' : '計算紙'"
            size="small"
            severity="secondary"
            text
            :aria-expanded="showScratch ? 'true' : 'false'"
            @click="showScratch = !showScratch"
          />
        </div>
      </div>
    </div>

    <div v-if="showScratch" data-test="scratch-area" aria-label="計算紙" :class="$style['question-card__scratch']">
      <span v-if="!isDrawing" :class="$style['question-card__scratch-hint']">點右下角的「原子筆」就能在這裡寫算式</span>
    </div>

    <!-- 手寫筆跡層：蓋在整張卡片上，不擋點擊 -->
    <canvas ref="inkCanvas" data-test="ink-layer" aria-hidden="true" :class="$style['question-card__ink']" />
  </article>
</template>

<script setup lang="ts">
import type { DrawTool, GradeResult, InkStroke, QuizQuestion, TextRange } from '~/types/quiz'

type OptionState = 'hit' | 'answer' | 'wrong' | undefined

interface Props {
  question: QuizQuestion
  modelValue: string
  submitted?: boolean
  result?: GradeResult
  /** key 為 `${題目 id}:stem`、`${題目 id}:option:A` 等 */
  highlights?: Record<string, TextRange[]>
  /** 右下角工具列目前的工具；off 時可作答 */
  tool?: DrawTool
  ink?: InkStroke[]
}

const props = withDefaults(defineProps<Props>(), {
  submitted: false,
  result: undefined,
  highlights: () => ({}),
  tool: 'off',
  ink: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'mark', fieldId: string, range: TextRange): void
  (e: 'erase', fieldId: string, range: TextRange): void
  (e: 'update:ink', value: InkStroke[]): void
}>()

const card = ref<HTMLElement | null>(null)
const inkCanvas = ref<HTMLCanvasElement | null>(null)
/** 計算紙開關；外層有綁 v-model 時由外層記住（翻頁後回來仍開著） */
const showScratch = defineModel<boolean>('scratchOpen', { default: false })
const isDrawing = computed(() => props.tool !== 'off')

const drawing = useCardDrawing({
  card,
  canvas: inkCanvas,
  tool: () => props.tool,
  strokes: () => props.ink,
  hasHighlights: id => Boolean(props.highlights[id]?.length),
  onStrokes: strokes => emit('update:ink', strokes),
  onMark: (id, range) => emit('mark', id, range),
  onErase: (id, range) => emit('erase', id, range),
})

const selectedKeys = computed(() => props.modelValue.split('').filter(Boolean))
const scoreText = computed(() => {
  const score = Number((props.result?.score ?? 0).toFixed(2))
  return score > 0 ? `+${score}` : '0'
})

function fieldId(part: string) {
  return `${props.question.id}:${part}`
}

function rangesOf(part: string) {
  const id = fieldId(part)
  const ranges = props.highlights[id] ?? []
  // 螢光筆拖曳中即時預覽
  const preview = drawing.preview.value
  return preview?.fieldId === id ? addRange(ranges, preview.range) : ranges
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

  // 開啟繪畫：一指寫字（兩指捲動由程式處理）、不選取文字
  &--drawing {
    cursor: crosshair;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }

  &--drawing &__label {
    cursor: crosshair;
  }

  // 題號一欄、題目與選項一欄：題目接在題號後面，換行對齊題目第一個字
  &__body {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: baseline;
    column-gap: 0.4rem;
  }

  &__number {
    font-size: 1.2rem;
    font-weight: 700;
  }

  // 老師批改的紅字分數，浮在題目右上，題目文字繞開
  &__score {
    float: right;
    margin: -0.5rem 0 0 0.75rem;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-pen-red);
    transform: rotate(-8deg);

    &--full::after {
      content: ' ✓';
    }
  }

  &__stem {
    margin: 0 0 0.5rem;
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

  // 選項和題目第一個字對齊，上下只留一點間距
  &__option {
    padding: 0.125rem 0;
    display: flex;
    align-items: flex-start;

    &--wrong {
      text-decoration: line-through;
      text-decoration-color: var(--color-pen-red);
      text-decoration-thickness: 2px;
    }
  }

  // 整列都能點，至少 3rem 高，手指好點
  &__label {
    flex: 1;
    min-height: 3rem;
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

  &__scratch-bar {
    margin-top: 0.25rem;
  }

  // 方格計算紙
  &__scratch {
    height: 26rem;
    margin-top: 0.5rem;
    padding: 0.4rem 0.6rem;

    @include sketch-border(1.5px, true);

    background-color: var(--color-card);
    background-image:
      linear-gradient(var(--color-paper-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-paper-line) 1px, transparent 1px);
    background-size: 1.25rem 1.25rem;
  }

  &__scratch-hint {
    font-size: 0.8rem;
    color: var(--color-pencil);
  }

  &__ink {
    position: absolute;
    inset: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    // 螢光筆疊在字上，字仍清楚
    mix-blend-mode: multiply;
    pointer-events: none;
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
