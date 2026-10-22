import type { GradeResult, QuizQuestion } from '~/types/quiz'

export function useQuiz(questions: QuizQuestion[]) {
  const answers = ref<Record<string, string>>({})
  const submitted = ref(false)

  const maxScore = computed(() => questions.reduce((sum, q) => sum + q.points, 0))
  const answeredCount = computed(() => questions.filter(q => answers.value[q.id]).length)

  const results = computed<Record<string, GradeResult>>(() => {
    if (!submitted.value) return {}
    return Object.fromEntries(questions.map(q => [q.id, gradeQuestion(q, answers.value[q.id] ?? '')]))
  })

  const totalScore = computed(() =>
    Object.values(results.value).reduce((sum, r) => sum + r.score, 0),
  )

  function setAnswer(id: string, value: string) {
    if (submitted.value) return
    answers.value = { ...answers.value, [id]: value }
  }

  function submit() {
    submitted.value = true
  }

  function reset() {
    answers.value = {}
    submitted.value = false
  }

  return { answers, submitted, maxScore, answeredCount, results, totalScore, setAnswer, submit, reset }
}
