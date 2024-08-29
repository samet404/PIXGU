import { create } from 'zustand'

type State = {
  value: {
    x: number
    y: number
  } | null
}

type Action = {
  set: (input: { x: number; y: number }) => void
  reset: () => void
}

const initValue: State = { value: null }

export const useLastPixel = create<State & Action>((set, get) => ({
  ...initValue,
  set: ({ x, y }) => set({ value: { x, y } }),
  reset: () =>
    set({
      value: null,
    }),
}))
