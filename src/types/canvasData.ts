import type { MutableRefObject } from 'react'
import type { IntRange } from './intRange'

export type CanvasData = {
  readonly cellSideCount: number
  cellPixelLength: number

  draft: HTMLCanvasElement | null
  main: HTMLCanvasElement | null

  painter: {
    isPainter: boolean | null
    painting: boolean | null
    pixelHistory: PixelHistory
    lastDrawedPixel: LastDrawedPixel | null
  }
}

export type CanvasDataRef = MutableRefObject<CanvasData>

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
