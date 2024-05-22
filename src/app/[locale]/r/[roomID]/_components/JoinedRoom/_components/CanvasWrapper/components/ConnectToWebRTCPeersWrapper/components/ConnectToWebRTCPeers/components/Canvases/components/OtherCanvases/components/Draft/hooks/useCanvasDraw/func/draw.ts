import { isObjectEmpty } from '@/utils/isObjectEmpty'
import type { LastDrawedPixel, PixelHistory } from '../types'
import { fillOnePixel } from './fillOnePixel'
import { getRgbaFromURL } from './getRgbaFromURL'
import { type MutableRefObject } from 'react'
import { type IntRange } from '@/types/intRange'

export const draw = (
  draftCanvas: HTMLCanvasElement,
  dctx: CanvasRenderingContext2D,
  cellPixelLength: number,
  pixelHistoryRef: MutableRefObject<PixelHistory>,
  wsRoomDrawChannel: Peers,
  lastDrawedPixelRef: MutableRefObject<LastDrawedPixel | undefined>,
  e: MouseEvent,
) => {
  const lastDrawedPixel = lastDrawedPixelRef.current
  const pixelHistory = pixelHistoryRef.current

  const draftCanvasBoundingRect = draftCanvas.getBoundingClientRect()
  const x = e.clientX - draftCanvasBoundingRect.left
  const y = e.clientY - draftCanvasBoundingRect.top
  const newX = Math.floor(x / cellPixelLength)
  const newY = Math.floor(y / cellPixelLength)
  const { r, g, b, a } = getRgbaFromURL()
  let isSuccess = false

  const draw = () => {
    const prevA = pixelHistory[`${newX}_${newY}`]?.a ?? 0

    pixelHistory[`${newX}_${newY}`] = {
      r: r,
      g: g,
      b: b,
      a: (a + prevA) as IntRange<0, 2>,
    }

    fillOnePixel(draftCanvas, dctx, cellPixelLength, newX, newY, r, g, b, a)
    wsRoomDrawChannel.publish('draw', {
      x: newX,
      y: newY,
      r,
      g,
      b,
      a,
    })

    lastDrawedPixelRef.current = {
      x: newX,
      y: newY,
    }

    isSuccess = true
  }

  const isPixelHistoryEmpty = isObjectEmpty(pixelHistory)

  if (!isPixelHistoryEmpty) {
    const isHistoryHasSameCordinate = Object.hasOwn(
      pixelHistory,
      `${newX}_${newY}`,
    )

    if (isHistoryHasSameCordinate) {
      const prev = pixelHistory[`${newX}_${newY}`]!

      console.log(1)
      // if the last drawed pixel is the same as the current pixel, and the alpha is not 1 exit the function
      if (lastDrawedPixel)
        if (lastDrawedPixel.x == newX && lastDrawedPixel.y == newY && a != 1)
          return null

      // if the previous pixel that was drawn is the same as the current cordinate, and the alpha is 1, and the color is the same, exit the function
      if (
        prev?.a == 1 &&
        a == 1 &&
        prev?.r == r &&
        prev?.g == g &&
        prev?.b == b
      ) {
        console.log('same color 1')
        return null
      }

      const summedA = a + prev.a
      // if the last drawed pixel is the same as the current pixel, and the alpha is 1, and the color is the same as the last pixel, exit the function
      if (
        prev.a >= 1 &&
        summedA >= 1 &&
        prev.r == r &&
        prev.g == g &&
        prev.b == b
      ) {
        console.log('same color')
        return null
      }

      console.log(2)
      draw()
    } else if (!isHistoryHasSameCordinate) {
      console.log(3)
      draw()
    }
  }

  if (isPixelHistoryEmpty) {
    console.log(4)
    draw()
  }

  return {
    isSuccess: isSuccess,
  }
}
