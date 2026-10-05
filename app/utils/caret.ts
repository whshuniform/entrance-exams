type CaretDocument = Document & {
  caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node, offset: number } | null
  caretRangeFromPoint?: (x: number, y: number) => Range | null
}

/**
 * 由螢幕座標找出 root 內純文字（去掉 __ 標記後）的字元位置。
 * 依賴 MarkupText 在每個片段標上 data-start。
 */
export function textOffsetAt(root: Element, x: number, y: number): number | null {
  const doc = document as CaretDocument
  let node: Node | null | undefined
  let offset = 0
  if (doc.caretPositionFromPoint) {
    const position = doc.caretPositionFromPoint(x, y)
    node = position?.offsetNode
    offset = position?.offset ?? 0
  } else if (doc.caretRangeFromPoint) {
    const range = doc.caretRangeFromPoint(x, y)
    node = range?.startContainer
    offset = range?.startOffset ?? 0
  }
  if (!node || !root.contains(node)) return null

  const isText = node.nodeType === Node.TEXT_NODE
  const holder = (isText ? node.parentElement : (node as Element))?.closest('[data-start]')
  if (!holder || !root.contains(holder)) return null
  return Number(holder.getAttribute('data-start')) + (isText ? offset : 0)
}
