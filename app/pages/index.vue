<template>
  <HomeShell title="考古題練習本" subtitle="先選考試，再選要作試題還是背單字。">
    <HomeMenuLinks :items="items" />
  </HomeShell>
</template>

<script setup lang="ts">
import { examCatalog } from '~/data/catalog'

useHead({ title: '考古題練習本' })

const items = examMenu(examCatalog, { hasVocabPage: useRouter().hasRoute('vocab') })
</script>
