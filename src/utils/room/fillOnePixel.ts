import { storePixelHistory, type PixelHistoryStoreHistoryValue, type PixelHistoryStoreValue } from '@/store'
import { useCanvasesMainData } from '@/zustand/store'

type Options = Partial<{
  canvasImageData: boolean
  pixelImageData: boolean
}>

type ReturnType = {
  canvasImageData: ImageData
  pixelImageData: ImageData
}

type ExtractReturnType<T extends Options | undefined> = T extends undefined ? {} : {
  [K in keyof T as T[K] extends true ? K : never]: K extends keyof ReturnType ? ReturnType[K] : never
}

/**
 * Fills one pixel on the canvas
 * 
 * @param draft - The draft canvas
 * @param dctx - The draft canvas context
 * @param mctx - The main canvas context 
 * @param smoothX - The x coordinate of the pixel to fill
 * @param smoothY - The y coordinate of the pixel to fill
 * @param rgba - The color of the pixel to fill
 * @param tool - The tool used to fill the pixel
 * @param options - Options for the function
 * @returns Object with the requested data
 * 
 */
export const fillOnePixel = <T extends Options>(
  draft: HTMLCanvasElement,
  dctx: CanvasRenderingContext2D,
  mctx: CanvasRenderingContext2D,
  smoothX: number,
  smoothY: number,
  rgba: Uint8ClampedArray,
  tool: PixelHistoryStoreHistoryValue['tool'],
  options: T
): ExtractReturnType<T> => {
  const { cellPixelLength } = useCanvasesMainData.getState().get()

  // Calculate pixel position
  const exactX = Math.floor(cellPixelLength! * smoothX)
  const exactY = Math.floor(cellPixelLength! * smoothY)

  // Create and fill pixel ImageData
  const imageData = dctx.createImageData(cellPixelLength!, cellPixelLength!)
  const data = imageData.data

  // Fill color data (unrolled loop for better performance)
  const length = data.length
  for (let i = 0; i < length; i += 4) {
    data[i] = rgba[0]!
    data[i + 1] = rgba[1]!
    data[i + 2] = rgba[2]!
    data[i + 3] = rgba[3]! * 255
  }

  // Draw to draft and copy to main
  dctx.putImageData(imageData, exactX, exactY)
  mctx.drawImage(draft!, exactX, exactY, cellPixelLength!, cellPixelLength!, exactX, exactY, cellPixelLength!, cellPixelLength!)

  // Add pixel to history
  const drawedPixel = mctx.getImageData(exactX, exactY, 1, 1)
  storePixelHistory.add({
    x: smoothX,
    y: smoothY,
    rgba: drawedPixel.data,
    tool
  })

  // Clear draft
  draft!.width = draft!.width // Fastest way to clear canvas

  // #region Return requested data
  const returnData: Partial<ReturnType> = {}

  if (options?.canvasImageData) {
    returnData.canvasImageData = mctx.getImageData(0, 0, draft!.width, draft!.height)
  }

  if (options?.pixelImageData) {
    returnData.pixelImageData = drawedPixel
  }

  return returnData as ExtractReturnType<T>
  // #endregion
}


