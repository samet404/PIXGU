import { create } from 'zustand'

type State = { coin: number }

type Action = {
  set: (input: number) => void
  get: () => number
}

export const useMyCoin = create<State & Action>((set, get) => ({
  coin: 0,

  set: (input) =>
    set({
      coin: input,
    }),

  get: () => get().coin,
}))
