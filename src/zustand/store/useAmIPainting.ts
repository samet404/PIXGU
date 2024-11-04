import { create } from 'zustand'

type State = {
  amIPainting: boolean
  startCoords: [x: number, y: number] | null
}

type Action = {
  imPainting: () => void
  imNotPainting: () => void
  reset: () => void
}

const initValue: State = {
  amIPainting: false,
  startCoords: null
}

export const useAmIPainting = create<State & Action>((set) => ({
  ...initValue,

  imPainting: () => set({ amIPainting: true }),
  imNotPainting: () => set({ amIPainting: false }),
  reset: () => set(initValue),
}))
