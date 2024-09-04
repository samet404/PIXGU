import { create } from 'zustand'

type State = { count: number }

type Action = {
  increment: () => void
  decrement: () => void
  reset: () => void
}

const initState: State = {
  count: 0,
}

export const useMatchCount = create<State & Action>((set, get) => ({
  ...initState,

  increment: () =>
    set({
      count: get().count + 1,
    }),

  decrement: () =>
    set({
      count: get().count - 1,
    }),

  reset: () => set(initState),
}))
