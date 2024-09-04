import { create } from 'zustand'
import { useRoomGuessChatMsgsStore } from './useRoomGuessChatMsgs'

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
    useRoomGuessChatMsgsStore.getState().reset()
  },

  setPainterLayout: () => {
    set({
      value: { isOpen: true, input: false, change: true, info: true },
    })

    useRoomGuessChatMsgsStore.getState().reset()
  },

  setImNotGuessed: () => {
    set({
      value: { isOpen: true, input: true, change: false, info: true },
    })
    useRoomGuessChatMsgsStore.getState().reset()
  },

  setIGuessed: () => {
    set({
      value: { isOpen: true, input: false, change: true, info: true },
    })

    useRoomGuessChatMsgsStore.getState().reset()
  },

  reset: () => set(initValue),
}))
