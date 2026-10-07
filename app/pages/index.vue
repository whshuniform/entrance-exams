<template>
  <main :class="['container', $style['home-page']]">
    <header :class="$style['home-page__header']">
      <h1 :class="$style['home-page__title']">
        <span :class="$style['home-page__highlight']">考古題練習本</span>
      </h1>
      <p :class="$style['home-page__subtitle']">
        選好考試、作答方式和科目，像真的考試一樣一頁一題作答。交卷馬上批改：整份考卷看級分和全國名次，隨機抽題看答對率。
      </p>
    </header>

    <HomeQuizSetup @start="onStart" />

    <p :class="$style['home-page__source']">試題與答案來源：大學入學考試中心</p>
  </main>
</template>

<script setup lang="ts">
import type { QuizConfig } from '~/types/quiz'

useHead({ title: '考古題練習本' })

function onStart(config: QuizConfig) {
  navigateTo({ path: '/quiz', query: toQuizQuery(config) })
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.home-page {
  max-width: 51rem;
  margin: 0 auto;
  padding: 2rem 3.5rem 3rem;

  &__header {
    margin-bottom: 1.75rem;
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
    margin: 0.5rem 0 0;
    line-height: 1.6;
    color: var(--color-ink-soft);
  }

  &__source {
    margin-top: 2.5rem;
    font-size: 0.8rem;
    color: var(--color-pencil);
    text-align: center;
  }

  @include respond-to('xs') {
    width: 100%;
    padding: 1.25rem 0.75rem 2rem;

    &__title {
      font-size: 2rem;
    }
  }
}
</style>
