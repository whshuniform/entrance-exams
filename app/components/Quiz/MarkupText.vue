<template>
  <span>
    <template v-for="(segment, index) in segments" :key="index">
      <u v-if="segment.underline" :class="$style['markup-text__underline']">{{ segment.text }}</u>
      <template v-else>{{ segment.text }}</template>
    </template>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string
}

const props = defineProps<Props>()

const segments = computed(() => parseMarkup(props.text))
</script>

<style module lang="scss">
.markup-text {
  &__underline {
    text-decoration-color: var(--color-ink);
    text-decoration-style: wavy;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.25em;
  }
}
</style>
