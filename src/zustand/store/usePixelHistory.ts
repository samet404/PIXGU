import { create } from 'zustand'
import type { PainterToolState } from './usePainterTool'

type X = number
type Y = number
type ToolName = PainterToolState['current']

export type PixelHistory = Record<
  `${X}_${Y}`,
  {
    tool: ToolName
    rgba: [number, number, number, number]
  }
>

type State = PixelHistory

type Action = {
  get: (input: [number, number]) => State[keyof State] | undefined
  add: (
    input: State[keyof State] & {
      x: number
      y: number
    },
  ) => void
  reset: () => void
}

const initValue: State = {}

export const usePixelHistory = create<State & Action>((set, get) => ({
  ...initValue,
  get: ([x, y]) => get()[`${x}_${y}`],
  add: ({ rgba, tool, x, y }) =>
    set({
      ...get(),
      [`${x}_${y}`]: { rgba, tool },
    }),
  reset: () => set(initValue),
}))
