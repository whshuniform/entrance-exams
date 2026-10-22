import type { InkStroke, InkTool } from '~/types/quiz'

export interface InkStyle {
  /** 筆寬（CSS px） */
  width: number
  /** 筆色取自哪個 CSS 變數；橡皮擦不需要顏色 */
  colorVar: string
  composite: GlobalCompositeOperation
}

const STYLES: Record<InkTool, InkStyle> = {
  // 原子筆固定灰色
  pen: { width: 2.2, colorVar: '--color-pen-gray', composite: 'source-over' },
  // multiply：畫在原子筆字跡上仍看得到字
  highlighter: { width: 16, colorVar: '--color-marker', composite: 'multiply' },
  eraser: { width: 24, colorVar: '--color-ink', composite: 'destination-out' },
}

/** 筆的樣式 */
export function inkStyle(tool: InkTool): InkStyle {
  return STYLES[tool]
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
  const style = inkStyle(stroke.tool)
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
