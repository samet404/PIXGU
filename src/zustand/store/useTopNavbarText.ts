import { create } from 'zustand'

type State = { text: string }

type Action = {
  set: (input: string) => void
  get: () => string
}

export const useTopNavbarText = create<State & Action>((set, get) => ({
  text: 'Connecting to host...',

  set: (input) =>
    set({
      text: input,
    }),

  get: () => get().text,
}))
