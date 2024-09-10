type X = number
type Y = number

export type PixelHistory = Record<
  `${X}_${Y}`,
  {
    r: number
    g: number
    b: number
    a: number
  }
>

import { create } from 'zustand'

type State = PixelHistory

type Action = {
  get: (input: { x: number; y: number }) =>
    | {
        r: number
        g: number
        b: number
        a: number
      }
    | undefined
  add: (input: {
    x: number
    y: number
    r: number
    g: number
    b: number
    a: number
  }) => void
  reset: () => void
}

const initValue: State = {}

export const usePixelHistory = create<State & Action>((set, get) => ({
  ...initValue,
  get: ({ x, y }) => get()[`${x}_${y}`],
  add: ({ x, y, r, g, b, a }) =>
    set({
      ...get(),
      [`${x}_${y}`]: { r, g, b, a },
    }),
  reset: () => set(initValue),
}))
