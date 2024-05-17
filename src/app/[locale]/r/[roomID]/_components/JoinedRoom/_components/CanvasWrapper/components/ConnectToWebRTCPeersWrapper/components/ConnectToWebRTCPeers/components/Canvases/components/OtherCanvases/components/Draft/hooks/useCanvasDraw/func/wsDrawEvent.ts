import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { type IntRange } from '@/types/intRange'
// @ts-ignore
import { type Types as AblyTypes } from 'ably'
// @ts-ignore
import { type pixelHistory } from '../types'
import { fillOnePixel } from './fillOnePixel'

export const wsDrawEvent = (
  message: AblyTypes.Message,
  draftCanvas: HTMLCanvasElement,
  dctx: CanvasRenderingContext2D,
  mctx: CanvasRenderingContext2D,
  pixelHistory: pixelHistory,
  cellPixelLength: number,
) => {
  const { x, y, r, g, b, a } = message.data as {
    x: number
    y: number
    r: IntRange<0, 256>
    g: IntRange<0, 256>
    b: IntRange<0, 256>
    a: IntRange<0, 2>
  }

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
