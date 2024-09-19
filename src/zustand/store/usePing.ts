import { create } from 'zustand'

type State = {
  interval: null | ReturnType<typeof setInterval>
  ping: number
}

type Action = {
  setInterval: (input: ReturnType<typeof setInterval>) => void
  set: (input: number) => void
  get: () => number
  reset: () => void
}

const initState: State = {
  interval: null,
  ping: 0,
}

export const usePing = create<State & Action>((set, get) => ({
  interval: null,
  ping: 0,

  set: (input) =>
    set({
      ...get(),
      ping: input,
    }),

  setInterval: (interval) =>
    set({
      ...get(),
      interval,
    }),

  get: () => get().ping,
  reset: () => {
    const interval = get().interval
    if (interval) clearInterval(interval)
    set(initState)
  },
}))
