import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResultSheet from '~/components/Quiz/ResultSheet.vue'
import type { SubjectReport } from '~/types/quiz'

const report: SubjectReport = {
  subject: '國語文綜合能力測驗',
  earned: 9.4,
  sampleMax: 14,
  projected: 67.14,
  fullMarks: 100,
  level: 13,
  rank: { best: 8475, worst: 20276, total: 118026 },
}

describe('ResultSheet', () => {
  it('ResultSheet_Report_ShouldShowScoreLevelAndRank', async () => {
    const wrapper = await mountSuspended(ResultSheet, { props: { reports: [report] } })
    const row = wrapper.find('[data-test="report-國語文綜合能力測驗"]')

    expect(row.find('[data-test="report-score"]').text()).toContain('9.4 / 14')
    expect(row.find('[data-test="report-score"]').text()).toContain('67.14')
    expect(row.find('[data-test="report-level"]').text()).toBe('13 級分')
    expect(row.find('[data-test="report-rank"]').text()).toContain('第 8,475～20,276 名')
    expect(row.find('[data-test="report-rank"]').text()).toContain('118,026')
  })

  it('ResultSheet_OneRowPerSubject', async () => {
    const wrapper = await mountSuspended(ResultSheet, {
      props: { reports: [report, { ...report, subject: '數學A' }] },
    })

    expect(wrapper.findAll('[data-test^="report-"][data-subject]')).toHaveLength(2)
  })
})
