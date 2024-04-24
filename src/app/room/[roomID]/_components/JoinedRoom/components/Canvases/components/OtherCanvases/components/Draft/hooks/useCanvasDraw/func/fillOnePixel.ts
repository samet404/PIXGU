import { type IntRange } from '@/types/intRange'

export const fillOnePixel = (
  draftCanvas: HTMLCanvasElement,
  dctx: CanvasRenderingContext2D,
  cellPixelLength: number,
  x: number,
  y: number,
  r: IntRange<0, 256>,
  g: IntRange<0, 256>,
  b: IntRange<0, 256>,
  a: IntRange<0, 2>,
) => {
  // getting position of the pixel
  const posX = cellPixelLength * x
  const posY = cellPixelLength * y

  // drawing the pixel
  dctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  dctx.globalAlpha = a
  dctx.fillRect(posX, posY, cellPixelLength, cellPixelLength)
}
