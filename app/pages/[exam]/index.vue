<template>
  <HomeShell :title="exam.name" :subtitle="`${exam.fullName}：要作試題還是背單字？`" :back="{ to: '/', label: '首頁' }">
    <HomeMenuLinks :items="items" />
  </HomeShell>
</template>

<script setup lang="ts">
import { findExam } from '~/data/catalog'

definePageMeta({ validate: route => !!findExam(String(route.params.exam)) })

const route = useRoute()
const exam = findExam(String(route.params.exam))!

useHead({ title: exam.name })

const items = examActivities(exam, { hasVocabPage: useRouter().hasRoute('vocab') })
</script>
