<template>
  <HomeShell
    title="作試題"
    subtitle="選好作答方式和科目，像真的考試一樣一頁一題作答。交卷馬上批改：整份考卷看級分和全國名次，隨機抽題看答對率。"
    :back="{ to: `/${exam.id}`, label: exam.name }"
  >
    <HomeQuizSetup :exam="exam.id" @start="onStart" />
  </HomeShell>
</template>

<script setup lang="ts">
import { findExam } from '~/data/catalog'
import type { QuizConfig } from '~/types/quiz'

// 還沒有試卷的考試沒有作試題頁
definePageMeta({ validate: route => !!findExam(String(route.params.exam))?.papers.length })

const route = useRoute()
const exam = findExam(String(route.params.exam))!

useHead({ title: `${exam.fullName} 作試題` })

function onStart(config: QuizConfig) {
  navigateTo({ path: '/quiz', query: toQuizQuery(config) })
}
</script>
