import { create } from 'zustand'

type State = { coin: number }

type Action = {
  add: (input: number) => void
  get: () => number
  set: (input: number) => void
  minus: (input: number) => void
  reset: () => void
}

const initValue = 0

export const useMyCoin = create<State & Action>((set, get) => ({
  coin: initValue,

  add: (input) =>
    set({
      coin: parseFloat((get().coin + input).toFixed(2)),
    }),

  set: (input) =>
    set({
      coin: parseFloat(input.toFixed(2)),
    }),

  minus: (input) =>
    set({
      coin: parseFloat((get().coin - input).toFixed(2)),
    }),
  get: () => get().coin,
  reset: () => set({ coin: initValue }),
}))
