<template>
  <!-- 固定在畫面最上方；下面的佔位讓內容不被蓋住 -->
  <header data-test="app-header" :class="$style['app-header']">
    <NuxtLink
      v-if="back"
      data-test="app-back"
      :to="back.to"
      :aria-label="`返回${back.label}`"
      :class="$style['app-header__back']"
    >
      <svg :class="$style['app-header__chevron']" viewBox="0 0 12 20" aria-hidden="true">
        <path d="M10 2 L2 10 L10 18" />
      </svg>
      <span :class="$style['app-header__back-label']">{{ back.label }}</span>
    </NuxtLink>
    <h1 :class="$style['app-header__title']">{{ title }}</h1>
  </header>
  <div :class="$style['app-header__spacer']" aria-hidden="true" />
</template>

<script setup lang="ts">
defineProps<{
  title: string
  /** iOS 樣式的返回鍵：箭頭＋上一頁的名稱 */
  back?: { to: string, label: string }
}>()
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 像 iOS app 的導覽列：返回鍵在左、標題置中，底下一條手繪墨線
.app-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 30;

  height: var(--app-header-height);
  padding: 0 1rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;

  background: color-mix(in srgb, var(--color-paper) 94%, transparent);
  border-bottom: 2px solid var(--color-ink);
  backdrop-filter: blur(6px);

  &__back {
    grid-column: 1;
    justify-self: start;
    min-width: 0;
    min-height: 2.75rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-ballpoint);
    font-size: 1.05rem;
    text-decoration: none;
  }

  &__chevron {
    flex-shrink: 0;
    width: 0.75rem;
    height: 1.25rem;
    fill: none;
    stroke: currentcolor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.6;
  }

  &__back-label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__title {
    grid-column: 2;
    margin: 0;
    overflow: hidden;
    font-size: 1.2rem;
    line-height: 1.3;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__spacer {
    height: var(--app-header-height);
  }

  @include respond-to('xs') {
    padding: 0 0.5rem;

    &__back {
      font-size: 1rem;
    }

    &__title {
      font-size: 1.05rem;
    }
  }
}
</style>
