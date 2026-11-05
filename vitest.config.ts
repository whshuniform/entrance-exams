import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/unit/**/*.test.ts'],
    // 歷屆成績資料很大，Nuxt 測試環境啟動要比較久
    hookTimeout: 60000,
  },
})
