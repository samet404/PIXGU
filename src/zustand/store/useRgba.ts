import { create } from 'zustand'

type Value = {
  r: number
  g: number
  b: number
  a: number
}

type State = {
  value: Value
}

type Action = {
  set: (input: { r: number; g: number; b: number; a: number }) => void
  reset: () => void
}

const initValue: State = {
  value: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
}

export const useRgba = create<State & Action>((set) => ({
  ...initValue,

  set: (input) => set({ value: input }),
  reset: () => set(initValue),
}))
