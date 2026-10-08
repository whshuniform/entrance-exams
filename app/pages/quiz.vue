<template>
  <main v-if="!quiz" :class="['container', $style['quiz-page']]">
    <section data-test="quiz-not-found" :class="$style['quiz-page__missing']">
      <h1 :class="$style['quiz-page__title']">找不到這份考卷</h1>
      <p>網址裡的考試、年度或科目不在題庫裡，請回首頁重新選。</p>
      <NuxtLink to="/" :class="$style['quiz-page__home']">← 回首頁</NuxtLink>
    </section>
  </main>
  <main
    v-else
    :class="[
      'container',
      $style['quiz-page'],
      !toolsVisible && $style['quiz-page--full'],
      totalSeconds > 0 && $style['quiz-page--timed'],
    ]"
  >
    <header :class="$style['quiz-page__header']">
      <NuxtLink to="/" :class="$style['quiz-page__home']">← 回首頁</NuxtLink>
      <h1 :class="$style['quiz-page__title']">
        <span :class="$style['quiz-page__highlight']">{{ quiz.papers[0]?.exam }}練習本</span>
      </h1>
      <p :class="$style['quiz-page__subtitle']">{{ subtitle }}</p>
      <p :class="$style['quiz-page__progress']">已作答 {{ answeredCount }} / {{ questions.length }}</p>
      <p :class="$style['quiz-page__tip']">
        小技巧：右下角選螢光筆、原子筆或橡皮擦，就能在題目、選項和計算紙上畫，這時用兩指上下滑動捲動頁面；要作答時按「關閉繪畫」。想用刪去法，就用原子筆把選項劃掉。
      </p>
    </header>

    <!-- 計時作答：倒數是固定在畫面最上方的細長條，往下捲也看得到 -->
    <div v-if="totalSeconds > 0" :class="$style['quiz-page__timer']">
      <QuizTimer
        data-test="quiz-timer"
        :total="totalSeconds"
        :remaining="countdown.remaining.value"
        :status="countdown.status.value"
      />
    </div>

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
            <span>{{ currentSheet.paper.year }}年{{ currentSheet.paper.exam }}　{{ currentSheet.paper.subject }}</span>
            <span>第 {{ currentSheet.pageNumber }} 頁 共 {{ currentSheet.pageCount }} 頁</span>
          </header>
          <h3 v-if="currentSheet.startsPart && currentSheet.part.title" :class="$style['quiz-page__part']">{{ currentSheet.part.title }}</h3>
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
            :scoring="isRandom ? 'accuracy' : 'points'"
            @update:model-value="setAnswer(currentSheet.question.id, $event)"
            @mark="markText"
            @erase="eraseText"
            @update:ink="setInk(currentSheet.question.id, $event)"
            @update:scratch-open="setScratchOpen(currentSheet.question.id, $event)"
          />
        </section>
        <section v-else key="result" data-test="result-sheet">
          <QuizResultSheet :reports="reports" :accuracy="accuracy" :time-up="timeUp" />
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

    <QuizDrawToolbar v-model="tool" v-model:visible="toolsVisible" />
  </main>
</template>

<script setup lang="ts">
import { examCatalog } from '~/data/catalog'
import type { DrawTool } from '~/types/quiz'

// 首頁選好的考卷帶在網址上；隨機抽題在進到這頁時從所選年度或課綱一起抽（這頁只在瀏覽器畫，見 nuxt.config routeRules）
const route = useRoute()
const quiz = parseQuizQuery(route.query, examCatalog)
const isRandom = quiz?.config.mode === 'random'
const papers = !quiz ? [] : isRandom ? pickQuestions(quiz.papers, quiz.config.count) : quiz.papers
const questions = paperQuestions(papers)
// 隨機抽題跨年度時，整份練習卷連續編頁碼
const sheets = buildPages(papers, { continuous: isRandom })

const subtitle = computed(() => {
  const first = quiz?.papers[0]
  if (!quiz || !first) return ''
  const { config } = quiz
  const range = config.curriculum ? `${config.curriculum}（${formatYears(config.years)} 年）` : `${formatYears(config.years)} 學年度`
  const mode = isRandom ? `隨機抽 ${questions.length} 題` : `整份考卷・試作 ${questions.length} 題`
  const limit = config.minutes > 0 ? `・限時 ${config.minutes} 分鐘` : ''
  return `${range}・${first.subject}・${mode}${limit}`
})

useHead({ title: pageTitle() })

function pageTitle() {
  const first = quiz?.papers[0]
  if (!first) return '找不到考卷｜考古題練習本'
  return isRandom
    ? `${first.exam} ${first.subject} 隨機抽題｜考古題練習本`
    : `${first.year}${first.exam} ${first.subject}｜考古題練習本`
}

const { answers, submitted, answeredCount, results, setAnswer, submit, reset } = useQuiz(questions)
const { highlights, ink, markText, eraseText, setInk, clearAll } = useMarks()
/** 右下角工具列，預設關閉繪畫 */
const tool = ref<DrawTool>('off')
/** 工具列隱藏時，題目往右延伸變滿版 */
const toolsVisible = ref(true)
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
// 整份考卷看級分和名次；隨機抽題看答對率和答對題數
const reports = computed(() => (isRandom ? [] : papers.map(item => buildReport(item, results.value))))
const accuracy = computed(() => (isRandom ? buildAccuracy(questions, results.value) : undefined))

// 計時作答：離開作答注意事項（按「開始作答」）才開始倒數，時間到自動交卷
const totalSeconds = (quiz?.config.minutes ?? 0) * 60
const countdown = useCountdown(() => totalSeconds, onTimeUp)
/** 這次交卷是時間到自動交的 */
const timeUp = ref(false)

watch(isGuide, (guide) => {
  if (!guide && totalSeconds > 0 && countdown.status.value === 'waiting') countdown.start()
})

const sheetTop = ref<HTMLElement | null>(null)

/** 翻頁後若題目頂端已捲出畫面（或被最上方的倒數長條蓋住），捲回這一頁的開頭 */
function flip(action: () => void) {
  action()
  const desk = sheetTop.value
  if (!desk) return
  const margin = Number.parseFloat(getComputedStyle(desk).scrollMarginTop) || 0
  if (desk.getBoundingClientRect().top < margin) desk.scrollIntoView({ block: 'start' })
}

function setScratchOpen(id: string, open: boolean) {
  scratchOpen.value = { ...scratchOpen.value, [id]: open }
}

function onSubmit() {
  countdown.stop()
  submit()
  flip(() => goTo(resultPage))
}

/** 時間到：停止作答、關閉繪畫，直接交卷翻到成績單 */
function onTimeUp() {
  if (submitted.value) return
  timeUp.value = true
  tool.value = 'off'
  submit()
  flip(() => goTo(resultPage))
}

function onReset() {
  reset()
  clearAll()
  scratchOpen.value = {}
  tool.value = 'off'
  timeUp.value = false
  // 重新作答直接回到第 1 題，計時從頭開始
  goTo(GUIDE_PAGES)
  if (totalSeconds > 0) countdown.start()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 右側留給固定在右下角的繪畫工具列，整頁往左移；工具隱藏時左右對稱變滿版
.quiz-page {
  max-width: 51rem;
  margin: 0 auto;
  padding: 2rem 6rem 3rem 3.5rem;
  transition: padding-right 0.3s ease;

  &--full {
    padding-right: 3.5rem;
  }

  // 計時作答：上方留出倒數長條的高度
  &--timed {
    padding-top: calc(var(--timer-bar-height) + 2rem);
  }

  &__header {
    margin-bottom: 2rem;
  }

  // 像鉛筆寫的連結
  &__home {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: var(--color-ink-soft);
    text-decoration: underline wavy var(--color-pencil);
    text-underline-offset: 0.25em;
  }

  // 倒數長條固定在畫面最上方，整排橫跨畫面
  &__timer {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 20;
  }

  &__missing {
    padding: 2rem 0;
    text-align: center;
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

  // 翻頁捲回頁首時，停在倒數長條下面
  &--timed &__desk {
    scroll-margin-top: calc(var(--timer-bar-height) + 0.5rem);
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

    &--full {
      padding-right: 0.75rem;
    }

    &--timed {
      padding-top: calc(var(--timer-bar-height) + 1.25rem);
    }

    &__title {
      font-size: 2rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
