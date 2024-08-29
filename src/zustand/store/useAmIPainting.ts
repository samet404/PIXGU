import { create } from 'zustand'

type State = { amIPainting: boolean }

type Action = {
  imPainting: () => void
  imNotPainting: () => void
  reset: () => void
}

const initValue: State = {
  amIPainting: false,
}

export const useAmIPainting = create<State & Action>((set) => ({
  ...initValue,

  imPainting: () => set({ amIPainting: true }),
  imNotPainting: () => set({ amIPainting: false }),
  reset: () => set(initValue),
}))
