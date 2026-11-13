<template>
  <div :class="$style['quiz-blocks']">
    <template v-for="(block, index) in props.blocks" :key="index">
      <p
        v-if="typeof block === 'string'"
        :data-field="props.fieldId(`${props.name}:${index}`)"
        :class="$style['quiz-blocks__paragraph']"
      >
        <QuizMarkupText :text="block" :ranges="props.rangesOf(`${props.name}:${index}`)" />
      </p>
      <div v-else-if="'table' in block" :class="$style['quiz-blocks__table-wrap']">
        <table data-test="table" :class="$style['quiz-blocks__table']">
          <thead>
            <tr>
              <th v-for="(cell, column) in block.table[0]" :key="column" :data-field="props.fieldId(`${props.name}:${index}:0:${column}`)">
                <QuizMarkupText :text="cell" :ranges="props.rangesOf(`${props.name}:${index}:0:${column}`)" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in block.table.slice(1)" :key="rowIndex">
              <td
                v-for="(cell, column) in row"
                :key="column"
                :data-field="props.fieldId(`${props.name}:${index}:${rowIndex + 1}:${column}`)"
              >
                <QuizMarkupText :text="cell" :ranges="props.rangesOf(`${props.name}:${index}:${rowIndex + 1}:${column}`)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <img
        v-else
        data-test="figure"
        :src="`${baseURL}${block.figure.src}`"
        :width="block.figure.width"
        :height="block.figure.height"
        alt="原卷附圖"
        loading="lazy"
        :class="$style['quiz-blocks__figure']"
      >
    </template>
  </div>
</template>

<script setup lang="ts">
import type { QuizBlock, TextRange } from '~/types/quiz'

interface Props {
  blocks: QuizBlock[]
  /** 螢光筆欄位名稱前綴，例如 lead、body */
  name: string
  fieldId: (part: string) => string
  rangesOf: (part: string) => TextRange[]
}

const props = defineProps<Props>()
/** 圖放在 public/，網址要接上網站的 baseURL */
const baseURL = useRuntimeConfig().app.baseURL
</script>

<style module lang="scss">
.quiz-blocks {
  &__paragraph {
    margin: 0 0 0.75rem;
    line-height: 1.8;
  }

  &__table-wrap {
    margin: 0 0 0.75rem;
    overflow-x: auto;
  }

  &__table {
    border-collapse: collapse;

    th,
    td {
      padding: 0.25rem 0.75rem;
      border: 1px solid var(--color-ink);
      text-align: center;
    }

    th {
      font-weight: 400;
    }
  }

  &__figure {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto 0.75rem;
    mix-blend-mode: multiply;
  }
}
</style>
