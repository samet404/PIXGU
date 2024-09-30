import type { RGBAObj } from '@/types'
import { useCanvasesMainData, useLastPixel } from '@/zustand/store'

/**
 * Fills one pixel on the canvas
 */
export const fillOnePixel = (
  x: number,
  y: number,
  rgba: RGBAObj,
  options?: {
    returnImageData?: boolean
  },
) => {
  const canvasesMainData = useCanvasesMainData.getState().get()
  const { r, g, b, a } = rgba
  const cellPixelLength = canvasesMainData.cellPixelLength!

  // getting position of the pixel
  const posX = Math.floor(cellPixelLength * x)
  const posY = Math.floor(cellPixelLength * y)

  const draft = canvasesMainData.draft!
  const dctx = canvasesMainData.draft!.getContext('2d')!
  const mctx = draft.getContext('2d')!

  // Create ImageData for the entire pixel area
  const imageData = dctx.createImageData(cellPixelLength, cellPixelLength)
  const data = imageData.data
  console.log(cellPixelLength)

  // Fill the entire ImageData with the color
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r // Red
    data[i + 1] = g // Green
    data[i + 2] = b // Blue
    data[i + 3] = a * 255 // Alpha
  }

  useLastPixel.getState().set({
    x,
    y,
  })

  console.log('fillOnePixel: ', posX, posY)
  // Put the ImageData on the canvas
  dctx.putImageData(imageData, posX, posY)
  mctx.drawImage(draft, posX, posY, 0, 0) // copy drawing to main
  dctx.clearRect(posX, posY, 0, 0) // clear draft
  if (options?.returnImageData)
    return mctx.getImageData(0, 0, draft.width, draft.height)
}
