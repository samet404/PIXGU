import { getSearchParam } from '@/utils/getSearchParam'

export const fillOnePixel = (
  draftCanvas: HTMLCanvasElement,
  dctx: CanvasRenderingContext2D,
  cellPixelLength: number,
  x: number,
  y: number,
) => {
  // getting position of the pixel
  const posX = cellPixelLength * x
  const posY = cellPixelLength * y

  // getting color from url
  const canvasColor = getSearchParam('color') as
    | `rgba/${string}-${string}-${string}-${string}`
    | undefined

  const rgb = (): `rgba(${string}, ${string}, ${string}, 1)` => {
    if (!canvasColor) return `rgba(0, 0, 0, 1)`

    const canvasColorSplit = canvasColor.replace('rgba/', '').split('-')
    const r = canvasColorSplit[0] ?? '0'
    const g = canvasColorSplit[1] ?? '0'
    const b = canvasColorSplit[2] ?? '0'

    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  const opacity = (): number => {
    if (!canvasColor) return 1

    return parseFloat(canvasColor.replace('rgba/', '').split('-')[3] ?? '1')
  }

  // drawing the pixel
  dctx.fillStyle = rgb()
  dctx.globalAlpha = opacity()
  dctx.fillRect(posX, posY, cellPixelLength, cellPixelLength)

  // returning the info
  const info = {
    x: x,
    y: x,
    rgb: rgb(),
    opacity: opacity(),
  }

  return {
    info,
  }
}
