import { create } from 'zustand'

type Value = {
  isOpen: boolean
  input: boolean
  change: boolean
  info: boolean
}
type State = {
  value: Value
}

type Action = {
  setSpectatorLayout: () => void
  setPainterLayout: () => void
  setImNotGuessed: () => void
  setIGuessed: () => void
  open: () => void
  close: () => void
  reset: () => void
}

const initValue: State = {
  value: { isOpen: true, input: true, change: false, info: true },
}

export const useGuessChatLayout = create<State & Action>((set, get) => ({
  ...initValue,

  open: () => set({ value: { ...get().value, isOpen: true } }),
  close: () => set({ value: { ...get().value, isOpen: false } }),

  setSpectatorLayout: () => {
    set({
      value: { isOpen: true, input: false, change: true, info: false },
    })
  },

  setPainterLayout: () => {
    console.log("setting i'm painter layout")

    set({
      value: { isOpen: true, input: false, change: true, info: true },
    })
  },

  setImNotGuessed: () => {
    console.log("setting i'm not guessed layout")
    set({
      value: { isOpen: true, input: true, change: false, info: true },
    })
  },

  setIGuessed: () => {
    console.log("setting i'm guessed layout")

    set({
      value: { isOpen: true, input: false, change: true, info: true },
    })

  },

  reset: () => set(initValue),
}))
