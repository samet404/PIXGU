import { create } from 'zustand'

type Value = {
  x: number
  y: number
} | null

type State = {
  value: Value
}

type Action = {
  set: (x: number, y: number) => void
  reset: () => void
}

const initValue: State = {
  value: null,
}

export const useXY = create<State & Action>((set) => ({
  ...initValue,

  set: (x, y) => set({ value: { x: x + 1, y: y + 1 } }),
  reset: () => set(initValue),
}))
