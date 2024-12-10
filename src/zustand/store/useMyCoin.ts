import { create } from 'zustand'

type State = {
  prevCoin: number | null
  coin: number
}

type Action = {
  add: (input: number) => void
  get: () => number
  set: (input: number) => void
  newMatch: () => void
  returnPrev: () => void
  minus: (input: number) => void
  reset: () => void
}

const initValue: State = {
  prevCoin: null,
  coin: 0,
}

export const useMyCoin = create<State & Action>((set, get) => ({
  ...initValue,

  newMatch: () =>
    set({
      ...get(),
      prevCoin: get().coin,
    }),

  returnPrev: () =>
    set({
      prevCoin: null,
      coin: get().prevCoin!,
    }),

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
  reset: () => set({ ...initValue }),
}))
