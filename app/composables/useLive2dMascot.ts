import type { Ref } from 'vue'

/** Live2D 官方 Cubism Core（不可轉散布，只能從官方網址載入） */
export const LIVE2D_CORE_URL = 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js'
/** Live2D 官方範例角色 Haru（public/live2d/haru，已拿掉語音檔） */
export const HARU_MODEL_PATH = 'live2d/haru/Haru.model3.json'

export type Live2dStatus = 'loading' | 'ready' | 'failed'

let corePromise: Promise<void> | undefined

function loadCore(): Promise<void> {
  if ((window as { Live2DCubismCore?: unknown }).Live2DCubismCore) return Promise.resolve()
  corePromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = LIVE2D_CORE_URL
    script.onload = () => resolve()
    script.onerror = () => {
      corePromise = undefined
      reject(new Error('Live2D Cubism Core 載入失敗'))
    }
    document.head.appendChild(script)
  })
  return corePromise
}

/**
 * 在 canvas 上畫 Live2D 看板娘：眼睛和頭跟著滑鼠／手指轉，tap() 做一個動作。
 * 只在瀏覽器執行；pixi 與 Live2D 套件等掛載後才下載，不拖慢首頁。
 */
export function useLive2dMascot(canvas: Ref<HTMLCanvasElement | null>) {
  const status = ref<Live2dStatus>('loading')
  const modelUrl = `${useRuntimeConfig().app.baseURL}${HARU_MODEL_PATH}`
  let destroy = () => {}
  let playTap = () => {}

  onMounted(async () => {
    const el = canvas.value
    if (!el) return
    try {
      await loadCore()
      const PIXI = await import('pixi.js')
      const { Live2DModel } = await import('pixi-live2d-display/cubism4')
      Live2DModel.registerTicker(PIXI.Ticker)

      const app = new PIXI.Application({
        view: el,
        width: el.clientWidth,
        height: el.clientHeight,
        backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      })
      const model = await Live2DModel.from(modelUrl, { autoInteract: false })
      if (!canvas.value) {
        app.destroy()
        return
      }
      // 依畫布高度縮放，上半身入鏡，水平置中
      const scale = (el.clientHeight * 2.3) / model.height
      model.scale.set(scale)
      model.x = (el.clientWidth - model.width) / 2
      model.y = el.clientHeight * 0.02
      app.stage.addChild(model)

      const onPointer = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect()
        model.focus(e.clientX - rect.left, e.clientY - rect.top)
      }
      window.addEventListener('pointermove', onPointer)
      playTap = () => {
        void model.motion('TapBody')
      }
      destroy = () => {
        window.removeEventListener('pointermove', onPointer)
        app.destroy(false, { children: true })
      }
      status.value = 'ready'
    } catch (error) {
      console.warn('[mascot] Live2D 無法顯示', error)
      status.value = 'failed'
    }
  })

  onBeforeUnmount(() => destroy())

  return { status, tap: () => playTap() }
}
