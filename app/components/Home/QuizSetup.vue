<template>
  <form data-test="quiz-setup" :data-ready="ready" :class="$style['quiz-setup']" @submit.prevent="emit('start', config)">
    <fieldset :class="$style['quiz-setup__step']">
      <legend :class="$style['quiz-setup__legend']">
        <span :class="$style['quiz-setup__number']">1</span>選考試
      </legend>
      <div :class="$style['quiz-setup__choices']">
        <label
          v-for="exam in exams"
          :key="exam.id"
          :data-test="`exam-${exam.id}`"
          :for="`${uid}-exam-${exam.id}`"
          :class="choiceClass(examId === exam.id, !exam.available)"
        >
          <RadioButton
            v-model="examId"
            :input-id="`${uid}-exam-${exam.id}`"
            name="exam"
            :value="exam.id"
            :disabled="!exam.available"
          />
          <span :class="$style['quiz-setup__text']">
            <strong>{{ exam.name }}</strong>
            <small :class="[$style['quiz-setup__sub'], !exam.available && $style['quiz-setup__sub--soon']]">
              {{ exam.available ? exam.fullName : '即將推出' }}
            </small>
          </span>
        </label>
      </div>
    </fieldset>

    <fieldset :class="$style['quiz-setup__step']">
      <legend :class="$style['quiz-setup__legend']">
        <span :class="$style['quiz-setup__number']">2</span>選年度
      </legend>
      <div :class="$style['quiz-setup__choices']">
        <label
          v-for="item in years"
          :key="item"
          :data-test="`year-${item}`"
          :for="`${uid}-year-${item}`"
          :class="choiceClass(year === item)"
        >
          <RadioButton v-model="year" :input-id="`${uid}-year-${item}`" name="year" :value="item" />
          <span :class="$style['quiz-setup__text']">
            <strong>{{ item }} 學年度</strong>
          </span>
        </label>
      </div>
    </fieldset>

    <fieldset :class="$style['quiz-setup__step']">
      <legend :class="$style['quiz-setup__legend']">
        <span :class="$style['quiz-setup__number']">3</span>選科目
      </legend>
      <div :class="$style['quiz-setup__choices']">
        <label
          v-for="item in papers"
          :key="item.id"
          :data-test="`subject-${item.id}`"
          :for="`${uid}-subject-${item.id}`"
          :class="choiceClass(subject === item.id)"
        >
          <RadioButton v-model="subject" :input-id="`${uid}-subject-${item.id}`" name="subject" :value="item.id" />
          <span :class="$style['quiz-setup__text']">
            <strong>{{ item.subject }}</strong>
            <small :class="$style['quiz-setup__sub']">試作 {{ questionCount(item) }} 題・考試時間 {{ item.minutes }} 分鐘</small>
          </span>
        </label>
      </div>
    </fieldset>

    <fieldset :class="$style['quiz-setup__step']">
      <legend :class="$style['quiz-setup__legend']">
        <span :class="$style['quiz-setup__number']">4</span>作答方式
      </legend>
      <div :class="$style['quiz-setup__choices']">
        <label
          v-for="item in MODES"
          :key="item.value"
          :data-test="`mode-${item.value}`"
          :for="`${uid}-mode-${item.value}`"
          :class="choiceClass(mode === item.value)"
        >
          <RadioButton v-model="mode" :input-id="`${uid}-mode-${item.value}`" name="mode" :value="item.value" />
          <span :class="$style['quiz-setup__text']">
            <strong>{{ item.label }}</strong>
            <small :class="$style['quiz-setup__sub']">{{ item.hint }}</small>
          </span>
        </label>
      </div>
      <div v-if="mode === 'random'" data-test="random-count" :class="$style['quiz-setup__field']">
        <label :for="`${uid}-count`">抽</label>
        <InputNumber
          v-model="count"
          :input-id="`${uid}-count`"
          :min="1"
          :max="poolSize"
          show-buttons
          button-layout="horizontal"
          :allow-empty="false"
          :class="$style['quiz-setup__number-input']"
        />
        <span>題（最多 {{ poolSize }} 題）</span>
      </div>
    </fieldset>

    <fieldset :class="$style['quiz-setup__step']">
      <legend :class="$style['quiz-setup__legend']">
        <span :class="$style['quiz-setup__number']">5</span>計時
      </legend>
      <label data-test="timer-switch" :for="`${uid}-timed`" :class="$style['quiz-setup__switch']">
        <ToggleSwitch v-model="timed" :input-id="`${uid}-timed`" />
        <span>{{ timed ? '要計時' : '不計時' }}</span>
      </label>
      <div v-if="timed" data-test="timer-minutes" :class="$style['quiz-setup__field']">
        <label :for="`${uid}-minutes`">限時</label>
        <InputNumber
          v-model="minutes"
          :input-id="`${uid}-minutes`"
          :min="1"
          :max="MAX_MINUTES"
          show-buttons
          button-layout="horizontal"
          :allow-empty="false"
          :class="$style['quiz-setup__number-input']"
        />
        <span>分鐘</span>
        <p :class="$style['quiz-setup__hint']">按「開始作答」開始倒數，時間到就不能再作答，直接交卷批改。</p>
      </div>
    </fieldset>

    <Button type="submit" data-test="start-quiz" label="開始測驗" :class="$style['quiz-setup__start']" />
  </form>
</template>

<script setup lang="ts">
import { examCatalog } from '~/data/catalog'
import type { QuizConfig, QuizMode, QuizPaper } from '~/types/quiz'

const emit = defineEmits<{ start: [config: QuizConfig] }>()

const MODES: { value: QuizMode, label: string, hint: string }[] = [
  { value: 'full', label: '整份考卷', hint: '照原卷順序一題一題作答' },
  { value: 'random', label: '隨機抽題', hint: '從這份考卷隨機抽幾題' },
]

const uid = useId()
const { exams, examId, years, year, papers, subject, poolSize, mode, count, timed, minutes, config } = useQuizSetup(examCatalog)

/** 畫面可以操作了（E2E 等這個再點選） */
const ready = ref(false)
onMounted(() => {
  ready.value = true
})

const style = useCssModule()

function choiceClass(checked: boolean, disabled = false) {
  return [
    style['quiz-setup__choice'],
    checked && style['quiz-setup__choice--checked'],
    disabled && style['quiz-setup__choice--disabled'],
  ]
}

function questionCount(paper: QuizPaper) {
  return paperQuestions([paper]).length
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 首頁設定表：像一張填寫單，一步一步選
.quiz-setup {
  position: relative;

  padding: 1.25rem 1.5rem 1.5rem;

  @include sketch-border(2px);

  background: var(--color-card);
  box-shadow: var(--shadow-sketch);

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

  &__choices {
    display: grid;
    // 選項少時平分整列，多時一列最多排到放不下再換行
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 0.75rem;
  }

  // 整張卡片都能點
  &__choice {
    min-height: 3.5rem;
    padding: 0.6rem 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border: 1.5px solid var(--color-ink);
    border-radius: var(--radius-sketch-alt);
    background: var(--color-paper);
    cursor: pointer;
    transition: background 0.15s, box-shadow 0.15s;

    &--checked {
      background: linear-gradient(transparent 55%, var(--color-marker) 55%, var(--color-marker) 90%, transparent 90%), var(--color-card);
      box-shadow: 2px 3px 0 var(--color-ink);
    }

    &--disabled {
      border-style: dashed;
      border-color: var(--color-pencil);
      color: var(--color-pencil);
      cursor: not-allowed;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    line-height: 1.4;
  }

  &__sub {
    font-size: 0.85rem;
    color: var(--color-ink-soft);

    // 「即將推出」像蓋上去的紅色小章
    &--soon {
      align-self: flex-start;
      margin-top: 0.15rem;
      padding: 0 0.4em;
      border: 1.5px solid var(--color-pen-red);
      border-radius: 4px;
      color: var(--color-pen-red);
      transform: rotate(-3deg);
    }
  }

  &__field {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  &__number-input {
    width: 9rem;

    // CSS module 裡用 :global() 穿透 PrimeVue 的輸入框（:deep() 只在 scoped 有效）
    :global(.p-inputnumber-input) {
      width: 100%;
      min-width: 0;
      font-size: 1.1rem;
      text-align: center;
    }
  }

  &__switch {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 700;
    cursor: pointer;
  }

  &__hint {
    width: 100%;
    margin: 0;
    font-size: 0.85rem;
    color: var(--color-pencil);
  }

  &__start {
    width: 100%;
    margin-top: 0.5rem;
    font-size: 1.3rem;
  }

  @include respond-to('xs') {
    padding: 1rem 0.9rem 1.25rem;

    &__choices {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
}
</style>
