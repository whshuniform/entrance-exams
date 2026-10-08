import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResultSheet from '~/components/Quiz/ResultSheet.vue'
import type { SubjectReport } from '~/types/quiz'

const report: SubjectReport = {
  subject: '國語文綜合能力測驗',
  year: 115,
  earned: 8.4,
  sampleMax: 14,
  fullMarks: 100,
  scoreRange: { min: 8.4, max: 94.4 },
  levelRange: { min: 2, max: 15 },
  rank: { best: 1, worst: 117976, total: 118026 },
}

describe('ResultSheet', () => {
  it('ResultSheet_Report_ShouldShowScoreLevelAndRankRanges', async () => {
    const wrapper = await mountSuspended(ResultSheet, { props: { reports: [report] } })
    const row = wrapper.find('[data-test="report-國語文綜合能力測驗"]')

    expect(row.find('[data-test="report-score"]').text()).toContain('8.4 / 14')
    expect(row.find('[data-test="report-score"]').text()).toContain('8.4～94.4')
    expect(row.find('[data-test="report-level"]').text()).toBe('2～15 級分')
    expect(row.find('[data-test="report-rank"]').text()).toContain('第 1～117,976 名')
    expect(row.find('[data-test="report-rank"]').text()).toContain('118,026')
  })

  it('ResultSheet_SameLevelAtBothEnds_ShouldShowOneLevel', async () => {
    const exact = { ...report, levelRange: { min: 12, max: 12 } }
    const wrapper = await mountSuspended(ResultSheet, { props: { reports: [exact] } })

    expect(wrapper.find('[data-test="report-level"]').text()).toBe('12 級分')
  })

  it('ResultSheet_OneRowPerSubject', async () => {
    const wrapper = await mountSuspended(ResultSheet, {
      props: { reports: [report, { ...report, subject: '數學A' }] },
    })

    expect(wrapper.findAll('[data-test^="report-"][data-subject]')).toHaveLength(2)
  })

  it('ResultSheet_TimeUp_ShouldSayHandedInAutomatically', async () => {
    const wrapper = await mountSuspended(ResultSheet, { props: { reports: [report], timeUp: true } })

    expect(wrapper.find('[data-test="time-up"]').text()).toContain('時間到')
    expect(wrapper.find('[data-test="time-up"]').text()).toContain('自動交卷')
  })

  it('ResultSheet_HandedInByStudent_ShouldNotShowTimeUp', async () => {
    const wrapper = await mountSuspended(ResultSheet, { props: { reports: [report] } })

    expect(wrapper.find('[data-test="time-up"]').exists()).toBe(false)
  })

  it('ResultSheet_Note_ShouldNameYearOfLevelTable', async () => {
    const wrapper = await mountSuspended(ResultSheet, { props: { reports: [{ ...report, year: 113 }] } })

    expect(wrapper.text()).toContain('113 年大考中心級分表')
  })
})

describe('ResultSheet — 隨機抽題', () => {
  const accuracy = { correct: 3, total: 5, rate: 60 }

  it('ResultSheet_Accuracy_ShouldShowRateAndCorrectCountWithoutLevels', async () => {
    const wrapper = await mountSuspended(ResultSheet, { props: { accuracy } })

    expect(wrapper.find('[data-test="accuracy-rate"]').text()).toBe('60%')
    expect(wrapper.find('[data-test="accuracy-count"]').text()).toBe('答對 3 / 5 題')
    expect(wrapper.find('[data-test="report-level"]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('級分')
  })

  it('ResultSheet_AccuracyTimeUp_ShouldStillSayHandedInAutomatically', async () => {
    const wrapper = await mountSuspended(ResultSheet, { props: { accuracy, timeUp: true } })

    expect(wrapper.find('[data-test="time-up"]').exists()).toBe(true)
  })
})
