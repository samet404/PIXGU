import { create } from 'zustand'

type State = {
  ping: number | undefined | null
}

type Action = {
  set: (input: number | undefined) => void
  reset: () => void
}

const initState: State = {
  ping: null,
}

export const usePing = create<State & Action>((set, get) => ({
  ...initState,

  set: (input) =>
    set({
      ...get(),
      ping: input
    }),

  reset: () => set({ ...initState }),
}))
