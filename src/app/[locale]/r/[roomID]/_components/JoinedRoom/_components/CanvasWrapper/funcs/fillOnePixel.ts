import { type IntRange } from '@/types/intRange'

/**
 * Fills one pixel on the canvas
 */
export const fillOnePixel = (
  cellPixelLength: number,
  draftCanvas: HTMLCanvasElement,
  x: number,
  y: number,
  rgba: {
    r: IntRange<0, 256>
    g: IntRange<0, 256>
    b: IntRange<0, 256>
    a: IntRange<0, 2>
  },
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
