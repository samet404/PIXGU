import { create } from 'zustand'

type State = {
  amIPainting: boolean
  button: number | null
}

type Action = {
  imPainting: (button: number) => void
  imNotPainting: () => void
  reset: () => void
}

const initValue: State = {
  amIPainting: false,
  button: null
}

export const useAmIPainting = create<State & Action>((set) => ({
  ...initValue,

  imPainting: (button) => set({ amIPainting: true, button: button }),
  imNotPainting: () => set({ amIPainting: false }),
  reset: () => set(initValue),
}))
