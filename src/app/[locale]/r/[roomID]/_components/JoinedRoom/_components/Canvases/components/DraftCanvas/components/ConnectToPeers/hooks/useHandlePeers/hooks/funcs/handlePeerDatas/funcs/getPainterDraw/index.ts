import type { CanvasData, Peers, WebRTCConnData } from '@/types'
import { isObjectEmpty, getElementByID } from '@/utils'
import { drawOnCanvas } from './func'

export const getPainterDraw = (
  rtcData: WebRTCConnData,
  peers: Peers,
  canvasData: CanvasData,
) => {
  if (rtcData.event !== 'draw') return null

  const { draft, main } = canvasData
  const { x, y, rgba, userID, secretKey } = rtcData

  if (peers[userID]?.themSecretKey !== secretKey) return null

  if (!draft)
    canvasData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')
  if (!main)
    canvasData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

  const dctx = canvasData.draft?.getContext('2d')
  const mctx = canvasData.main?.getContext('2d')
  if (!dctx || !mctx) return null

  const pixelHistory = canvasData.painter.pixelHistory
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

      drawOnCanvas(rgba, canvasData, { x, y })
    } else if (!isHistoryHasSameCordinate)
      drawOnCanvas(rgba, canvasData, { x, y })
  }

  if (isPixelHistoryEmpty) drawOnCanvas(rgba, canvasData, { x, y })
}
