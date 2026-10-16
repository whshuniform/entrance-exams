import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodayWords from '~/components/Vocab/TodayWords.vue'

const words = [
  { word: 'able', pos: 'adj.', level: 1, zh: 'adj. 能夠的' },
  { word: 'accomplish(ment)', pos: 'v./(n.)', level: 4, zh: 'v. 完成；n. 成就' },
]

describe('TodayWords', () => {
  it('TodayWords_Render_ShouldShowWordPosLevelAndDictionaryLink', async () => {
    const wrapper = await mountSuspended(TodayWords, { props: { words, learned: {} } })

    const rows = wrapper.findAll('[data-test="vocab-word"]')
    expect(rows).toHaveLength(2)
    expect(rows[1]!.text()).toContain('accomplish(ment)')
    const meaning = rows[1]!.find('[data-test="vocab-meaning"]')
    expect(meaning.findAll('[data-test="vocab-pos"]').map(tag => tag.text())).toEqual(['v.', 'n.'])
    expect(meaning.findAll('[data-test="vocab-pos"]').map(tag => tag.attributes('data-pos'))).toEqual(['v', 'n'])
    expect(meaning.findAll('[data-test="vocab-zh"]').map(text => text.text())).toEqual(['完成', '成就'])
    expect(rows[1]!.text()).toContain('第 4 級')
    expect(rows[1]!.find('a').attributes('href')).toContain('/accomplish')
    expect(rows[1]!.find('a').attributes('target')).toBe('_blank')
  })

  it('TodayWords_CheckWord_ShouldEmitToggle', async () => {
    const wrapper = await mountSuspended(TodayWords, { props: { words, learned: {} } })

    await wrapper.find('[data-test="vocab-word"] input').setValue(true)

    expect(wrapper.emitted('toggle')).toEqual([['able']])
  })

  it('TodayWords_AllLearned_ShouldCheerAndKeepList', async () => {
    const learned = { 'able': '2027-01-20', 'accomplish(ment)': '2027-01-20' }

    const wrapper = await mountSuspended(TodayWords, { props: { words, learned } })

    expect(wrapper.find('[data-test="vocab-done"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-test="vocab-word"] input').every(input => (input.element as HTMLInputElement).checked)).toBe(true)
  })

  it('TodayWords_NoWords_ShouldShowNothingToLearn', async () => {
    const wrapper = await mountSuspended(TodayWords, { props: { words: [], learned: {} } })

    expect(wrapper.findAll('[data-test="vocab-word"]')).toHaveLength(0)
    expect(wrapper.find('[data-test="vocab-done"]').exists()).toBe(false)
  })

  it('TodayWords_HideMeaning_ShouldCoverMeaningUntilTapped', async () => {
    const wrapper = await mountSuspended(TodayWords, { props: { words, learned: {}, hideMeaning: true } })

    expect(wrapper.text()).not.toContain('能夠的')
    await wrapper.find('[data-test="vocab-reveal"]').trigger('click')

    expect(wrapper.findAll('[data-test="vocab-word"]')[0]!.text()).toContain('能夠的')
    expect(wrapper.text()).not.toContain('完成')
  })

  it('TodayWords_NoMeaning_ShouldShowPos', async () => {
    const wrapper = await mountSuspended(TodayWords, { props: { words: [{ word: 'zoo', pos: 'n.' }], learned: {} } })

    const tag = wrapper.find('[data-test="vocab-word"] [data-test="vocab-pos"]')
    expect(tag.text()).toBe('n.')
    expect(tag.attributes('data-pos')).toBe('n')
  })
})
