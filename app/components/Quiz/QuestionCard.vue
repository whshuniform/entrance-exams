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
    @pointerleave="drawing.onPointerLeave"
    @click.capture="drawing.onClickCapture"
  >
    <!-- 題組文章：印在題組第一題前面 -->
    <div v-if="props.showLead && props.question.lead" data-test="lead" :class="$style['question-card__lead']">
      <QuizBlocks :blocks="props.question.lead.blocks" name="lead" :field-id="fieldId" :ranges-of="rangesOf" />
    </div>

    <!-- 原卷截圖：題組文章、圖表、題目和選項都在圖裡 -->
    <div v-if="props.question.images?.length" :class="$style['question-card__figure']">
      <img
        v-for="(image, index) in props.question.images"
        :key="image.src"
        data-test="question-image"
        :src="`${baseURL}${image.src}`"
        :width="image.width"
        :height="image.height"
        :alt="index === 0 ? `第 ${props.question.number} 題（原卷）` : ''"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :class="$style['question-card__image']"
      >
    </div>

    <!-- 跟原卷一樣：題目接在題號後面，換行對齊題目第一個字 -->
    <div :class="[$style['question-card__body'], !hasOptionText && $style['question-card__body--circles']]">
      <span v-if="!props.question.numberInImage" data-test="number" :class="$style['question-card__number']">{{ props.question.number }}.</span>
      <div :class="$style['question-card__content']">
        <span
          v-if="props.submitted && props.result"
          data-test="question-score"
          :class="[$style['question-card__score'], props.result.isCorrect && $style['question-card__score--full']]"
        >
          {{ scoreText }}
        </span>

        <p v-if="hasStem" data-test="stem" :data-field="fieldId('stem')" :class="$style['question-card__stem']">
          <QuizMarkupText :text="props.question.stem" :ranges="rangesOf('stem')" />
        </p>

        <ol v-if="props.question.passage?.length" :class="$style['question-card__passage']">
          <li v-for="(line, index) in props.question.passage" :key="line" :data-field="fieldId(`passage:${index}`)">
            <QuizMarkupText :text="line" :ranges="rangesOf(`passage:${index}`)" />
          </li>
        </ol>

        <QuizBlocks
          v-if="props.question.body?.length"
          data-test="body"
          :blocks="props.question.body"
          name="body"
          :field-id="fieldId"
          :ranges-of="rangesOf"
        />
      </div>

      <!-- 電腦：選項對齊題目第一個字；手機：選項靠左和題號切齊 -->
      <ul :class="[$style['question-card__options'], !hasOptionText && $style['question-card__options--circles']]">
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
              :name="inputName"
              :value="option.key"
              :model-value="props.modelValue"
              :disabled="showAnswer"
              @update:model-value="pickSingle"
            />
            <Checkbox
              v-else
              :input-id="inputId(option.key)"
              :name="inputName"
              :value="option.key"
              :model-value="selectedKeys"
              :disabled="showAnswer"
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
            <img
              v-if="option.figure"
              :src="`${baseURL}${option.figure.src}`"
              :width="option.figure.width"
              :height="option.figure.height"
              :alt="`選項 ${option.key} 的圖`"
              loading="lazy"
              :class="$style['question-card__option-figure']"
            >
            <span
              v-else-if="hasOptionText"
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

      <!-- 批改後：全體考生選各選項的比例（大考中心選擇題選項分析） -->
      <QuizOptionStats
        v-if="showAnswer && props.stats"
        :stats="props.stats"
        :keys="props.question.options.map(option => option.key)"
        :picked="props.modelValue"
        :class="$style['question-card__stats']"
      />

      <!-- 計算紙按鈕在所有選項下面；紙本身用整張卡片的寬度 -->
      <div v-if="!props.compact" :class="$style['question-card__scratch-bar']">
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

    <div v-if="showScratch" data-test="scratch-area" aria-label="計算紙" :class="$style['question-card__scratch']">
      <span v-if="!isDrawing" :class="$style['question-card__scratch-hint']">點右下角的「原子筆」就能在這裡寫算式</span>
    </div>

    <!-- 手寫筆跡層：蓋在整張卡片上，不擋點擊 -->
    <canvas ref="inkCanvas" data-test="ink-layer" aria-hidden="true" :class="$style['question-card__ink']" />

    <!-- 橡皮擦跟著滑鼠顯示擦的範圍 -->
    <span
      v-if="drawing.eraserCursor.value"
      data-test="eraser-cursor"
      aria-hidden="true"
      :class="$style['question-card__eraser']"
      :style="{
        left: `${drawing.eraserCursor.value.x}px`,
        top: `${drawing.eraserCursor.value.y}px`,
        width: `${eraserSize}px`,
        height: `${eraserSize}px`,
      }"
    />
  </article>
</template>

<script setup lang="ts">
import type { DrawTool, GradeResult, InkStroke, ItemStats, QuizQuestion, TextRange } from '~/types/quiz'

type OptionState = 'hit' | 'answer' | 'wrong' | undefined

interface Props {
  question: QuizQuestion
  modelValue: string
  submitted?: boolean
  /** 「看答案」：不用交卷就圈出正解、列出大家怎麼選，不打分數 */
  revealed?: boolean
  result?: GradeResult
  /** key 為 `${題目 id}:stem`、`${題目 id}:option:A` 等 */
  highlights?: Record<string, TextRange[]>
  /** 右下角工具列目前的工具；off 時可作答 */
  tool?: DrawTool
  ink?: InkStroke[]
  /** points：交卷後標得分；accuracy：隨機抽題只標答對或答錯 */
  scoring?: 'points' | 'accuracy'
  /** 題組文章印在這題前面 */
  showLead?: boolean
  /** 官方選項比例，交卷後顯示 */
  stats?: ItemStats
  /** 題組文章裡每個空格（題號）目前的作答；有給才能點題號跳出選項 */
  slotAnswers?: Record<number, string>
  /** 跳出視窗裡的精簡版：不顯示計算紙 */
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitted: false,
  revealed: false,
  result: undefined,
  highlights: () => ({}),
  tool: 'off',
  ink: () => [],
  scoring: 'points',
  showLead: false,
  stats: undefined,
  slotAnswers: undefined,
  compact: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'mark', fieldId: string, range: TextRange): void
  (e: 'erase', fieldId: string, range: TextRange): void
  (e: 'update:ink', value: InkStroke[]): void
  (e: 'open-slot', number: number): void
}>()

provideQuizSlots({
  answerOf: number => props.slotAnswers?.[number],
  open: number => emit('open-slot', number),
})

const card = ref<HTMLElement | null>(null)
const inkCanvas = ref<HTMLCanvasElement | null>(null)
/** 計算紙開關；外層有綁 v-model 時由外層記住（翻頁後回來仍開著） */
const showScratch = defineModel<boolean>('scratchOpen', { default: false })
const isDrawing = computed(() => props.tool !== 'off')
/** 文章裡的空格題（綜合測驗、文意選填）沒有題幹 */
const hasStem = computed(() => props.question.stem !== '')
/** 截圖題、文意選填（選項在題組文章裡）的選項沒有文字，只留一排作答圈 */
const hasOptionText = computed(() => props.question.options.some(option => option.text !== '' || option.figure))
/** 截圖放在 public/，網址要接上網站的 baseURL（試用網址在 /entrance-exams/ 底下） */
const baseURL = useRuntimeConfig().app.baseURL

/** 橡皮擦圓圈大小 = 橡皮擦筆寬 */
const eraserSize = inkStyle('eraser').width

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
/** 交卷後或按了看答案：圈出正解、顯示選答比例、不能再作答 */
const showAnswer = computed(() => props.submitted || props.revealed)
const scoreText = computed(() => {
  if (props.scoring === 'accuracy') return props.result?.isCorrect ? '答對' : '答錯'
  const score = Number((props.result?.score ?? 0).toFixed(2))
  return `+${score}`
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

/** 跳出視窗和題目卡片同時在頁面上，id、name 要分開，label 才不會選到另一邊 */
const inputName = computed(() => (props.compact ? `popup-${props.question.id}` : props.question.id))

function inputId(key: string) {
  return `${inputName.value}-${key}`
}

function optionState(key: string): OptionState {
  if (!showAnswer.value) return undefined
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

  // 選項、選答比例和計算紙按鈕排在題目那一欄
  &__options,
  &__stats,
  &__scratch-bar {
    grid-column: 2;
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

    // 截圖題：作答圈橫排，像答案卡
    &--circles {
      display: flex;
      flex-wrap: wrap;
      column-gap: 1rem;
    }
  }

  // 截圖題：題號（文章空格題才有）和作答圈排一列
  &__body--circles {
    align-items: center;
  }

  // 題組文章和題目之間留一條虛線
  &__lead {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed var(--color-pencil);
  }

  &__option-figure {
    max-width: 10rem;
    height: auto;
    vertical-align: middle;
    mix-blend-mode: multiply;
  }

  // 原卷截圖：跟卡片一樣寬；白底用 multiply 融進紙色
  &__figure {
    margin: 0 0 0.75rem;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    mix-blend-mode: multiply;
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

  &__eraser {
    position: absolute;
    z-index: 2;

    border: 1.5px solid var(--color-ink);
    border-radius: 50%;

    background: rgb(255 255 255 / 45%);
    pointer-events: none;
    transform: translate(-50%, -50%);
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

    // 手機：選項和計算紙按鈕靠左，跟題號切齊，選項文字多一點寬度
    &__options,
    &__stats,
    &__scratch-bar {
      grid-column: 1 / -1;
    }
  }
}
</style>
