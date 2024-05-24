import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { fillOnePixel } from '../../../../../../../../../../../../../funcs/fillOnePixel'
import { getRgbaFromURL } from './getRgbaFromURL'
import type { IntRange, PeersRef, CanvasDataRef, WebRTCConnData } from '@/types'

/**
 * This function is responsible for drawing on the canvas when the user is drawing
 *
 * @param {CanvasDataRef} canvasDataRef - the reference to the canvas data
 * @param {PeersRef} peersRef - the reference to the peers
 */
export const handleDraw = ({ canvasDataRef, peersRef, e }: Args) => {
  const canvasData = canvasDataRef.current

  const { isPainter, lastDrawedPixel, pixelHistory } = canvasData.painter
  if (!isPainter || !lastDrawedPixel || !pixelHistory) return null

  const { cellPixelLength, cellSideCount } = canvasData
  if (!cellPixelLength || !cellSideCount) return null

  const dc = canvasData.draft
  if (!dc) return null

  const dcBoundingRect = dc.getBoundingClientRect()

  const x = e.clientX - dcBoundingRect.left
  const y = e.clientY - dcBoundingRect.top
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

    const rgba = { r, g, b, a }
    fillOnePixel(cellPixelLength, dc, newX, newY, rgba)

    for (const userID in peersRef.current) {
      const peer = peersRef.current[userID]?.peer
      if (!peer) return null

      const connData: WebRTCConnData = {
        event: 'draw',

        x: newX,
        y: newY,
        r: r,
        g: g,
        b: b,
        a: a,
      }

      peersRef.current[userID]?.peer.send(JSON.stringify(connData))
    }

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

type Args = {
  canvasDataRef: CanvasDataRef
  peersRef: PeersRef
  e: MouseEvent
}
