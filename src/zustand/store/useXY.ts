import { create } from 'zustand'

type Value = {
  x: number
  y: number
}

type State = {
  value: Value
}

type Action = {
  set: (x: number, y: number) => void
  reset: () => void
}

const initValue: State = {
  value: { x: 0, y: 0 },
}

export const useXY = create<State & Action>((set) => ({
  ...initValue,

  set: (x, y) => set({ value: { x: x + 1, y: y + 1 } }),
  reset: () => set(initValue),
}))
