import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import VocabSetup from '~/components/Vocab/VocabSetup.vue'
import { vocabExams } from '~/data/vocab'

const mountSetup = (props: Partial<{ examId: string, examDate: string, levels: number[] }> = {}) =>
  mountSuspended(VocabSetup, {
    props: { exams: vocabExams, examId: 'gsat', examDate: '2027-01-22', levels: [1, 2, 3, 4, 5, 6], ...props },
  })

describe('VocabSetup', () => {
  it('VocabSetup_Gsat_ShouldListExamsWithWordCountsAndSixLevels', async () => {
    const wrapper = await mountSetup()

    expect(wrapper.find('[data-test="vocab-exam-gsat"]').text()).toContain('大學學測')
    expect(wrapper.find('[data-test="vocab-exam-gsat"]').text()).toMatch(/6,0\d\d 字/)
    expect(wrapper.find('[data-test="vocab-exam-cap"]').text()).toContain('國中會考')
    expect(wrapper.findAll('[data-test^="vocab-level-"]')).toHaveLength(6)
    expect(wrapper.find('[data-test="vocab-level-1"]').text()).toContain('第 1 級')
  })

  it('VocabSetup_Cap_ShouldHideLevels', async () => {
    const wrapper = await mountSetup({ examId: 'cap', examDate: '2027-05-15', levels: [] })

    expect(wrapper.findAll('[data-test^="vocab-level-"]')).toHaveLength(0)
  })

  it('VocabSetup_PickCap_ShouldEmitExamId', async () => {
    const wrapper = await mountSetup()

    await wrapper.find('[data-test="vocab-exam-cap"] input').setValue(true)

    expect(wrapper.emitted('update:examId')?.at(-1)).toEqual(['cap'])
  })

  it('VocabSetup_UncheckLevel_ShouldEmitRemainingLevels', async () => {
    const wrapper = await mountSetup()

    await wrapper.find('[data-test="vocab-level-6"] input').setValue(false)

    expect(wrapper.emitted('update:levels')?.at(-1)).toEqual([[1, 2, 3, 4, 5]])
  })

  it('VocabSetup_ExamDate_ShouldShowPrefilledDate', async () => {
    const wrapper = await mountSetup()

    expect((wrapper.find('[data-test="vocab-exam-date"] input').element as HTMLInputElement).value).toBe('2027/01/22')
  })
})
