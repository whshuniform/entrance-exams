<template>
  <aside v-if="ready" data-test="mascot" :class="$style['mascot-corner']" aria-label="看板娘">
    <template v-if="visible.value.value">
      <div :class="$style['mascot-corner__bubble']">
        <p data-test="mascot-bubble" :class="$style['mascot-corner__line']" aria-live="polite">{{ line }}</p>
        <button
          type="button"
          data-test="mascot-hide"
          :class="$style['mascot-corner__hide']"
          aria-label="收起小墨"
          @click="visible.value.value = false"
        >
          ×
        </button>
      </div>
      <button
        type="button"
        data-test="mascot-girl"
        :class="$style['mascot-corner__girl']"
        aria-label="看板娘小墨，點一下換一句話"
        @click="talk"
      >
        <MascotGirl :hop="hop" @animationend="hop = false" />
      </button>
    </template>
    <button
      v-else
      type="button"
      data-test="mascot-show"
      :class="$style['mascot-corner__show']"
      @click="visible.value.value = true"
    >
      叫小墨出來
    </button>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  /** 依序說的話，點一下換下一句，說完從頭 */
  lines: readonly string[]
}>()

const visible = useMascotVisible()
const index = ref(0)
const hop = ref(false)
const line = computed(() => props.lines[index.value % props.lines.length] ?? '')

/** 首頁是預先產生的靜態頁：掛載後才讀「收起」設定，避免先出現又消失 */
const ready = ref(false)
onMounted(() => {
  visible.load()
  ready.value = true
})

function talk() {
  index.value = (index.value + 1) % props.lines.length
  hop.value = true
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 固定在左下角（右下角留給作答頁的繪畫工具），對話泡泡在她右上方
.mascot-corner {
  --mascot-width: 7.5rem;

  position: fixed;
  bottom: 0;
  left: 0.75rem;
  z-index: 20;

  width: var(--mascot-width);

  &__girl {
    width: 100%;

    padding: 0;

    display: block;

    background: none;
    border: none;

    cursor: pointer;
  }

  &__bubble {
    position: absolute;
    bottom: calc(var(--mascot-width) * 0.95);
    left: calc(var(--mascot-width) * 0.8);

    width: max-content;
    max-width: min(15rem, calc(100vw - var(--mascot-width) * 0.8 - 2rem));

    padding: 0.6rem 1.6rem 0.6rem 0.9rem;

    @include sketch-border(2px, true);

    background: var(--color-card);
    box-shadow: var(--shadow-sketch);

    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-ink);

    // 泡泡尾巴指向小墨
    &::after {
      content: '';
      position: absolute;
      bottom: -0.55rem;
      left: 0.9rem;

      width: 0.9rem;
      height: 0.9rem;

      background: var(--color-card);
      border-right: 2px solid var(--color-ink);
      border-bottom: 2px solid var(--color-ink);

      transform: rotate(35deg) skewX(10deg);
    }
  }

  &__line {
    margin: 0;
  }

  // 泡泡右上角的小叉叉
  &__hide {
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;

    width: 1.4rem;
    height: 1.4rem;

    padding: 0;

    background: none;
    border: none;

    font-size: 1.1rem;
    line-height: 1;
    color: var(--color-pencil);

    cursor: pointer;
  }

  &__show {
    margin-bottom: 0.75rem;
    padding: 0.35em 0.9em;

    @include sketch-border(2px);

    background: var(--color-card);
    box-shadow: var(--shadow-sketch);

    font-size: 0.85rem;
    color: var(--color-ink);
    white-space: nowrap;

    cursor: pointer;
  }

  @include respond-to('xs') {
    --mascot-width: 6.5rem;

    left: 0.25rem;
  }
}
</style>
