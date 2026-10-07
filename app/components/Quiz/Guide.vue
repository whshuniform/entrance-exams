<template>
  <section data-test="guide" :class="$style['quiz-guide']">
    <h2 :class="$style['quiz-guide__title']">－作答注意事項－</h2>

    <div :class="$style['quiz-guide__examples']">
      <figure :class="$style['quiz-guide__figure']">
        <svg
          role="img"
          aria-label="作答範例：單選題點圓圈選一個答案，多選題點方框可以勾好幾個"
          viewBox="0 0 340 214"
          :class="$style['quiz-guide__image']"
        >
          <!-- 單選題 -->
          <g>
            <text x="14" y="26" font-size="15" font-weight="700" style="fill: var(--color-ink)">單選題</text>
            <g v-for="(key, row) in keys4" :key="key">
              <circle
                cx="26"
                :cy="56 + row * 34"
                r="10"
                stroke-width="2"
                :style="key === 'B' ? 'fill: var(--color-ink); stroke: var(--color-ink)' : 'fill: var(--color-card); stroke: var(--color-ink)'"
              />
              <circle v-if="key === 'B'" cx="26" :cy="56 + row * 34" r="4" style="fill: var(--color-card)" />
              <text x="44" :y="61 + row * 34" font-size="14" style="fill: var(--color-ink)">({{ key }})</text>
              <line x1="76" :y1="56 + row * 34" x2="150" :y2="56 + row * 34" stroke-width="5" stroke-linecap="round" style="stroke: var(--color-paper-line)" />
            </g>
            <!-- 紅筆圈出選的那一格 -->
            <path d="M26 74 C42 74 44 104 26 105 C8 106 8 76 30 75" fill="none" stroke-width="2" stroke-linecap="round" style="stroke: var(--color-pen-red)" />
            <text x="14" y="200" font-size="14" style="fill: var(--color-pen-red)">點圓圈，選一個</text>
          </g>

          <!-- 多選題 -->
          <g>
            <text x="180" y="26" font-size="15" font-weight="700" style="fill: var(--color-ink)">多選題</text>
            <g v-for="(key, row) in keys4" :key="key">
              <rect
                x="181"
                :y="46 + row * 34"
                width="20"
                height="20"
                rx="3"
                stroke-width="2"
                :style="multiPicked.includes(key) ? 'fill: var(--color-ink); stroke: var(--color-ink)' : 'fill: var(--color-card); stroke: var(--color-ink)'"
              />
              <path
                v-if="multiPicked.includes(key)"
                :d="`M185 ${56 + row * 34} l4 5 l8 -10`"
                fill="none"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="stroke: var(--color-card)"
              />
              <text x="210" :y="61 + row * 34" font-size="14" style="fill: var(--color-ink)">({{ key }})</text>
              <line x1="242" :y1="56 + row * 34" x2="320" :y2="56 + row * 34" stroke-width="5" stroke-linecap="round" style="stroke: var(--color-paper-line)" />
            </g>
            <path d="M191 40 C208 40 210 72 191 72 C174 72 174 42 195 41" fill="none" stroke-width="2" stroke-linecap="round" style="stroke: var(--color-pen-red)" />
            <path d="M191 108 C208 108 210 140 191 140 C174 140 174 110 195 109" fill="none" stroke-width="2" stroke-linecap="round" style="stroke: var(--color-pen-red)" />
            <text x="180" y="200" font-size="14" style="fill: var(--color-pen-red)">點方框，可以勾好幾個</text>
          </g>
        </svg>
        <figcaption :class="$style['quiz-guide__caption']">作答範例</figcaption>
      </figure>

      <figure :class="$style['quiz-guide__figure']">
        <svg
          role="img"
          aria-label="繪畫範例：右下角選螢光筆畫重點、原子筆劃掉選項或在計算紙寫算式，畫的時候兩指上下滑動捲動"
          viewBox="0 0 340 300"
          :class="$style['quiz-guide__image']"
        >
          <!-- 題目卡片 -->
          <path
            d="M10 12 Q130 6 258 10 Q264 150 260 290 Q130 296 12 292 Q6 150 10 12 Z"
            stroke-width="2"
            style="fill: var(--color-card); stroke: var(--color-ink)"
          />

          <!-- 螢光筆畫在「何者正確」下面 -->
          <rect x="68" y="30" width="62" height="13" style="fill: var(--color-marker)" />
          <text x="20" y="42" font-size="15" font-weight="700" style="fill: var(--color-ink)">1.</text>
          <text x="40" y="42" font-size="15" style="fill: var(--color-ink)">下列何者正確？</text>
          <text x="152" y="42" font-size="13" style="fill: var(--color-pen-red)">← 螢光筆畫重點</text>

          <g v-for="(key, row) in keys4" :key="key">
            <circle cx="30" :cy="70 + row * 26" r="8" stroke-width="1.8" style="fill: var(--color-card); stroke: var(--color-ink)" />
            <text x="44" :y="75 + row * 26" font-size="13" style="fill: var(--color-ink)">({{ key }})</text>
            <line x1="72" :y1="70 + row * 26" x2="150" :y2="70 + row * 26" stroke-width="5" stroke-linecap="round" style="stroke: var(--color-paper-line)" />
          </g>
          <!-- 原子筆劃掉 (C) -->
          <path d="M40 120 Q70 116 100 121 T158 119" fill="none" stroke-width="2.5" stroke-linecap="round" style="stroke: var(--color-ballpoint)" />
          <text x="164" y="126" font-size="13" style="fill: var(--color-pen-red)">← 原子筆劃掉</text>

          <!-- 計算紙 -->
          <rect x="20" y="178" width="228" height="100" stroke-width="1.5" style="fill: var(--color-card); stroke: var(--color-pencil)" />
          <g stroke-width="1" style="stroke: var(--color-paper-line)">
            <line v-for="x in gridX" :key="`x${x}`" :x1="x" y1="179" :x2="x" y2="277" />
            <line v-for="y in gridY" :key="`y${y}`" x1="21" :y1="y" x2="247" :y2="y" />
          </g>
          <text x="22" y="172" font-size="12" style="fill: var(--color-pencil)">計算紙</text>
          <text x="36" y="226" font-size="22" transform="rotate(-4 36 226)" style="fill: var(--color-ballpoint)">3×4=12</text>
          <path d="M36 236 Q80 230 128 234" fill="none" stroke-width="2" stroke-linecap="round" style="stroke: var(--color-ballpoint)" />
          <text x="132" y="266" font-size="13" style="fill: var(--color-pen-red)">原子筆寫算式</text>

          <!-- 兩指捲動 -->
          <g style="color: var(--color-ink)">
            <!-- 兩根手指 -->
            <rect x="282" y="20" width="12" height="30" rx="6" stroke-width="1.8" style="fill: var(--color-card)" stroke="currentColor" />
            <rect x="297" y="14" width="12" height="34" rx="6" stroke-width="1.8" style="fill: var(--color-card)" stroke="currentColor" />
            <path d="M285 27 q3 -3 6 0 M300 21 q3 -3 6 0" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            <path d="M324 18 v28 M319 23 l5 -6 l5 6 M319 41 l5 6 l5 -6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <text x="276" y="68" font-size="12" fill="currentColor">兩指上下</text>
            <text x="276" y="84" font-size="12" fill="currentColor">滑動捲動</text>
          </g>

          <!-- 右下角工具列 -->
          <text x="276" y="118" font-size="12" style="fill: var(--color-pen-red)">右下角選筆</text>
          <g v-for="(tool, row) in tools" :key="tool">
            <rect
              x="276"
              :y="128 + row * 42"
              width="56"
              height="36"
              rx="5"
              stroke-width="1.8"
              :style="tool === '原子筆' ? 'fill: var(--color-ink); stroke: var(--color-ink)' : 'fill: var(--color-card); stroke: var(--color-ink)'"
            />
            <text
              x="304"
              :y="151 + row * 42"
              font-size="12"
              text-anchor="middle"
              :style="tool === '原子筆' ? 'fill: var(--color-card)' : 'fill: var(--color-ink)'"
            >
              {{ tool }}
            </text>
          </g>
        </svg>
        <figcaption :class="$style['quiz-guide__caption']">繪畫範例</figcaption>
      </figure>
    </div>

    <ol data-test="guide-steps" :class="$style['quiz-guide__steps']">
      <li>單選題：點選項前面的圓圈，只能選一個；想換答案就點另一個。</li>
      <li>多選題：點選項前面的方框，可以勾好幾個；再點一次就取消。</li>
      <li>右下角選「螢光筆」畫重點，選「原子筆」劃掉不要的選項或在計算紙寫算式，選「橡皮擦」擦掉。</li>
      <li>畫的時候一指寫字、兩指上下滑動捲動頁面；要作答時先按「關閉繪畫」。</li>
      <li>每題選項下面有「計算紙」按鈕，點開就有方格紙可以寫。</li>
      <li>寫完最後一題按「交卷批改」，看分數、級分和全國名次。</li>
    </ol>
  </section>
</template>

<script setup lang="ts">
const keys4 = ['A', 'B', 'C', 'D']
/** 多選範例勾了 A、C */
const multiPicked = ['A', 'C']
const tools = ['關閉繪畫', '螢光筆', '原子筆', '橡皮擦']
const gridX = Array.from({ length: 11 }, (_, i) => 40 + i * 20)
const gridY = Array.from({ length: 4 }, (_, i) => 198 + i * 20)
</script>

<style module lang="scss">
@use '@/assets/css/mixins' as *;

// 像原卷封面的作答注意事項：一張紙上兩張範例圖，下面列出作答方式
.quiz-guide {
  position: relative;

  margin-bottom: 2rem;
  padding: 1.25rem 1.5rem 1rem;

  @include sketch-border(2px);

  background: var(--color-card);
  box-shadow: var(--shadow-sketch);

  &__title {
    margin: 0 0 1rem;
    font-size: 1.2rem;
    text-align: center;
  }

  // 範例圖上下排，限制寬度，電腦上字也不會太小或太大
  &__examples {
    display: grid;
    justify-items: center;
    gap: 1.25rem;
  }

  &__figure {
    width: 100%;
    max-width: 26rem;
    min-width: 0;
    margin: 0;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
  }

  &__caption {
    margin-top: 0.25rem;
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
  }

  &__steps {
    margin: 1.25rem 0 0;
    padding-left: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.7;

    li + li {
      margin-top: 0.35rem;
    }
  }

  @include respond-to('xs') {
    padding: 1rem 0.75rem 0.75rem;
  }
}
</style>
