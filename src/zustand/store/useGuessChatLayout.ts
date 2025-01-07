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
  setPainterLayout: () => void
  setAvailable: () => void
  setNotAvailable: () => void
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

  setPainterLayout: () => {
    console.log("setting i'm painter layout")

    set({
      value: { isOpen: true, input: false, change: true, info: true },
    })
  },

  setAvailable: () => {
    set({
      value: { isOpen: true, input: true, change: false, info: true },
    })
  },

  setNotAvailable: () => {
    set({
      value: { isOpen: false, input: false, change: true, info: true },
    })

  },

  reset: () => set(initValue),
}))
