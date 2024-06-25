import { isObjectEmpty, getElementByID } from '@/utils'
import { drawOnCanvas } from './func'
import type {
  CanvasesMainData,
  CanvasesPainterData,
  Peers,
  WebRTCConnData,
} from '@/types'

export const getPainterDraw = (
  rtcData: WebRTCConnData,
  peers: Peers,
  canvasesMainData: CanvasesMainData,
  canvasesPainterData: CanvasesPainterData,
) => {
  if (rtcData.event !== 'draw') return null

  const { draft, main } = canvasesMainData
  const { x, y, rgba, userID, secretKey } = rtcData

  if (peers[userID]?.themSecretKey !== secretKey) return null
  if (!peers[userID]?.isPainter) return null

  if (!draft)
    canvasesMainData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')
  if (!main)
    canvasesMainData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

  const dctx = canvasesMainData.draft?.getContext('2d')
  const mctx = canvasesMainData.main?.getContext('2d')
  if (!dctx || !mctx) return null

  const { pixelHistory } = canvasesPainterData.data
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

      drawOnCanvas(rgba, canvasesMainData, canvasesPainterData, { x, y })
    } else if (!isHistoryHasSameCordinate)
      drawOnCanvas(rgba, canvasesMainData, canvasesPainterData, { x, y })
  }

  if (isPixelHistoryEmpty)
    drawOnCanvas(rgba, canvasesMainData, canvasesPainterData, { x, y })
}
