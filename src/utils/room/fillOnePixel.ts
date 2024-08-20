import type { RGBAObj } from '@/types'
import { useCanvasesMainData } from '@/zustand/store'

/**
 * Fills one pixel on the canvas
 */
export const fillOnePixel = (x: number, y: number, rgba: RGBAObj) => {
  const canvasesMainData = useCanvasesMainData.getState().get()
  const { r, g, b, a } = rgba
  const cellPixelLength = canvasesMainData.cellPixelLength!

  // getting position of the pixel
  const posX = cellPixelLength * x
  const posY = cellPixelLength * y

  const dctx = canvasesMainData.draft!.getContext('2d')!

  // drawing the pixel
  dctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  dctx.globalAlpha = a
  dctx.fillRect(posX, posY, cellPixelLength, cellPixelLength)
}
