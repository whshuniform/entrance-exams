import { defaultOptions } from '@primevue/core/config'
import HandDrawnPreset from './app/theme/hand-drawn-preset'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  ssr: true,
  devtools: { enabled: false },
  modules: ['@primevue/nuxt-module'],
  css: ['~/assets/css/index.scss'],
  // 作答頁依網址參數出題、隨機抽題，只在瀏覽器畫；靜態輸出時仍產生 /quiz 頁
  // 單字頁的進度存在瀏覽器，也只在瀏覽器畫
  routeRules: {
    '/quiz': { ssr: false },
    '/vocab': { ssr: false },
  },
  nitro: {
    prerender: { routes: ['/', '/quiz', '/vocab'] },
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
      // 日期選擇器用中文月份與星期
      locale: {
        ...defaultOptions.locale!,
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
        monthNamesShort: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
        today: '今天',
        clear: '清除',
        firstDayOfWeek: 0,
      },
      theme: {
        preset: HandDrawnPreset,
        options: { darkModeSelector: false, cssLayer: { name: 'primevue', order: 'primevue, app' } },
      },
    },
  },
})
