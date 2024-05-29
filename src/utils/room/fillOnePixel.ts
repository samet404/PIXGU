import type { RGBAObj } from '@/types'

/**
 * Fills one pixel on the canvas
 */
export const fillOnePixel = (
  cellPixelLength: number,
  draftCanvas: HTMLCanvasElement,
  x: number,
  y: number,
  rgba: RGBAObj,
) => {
  const { r, g, b, a } = rgba

  // getting position of the pixel
  const posX = cellPixelLength * x
  const posY = cellPixelLength * y

  const dctx = draftCanvas.getContext('2d')!

  // drawing the pixel
  dctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  dctx.globalAlpha = a
  dctx.fillRect(posX, posY, cellPixelLength, cellPixelLength)
}
