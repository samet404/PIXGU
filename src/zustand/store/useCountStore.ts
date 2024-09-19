import { create } from 'zustand'

type State = { count: number; count2: number }

type Action = {
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCountStore = create<State & Action>((set, get) => ({
  count: 0,
  count2: 0,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () =>
    set(({ count, count2 }) => ({ count: count - 1, count2: count2 - 1 })),
  reset: () => set({ count: 0 }),
}))
