import { create } from 'zustand'

type State = { text: string | null }

type Action = {
  set: (input: string) => void
  get: () => string | null
  reset: () => void
}

export const useTopNavbarText = create<State & Action>((set, get) => ({
  text: null,

  set: (input) =>
    set({
      text: input,
    }),

  get: () => get().text,
  reset: () => set({ text: null }),
}))
