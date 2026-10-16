<template>
  <div :class="$style['today-words']">
    <p v-if="words.length && doneCount === words.length" data-test="vocab-done" :class="$style['today-words__done']">
      今天的份背完了！明天再來。
    </p>
    <ul :class="$style['today-words__list']">
      <li
        v-for="item in words"
        :key="item.word"
        data-test="vocab-word"
        :class="[$style['today-words__row'], learned[item.word] && $style['today-words__row--learned']]"
      >
        <Checkbox
          :model-value="Boolean(learned[item.word])"
          :input-id="`${uid}-${item.word}`"
          binary
          @update:model-value="emit('toggle', item.word)"
        />
        <label :for="`${uid}-${item.word}`" :class="$style['today-words__label']">
          <span :class="$style['today-words__word']">{{ item.word }}</span>
          <small v-if="item.level" :class="$style['today-words__level']">第 {{ item.level }} 級</small>
        </label>
        <a
          :href="dictionaryUrl(item.word)"
          target="_blank"
          rel="noopener"
          :class="$style['today-words__lookup']"
        >查字典</a>
        <template v-if="meaningParts(item).length">
          <button
            v-if="item.zh && hideMeaning && !revealed.includes(item.word)"
            type="button"
            data-test="vocab-reveal"
            :class="$style['today-words__reveal']"
            @click="revealed.push(item.word)"
          >看中文</button>
          <span v-else data-test="vocab-meaning" :class="$style['today-words__meaning']">
            <span v-for="(part, i) in meaningParts(item)" :key="i" :class="$style['today-words__part']">
              <small
                v-for="pos in part.pos"
                :key="pos"
                data-test="vocab-pos"
                :data-pos="pos"
                :class="[$style['today-words__pos'], $style[`today-words__pos--${pos}`]]"
              >{{ pos }}.</small>
              <span v-if="part.text" data-test="vocab-zh" :class="$style['today-words__zh']">{{ part.text }}</span>
            </span>
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { LearnedMap, VocabWord } from '~/types/vocab'

const props = defineProps<{
  words: VocabWord[]
  learned: LearnedMap
  /** 遮住中文意思，一個一個點開 */
  hideMeaning?: boolean
}>()

const emit = defineEmits<{ toggle: [word: string] }>()

const uid = useId()
/** 遮住中文時，已經點開的字；切換遮住時重來 */
const revealed = ref<string[]>([])
watch(() => props.hideMeaning, () => { revealed.value = [] })
const doneCount = computed(() => props.words.filter(item => props.learned[item.word]).length)
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.today-words {
  &__done {
    margin: 0 0 0.75rem;
    padding: 0.4rem 0.8rem;
    border: 2px solid var(--color-pen-red);
    border-radius: var(--radius-sketch-alt);
    font-weight: 700;
    color: var(--color-pen-red);
    text-align: center;
  }

  &__list {
    margin: 0;
    padding: 0;
    // 由上往下排完一欄再排下一欄，照字表順序讀
    columns: 2 17rem;
    column-gap: 1.5rem;
    list-style: none;
  }

  // 一個字一格：勾選框、單字、查字典在第一行，中文意思在單字下面
  &__row {
    padding: 0.4rem 0;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.1rem 0.6rem;
    border-bottom: 1px dashed var(--color-paper-line);
    break-inside: avoid;

    &--learned {
      color: var(--color-pencil);
    }
  }

  &__label {
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0 0.5rem;
    cursor: pointer;
  }

  &__word {
    font-size: 1.2rem;
    font-weight: 700;
  }

  // 背好的字用紅筆劃掉
  &__row--learned &__word {
    text-decoration: line-through 2px var(--color-pen-red);
  }

  // 詞性像一張小貼紙，每種詞性一個顏色
  &__pos {
    // 沒列到的詞性用灰色
    --pos-color: var(--color-pen-gray);

    margin-right: 0.3rem;
    padding: 0 0.45em;
    display: inline-block;
    border: 1.5px solid var(--pos-color);
    border-radius: var(--radius-sketch-alt);
    background: color-mix(in srgb, var(--pos-color) 12%, var(--color-card));
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.5;
    color: var(--pos-color);

    @each $pos in n, v, adj, adv, prep, pron, conj, aux, art {
      &--#{$pos} {
        --pos-color: var(--color-pos-#{$pos});
      }
    }
  }

  &__level {
    font-size: 0.8rem;
    color: var(--color-pencil);
  }

  &__meaning,
  &__reveal {
    grid-column: 2 / 4;
    justify-self: start;
  }

  &__meaning {
    display: flex;
    flex-wrap: wrap;
    gap: 0.15rem 0.75rem;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  &__part {
    display: inline-flex;
    align-items: baseline;
  }

  &__zh {
    color: var(--color-meaning);
  }

  &__row--learned &__zh {
    color: var(--color-pencil);
  }

  // 遮住的中文：像貼了一張便利貼，點了才撕開
  &__reveal {
    padding: 0 0.8em;
    background: var(--color-marker);
    border: 1px dashed var(--color-ink-soft);
    border-radius: var(--radius-sketch-alt);
    font-family: inherit;
    font-size: 0.85rem;
    color: var(--color-ink-soft);
    cursor: pointer;
  }

  &__lookup {
    flex-shrink: 0;
    font-size: 0.85rem;
    color: var(--color-ballpoint);
  }

  @include respond-to('xs') {
    &__list {
      columns: 1;
    }
  }
}
</style>
