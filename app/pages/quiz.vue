<template>
  <AppHeader :title="heading" :back="back" />
  <main v-if="!quiz" :class="['container', $style['quiz-page']]">
    <section data-test="quiz-not-found" :class="$style['quiz-page__missing']">
      <p :class="$style['quiz-page__missing-title']">找不到這份考卷</p>
      <p>網址裡的考試、年度或科目不在題庫裡，請按左上角返回重新選。</p>
    </section>
  </main>
  <main
    v-else
    :class="[
      'container',
      $style['quiz-page'],
      (revealed || !toolsVisible) && $style['quiz-page--full'],
      totalSeconds > 0 && $style['quiz-page--timed'],
    ]"
  >
    <!-- 說明和小技巧只在第一頁（作答注意事項）顯示 -->
    <header v-if="isGuide" data-test="quiz-intro" :class="$style['quiz-page__header']">
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

    <!-- 像真實試卷：每頁的題目跟原試題 PDF 同一頁，翻頁做下一頁；標題跟原卷一樣只印在段落開頭 -->
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
        <section v-else-if="currentSheet" :key="sheetKey" data-test="sheet">
          <header data-test="running-header" :class="$style['quiz-page__running']">
            <span>{{ currentSheet.paper.year }}年{{ currentSheet.paper.exam }}　{{ currentSheet.paper.subject }}</span>
            <span>第 {{ currentSheet.pageNumber }} 頁 共 {{ currentSheet.pageCount }} 頁</span>
          </header>
          <template v-for="item in currentSheet.items" :key="item.question.id">
            <h3 v-if="item.startsPart && item.part.title" :class="$style['quiz-page__part']">{{ item.part.title }}</h3>
            <template v-if="item.startsGroup">
              <h4 v-if="item.group.title" :class="$style['quiz-page__group']">{{ item.group.title }}</h4>
              <p :class="$style['quiz-page__note']">{{ item.group.note }}</p>
            </template>
            <QuizQuestionCard
              :question="item.question"
              :model-value="answers[item.question.id] ?? ''"
              :submitted="submitted"
              :revealed="revealed"
              :result="results[item.question.id]"
              :highlights="highlights"
              :tool="tool"
              :ink="ink[item.question.id]"
              :scratch-open="scratchOpen[item.question.id] ?? false"
              :scoring="isRandom ? 'accuracy' : 'points'"
              :show-lead="item.startsLead"
              :lead-elsewhere="Boolean(item.question.lead) && !leadsOnSheet.has(item.question.lead!.id)"
              :stats="itemStatsFor(item.question.id)"
              :slot-answers="item.startsLead ? slotAnswersFor(item.question) : undefined"
              :taken-keys="takenKeys(item.question, questions, answers)"
              @update:model-value="setAnswer(item.question.id, $event)"
              @mark="markText"
              @erase="eraseText"
              @update:ink="setInk(item.question.id, $event)"
              @update:scratch-open="setScratchOpen(item.question.id, $event)"
              @open-slot="openSlot(item.question, $event)"
              @open-lead="leadDialog = item.question.lead ?? null"
            />
          </template>
        </section>
        <section v-else key="result" data-test="result-sheet">
          <QuizResultSheet :reports="reports" :accuracy="accuracy" :time-up="timeUp" />
        </section>
      </Transition>
    </div>

    <nav
      data-test="pager"
      :data-sheet="isGuide ? 'guide' : currentSheet ? sheetKey : 'result'"
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
      <!-- 直接看答案不作答，沒有交卷 -->
      <Button v-else-if="!submitted && !revealed" label="交卷批改" @click="onSubmit" />
      <Button v-else-if="submitted" label="重新作答" severity="secondary" @click="onReset" />
    </nav>

    <p :class="$style['quiz-page__source']">試題與答案來源：大學入學考試中心</p>

    <!-- 點文章裡的題號：跳出那一題的選項，不用捲到文章下面作答 -->
    <Dialog
      :visible="slotQuestion !== null"
      modal
      dismissable-mask
      :header="slotQuestion ? `第 ${slotQuestion.number} 題` : ''"
      :class="$style['quiz-page__slot-dialog']"
      @update:visible="!$event && closeSlot()"
    >
      <div v-if="slotQuestion" data-test="slot-dialog">
        <QuizQuestionCard
          :question="slotQuestion"
          :model-value="answers[slotQuestion.id] ?? ''"
          :submitted="submitted"
          :revealed="revealed"
          :result="results[slotQuestion.id]"
          :highlights="highlights"
          :scoring="isRandom ? 'accuracy' : 'points'"
          :stats="itemStatsFor(slotQuestion.id)"
          :taken-keys="slotTarget ? takenKeys(slotTarget, questions, answers) : []"
          compact
          @update:model-value="pickInSlot(slotQuestion, $event)"
        />
      </div>
    </Dialog>

    <!-- 題組文章印在前一頁時，按「看題組文章」在這裡看，不用翻頁 -->
    <Dialog
      :visible="leadDialog !== null"
      modal
      dismissable-mask
      header="題組文章"
      :class="$style['quiz-page__lead-dialog']"
      @update:visible="!$event && (leadDialog = null)"
    >
      <div v-if="leadDialog" data-test="lead-dialog">
        <QuizBlocks :blocks="leadDialog.blocks" name="lead-dialog" :field-id="part => `lead-dialog:${part}`" :ranges-of="() => []" />
      </div>
    </Dialog>

    <!-- 直接看答案不作答，不出現繪圖工具 -->
    <QuizDrawToolbar v-if="!revealed" v-model="tool" v-model:visible="toolsVisible" />
  </main>
</template>

<script setup lang="ts">
import { examCatalog, findExam } from '~/data/catalog'
import type { DrawTool, QuizLead, QuizQuestion } from '~/types/quiz'

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
  const mode = isRandom ? `隨機抽 ${questions.length} 題` : `整份考卷・選擇題 ${questions.length} 題`
  const limit = config.minutes > 0 ? `・限時 ${config.minutes} 分鐘` : ''
  const reveal = config.reveal ? '・直接看答案' : ''
  return `${range}・${first.subject}・${mode}${limit}${reveal}`
})

/** header 標題：年度＋科目 */
const heading = !quiz ? '找不到考卷' : quizHeading(quiz.config, quiz.papers[0]?.subject ?? '')

// 學測裡的頁面一律返回大學學測頁；網址的考試不存在才回首頁
const exam = findExam(String(route.query.exam ?? ''))
const back = exam ? { to: `/${exam.id}`, label: exam.name } : { to: '/', label: '首頁' }

useHead({ title: pageTitle() })

/** 網頁標題用考試全名，例如「115 學年度大學學科能力測驗 國語文綜合能力測驗」 */
function pageTitle() {
  const first = quiz?.papers[0]
  if (!first || !exam) return '找不到考卷｜考古題'
  return isRandom
    ? `${exam.fullName} ${first.subject} 隨機抽題`
    : `${first.year} 學年度${exam.fullName} ${first.subject}`
}

const { answers, submitted, answeredCount, results, setAnswer, submit, reset } = useQuiz(questions)
const { highlights, ink, markText, eraseText, setInk, clearAll } = useMarks()
/** 右下角工具列，預設關閉繪畫 */
const tool = ref<DrawTool>('off')
/** 工具列隱藏時，題目往右延伸變滿版 */
const toolsVisible = ref(true)
/** 首頁按「直接看答案」進來：每題圈出正解、列出大家怎麼選，不作答也不打分數 */
const revealed = quiz?.config.reveal === true
/** 每題計算紙開著與否，翻頁回來仍記得 */
const scratchOpen = ref<Record<string, boolean>>({})

// 第 0 頁是作答注意事項，接著是試題頁（跟原卷同一頁的題目排在一起），交卷後多一頁成績單
// 直接看答案不作答，不需要作答注意事項，一進來就是第 1 頁
const GUIDE_PAGES = revealed ? 0 : 1
const resultPage = GUIDE_PAGES + sheets.length
const pageCount = computed(() => resultPage + (submitted.value ? 1 : 0))
const { index, direction, isFirst, isLast, goTo, next, prev } = usePaging(() => pageCount.value)
const isGuide = computed(() => index.value < GUIDE_PAGES)
const currentSheet = computed(() => (isGuide.value ? undefined : sheets[index.value - GUIDE_PAGES]))
/** 這一頁的題目 id，以空白隔開 */
const sheetKey = computed(() => currentSheet.value?.items.map(item => item.question.id).join(' ') ?? '')
const nextLabel = computed(() => {
  if (isGuide.value) return revealed ? '開始看答案' : '開始作答'
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
  const top = desk.getBoundingClientRect().top
  // 直接捲動視窗：scrollIntoView 在頁首附近會多捲過頭，把頁首藏到 header 後面
  if (top < margin) window.scrollBy(0, top - margin)
}

/** 這一頁印出來的題組文章；題組文章在別頁的題目才需要「看題組文章」 */
const leadsOnSheet = computed(() => new Set(currentSheet.value?.items.filter(item => item.startsLead).map(item => item.question.lead?.id) ?? []))
/** 按「看題組文章」跳出的文章 */
const leadDialog = ref<QuizLead | null>(null)

/** 跳出視窗作答的那一題 */
const slotTarget = ref<QuizQuestion | null>(null)
/** 視窗裡顯示的題目：選項文字在題組裡的（文意選填、篇章結構）補上選項文字 */
const slotQuestion = computed(() => (slotTarget.value ? withLeadOptions(slotTarget.value) : null))

/** 題組文章裡每個空格目前的作答：只列這份練習卷有的題目（隨機抽題可能沒抽到） */
function slotAnswersFor(question: QuizQuestion) {
  const lead = question.lead
  if (!lead) return undefined
  return Object.fromEntries(
    questions.filter(item => item.lead?.id === lead.id).map(item => [item.number, answers.value[item.id] ?? '']),
  )
}

function openSlot(question: QuizQuestion, number: number) {
  const target = questions.find(item => item.lead?.id === question.lead?.id && item.number === number)
  if (target) slotTarget.value = target
}

function closeSlot() {
  slotTarget.value = null
}

/** 單選題選了就關閉視窗 */
function pickInSlot(question: QuizQuestion, value: string) {
  setAnswer(question.id, value)
  if (question.type === 'single') closeSlot()
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
  padding: 1.5rem 6rem 3rem 3.5rem;
  transition: padding-right 0.3s ease;

  &--full {
    padding-right: 3.5rem;
  }

  // 計時作答：上方留出倒數長條的高度
  &--timed {
    padding-top: calc(var(--timer-bar-height) + 1.5rem);
  }

  &__header {
    margin-bottom: 2rem;
  }

  // 題號跳出的選項視窗：手機上幾乎滿版
  &__slot-dialog,
  &__lead-dialog {
    width: min(36rem, calc(100vw - 2rem));
  }

  // 倒數長條固定在 header 正下方，整排橫跨畫面
  &__timer {
    position: fixed;
    top: var(--app-header-height);
    right: 0;
    left: 0;
    z-index: 20;
  }

  &__missing {
    padding: 2rem 0;
    text-align: center;
  }

  &__missing-title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
  }

  &__subtitle {
    margin: 0;
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
    // 翻頁捲回頁首時，停在固定的 header 下面
    scroll-margin-top: calc(var(--app-header-height) + 0.5rem);
  }

  // 計時作答：再讓出倒數長條的高度
  &--timed &__desk {
    scroll-margin-top: calc(var(--app-header-height) + var(--timer-bar-height) + 0.5rem);
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
    gap: 0.5rem;

    // 手機上三顆按鈕排一列，字不折行
    > * {
      white-space: nowrap;
    }
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
    padding: 1rem 4.4rem 2rem 0.75rem;

    &--full {
      padding-right: 0.75rem;
    }

    &--timed {
      padding-top: calc(var(--timer-bar-height) + 1.25rem);
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
