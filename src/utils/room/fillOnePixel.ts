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
  const posX = Math.floor(cellPixelLength * x)
  const posY = Math.floor(cellPixelLength * y)

  const mctx = canvasesMainData.draft!.getContext('2d')!

  // Create ImageData for the entire pixel area
  const imageData = mctx.createImageData(cellPixelLength, cellPixelLength)
  const data = imageData.data
  console.log(cellPixelLength)

  // Fill the entire ImageData with the color
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r // Red
    data[i + 1] = g // Green
    data[i + 2] = b // Blue
    data[i + 3] = Math.floor(a * 255) // Alpha (rounded to nearest integer)
  }

  // Put the ImageData on the canvas
  mctx.putImageData(imageData, posX, posY)
}
