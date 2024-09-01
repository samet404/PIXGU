import { create } from 'zustand'

type State = {
  value: [x: number, y: number][]
}

type Action = {
  set: (input: { x: number; y: number }) => void
  isExits: (input: { x: number; y: number }) => boolean
  reset: () => void
}

const initValue: State = { value: [] }

export const usePixelsOnDraw = create<State & Action>((set, get) => ({
  ...initValue,

  set: ({ x, y }) => set({ value: [...get().value, [x, y]] }),
  isExits: ({ x, y }) => get().value.some(([x2, y2]) => x === x2 && y === y2),
  reset: () => set(initValue),
}))
