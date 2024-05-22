import { type IntRange } from '@/types/intRange'

export type CanvasData = {
  cellSideCount: number
  cellPixelLength: number
  draftCanvas: HTMLCanvasElement
  mainCanvas: HTMLCanvasElement
  dctx: CanvasRenderingContext2D
  mctx: CanvasRenderingContext2D
  painter: {
    painting: boolean | null
    pixelHistory: PixelHistory | null
    lastDrawedPixel: LastDrawedPixel
  }
}

export type PixelHistory = Record<
  `${string}_${string}`,
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
