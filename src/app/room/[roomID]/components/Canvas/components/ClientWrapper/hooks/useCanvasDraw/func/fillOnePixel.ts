import { type IntRange } from '@/src/types/intRange'

export const fillOnePixel = (
  draftCanvas: HTMLCanvasElement,
  dctx: CanvasRenderingContext2D,
  cellPixelLength: number,
  x: number,
  y: number,
  rgb: `rgb(${string}, ${string}, ${string})`,
  opacity: IntRange<0, 2>,
) => {
  // getting position of the pixel
  const posX = cellPixelLength * x
  const posY = cellPixelLength * y

  // drawing the pixel
  dctx.fillStyle = rgb
  dctx.globalAlpha = opacity
  dctx.fillRect(posX, posY, cellPixelLength, cellPixelLength)
}
