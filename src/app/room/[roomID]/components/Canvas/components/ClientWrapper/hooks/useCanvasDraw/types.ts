import { type IntRange } from '@/types/intRange'

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

export type PixelPerSecond = {
  Date: Date
  count: number
}[]
