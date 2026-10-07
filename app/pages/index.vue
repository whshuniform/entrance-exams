<template>
  <main :class="['container', $style['quiz-page']]">
    <header :class="$style['quiz-page__header']">
      <h1 :class="$style['quiz-page__title']">
        <span :class="$style['quiz-page__highlight']">學測練習本</span>
      </h1>
      <p :class="$style['quiz-page__subtitle']">115 學年度・試作 {{ questions.length }} 題</p>
      <p :class="$style['quiz-page__progress']">已作答 {{ answeredCount }} / {{ questions.length }}</p>
      <p :class="$style['quiz-page__tip']">
        小技巧：右下角選螢光筆、原子筆或橡皮擦，就能在題目、選項和計算紙上畫，這時用兩指上下滑動捲動頁面；要作答時按「關閉繪畫」。想用刪去法，就用原子筆把選項劃掉。
      </p>
    </header>

    <!-- 像真實試卷：一頁一題，翻頁做下一題；標題跟原試題 PDF 一樣只印在段落開頭 -->
    <div ref="sheetTop" :class="$style['quiz-page__desk']">
      <Transition
        mode="out-in"
        :enter-from-class="$style[`flip-${direction}-enter-from`]"
        :enter-active-class="$style['flip-enter-active']"
        :leave-active-class="$style['flip-leave-active']"
        :leave-to-class="$style[`flip-${direction}-leave-to`]"
      >
        <!-- 像原卷封面：第一頁是作答注意事項 -->
        <section v-if="isGuide" key="guide" data-test="guide-sheet">
          <QuizGuide />
        </section>
        <section v-else-if="currentSheet" :key="currentSheet.question.id" data-test="sheet">
          <header data-test="running-header" :class="$style['quiz-page__running']">
            <span>{{ currentSheet.paper.year }}年學測　{{ currentSheet.paper.subject }}</span>
            <span>第 {{ currentSheet.pageNumber }} 頁 共 {{ currentSheet.pageCount }} 頁</span>
          </header>
          <h3 v-if="currentSheet.startsPart" :class="$style['quiz-page__part']">{{ currentSheet.part.title }}</h3>
          <template v-if="currentSheet.startsGroup">
            <h4 :class="$style['quiz-page__group']">{{ currentSheet.group.title }}</h4>
            <p :class="$style['quiz-page__note']">{{ currentSheet.group.note }}</p>
          </template>
          <QuizQuestionCard
            :question="currentSheet.question"
            :model-value="answers[currentSheet.question.id] ?? ''"
            :submitted="submitted"
            :result="results[currentSheet.question.id]"
            :highlights="highlights"
            :tool="tool"
            :ink="ink[currentSheet.question.id]"
            :scratch-open="scratchOpen[currentSheet.question.id] ?? false"
            @update:model-value="setAnswer(currentSheet.question.id, $event)"
            @mark="markText"
            @erase="eraseText"
            @update:ink="setInk(currentSheet.question.id, $event)"
            @update:scratch-open="setScratchOpen(currentSheet.question.id, $event)"
          />
        </section>
        <section v-else key="result" data-test="result-sheet">
          <QuizResultSheet :reports="reports" />
        </section>
      </Transition>
    </div>

    <nav
      data-test="pager"
      :data-question="isGuide ? 'guide' : currentSheet ? currentSheet.question.id : 'result'"
      aria-label="翻頁"
      :class="$style['quiz-page__pager']"
    >
      <Button data-test="prev-page" label="上一頁" severity="secondary" :disabled="isFirst" @click="flip(prev)" />
      <Button
        v-if="!isLast"
        data-test="next-page"
        :label="nextLabel"
        @click="flip(next)"
      />
      <Button v-else-if="!submitted" label="交卷批改" @click="onSubmit" />
      <Button v-else label="重新作答" severity="secondary" @click="onReset" />
    </nav>

    <p :class="$style['quiz-page__source']">試題與答案來源：大學入學考試中心</p>

    <QuizDrawToolbar v-model="tool" />
  </main>
</template>

<script setup lang="ts">
import { sample115Papers } from '~/data/sample-115-papers'
import type { DrawTool } from '~/types/quiz'

const papers = sample115Papers
const questions = paperQuestions(papers)
const sheets = buildPages(papers)

const { answers, submitted, answeredCount, results, setAnswer, submit, reset } = useQuiz(questions)
const { highlights, ink, markText, eraseText, setInk, clearAll } = useMarks()
/** 右下角工具列，預設關閉繪畫 */
const tool = ref<DrawTool>('off')
/** 每題計算紙開著與否，翻頁回來仍記得 */
const scratchOpen = ref<Record<string, boolean>>({})

// 第 0 頁是作答注意事項，接著一頁一題，交卷後多一頁成績單
const GUIDE_PAGES = 1
const resultPage = GUIDE_PAGES + sheets.length
const pageCount = computed(() => resultPage + (submitted.value ? 1 : 0))
const { index, direction, isFirst, isLast, goTo, next, prev } = usePaging(() => pageCount.value)
const isGuide = computed(() => index.value < GUIDE_PAGES)
const currentSheet = computed(() => (isGuide.value ? undefined : sheets[index.value - GUIDE_PAGES]))
const nextLabel = computed(() => {
  if (isGuide.value) return '開始作答'
  return submitted.value && index.value === resultPage - 1 ? '看成績' : '下一頁'
})
const reports = computed(() => papers.map(paper => buildReport(paper, results.value)))

const sheetTop = ref<HTMLElement | null>(null)

/** 翻頁後若題目頂端已捲出畫面，捲回這一頁的開頭 */
function flip(action: () => void) {
  action()
  const top = sheetTop.value?.getBoundingClientRect().top ?? 0
  if (top < 0) sheetTop.value?.scrollIntoView({ block: 'start' })
}

function setScratchOpen(id: string, open: boolean) {
  scratchOpen.value = { ...scratchOpen.value, [id]: open }
}

function onSubmit() {
  submit()
  flip(() => goTo(resultPage))
}

function onReset() {
  reset()
  clearAll()
  scratchOpen.value = {}
  tool.value = 'off'
  // 重新作答直接回到第 1 題
  goTo(GUIDE_PAGES)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 右側留給固定在右下角的繪畫工具列，整頁往左移
.quiz-page {
  max-width: 51rem;
  margin: 0 auto;
  padding: 2rem 6rem 3rem 3.5rem;

  &__header {
    margin-bottom: 2rem;
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
    margin: 0.25rem 0 0;
    color: var(--color-ink-soft);
  }

  &__progress {
    margin: 0;
    font-size: 0.9rem;
    color: var(--color-pencil);
  }

  &__desk {
    // 翻頁時以左邊為書背
    perspective: 1600px;
  }

  // 試卷頁首：像原卷每頁上方的「115年學測　科目　第 n 頁 共 m 頁」
  &__running {
    margin-bottom: 1.25rem;
    padding-bottom: 0.25rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1.5px solid var(--color-pencil);
    font-size: 0.85rem;
    color: var(--color-pencil);
  }

  &__pager {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__part {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }

  &__group {
    margin: 1.5rem 0 0;
    font-size: 1rem;
  }

  &__note {
    margin: 0 0 1.5rem;
    font-size: 0.9rem;
    color: var(--color-ink-soft);
  }

  &__tip {
    margin: 0.75rem 0 0;
    padding: 0.4rem 0.75rem;
    border: 1.5px dashed var(--color-pencil);
    border-radius: var(--radius-sketch-alt);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--color-pencil);
  }

  &__source {
    margin-top: 2.5rem;
    font-size: 0.8rem;
    color: var(--color-pencil);
    text-align: center;
  }

  @include respond-to('xs') {
    width: 100%;
    padding: 1.25rem 4.4rem 2rem 0.75rem;

    &__title {
      font-size: 2rem;
    }
  }
}

// 翻頁：往後翻時這頁以左邊為軸翻過去，往前翻時反過來
.flip-leave-active,
.flip-enter-active {
  transform-origin: left center;
  transition: transform 0.28s ease-in, opacity 0.28s ease-in;
}

.flip-enter-active {
  transition-timing-function: ease-out;
}

.flip-next-leave-to,
.flip-prev-enter-from {
  opacity: 0;
  transform: rotateY(-70deg);
}

.flip-next-enter-from,
.flip-prev-leave-to {
  opacity: 0;
  transform: translateX(1.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .flip-leave-active,
  .flip-enter-active {
    transition: none;
  }
}
</style>
