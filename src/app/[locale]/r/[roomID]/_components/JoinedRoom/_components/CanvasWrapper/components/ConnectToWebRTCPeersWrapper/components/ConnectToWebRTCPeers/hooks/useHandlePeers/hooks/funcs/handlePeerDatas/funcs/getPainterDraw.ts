import { isObjectEmpty } from '@/utils/isObjectEmpty'
import type {
  CanvasDataRef,
  PeersRef,
  PixelHistory,
  WebRTCConnData,
} from '@/types'
import { fillOnePixel } from '../../../../../../components/Canvases/components/OtherCanvases/components/Draft/hooks/useCanvasDraw/func'

export const getPainterDraw = (
  rtcData: WebRTCConnData,
  draftCanvas: HTMLCanvasElement,
  mainCanvas: HTMLCanvasElement,
  pixelHistory: PixelHistory,
  peersRef: PeersRef,
  canvasDataRef: CanvasDataRef,
) => {
  if (rtcData.event !== 'draw') return null

  const { draft, main, cellPixelLength } = canvasDataRef.current
  const { x, y, rgba, ID, secretKey } = rtcData

  if (peersRef.current[ID]?.themSecretKey !== secretKey) return null

  if (!draft) {
    const newDraft = document.createElement('canvas')
    if (!newDraft) return null

    canvasDataRef.current.draft = newDraft
  }

  if (!main) {
    const newMain = document.createElement('canvas')
    if (!newMain) return null

    canvasDataRef.current.main = newMain
  }

  const dctx = draftCanvas.getContext('2d')!
  const mctx = mainCanvas.getContext('2d')!
  if (!dctx || !mctx) return null

  const drawOnCanvas = () => {
    const { r, g, b, a } = rgba

    pixelHistory[`${x}_${y}`] = {
      r: r,
      g: g,
      b: b,
      a: a,
    }

    fillOnePixel(cellPixelLength, draftCanvas, x, y, rgba)
    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
  }

  const isPixelHistoryEmpty = isObjectEmpty(pixelHistory)

  if (!isPixelHistoryEmpty) {
    const isHistoryHasSameCordinate = Object.hasOwn(pixelHistory, `${x}_${y}`)

    if (isHistoryHasSameCordinate) {
      const prev = pixelHistory[`${x}_${y}`]
      const { r, g, b, a } = rgba

      if (
        prev?.a == 1 &&
        a == 1 &&
        prev?.r == r &&
        prev?.g == g &&
        prev?.b == b
      )
        return null

      drawOnCanvas()
    } else if (!isHistoryHasSameCordinate) drawOnCanvas()
  }

  if (isPixelHistoryEmpty) drawOnCanvas()
}
