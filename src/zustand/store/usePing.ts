import { create } from 'zustand'

type State = {
  interval: null | ReturnType<typeof setInterval>
  ping: number | null
}

type Action = {
  setInterval: (input: ReturnType<typeof setInterval>) => void
  set: (input: number) => void
  reset: () => void
}

const initState: State = {
  interval: null,
  ping: null,
}

export const usePing = create<State & Action>((set, get) => ({
  interval: null,
  ping: null,

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

  reset: () => {
    const interval = get().interval
    if (interval) clearInterval(interval)
    set(initState)
  },
}))
