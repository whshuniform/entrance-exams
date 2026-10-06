import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResultSheet from '~/components/Quiz/ResultSheet.vue'
import type { SubjectReport } from '~/types/quiz'

const report: SubjectReport = {
  subject: '國語文綜合能力測驗',
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
})
