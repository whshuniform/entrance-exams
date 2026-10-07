import type { ExamKind, QuizConfig, QuizMode, RandomScope } from '~/types/quiz'

/** 首頁的科目選項：同一科各年度的試卷合在一起 */
export interface SubjectOption {
  id: string
  name: string
  /** 有試卷的年度，由新到舊 */
  years: number[]
  questionCount: number
}

export interface CurriculumOption {
  name: string
  /** 這個課綱有試卷的年度，由新到舊 */
  years: number[]
}

/**
 * 首頁的選擇：考試項目 → 整份考卷或隨機抽題 → 科目 → 年度 → 計時。
 * 整份考卷選一個年度；隨機抽題可複選年度或選一個課綱，題數不設上限（題庫不夠就全出）。
 * 換考試項目或科目時年度改回預設，換範圍、模式或題數時限時改回預設值。
 */
export function useQuizSetup(catalog: ExamKind[]) {
  const exams = computed(() => catalog.map(exam => ({ ...exam, available: exam.papers.length > 0 })))

  const selectedExam = ref(catalog.find(exam => exam.papers.length > 0)?.id ?? '')
  /** 還沒有試卷的考試項目選不到 */
  const examId = computed({
    get: () => selectedExam.value,
    set: (id: string) => {
      if (catalog.find(exam => exam.id === id)?.papers.length) selectedExam.value = id
    },
  })
  const exam = computed(() => catalog.find(item => item.id === examId.value))

  const mode = ref<QuizMode>('full')

  const subjects = computed(() => {
    const list: SubjectOption[] = []
    for (const paper of exam.value?.papers ?? []) {
      let item = list.find(subject => subject.id === paper.id)
      if (!item) {
        item = { id: paper.id, name: paper.subject, years: [], questionCount: 0 }
        list.push(item)
      }
      item.years.push(paper.year)
      item.questionCount += paperQuestions([paper]).length
    }
    for (const item of list) item.years.sort((a, b) => b - a)
    return list
  })
  const subject = ref(subjects.value[0]?.id ?? '')

  /** 這一科的所有試卷，年度由新到舊 */
  const subjectPapers = computed(() =>
    (exam.value?.papers ?? []).filter(paper => paper.id === subject.value).sort((a, b) => b.year - a.year),
  )
  const years = computed(() => subjectPapers.value.map(paper => paper.year))
  const curricula = computed(() => {
    const list: CurriculumOption[] = []
    for (const paper of subjectPapers.value) {
      const item = list.find(curriculum => curriculum.name === paper.curriculum)
      if (item) item.years.push(paper.year)
      else list.push({ name: paper.curriculum, years: [paper.year] })
    }
    return list
  })

  /** 整份考卷：一個年度 */
  const year = ref(years.value[0] ?? 0)
  /** 隨機抽題：依年度（可複選，預設全選）或依課綱 */
  const scope = ref<RandomScope>('years')
  const pickedYears = ref<number[]>([...years.value])
  const curriculum = ref(curricula.value[0]?.name ?? '')

  /** 會出題的試卷，年度由舊到新 */
  const papers = computed(() =>
    subjectPapers.value
      .filter((paper) => {
        if (mode.value === 'full') return paper.year === year.value
        if (scope.value === 'curriculum') return paper.curriculum === curriculum.value
        return pickedYears.value.includes(paper.year)
      })
      .reverse(),
  )
  const poolSize = computed(() => paperQuestions(papers.value).length)
  /** 隨機抽題一個年度都沒勾時不能開始 */
  const canStart = computed(() => poolSize.value > 0)

  const count = ref(DEFAULT_RANDOM_COUNT)
  const timed = ref(false)
  const minutes = ref(defaultMinutes(papers.value, mode.value, count.value))

  // 換考試項目時選第一科；換科目時年度改回預設（整份選最新一年，隨機全選）
  watch(subjects, (list) => {
    if (!list.some(item => item.id === subject.value)) subject.value = list[0]?.id ?? ''
  })
  watch(subjectPapers, () => {
    year.value = years.value[0] ?? 0
    pickedYears.value = [...years.value]
    curriculum.value = curricula.value[0]?.name ?? ''
  })
  watch([papers, mode, count], () => {
    minutes.value = defaultMinutes(papers.value, mode.value, count.value)
  })

  const config = computed<QuizConfig>(() => {
    const base = {
      exam: examId.value,
      subject: subject.value,
      mode: mode.value,
      years: papers.value.map(paper => paper.year),
      minutes: timed.value ? minutes.value : 0,
    }
    if (mode.value === 'full') return { ...base, count: poolSize.value }
    return { ...base, ...(scope.value === 'curriculum' ? { curriculum: curriculum.value } : {}), count: count.value }
  })

  return {
    exams, examId, mode, subjects, subject, subjectPapers, years, year, scope, pickedYears, curricula, curriculum,
    papers, poolSize, canStart, count, timed, minutes, config,
  }
}
