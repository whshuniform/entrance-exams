import type { ExamKind } from '~/types/quiz'

/** 選單上的一張卡片；沒有 to 的是「準備中」，不能點 */
export interface MenuItem {
  id: string
  title: string
  hint: string
  to?: string
}

export interface MenuOptions {
  /** 網站有沒有背單字頁（/vocab） */
  hasVocabPage: boolean
}

const COMING = '準備中'

/** 考試頁的選項：作試題、背單字（只有有必背單字的考試才有） */
export function examActivities(exam: ExamKind, { hasVocabPage }: MenuOptions): MenuItem[] {
  const items: MenuItem[] = [
    exam.papers.length > 0
      ? { id: 'quiz', title: '作試題', hint: '整份考卷或隨機抽題', to: `/${exam.id}/practice` }
      : { id: 'quiz', title: '作試題', hint: COMING },
  ]
  if (exam.vocabHint) {
    items.push(hasVocabPage
      ? { id: 'vocab', title: '背單字', hint: exam.vocabHint, to: `/vocab?exam=${exam.id}` }
      : { id: 'vocab', title: '背單字', hint: COMING })
  }
  return items
}

/** 首頁的考試選單：考試頁裡至少有一項能用才可以點進去 */
export function examMenu(catalog: ExamKind[], options: MenuOptions): MenuItem[] {
  return catalog.map(exam =>
    examActivities(exam, options).some(item => item.to)
      ? { id: exam.id, title: exam.name, hint: exam.fullName, to: `/${exam.id}` }
      : { id: exam.id, title: exam.name, hint: COMING },
  )
}
