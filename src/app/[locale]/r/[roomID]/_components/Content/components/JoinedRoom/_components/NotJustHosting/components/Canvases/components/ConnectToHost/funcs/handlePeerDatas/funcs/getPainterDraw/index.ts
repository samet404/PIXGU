import { isObjectEmpty } from '@/utils'
import { drawOnCanvas } from './func'
import type { WebRTCConnData } from '@/types'
import { useCanvasesMainData, usePainterData } from '@/zustand/store'

export const getPainterDraw = (rtcData: WebRTCConnData) => {
  if (rtcData.event !== 'painterDraw' || rtcData.from !== 'host') return null

  const painterID = rtcData.data.painterID
  const painterData = usePainterData.getState().get()

  const canvasesMainData = useCanvasesMainData.getState().get()
  const { draft, main } = canvasesMainData
  const { x, y, rgba } = rtcData.data

  if (!draft || !main) return null

  const dctx = canvasesMainData.draft?.getContext('2d')
  const mctx = canvasesMainData.main?.getContext('2d')
  if (!dctx || !mctx) return null

  const { pixelHistory } = painterData.painters[painterID]!
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

      drawOnCanvas(painterID, rgba, { x, y })
    } else if (!isHistoryHasSameCordinate)
      drawOnCanvas(painterID, rgba, { x, y })
  }

  if (isPixelHistoryEmpty) drawOnCanvas(painterID, rgba, { x, y })
}
