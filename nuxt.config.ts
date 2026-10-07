import HandDrawnPreset from './app/theme/hand-drawn-preset'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  ssr: true,
  devtools: { enabled: false },
  modules: ['@primevue/nuxt-module'],
  css: ['~/assets/css/index.scss'],
  // 作答頁依網址參數出題、隨機抽題，只在瀏覽器畫；靜態輸出時仍產生 /quiz 頁
  routeRules: {
    '/quiz': { ssr: false },
  },
  nitro: {
    prerender: { routes: ['/', '/quiz'] },
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'zh-Hant-TW' },
      title: '考古題練習本',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&display=swap',
        },
      ],
    },
  },
  primevue: {
    options: {
      theme: {
        preset: HandDrawnPreset,
        options: { darkModeSelector: false, cssLayer: { name: 'primevue', order: 'primevue, app' } },
      },
    },
  },
})
