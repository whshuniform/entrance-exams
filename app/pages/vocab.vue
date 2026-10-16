<template>
  <AppHeader title="背單字" :back="back" />
  <main data-test="vocab-page" :data-ready="ready" :class="['container', $style['vocab-page']]">
    <p :class="$style['vocab-page__subtitle']">
      設定考試日期，自動把單字平均分到考試前的每一天，由簡單到難。今天沒背完的字，會攤到之後幾天。
    </p>

    <section :class="$style['vocab-page__card']">
      <p data-test="vocab-exam-name" :class="$style['vocab-page__exam']">
        <strong :class="$style['vocab-page__exam-name']">{{ examKind.name }}</strong>必背單字，共 {{ exam.words.length.toLocaleString('en-US') }} 字
      </p>
      <VocabSetup
        v-model:exam-date="examDate"
        v-model:levels="levels"
        :exam="exam"
      />

      <div data-test="vocab-summary" :class="$style['vocab-page__summary']">
        <p v-if="plan.daysLeft === 0" :class="$style['vocab-page__warn']">
          考試日已經到了或過了，改一下考試日期吧。
        </p>
        <template v-else>
          <p :class="$style['vocab-page__headline']">
            距離考試還有 <strong>{{ plan.daysLeft }}</strong> 天，<span :class="$style['vocab-page__nowrap']">每天背
              <strong :class="$style['vocab-page__quota']">{{ plan.quota }}</strong> 個字</span>
          </p>
          <p v-if="!plan.remaining && !plan.quota" :class="$style['vocab-page__hint']">選到的字全部背完了！</p>
        </template>
        <div :class="$style['vocab-page__progress']">
          <ProgressBar :value="percent" :show-value="false" :class="$style['vocab-page__bar']" />
          <span>已背 {{ learnedCount }} / {{ total.toLocaleString('en-US') }} 字</span>
        </div>
      </div>
    </section>

    <section v-if="plan.words.length" :class="$style['vocab-page__section']">
      <h2 :class="$style['vocab-page__heading']">
        今天要背的字
        <small :class="$style['vocab-page__count']">{{ plan.doneToday }} / {{ plan.words.length }}</small>
      </h2>
      <div :class="$style['vocab-page__tools']">
        <p :class="$style['vocab-page__hint']">背好了就打勾，會用紅筆劃掉；點「查字典」聽發音、看例句。</p>
        <label data-test="vocab-hide-meaning" :for="hideId" :class="$style['vocab-page__switch']">
          <ToggleSwitch v-model="hideMeaning" :input-id="hideId" />
          <span>遮住中文</span>
        </label>
      </div>
      <VocabTodayWords :words="plan.words" :learned="learned" :hide-meaning="hideMeaning" @toggle="toggle" />
    </section>

    <section v-if="schedule.length" :class="$style['vocab-page__section']">
      <h2 :class="$style['vocab-page__heading']">每天的進度</h2>
      <VocabPlanSchedule :days="schedule" />
    </section>

    <div :class="$style['vocab-page__footer']">
      <Button
        v-if="learnedCount"
        data-test="vocab-reset"
        size="small"
        text
        label="清除這個考試的背誦紀錄"
        @click="onReset"
      />
      <p :class="$style['vocab-page__note']">進度只存在這台裝置的瀏覽器裡，換手機或清除瀏覽資料就會不見。</p>
      <p data-test="vocab-source" :class="$style['vocab-page__source']">單字表來源：{{ exam.source }}。中文意思為本站整理，僅供參考。</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { findExam } from '~/data/catalog'
import { vocabExams } from '~/data/vocab'

const { exam, examId, examDate, hideMeaning, levels, total, learnedCount, plan, schedule, toggle, resetProgress, learned } =
  useVocabPlan(vocabExams)

// 從考試頁進來時網址帶 ?exam=gsat|cap，直接選好那個考試
const route = useRoute()
const queryExam = vocabExams.find(item => item.id === route.query.exam)
if (queryExam) examId.value = queryExam.id

/** 選到的考試在考試選單裡的資料（名稱、全名） */
const examKind = computed(() => findExam(examId.value)!)
/** header 的返回鍵回到這個考試的頁面 */
const back = computed(() => ({ to: `/${examKind.value.id}`, label: examKind.value.name }))

// 網頁標題用考試全名，例如「大學學科能力測驗 背單字」
useHead({ title: () => `${examKind.value.fullName} 背單字` })

const hideId = useId()
const percent = computed(() => (total.value ? (learnedCount.value / total.value) * 100 : 0))

/** 畫面可以操作了（E2E 等這個再點選） */
const ready = ref(false)
onMounted(() => {
  ready.value = true
})

function onReset() {
  if (window.confirm(`確定要清除「${exam.value.name}」的背誦紀錄嗎？`)) resetProgress()
}
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

.vocab-page {
  max-width: 51rem;
  margin: 0 auto;
  padding: 1.5rem 3.5rem 3rem;





  &__subtitle {
    margin: 0 0 1.5rem;
    line-height: 1.6;
    color: var(--color-ink-soft);
  }

  &__exam {
    margin: 0 0 1rem;
    font-size: 1.1rem;
  }

  &__exam-name {
    margin-right: 0.25em;
    padding: 0 0.2em;
    background: linear-gradient(transparent 55%, var(--color-marker) 55%, var(--color-marker) 90%, transparent 90%);
  }

  &__card {
    padding: 1.25rem 1.5rem 1.5rem;

    @include sketch-border(2px);

    background: var(--color-card);
    box-shadow: var(--shadow-sketch);
  }

  &__summary {
    padding-top: 1rem;
    border-top: 2px dashed var(--color-paper-line);
  }

  &__headline {
    margin: 0;
    font-size: 1.25rem;
  }

  // 每天要背的字數用紅筆圈起來
  &__quota {
    padding: 0 0.3em;
    border: 2px solid var(--color-pen-red);
    border-radius: 52% 48% 55% 45% / 47% 55% 45% 53%;
    font-size: 1.5rem;
    color: var(--color-pen-red);
  }

  &__nowrap {
    white-space: nowrap;
  }

  &__warn {
    margin: 0;
    font-weight: 700;
    color: var(--color-pen-red);
  }

  &__progress {
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    color: var(--color-ink-soft);
  }

  &__bar {
    flex: 1;
    height: 0.9rem;
  }

  &__section {
    margin-top: 2rem;
  }

  &__heading {
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    font-size: 1.4rem;
  }

  &__count {
    font-size: 1rem;
    color: var(--color-pen-red);
  }

  &__hint {
    margin: 0.25rem 0 0.5rem;
    font-size: 0.85rem;
    color: var(--color-pencil);
  }

  &__tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem 1rem;
  }

  &__switch {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
  }

  &__footer {
    margin-top: 2.5rem;
    text-align: center;
  }

  &__note,
  &__source {
    margin: 0.5rem 0 0;
    font-size: 0.8rem;
    color: var(--color-pencil);
  }

  @include respond-to('xs') {
    width: 100%;
    padding: 1rem 0.75rem 2rem;

    &__card {
      padding: 1rem 0.9rem 1.25rem;
    }
  }
}
</style>
