<template>
  <!-- 原創看板娘「小墨」：手繪墨線、水手領、手上拿一支大鉛筆 -->
  <svg :class="[$style['mascot-girl'], hop && $style['mascot-girl--hop']]" viewBox="0 0 120 160" role="img">
    <defs>
      <!-- 讓線條有一點手抖的手繪感 -->
      <filter :id="wobbleId">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="1.6" />
      </filter>
    </defs>
    <g :filter="`url(#${wobbleId})`" :class="$style['mascot-girl__ink']">
      <!-- 後面的頭髮（鮑伯頭） -->
      <path :class="$style['mascot-girl__hair']" d="M26 70 C22 40 40 25 60 25 C82 25 98 40 94 70 C93 84 90 93 86 97 L34 97 C30 93 27 84 26 70 Z" />
      <!-- 身體：白上衣＋藍色水手領＋黃色領巾 -->
      <path :class="$style['mascot-girl__shirt']" d="M22 161 C22 128 36 109 60 106 C84 109 98 128 98 161 Z" />
      <rect :class="$style['mascot-girl__skin']" x="53.5" y="86" width="13" height="22" rx="4" />
      <path :class="$style['mascot-girl__collar']" d="M37 113 L60 140 L83 113 C78 108 70 106 60 106 C50 106 42 108 37 113 Z" />
      <path :class="$style['mascot-girl__stripe']" d="M42 116 L60 136 L78 116" />
      <path :class="$style['mascot-girl__scarf']" d="M52 134 L60 150 L68 134 Z" />
      <circle :class="$style['mascot-girl__scarf']" cx="60" cy="134" r="4.5" />
      <!-- 臉 -->
      <ellipse :class="$style['mascot-girl__skin']" cx="60" cy="66" rx="27" ry="26" />
      <!-- 瀏海與兩側髮束、呆毛 -->
      <path :class="$style['mascot-girl__hair']" d="M32 63 C31 40 46 31 60 31 C76 31 90 41 88 63 C85 55 81 51 77 48 C75 54 70 57 66 52 C62 57 56 58 52 52 C48 58 42 60 39 54 C37 58 34 60 32 63 Z" />
      <path :class="$style['mascot-girl__hair']" d="M33 60 C29 72 30 85 35 94 C37 85 38 72 38 62 Z" />
      <path :class="$style['mascot-girl__hair']" d="M87 60 C91 72 90 85 85 94 C83 85 82 72 82 62 Z" />
      <path :class="$style['mascot-girl__line']" d="M60 31 C57 21 65 16 71 19 C65 21 62 25 60 31" />
      <!-- 黃色蝴蝶結髮夾 -->
      <path :class="$style['mascot-girl__scarf']" d="M80 42 L90 34 L92 47 Z" />
      <path :class="$style['mascot-girl__scarf']" d="M80 42 L72 33 L70 46 Z" />
      <circle :class="$style['mascot-girl__scarf']" cx="80" cy="41" r="3" />
      <!-- 眉毛、眼睛（會眨眼）、腮紅、嘴巴 -->
      <path :class="$style['mascot-girl__line']" d="M43 58 Q48 55.5 53 58 M67 58 Q72 55.5 77 58" />
      <g :class="$style['mascot-girl__eyes']">
        <ellipse :class="$style['mascot-girl__pupil']" cx="48" cy="68" rx="4.6" ry="6.2" />
        <ellipse :class="$style['mascot-girl__pupil']" cx="72" cy="68" rx="4.6" ry="6.2" />
        <circle :class="$style['mascot-girl__shine']" cx="49.6" cy="65.4" r="1.7" />
        <circle :class="$style['mascot-girl__shine']" cx="73.6" cy="65.4" r="1.7" />
      </g>
      <ellipse :class="$style['mascot-girl__blush']" cx="41" cy="77" rx="5" ry="2.6" />
      <ellipse :class="$style['mascot-girl__blush']" cx="79" cy="77" rx="5" ry="2.6" />
      <path :class="$style['mascot-girl__line']" d="M55.5 80 Q60 85 64.5 80" />
      <!-- 手上的大鉛筆 -->
      <g transform="rotate(28 92 132)">
        <rect :class="$style['mascot-girl__pencil']" x="88" y="104" width="9" height="40" rx="1.5" />
        <path :class="$style['mascot-girl__skin']" d="M88 104 L92.5 94 L97 104 Z" />
        <path :class="$style['mascot-girl__pupil']" d="M91 97.5 L92.5 94 L94 97.5 Z" />
        <rect :class="$style['mascot-girl__eraser']" x="88" y="144" width="9" height="6" rx="2" />
      </g>
      <circle :class="$style['mascot-girl__skin']" cx="86" cy="134" r="6.5" />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  /** 被點時跳一下 */
  hop?: boolean
}>()

const wobbleId = `mascot-wobble-${useId()}`
</script>

<style module lang="scss">
// 線條一律墨色，填色用主題色票
.mascot-girl {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;

  &--hop {
    animation: mascot-hop 0.4s ease-out;
  }

  &__ink {
    stroke: var(--color-ink);
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &__hair { fill: var(--color-mascot-hair); }
  &__skin { fill: var(--color-mascot-skin); }
  &__shirt { fill: var(--color-card); }
  &__collar { fill: var(--color-ballpoint); }
  &__scarf { fill: var(--color-marker); }
  &__pencil { fill: var(--color-marker); }
  &__eraser { fill: var(--color-marker-answer); }
  &__pupil { fill: var(--color-ink); }

  &__stripe {
    fill: none;
    stroke: var(--color-card);
    stroke-width: 2;
  }

  &__line { fill: none; }

  &__shine {
    fill: var(--color-card);
    stroke: none;
  }

  &__blush {
    fill: var(--color-mascot-blush);
    stroke: none;
    opacity: 0.75;
  }

  &__eyes {
    transform-box: fill-box;
    transform-origin: center;
    animation: mascot-blink 5s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &--hop,
    &__eyes {
      animation: none;
    }
  }
}

@keyframes mascot-blink {
  0%, 94%, 100% { transform: scaleY(1); }
  97% { transform: scaleY(0.1); }
}

@keyframes mascot-hop {
  0%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8%); }
}
</style>
