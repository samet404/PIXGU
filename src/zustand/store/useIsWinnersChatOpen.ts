import { create } from 'zustand'

type State = { value: boolean }

type Action = {
  close: () => void
  open: () => void
}

export const useIsWinnersChatOpen = create<State & Action>((set, get) => ({
  value: false,

  close: () =>
    set({
      value: false,
    }),

  open: () =>
    set({
      value: true,
    }),
}))
