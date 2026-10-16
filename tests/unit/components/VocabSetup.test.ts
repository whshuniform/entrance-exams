import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import VocabSetup from '~/components/Vocab/VocabSetup.vue'
import { vocabExams } from '~/data/vocab'
import type { VocabExam } from '~/types/vocab'

const exam = (id: string) => vocabExams.find(item => item.id === id)!

const mountSetup = (props: Partial<{ exam: VocabExam, examDate: string, levels: number[] }> = {}) =>
  mountSuspended(VocabSetup, {
    props: { exam: exam('gsat'), examDate: '2027-01-22', levels: [1, 2, 3, 4, 5, 6], ...props },
  })

describe('VocabSetup', () => {
  it('VocabSetup_Gsat_ShouldNotAskExamAgainAndShowSixLevels', async () => {
    const wrapper = await mountSetup()

    expect(wrapper.findAll('[data-test^="vocab-exam-"] input[type="radio"]')).toHaveLength(0)
    expect(wrapper.text()).not.toContain('選考試')
    expect(wrapper.findAll('[data-test^="vocab-level-"]')).toHaveLength(6)
    expect(wrapper.find('[data-test="vocab-level-1"]').text()).toContain('第 1 級')
  })

  it('VocabSetup_Cap_ShouldHideLevels', async () => {
    const wrapper = await mountSetup({ exam: exam('cap'), examDate: '2027-05-15', levels: [] })

    expect(wrapper.findAll('[data-test^="vocab-level-"]')).toHaveLength(0)
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
