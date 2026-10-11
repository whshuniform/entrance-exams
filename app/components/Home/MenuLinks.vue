<template>
  <nav data-test="menu" :data-ready="ready" :class="$style['menu-links']">
    <template v-for="item in items" :key="item.id">
      <NuxtLink v-if="item.to" :to="item.to" :data-test="`menu-${item.id}`" :class="$style['menu-links__item']">
        <strong :class="$style['menu-links__title']">{{ item.title }}</strong>
        <small :class="$style['menu-links__hint']">{{ item.hint }}</small>
      </NuxtLink>
      <div
        v-else
        :data-test="`menu-${item.id}`"
        aria-disabled="true"
        :class="[$style['menu-links__item'], $style['menu-links__item--disabled']]"
      >
        <strong :class="$style['menu-links__title']">{{ item.title }}</strong>
        <small :class="[$style['menu-links__hint'], $style['menu-links__hint--soon']]">{{ item.hint }}</small>
      </div>
    </template>
  </nav>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/utils/exam-menu'

defineProps<{ items: MenuItem[] }>()

/** 畫面可以操作了（E2E 等這個再點選） */
const ready = ref(false)
onMounted(() => {
  ready.value = true
})
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 一排手繪卡片，整張都能點；準備中的用虛線框、蓋紅色小章
.menu-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: 1rem;

  &__item {
    min-height: 7rem;
    padding: 1.1rem 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;

    @include sketch-border(2px);

    background: var(--color-card);
    box-shadow: var(--shadow-sketch);
    color: var(--color-ink);
    text-decoration: none;
    transition: transform 0.15s, background 0.15s;

    &:hover,
    &:focus-visible {
      background: linear-gradient(transparent 55%, var(--color-marker) 55%, var(--color-marker) 90%, transparent 90%), var(--color-card);
      transform: rotate(-1deg);
    }

    &--disabled {
      border-style: dashed;
      border-color: var(--color-pencil);
      box-shadow: none;
      color: var(--color-pencil);
      cursor: not-allowed;

      &:hover {
        background: var(--color-card);
        transform: none;
      }
    }
  }

  &__title {
    font-size: 1.6rem;
    line-height: 1.3;
  }

  &__hint {
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--color-ink-soft);

    &--soon {
      align-self: flex-start;
      padding: 0 0.4em;
      border: 1.5px solid var(--color-pen-red);
      border-radius: 4px;
      color: var(--color-pen-red);
      transform: rotate(-3deg);
    }
  }

  @include respond-to('xs') {
    grid-template-columns: 1fr;
    gap: 0.75rem;

    &__item {
      min-height: 5.5rem;
    }
  }
}
</style>
