<template>
  <AppHeader :title="title" :back="back" />
  <main :class="['container', $style['home-shell']]">
    <p v-if="subtitle" :class="$style['home-shell__subtitle']">{{ subtitle }}</p>

    <slot />

    <p :class="$style['home-shell__source']">試題與答案來源：{{ source }}</p>
  </main>
  <MascotCorner :lines="lines" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** 顯示在固定 header 中間的標題 */
  title: string
  subtitle?: string
  /** header 左邊的返回鍵，例如返回首頁 */
  back?: { to: string, label: string }
  /** 頁尾的出題單位；首頁列所有考試的出題單位 */
  source?: string
  /** 看板娘小墨在這一頁要說的話（接在打招呼後面） */
  mascot?: readonly string[]
}>(), { subtitle: undefined, back: undefined, source: '大學入學考試中心、國家教育研究院心理與教育測驗研究發展中心', mascot: () => [] })

const lines = computed(() => mascotLines(new Date().getHours(), props.mascot))
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 首頁、考試頁、作試題設定頁共用的版面
.home-shell {
  max-width: 51rem;
  margin: 0 auto;
  // 底部留空間給左下角的看板娘
  padding: 1.5rem 3.5rem 10rem;

  &__subtitle {
    margin: 0 0 1.5rem;
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
    padding: 1rem 0.75rem 8rem;
  }
}
</style>
