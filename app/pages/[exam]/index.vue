<template>
  <HomeShell :title="exam.name" :subtitle="`${exam.fullName}：要作試題還是背單字？`" :back="{ to: '/', label: '首頁' }" :source="exam.source">
    <HomeMenuLinks :items="items" />
  </HomeShell>
</template>

<script setup lang="ts">
import { findExam } from '~/data/catalog'

definePageMeta({ validate: route => !!findExam(String(route.params.exam)) })

const route = useRoute()
const exam = findExam(String(route.params.exam))!

// 網頁標題用全名，例如「大學學科能力測驗」
useHead({ title: exam.fullName })

const items = examActivities(exam, { hasVocabPage: useRouter().hasRoute('vocab') })
</script>
