import { describe, it, expect } from 'vitest'
import { breakableTex, formulaFit } from '~/utils/math-break'

describe('breakableTex', () => {
  it('breakableTex_NoMathrm_ShouldReturnSameTex', () => {
    expect(breakableTex('f(x)=a(x-1)+b')).toBe('f(x)=a(x-1)+b')
  })

  it('breakableTex_ShortMathrm_ShouldReturnSameTex', () => {
    expect(breakableTex('\\mathrm{Mn_2O_3}')).toBe('\\mathrm{Mn_2O_3}')
  })

  it('breakableTex_ReactionInOneMathrm_ShouldSplitAtPlusAndArrow', () => {
    // 整條反應式包在一個 \mathrm{} 裡 KaTeX 不會換行，拆開後在 + 和箭號後面可以換行
    const result = breakableTex('\\mathrm{2\\ MnO_2(s)+2\\ NH_4Cl(aq)\\rightarrow Mn_2O_3(s)}')

    expect(result).toBe('\\mathrm{2\\ MnO_2(s)}+\\mathrm{2\\ NH_4Cl(aq)}\\rightarrow\\mathrm{ Mn_2O_3(s)}')
  })

  it('breakableTex_ChargeSigns_ShouldNotSplit', () => {
    // 離子電荷 ^{2+}、^+、e^- 的正負號不是加號
    expect(breakableTex('\\mathrm{Zn^{2+}(aq)+Na^+ +e^-}')).toBe('\\mathrm{Zn^{2+}(aq)}+\\mathrm{Na^+ }+\\mathrm{e^-}')
  })

  it('breakableTex_XrightarrowWithArguments_ShouldKeepArgumentsOnArrow', () => {
    const result = breakableTex('\\mathrm{A(aq)\\xrightarrow[\\Delta]{\\text{硫酸}}B(l)}')

    expect(result).toBe('\\mathrm{A(aq)}\\xrightarrow[\\Delta]{\\text{硫酸}}\\mathrm{B(l)}')
  })

  it('breakableTex_NuclideChain_ShouldSplitAtEachArrow', () => {
    const result = breakableTex('\\mathrm{^{238}_{92}U\\rightarrow{}^{234}_{90}Th\\rightarrow\\cdots}')

    expect(result).toBe('\\mathrm{^{238}_{92}U}\\rightarrow\\mathrm{{}^{234}_{90}Th}\\rightarrow\\mathrm{\\cdots}')
  })

  it('breakableTex_TextAroundMathrm_ShouldKeepOutsideParts', () => {
    expect(breakableTex('\\mathrm{N_2+O_2}\\xrightarrow{\\text{吸熱}}\\mathrm{2\\ NO}')).toBe('\\mathrm{N_2}+\\mathrm{O_2}\\xrightarrow{\\text{吸熱}}\\mathrm{2\\ NO}')
  })
})

describe('formulaFit', () => {
  it('formulaFit_FitsInWidth_ShouldKeepSize', () => {
    expect(formulaFit(200, 300)).toEqual({ scale: 1, scroll: false })
  })

  it('formulaFit_SlightlyTooWide_ShouldShrinkToFit', () => {
    expect(formulaFit(400, 300)).toEqual({ scale: 0.75, scroll: false })
  })

  it('formulaFit_FarTooWide_ShouldStopAtMinScaleAndScroll', () => {
    // 縮到 0.7 倍還放不下就不再縮（太小看不清楚），改成左右滑
    expect(formulaFit(1000, 300)).toEqual({ scale: 0.7, scroll: true })
  })

  it('formulaFit_NoWidth_ShouldKeepSize', () => {
    // 還沒排版（寬度 0）時不動
    expect(formulaFit(400, 0)).toEqual({ scale: 1, scroll: false })
  })
})
