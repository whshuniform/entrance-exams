import type { LearnedMap, VocabExam, VocabExamId } from '~/types/vocab'

export const VOCAB_STORAGE_KEY = 'vocab-plan:v1'

interface ExamProgress {
  examDate: string
  levels: number[]
  learned: LearnedMap
}

interface SavedState {
  examId: VocabExamId
  progress: Partial<Record<VocabExamId, ExamProgress>>
}

function load(): SavedState | undefined {
  try {
    const raw = localStorage.getItem(VOCAB_STORAGE_KEY)
    return raw ? JSON.parse(raw) as SavedState : undefined
  } catch {
    return undefined
  }
}

function save(state: SavedState) {
  try {
    localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // 無痕模式或空間不足時不存，畫面照常可用
  }
}

/**
 * 必背單字的每日進度：選考試、考試日期、級別，打勾記錄哪天背好。
 * 每個考試的進度分開，全部存在瀏覽器（不需登入）。
 */
export function useVocabPlan(exams: VocabExam[], options: { today?: () => string } = {}) {
  const today = options.today ?? (() => toDateKey(new Date()))
  const fresh = (exam: VocabExam): ExamProgress => ({ examDate: exam.examDate, levels: [...exam.levels], learned: {} })

  const saved = typeof localStorage === 'undefined' ? undefined : load()
  const isProgress = (value?: ExamProgress) =>
    typeof value?.examDate === 'string' && Array.isArray(value.levels) && typeof value.learned === 'object'
  const state = reactive<SavedState>({
    examId: exams.some(exam => exam.id === saved?.examId) ? saved!.examId : exams[0]!.id,
    progress: Object.fromEntries(exams.map(exam => {
      const item = saved?.progress?.[exam.id]
      return [exam.id, isProgress(item) ? item : fresh(exam)]
    })),
  })

  const exam = computed(() => exams.find(item => item.id === state.examId) ?? exams[0]!)
  const progress = computed(() => state.progress[exam.value.id]!)

  const examId = computed({
    get: () => state.examId,
    set: (id: VocabExamId) => { if (exams.some(item => item.id === id)) state.examId = id },
  })
  const examDate = computed({
    get: () => progress.value.examDate,
    set: (date: string) => { progress.value.examDate = date },
  })
  const levels = computed({
    get: () => progress.value.levels,
    set: (list: number[]) => { progress.value.levels = [...list].sort((a, b) => a - b) },
  })

  const words = computed(() => orderWords(exam.value.words, exam.value.levels.length ? levels.value : undefined))
  const total = computed(() => words.value.length)
  const learnedCount = computed(() => words.value.filter(item => progress.value.learned[item.word]).length)
  const planInput = computed(() => ({
    words: words.value, learned: progress.value.learned, today: today(), examDate: examDate.value,
  }))
  const plan = computed(() => planToday(planInput.value))
  const schedule = computed(() => planSchedule(planInput.value))

  function isLearned(word: string) {
    return Boolean(progress.value.learned[word])
  }

  function toggle(word: string) {
    const learned = progress.value.learned
    if (learned[word]) delete learned[word]
    else learned[word] = today()
  }

  function resetProgress() {
    progress.value.learned = {}
  }

  watch(state, value => save(value), { deep: true, flush: 'sync' })

  return { exams, exam, examId, examDate, levels, total, learnedCount, plan, schedule, isLearned, toggle, resetProgress }
}
