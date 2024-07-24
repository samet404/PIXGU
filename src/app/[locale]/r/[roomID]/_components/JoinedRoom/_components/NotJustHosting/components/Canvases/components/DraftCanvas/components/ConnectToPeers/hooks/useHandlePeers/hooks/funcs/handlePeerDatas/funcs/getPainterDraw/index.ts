import { isObjectEmpty, getElementByID } from '@/utils'
import { drawOnCanvas } from './func'
import type { CanvasesMainData, PainterData, WebRTCConnData } from '@/types'

export const getPainterDraw = (
  rtcData: WebRTCConnData,
  canvasesMainData: CanvasesMainData,
  painterData: PainterData,
) => {
  if (rtcData.event !== 'painterDraw' || rtcData.type !== 'directlyFromHost')
    return null

  const painterID = rtcData.data.painterID

  if (!Object.keys(painterData.value!.painters).includes(painterID)) return null

  const { draft, main } = canvasesMainData
  const { x, y, rgba } = rtcData.data

  if (!draft)
    canvasesMainData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')
  if (!main)
    canvasesMainData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

  const dctx = canvasesMainData.draft?.getContext('2d')
  const mctx = canvasesMainData.main?.getContext('2d')
  if (!dctx || !mctx) return null

  const { pixelHistory } = painterData.value!.painters[painterID]!
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

      drawOnCanvas(painterID, rgba, canvasesMainData, painterData, { x, y })
    } else if (!isHistoryHasSameCordinate)
      drawOnCanvas(painterID, rgba, canvasesMainData, painterData, { x, y })
  }

  if (isPixelHistoryEmpty)
    drawOnCanvas(painterID, rgba, canvasesMainData, painterData, { x, y })
}
