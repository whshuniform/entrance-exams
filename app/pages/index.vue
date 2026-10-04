<template>
  <main :class="['container', $style['quiz-page']]">
    <header :class="$style['quiz-page__header']">
      <h1 :class="$style['quiz-page__title']">
        <span :class="$style['quiz-page__highlight']">學測練習本</span>
      </h1>
      <p :class="$style['quiz-page__subtitle']">115 學年度・國語文綜合能力測驗・試作 {{ questions.length }} 題</p>
      <p :class="$style['quiz-page__progress']">已作答 {{ answeredCount }} / {{ questions.length }}</p>
    </header>

    <QuizQuestionCard
      v-for="question in questions"
      :key="question.id"
      :question="question"
      :model-value="answers[question.id] ?? ''"
      :submitted="submitted"
      :result="results[question.id]"
      @update:model-value="setAnswer(question.id, $event)"
    />

    <section :class="$style['quiz-page__footer']">
      <div v-if="submitted" :class="$style['quiz-page__result']">
        <span :class="$style['quiz-page__total']" data-test="total-score">{{ formatScore(totalScore) }}</span>
        <span :class="$style['quiz-page__max']">/ {{ maxScore }} 分</span>
      </div>
      <Button v-if="!submitted" label="交卷批改" @click="submit" />
      <Button v-else label="重新作答" severity="secondary" @click="onReset" />
    </section>

    <p :class="$style['quiz-page__source']">試題與答案來源：大學入學考試中心</p>
  </main>
</template>

<script setup lang="ts">
import { sample115Chinese } from '~/data/sample-115-chinese'

const questions = sample115Chinese
const { answers, submitted, maxScore, answeredCount, results, totalScore, setAnswer, submit, reset } =
  useQuiz(questions)

function formatScore(score: number) {
  return String(Number(score.toFixed(2)))
}

function onReset() {
  reset()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.quiz-page {
  max-width: 46rem;
  margin: 0 auto;
  padding: 2rem 1rem 3rem 3.5rem;

  &__header {
    margin-bottom: 2rem;
  }

  &__title {
    margin: 0;
    font-size: 2.5rem;
    line-height: 1.3;
  }

  &__highlight {
    padding: 0 0.2em;
    background: linear-gradient(transparent 50%, var(--color-marker) 50%, var(--color-marker) 92%, transparent 92%);
  }

  &__subtitle {
    margin: 0.25rem 0 0;
    color: var(--color-ink-soft);
  }

  &__progress {
    margin: 0;
    font-size: 0.9rem;
    color: var(--color-pencil);
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__result {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    color: var(--color-pen-red);
    transform: rotate(-4deg);
  }

  &__total {
    padding: 0 0.3em;
    border-bottom: 3px double var(--color-pen-red);
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
  }

  &__max {
    font-size: 1.5rem;
  }

  &__source {
    margin-top: 2.5rem;
    font-size: 0.8rem;
    color: var(--color-pencil);
    text-align: center;
  }

  @include respond-to('xs') {
    padding: 1.25rem 0.75rem 2rem 3rem;

    &__title {
      font-size: 2rem;
    }
  }
}
</style>
