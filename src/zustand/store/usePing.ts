import { create } from 'zustand'

type State = { ping: number }

type Action = {
  set: (input: number) => void
  get: () => number
}

export const usePing = create<State & Action>((set, get) => ({
  ping: 0,

  set: (input) =>
    set({
      ping: input,
    }),

  get: () => get().ping,
}))
