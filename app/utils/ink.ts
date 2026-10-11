import type { InkStroke, InkTool, PenColor } from '~/types/quiz'

export interface InkStyle {
  /** 筆寬（CSS px） */
  width: number
  /** 筆色取自哪個 CSS 變數；橡皮擦不需要顏色 */
  colorVar: string
  composite: GlobalCompositeOperation
}

const STYLES: Record<InkTool, InkStyle> = {
  pen: { width: 2.2, colorVar: '--color-ballpoint', composite: 'source-over' },
  // multiply：畫在原子筆字跡上仍看得到字
  highlighter: { width: 16, colorVar: '--color-marker', composite: 'multiply' },
  eraser: { width: 24, colorVar: '--color-ink', composite: 'destination-out' },
}

/** 原子筆可選的顏色，第一個是預設 */
export const PEN_COLORS: { value: PenColor, label: string, colorVar: string }[] = [
  { value: 'blue', label: '藍', colorVar: '--color-ballpoint' },
  { value: 'red', label: '紅', colorVar: '--color-pen-red' },
  { value: 'black', label: '黑', colorVar: '--color-pen-black' },
  { value: 'green', label: '綠', colorVar: '--color-pen-green' },
]

/** 筆的樣式；color 只影響原子筆 */
export function inkStyle(tool: InkTool, color?: PenColor): InkStyle {
  const style = STYLES[tool]
  if (tool !== 'pen' || !color) return style
  return { ...style, colorVar: PEN_COLORS.find(item => item.value === color)?.colorVar ?? style.colorVar }
}

/** 在畫布上畫出一筆；width 為卡片寬度（筆跡 x 以寬度比例儲存） */
export function drawInkStroke(
  ctx: CanvasRenderingContext2D,
  stroke: InkStroke,
  width: number,
  colorOf: (cssVar: string) => string,
) {
  const [first, ...rest] = stroke.points
  if (!first) return
  const style = inkStyle(stroke.tool, stroke.color)
  ctx.save()
  ctx.globalCompositeOperation = style.composite
  ctx.strokeStyle = colorOf(style.colorVar)
  ctx.lineWidth = style.width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(first[0] * width, first[1])
  // 只點一下也要留下一個點
  for (const [x, y] of rest.length ? rest : [first]) ctx.lineTo(x * width, y)
  ctx.stroke()
  ctx.restore()
}
