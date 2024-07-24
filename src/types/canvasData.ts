import type { IntRange } from './intRange'

/**
 * Main canvases data.
 */
export type CanvasesMainData = {
  readonly cellSideCount: number | null
  cellPixelLength: number | null

  draft: HTMLCanvasElement | null
  main: HTMLCanvasElement | null
}

/**
 * Painter data.
 */

type MyPainterData = {
  theme: string | null
  amIPainter: true
  amIpainting: boolean
}

type OtherPaintersData = {
  amIPainter: false
}

type DefaultPainterData = {
  painters: Record<
    string,
    {
      pixelHistory: PixelHistory
      lastDrawedPixel: LastDrawedPixel
    }
  >
}

export type PainterData = {
  value: ((MyPainterData | OtherPaintersData) & DefaultPainterData) | null
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
} | null
