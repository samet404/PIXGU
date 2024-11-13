
/**
 * Fills one pixel on the canvas
 * 
 * @param ctx - The canvas context
 * @param smoothX - The x coordinate of the pixel to fill
 * @param smoothY - The y coordinate of the pixel to fill
 * @param cellPixelLength - The length of a cell in pixels
 * @param color - The color of the pixel to fill
* @returns Object with the requested data
 * 
 */
export const fillOnePixel = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  smoothX: number,
  smoothY: number,
  cellPixelLength: number,
  color: Uint8ClampedArray,
) => {
  const exactX = Math.floor(cellPixelLength! * smoothX)
  const exactY = Math.floor(cellPixelLength! * smoothY)

  ctx.beginPath()
  ctx.globalAlpha = color[3]! / 255
  ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  ctx.fillRect(exactX, exactY, cellPixelLength!, cellPixelLength!)
}


