import type { PainterData, CanvasesMainData, HostPeer } from '@/types'
import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { getRgbaFromURL } from '../getRgbaFromURL'
import { drawOnCanvas } from './funcs/drawOnCanvas'
import { negativeLog } from '@/utils/negativeLog'

/**
 * This function is responsible for drawing on the canvas when the user is drawing
 */
export const draw = (
  canvasesMainData: CanvasesMainData,
  painterData: PainterData,
  hostPeer: HostPeer,
  myUserID: string,
  e: MouseEvent,
) => {
  const { lastDrawedPixel, pixelHistory } = painterData.value

  const { cellPixelLength, cellSideCount } = canvasesMainData
  if (!cellPixelLength || !cellSideCount) return null

  const dc = canvasesMainData.draft
  if (!dc) return null

  const dcBoundingRect = dc.getBoundingClientRect()

  const x = e.clientX - dcBoundingRect.left
  const y = e.clientY - dcBoundingRect.top
  const newX = Math.floor(x / cellPixelLength)
  const newY = Math.floor(y / cellPixelLength)
  const { r, g, b, a } = getRgbaFromURL()

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
        negativeLog('Blocked drawing the same pixel')
        return null
      }

      console.log(2)
      drawOnCanvas(
        myUserID,
        painterData,
        canvasesMainData,
        newX,
        newY,
        { r, g, b, a },
        hostPeer,
      )
    } else if (!isHistoryHasSameCordinate) {
      console.log(3)
      drawOnCanvas(
        myUserID,
        painterData,
        canvasesMainData,
        newX,
        newY,
        { r, g, b, a },
        hostPeer,
      )
    }
  }

  if (isPixelHistoryEmpty) {
    console.log(4)
    drawOnCanvas(
      myUserID,
      painterData,
      canvasesMainData,
      newX,
      newY,
      { r, g, b, a },
      hostPeer,
    )
  }
}
