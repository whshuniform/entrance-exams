import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * 手繪風 PrimeVue 主題：墨水藍為主色、紙張底色、粗墨線。
 * 不規則圓角與手寫字體在 assets/css/primevue.scss 補上。
 */
const HandDrawnPreset = definePreset(Aura, {
  primitive: {
    ink: {
      50: '#eef2f8', 100: '#d5deec', 200: '#adbdd8', 300: '#7f97c0', 400: '#5672a6',
      500: '#34528c', 600: '#2a4373', 700: '#22365c', 800: '#1b2a47', 900: '#141f35', 950: '#0c1322',
    },
  },
  semantic: {
    primary: {
      50: '{ink.50}', 100: '{ink.100}', 200: '{ink.200}', 300: '{ink.300}', 400: '{ink.400}',
      500: '{ink.500}', 600: '{ink.600}', 700: '{ink.700}', 800: '{ink.800}', 900: '{ink.900}', 950: '{ink.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#fffdf7', 50: '#fbf7ec', 100: '#f4eedd', 200: '#e8dfc6', 300: '#d6caa8', 400: '#b8aa86',
          500: '#8f8366', 600: '#6b614b', 700: '#4e4636', 800: '#352f25', 900: '#221e17', 950: '#15120d',
        },
        formField: {
          borderColor: '{surface.700}',
          hoverBorderColor: '{primary.600}',
        },
      },
    },
  },
})

export default HandDrawnPreset
