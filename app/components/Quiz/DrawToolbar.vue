<template>
  <nav class="quiz-draw-toolbar" :class="$style['draw-toolbar']" aria-label="繪畫工具">
    <!-- 隱藏時四顆工具往下縮進最下面的按鈕 -->
    <Transition
      :enter-from-class="$style['draw-toolbar__tools--collapsed']"
      :enter-active-class="$style['draw-toolbar__tools--moving']"
      :leave-active-class="$style['draw-toolbar__tools--moving']"
      :leave-to-class="$style['draw-toolbar__tools--collapsed']"
    >
      <div v-if="visible" :id="toolsId" :class="$style['draw-toolbar__tools']">
        <Button
          v-for="item in TOOLS"
          :key="item.value"
          :data-test="`tool-${item.value}`"
          :data-tool="item.value"
          :label="item.label"
          icon-pos="top"
          :aria-pressed="props.modelValue === item.value ? 'true' : 'false'"
          :class="[$style['draw-toolbar__button'], props.modelValue === item.value && $style['draw-toolbar__button--on']]"
          @click="emit('update:modelValue', item.value)"
        >
          <template #icon>
            <svg :class="$style['draw-toolbar__icon']" viewBox="0 0 32 32" aria-hidden="true">
              <!-- 關閉繪畫：被劃掉的筆 -->
              <template v-if="item.value === 'off'">
                <path d="M8 24 L21 9 L24.5 12 L11.5 27 L7 28 Z" />
                <path d="M5 5 L27 27" :class="$style['draw-toolbar__slash']" />
              </template>
              <!-- 螢光筆：斜切筆頭 -->
              <template v-else-if="item.value === 'highlighter'">
                <path d="M6 27 L26 27" :class="$style['draw-toolbar__swatch']" />
                <path d="M10 21 L20 6 L26 10 L16 25 Z" />
                <path d="M10 21 L8 25 L13 25.5" />
              </template>
              <!-- 原子筆 -->
              <template v-else-if="item.value === 'pen'">
                <path d="M7 25 L22 7 C23.5 5.5 26.5 7.5 25 9.5 L10 27 Z" />
                <path d="M7 25 L5.5 28.5 L10 27" />
                <path d="M5 29 C9 27.5 12 30 16 28.5" :class="$style['draw-toolbar__ink']" />
              </template>
              <!-- 橡皮擦 -->
              <template v-else>
                <path d="M5 20 L16 8 L27 18 L18 28 L11 28 Z" />
                <path d="M10.5 14.5 L21.5 24" />
                <path d="M18 28 L28 28" />
              </template>
            </svg>
          </template>
        </Button>
      </div>
    </Transition>

    <Button
      data-test="toolbar-toggle"
      :label="visible ? '隱藏工具' : '顯示工具'"
      icon-pos="top"
      :aria-controls="toolsId"
      :aria-expanded="visible ? 'true' : 'false'"
      :class="[$style['draw-toolbar__button'], $style['draw-toolbar__toggle']]"
      @click="toggle"
    >
      <template #icon>
        <svg :class="$style['draw-toolbar__icon']" viewBox="0 0 32 32" aria-hidden="true">
          <!-- 隱藏：往下收；顯示：往上展開 -->
          <path v-if="visible" d="M9 9 L16 16 L23 9 M9 17 L16 24 L23 17" />
          <path v-else d="M9 23 L16 16 L23 23 M9 15 L16 8 L23 15" />
        </svg>
      </template>
    </Button>
  </nav>
</template>

<script setup lang="ts">
import type { DrawTool } from '~/types/quiz'

interface Props {
  modelValue: DrawTool
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: DrawTool): void
}>()

/** 工具列顯示與否；外層綁 v-model:visible 讓題目在隱藏時變滿版 */
const visible = defineModel<boolean>('visible', { default: true })
const toolsId = useId()

function toggle() {
  // 隱藏工具時順便關閉繪畫，才不會看不到工具卻還在畫畫模式
  if (visible.value && props.modelValue !== 'off') emit('update:modelValue', 'off')
  visible.value = !visible.value
}

const TOOLS: { value: DrawTool, label: string }[] = [
  { value: 'off', label: '關閉繪畫' },
  { value: 'highlighter', label: '螢光筆' },
  { value: 'pen', label: '原子筆' },
  { value: 'eraser', label: '橡皮擦' },
]
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.draw-toolbar {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 10;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__tools {
    display: flex;
    flex-direction: column;
    gap: inherit;
    transform-origin: center bottom;

    &--moving {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    &--collapsed {
      opacity: 0;
      transform: translateY(2rem) scaleY(0);
    }
  }

  &__button {
    width: 4rem;
  }

  &__toggle {
    border-style: dashed;
  }

  &__icon {
    width: 1.6rem;
    height: 1.6rem;
    fill: none;
    stroke: currentcolor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
  }

  &__slash {
    stroke: var(--color-pen-red);
    stroke-width: 2.4;
  }

  &__swatch {
    stroke: var(--color-marker);
    stroke-width: 5;
  }

  &__ink {
    stroke: var(--color-ballpoint);
  }

  @media (prefers-reduced-motion: reduce) {
    &__tools--moving {
      transition: none;
    }
  }

  @include respond-to('xs') {
    right: 0.5rem;
    bottom: 0.75rem;
    gap: 0.4rem;

    &__button {
      width: 3.4rem;
    }
  }
}
</style>

<!-- 覆寫 PrimeVue Button → 不加 module，限縮在根 class 下 -->
<style lang="scss">
@use '@/assets/css/mixins' as *;

.quiz-draw-toolbar .p-button {
  padding: 0.35rem 0.2rem 0.3rem;
  gap: 0.15rem;
  background: var(--color-card);
  color: var(--color-ink);
  font-size: 0.72rem;
  line-height: 1.2;
  white-space: nowrap;

  &:not(:disabled):hover {
    background: var(--color-paper);
    color: var(--color-ink);
  }

  &[aria-pressed='true'],
  &[aria-pressed='true']:not(:disabled):hover {
    background: var(--color-ink);
    color: var(--color-card);
    transform: rotate(-2deg);
  }

  @include respond-to('xs') {
    padding: 0.3rem 0.1rem 0.25rem;
    font-size: 0.66rem;
  }
}
</style>
