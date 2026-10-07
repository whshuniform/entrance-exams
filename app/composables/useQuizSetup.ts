import type { ExamKind, QuizConfig, QuizMode } from '~/types/quiz'

/**
 * 首頁的選擇：考試項目 → 年度 → 科目 → 整份或隨機抽題 → 計時。
 * 換科目、模式或題數時，題數夾在題庫範圍內、限時改回預設值。
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

  const years = computed(() => [...new Set(exam.value?.papers.map(paper => paper.year))].sort((a, b) => b - a))
  const year = ref(years.value[0] ?? 0)
  const papers = computed(() => exam.value?.papers.filter(paper => paper.year === year.value) ?? [])
  const subject = ref(papers.value[0]?.id ?? '')
  const paper = computed(() => papers.value.find(item => item.id === subject.value) ?? papers.value[0])
  const poolSize = computed(() => (paper.value ? paperQuestions([paper.value]).length : 0))

  const mode = ref<QuizMode>('full')
  const count = ref(paper.value ? defaultCount(paper.value) : 1)
  const timed = ref(false)
  const minutes = ref(paper.value ? defaultMinutes(paper.value, mode.value, count.value) : 0)

  // 換考試項目、年度時，選第一個有的年度、科目
  watch(examId, () => {
    year.value = years.value[0] ?? 0
  })
  watch(papers, (list) => {
    if (!list.some(item => item.id === subject.value)) subject.value = list[0]?.id ?? ''
  })
  watch(paper, (current) => {
    if (current) count.value = defaultCount(current)
  })
  watch([paper, mode, count], () => {
    if (paper.value) minutes.value = defaultMinutes(paper.value, mode.value, count.value)
  })

  const config = computed<QuizConfig>(() => ({
    exam: examId.value,
    year: year.value,
    subject: paper.value?.id ?? '',
    mode: mode.value,
    count: count.value,
    minutes: timed.value ? minutes.value : 0,
  }))

  return { exams, examId, years, year, papers, subject, paper, poolSize, mode, count, timed, minutes, config }
}
