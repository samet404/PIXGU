import type { IntRange } from '@/types/intRange'
import { create } from 'zustand'

type State = PainterData

type Action = {
  add: (input: Partial<PainterData>) => void
  isPainter: (userID: string) => boolean
  changePainter: (painter: Partial<Painter>) => void
  addNewPainter: (painter: Painter) => void
  getPainterIDs: () => string | undefined
  get: () => PainterData
}

export const usePainterData = create<State & Action>((set, get) => ({
  painter: null,
  secondPainterI: 1,
  amIPainter: false,
  amIPainting: false,
  theme: null,

  add: (input) =>
    set({
      ...get(),
      ...(input as PainterData),
    }),
  changePainter: (painter) =>
    set({
      ...get(),
      painter: {
        ...painter,
      } as Painter,
    }),

  addNewPainter: (painter) =>
    set({
      painter,
    }),

  isPainter: (userID: string) => get().painter?.ID === userID,
  getPainterIDs: () => get().painter?.ID,
  get: () => get(),
}))

export type PainterData = (MyPainterData | OtherPaintersData) &
  DefaultPainterData

type MyPainterData = {
  theme: string | null
  amIPainter: true | null
  amIPainting: boolean
}

type OtherPaintersData = {
  amIPainter: false
}

type Painter = {
  ID: string
  pixelHistory: PixelHistory
  lastDrawedPixel: LastDrawedPixel
} | null

type DefaultPainterData = {
  painter: Painter
  secondPainterI: number
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
