/** 會拆開 \mathrm{} 的關係符號：反應式的箭號與等號 */
const ARROWS = ['\\rightleftharpoons', '\\longrightarrow', '\\rightarrow', '\\xrightarrow', '\\to']

/** 從 start（指向 { 或 [）找到對應的右括號，回傳右括號後面的位置 */
function skipGroup(tex: string, start: number) {
  const open = tex[start]
  const close = open === '{' ? '}' : ']'
  let depth = 0
  for (let i = start; i < tex.length; i++) {
    if (tex[i] === '\\') i++
    else if (tex[i] === open) depth++
    else if (tex[i] === close && --depth === 0) return i + 1
  }
  return tex.length
}

/** 箭號指令在 i 開始時回傳它（連同 \xrightarrow 的 [下方]{上方} 參數）結束的位置，不是箭號回傳 -1 */
function arrowEnd(body: string, i: number) {
  const name = ARROWS.find(arrow => body.startsWith(arrow, i) && !/[a-z]/i.test(body[i + arrow.length] ?? ''))
  if (!name) return -1
  let end = i + name.length
  if (name === '\\xrightarrow') {
    if (body[end] === '[') end = skipGroup(body, end)
    if (body[end] === '{') end = skipGroup(body, end)
  }
  return end
}

/** 把一個 \mathrm{} 的內容在最外層的 +、=、箭號拆開，各段各自包 \mathrm{} */
function splitBody(body: string) {
  const parts: string[] = []
  let piece = ''
  const flush = () => {
    if (piece) parts.push(`\\mathrm{${piece}}`)
    piece = ''
  }
  for (let i = 0; i < body.length;) {
    const char = body[i]!
    if (char === '{') {
      const end = skipGroup(body, i)
      piece += body.slice(i, end)
      i = end
      continue
    }
    const end = char === '\\' ? arrowEnd(body, i) : -1
    if (end >= 0) {
      flush()
      parts.push(body.slice(i, end))
      i = end
      continue
    }
    if (char === '\\') {
      // 其他指令（\ 空白、\cdots…）整個留在這一段
      const name = /^\\([a-z]+|.)/i.exec(body.slice(i))![0]
      piece += name
      i += name.length
      continue
    }
    // 離子電荷 ^+、_- 的正負號不是運算符號
    if ((char === '+' || char === '=') && !/[\^_]/.test(body[i - 1] ?? '')) {
      flush()
      parts.push(char)
      i++
      continue
    }
    piece += char
    i++
  }
  flush()
  return parts.join('')
}

/**
 * 整條化學反應式包在一個 \mathrm{} 裡時，KaTeX 把它當成一整塊、不會換行，手機上會超出畫面。
 * 在加號、等號、箭號拆成好幾個 \mathrm{}，字形和間距不變，KaTeX 就能在這些符號後面換行。
 */
export function breakableTex(tex: string) {
  let result = ''
  let i = 0
  while (i < tex.length) {
    const at = tex.indexOf('\\mathrm{', i)
    if (at < 0) break
    const open = at + '\\mathrm'.length
    const end = skipGroup(tex, open)
    result += tex.slice(i, at) + splitBody(tex.slice(open + 1, end - 1))
    i = end
  }
  return result + tex.slice(i)
}

/** 縮小公式的下限：再小手機上看不清楚，改成左右滑 */
const MIN_SCALE = 0.7

/** 拆不開的一段公式比可用寬度寬時，要縮成幾倍；縮到下限還太寬就改成左右滑 */
export function formulaFit(formulaWidth: number, available: number) {
  if (available <= 0 || formulaWidth <= available) return { scale: 1, scroll: false }
  const scale = Math.floor((available / formulaWidth) * 100) / 100
  return scale >= MIN_SCALE ? { scale, scroll: false } : { scale: MIN_SCALE, scroll: true }
}
