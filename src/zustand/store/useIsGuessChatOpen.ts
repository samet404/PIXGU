import { create } from 'zustand'

type State = { value: boolean }

type Action = {
  close: () => void
  open: () => void
  reset: () => void
}

const initValue = true

export const useIsGuessChatOpen = create<State & Action>((set, get) => ({
  value: initValue,

  close: () =>
    set({
      value: false,
    }),

  open: () =>
    set({
      value: true,
    }),

  reset: () => set({ value: initValue }),
}))
