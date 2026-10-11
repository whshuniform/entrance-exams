<template>
  <main :class="['container', $style['home-shell']]">
    <header :class="$style['home-shell__header']">
      <NuxtLink v-if="back" :to="back.to" :class="$style['home-shell__back']">← 回{{ back.label }}</NuxtLink>
      <h1 :class="$style['home-shell__title']">
        <span :class="$style['home-shell__highlight']">{{ title }}</span>
      </h1>
      <p v-if="subtitle" :class="$style['home-shell__subtitle']">{{ subtitle }}</p>
    </header>

    <slot />

    <p :class="$style['home-shell__source']">試題與答案來源：大學入學考試中心</p>
  </main>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  /** 回上一層的連結，例如回首頁 */
  back?: { to: string, label: string }
}>()
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 首頁、考試頁、作試題設定頁共用的版面：大標題像螢光筆畫過
.home-shell {
  max-width: 51rem;
  margin: 0 auto;
  padding: 2rem 3.5rem 3rem;

  &__header {
    margin-bottom: 1.75rem;
  }

  &__back {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: var(--color-ink-soft);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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
