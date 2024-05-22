import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { fillOnePixel } from './fillOnePixel'
import type { WebRTCConnData } from '@/types'
import type { PixelHistory } from ''

export const rtcDrawEvent = ({
  data,
  draftCanvas,
  dctx,
  mctx,
  pixelHistory,
  cellPixelLength,
}: Args) => {
  if (data.event !== 'draw') return null

  const { x, y, r, g, b, a } = data

  const draw = () => {
    pixelHistory[`${x}_${y}`] = {
      r: r,
      g: g,
      b: b,
      a: a,
    }

    fillOnePixel(draftCanvas, dctx, cellPixelLength, x, y, r, g, b, a)
    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
  }

  const isPixelHistoryEmpty = isObjectEmpty(pixelHistory)

  if (!isPixelHistoryEmpty) {
    const isHistoryHasSameCordinate = Object.hasOwn(pixelHistory, `${x}_${y}`)

    if (isHistoryHasSameCordinate) {
      const prev = pixelHistory[`${x}_${y}`]

      if (
        prev?.a == 1 &&
        a == 1 &&
        prev?.r == r &&
        prev?.g == g &&
        prev?.b == b
      )
        return null

      draw()
    } else if (!isHistoryHasSameCordinate) draw()
  }

  if (isPixelHistoryEmpty) draw()
}

type Args = {
  data: WebRTCConnData
  draftCanvas: HTMLCanvasElement
  dctx: CanvasRenderingContext2D
  mctx: CanvasRenderingContext2D
  pixelHistory: PixelHistory
  cellPixelLength: number
}
