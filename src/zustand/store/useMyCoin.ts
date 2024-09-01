import { create } from 'zustand'

type State = { coin: number }

type Action = {
  add: (input: number) => void
  get: () => number
  reset: () => void
}

const initValue = 0

export const useMyCoin = create<State & Action>((set, get) => ({
  coin: initValue,

  add: (input) =>
    set({
      coin: get().coin + input,
    }),

  get: () => get().coin,
  reset: () => set({ coin: initValue }),
}))
