import type { IntRange } from './intRange'

/**
 * Main canvases data.
 */
export type CanvasesMainData = {
  readonly cellSideCount: number
  cellPixelLength: number

  draft: HTMLCanvasElement | null
  main: HTMLCanvasElement | null
}

/**
 * Painter data.
 */
export type CanvasesPainterData = {
  isPainter: boolean | null
  data: {
    painting: boolean | null
    pixelHistory: PixelHistory
    lastDrawedPixel: LastDrawedPixel | null
  }
}

type X = number
type Y = number

export type PixelHistory = Record<
  `${X}_${Y}`,
  {
    r: IntRange<0, 256>
    g: IntRange<0, 256>
    b: IntRange<0, 256>
    a: IntRange<0, 2>
  }
>

export type LastDrawedPixel = {
  x: number
  y: number
}
