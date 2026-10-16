import { describe, it, expect } from 'vitest'
import {
  addDays, daysBetween, dictionaryUrl, formatDay, levelRange, lookupWord, meaningParts, orderWords, planSchedule, planToday, studyDaysLeft, toDateKey,
} from '~/utils/vocab-plan'
import type { VocabWord } from '~/types/vocab'

const word = (text: string, level?: number): VocabWord => ({ word: text, level })
const tenWords = Array.from({ length: 10 }, (_, i) => word(`w${i}`, 1))

describe('vocab-plan 日期', () => {
  it('toDateKey_LocalDate_ShouldFormatYearMonthDay', () => {
    expect(toDateKey(new Date(2026, 9, 5, 23, 30))).toBe('2026-10-05')
  })

  it('addDays_AcrossMonthEnd_ShouldRollOver', () => {
    expect(addDays('2026-12-30', 3)).toBe('2027-01-02')
  })

  it('daysBetween_ExamInFuture_ShouldCountCalendarDays', () => {
    expect(daysBetween('2026-10-10', '2027-01-22')).toBe(104)
  })

  it('studyDaysLeft_ExamTomorrow_ShouldLeaveOnlyToday', () => {
    expect(studyDaysLeft('2027-01-21', '2027-01-22')).toBe(1)
  })

  it('studyDaysLeft_ExamTodayOrPassed_ShouldBeZero', () => {
    expect(studyDaysLeft('2027-01-22', '2027-01-22')).toBe(0)
    expect(studyDaysLeft('2027-02-01', '2027-01-22')).toBe(0)
  })
})

describe('orderWords', () => {
  it('orderWords_MixedLevels_ShouldGoFromEasyToHardKeepingListOrder', () => {
    const words = [word('abandon', 4), word('able', 1), word('zoo', 1), word('ability', 1), word('abroad', 2)]

    expect(orderWords(words).map(item => item.word)).toEqual(['able', 'zoo', 'ability', 'abroad', 'abandon'])
  })

  it('orderWords_PickedLevels_ShouldDropOtherLevels', () => {
    const words = [word('abandon', 4), word('able', 1), word('abroad', 2)]

    expect(orderWords(words, [2, 4]).map(item => item.word)).toEqual(['abroad', 'abandon'])
  })

  it('orderWords_NoLevelInList_ShouldKeepEveryWord', () => {
    const words = [word('apple'), word('a lot')]

    expect(orderWords(words, [1]).map(item => item.word)).toEqual(['apple', 'a lot'])
  })
})

describe('planToday', () => {
  it('planToday_TenWordsFourDays_ShouldRoundUpTodaysQuota', () => {
    const plan = planToday({ words: tenWords, learned: {}, today: '2027-01-18', examDate: '2027-01-22' })

    expect(plan.daysLeft).toBe(4)
    expect(plan.quota).toBe(3)
    expect(plan.words.map(item => item.word)).toEqual(['w0', 'w1', 'w2'])
    expect(plan.remaining).toBe(10)
  })

  it('planToday_LearnedEarlier_ShouldSpreadOnlyWhatIsLeft', () => {
    const learned = { w0: '2027-01-17', w1: '2027-01-17', w5: '2027-01-16' }

    const plan = planToday({ words: tenWords, learned, today: '2027-01-18', examDate: '2027-01-22' })

    expect(plan.quota).toBe(2)
    expect(plan.words.map(item => item.word)).toEqual(['w2', 'w3'])
    expect(plan.remaining).toBe(7)
  })

  it('planToday_TickWordsToday_ShouldKeepTodaysListAndQuota', () => {
    const learned = { w0: '2027-01-18', w1: '2027-01-18' }

    const plan = planToday({ words: tenWords, learned, today: '2027-01-18', examDate: '2027-01-22' })

    expect(plan.quota).toBe(3)
    expect(plan.words.map(item => item.word)).toEqual(['w0', 'w1', 'w2'])
    expect(plan.doneToday).toBe(2)
    expect(plan.remaining).toBe(8)
  })

  it('planToday_FellBehind_ShouldRaiseQuotaForRemainingDays', () => {
    const plan = planToday({ words: tenWords, learned: {}, today: '2027-01-20', examDate: '2027-01-22' })

    expect(plan.quota).toBe(5)
  })

  it('planToday_ExamPassed_ShouldHaveNoWords', () => {
    const plan = planToday({ words: tenWords, learned: {}, today: '2027-01-22', examDate: '2027-01-22' })

    expect(plan.daysLeft).toBe(0)
    expect(plan.quota).toBe(0)
    expect(plan.words).toEqual([])
  })

  it('planToday_EverythingLearned_ShouldHaveNoWords', () => {
    const learned = Object.fromEntries(tenWords.map(item => [item.word, '2027-01-10']))

    const plan = planToday({ words: tenWords, learned, today: '2027-01-18', examDate: '2027-01-22' })

    expect(plan.quota).toBe(0)
    expect(plan.remaining).toBe(0)
  })
})

describe('planSchedule', () => {
  it('planSchedule_OnTrack_ShouldCoverEveryWordByTheDayBeforeExam', () => {
    const days = planSchedule({ words: tenWords, learned: {}, today: '2027-01-18', examDate: '2027-01-22' })

    expect(days.map(day => day.date)).toEqual(['2027-01-18', '2027-01-19', '2027-01-20', '2027-01-21'])
    expect(days.map(day => day.words.length)).toEqual([3, 3, 2, 2])
    expect(days.flatMap(day => day.words).map(item => item.word)).toEqual(tenWords.map(item => item.word))
  })

  it('planSchedule_SomeLearned_ShouldSkipLearnedWordsAfterToday', () => {
    const learned = { w0: '2027-01-18', w9: '2027-01-15' }

    const days = planSchedule({ words: tenWords, learned, today: '2027-01-18', examDate: '2027-01-22' })

    expect(days[0]!.words.map(item => item.word)).toEqual(['w0', 'w1', 'w2'])
    expect(days.slice(1).flatMap(day => day.words).map(item => item.word)).toEqual(['w3', 'w4', 'w5', 'w6', 'w7', 'w8'])
  })

  it('planSchedule_MoreDaysThanWords_ShouldStopWhenWordsRunOut', () => {
    const days = planSchedule({ words: tenWords.slice(0, 2), learned: {}, today: '2027-01-18', examDate: '2027-01-22' })

    expect(days.map(day => day.words.length)).toEqual([1, 1])
  })
})

describe('vocab-plan 顯示', () => {
  it('lookupWord_DerivedOrAlternateForms_ShouldKeepHeadWord', () => {
    expect(lookupWord('accomplish(ment)')).toBe('accomplish')
    expect(lookupWord('a/an')).toBe('a')
    expect(lookupWord('she (her, hers, herself)')).toBe('she')
    expect(lookupWord('a few')).toBe('a few')
  })

  it('dictionaryUrl_Phrase_ShouldUseHyphenatedSlug', () => {
    expect(dictionaryUrl('A few')).toMatch(/\/a-few$/)
  })

  it('formatDay_Key_ShouldShowMonthDayAndWeekday', () => {
    expect(formatDay('2027-01-22')).toBe('1/22（五）')
  })

  it('levelRange_Words_ShouldShowSingleOrSpanOrNothing', () => {
    expect(levelRange([word('a', 2), word('b', 2)])).toBe('第 2 級')
    expect(levelRange([word('a', 1), word('b', 3)])).toBe('第 1–3 級')
    expect(levelRange([word('a')])).toBe('')
  })

  it('meaningParts_SeveralPos_ShouldPairEachPosWithItsMeaning', () => {
    expect(meaningParts({ word: 'alarm', pos: 'n./v.', zh: 'n. 警報；鬧鐘；v. 使驚慌' })).toEqual([
      { pos: ['n'], text: '警報；鬧鐘' },
      { pos: ['v'], text: '使驚慌' },
    ])
  })

  it('meaningParts_NoPosInMeaning_ShouldUseListPos', () => {
    expect(meaningParts({ word: 'he', pos: 'pron.', zh: '他' })).toEqual([{ pos: ['pron'], text: '他' }])
    expect(meaningParts({ word: 'accomplish(ment)', pos: 'v./(n.)', zh: '完成' })).toEqual([{ pos: ['v', 'n'], text: '完成' }])
  })

  it('meaningParts_NoPosAnywhere_ShouldKeepMeaningWithoutTag', () => {
    expect(meaningParts({ word: 'a few', zh: '一些；幾個' })).toEqual([{ pos: [], text: '一些；幾個' }])
  })

  it('meaningParts_NoMeaning_ShouldStillShowPos', () => {
    expect(meaningParts({ word: 'zoo', pos: 'n.' })).toEqual([{ pos: ['n'], text: '' }])
    expect(meaningParts({ word: 'zoo' })).toEqual([])
  })
})
