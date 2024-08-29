import { create } from 'zustand'
import { useRoomWinnersChatMsgsStore } from './useRoomWinnersChatMsgs'

type Value =
  | {
      haveAccess: false
      isOpen: false
    }
  | {
      haveAccess: true
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
  setImNotGuessed: () => void
  setIGuessed: () => void
  close: () => void
  open: () => void
  reset: () => void
}

const initValue: State = {
  value: { isOpen: false, haveAccess: false },
}

export const useWinnersChatLayout = create<State & Action>((set, get) => ({
  ...initValue,

  close: () =>
    set({
      value: { ...get().value, isOpen: false },
    }),

  open: () =>
    set({
      value: { ...get().value, isOpen: true } as Value,
    }),

  setPainterLayout: () => {
    set({
      value: {
        isOpen: false,
        input: false,
        change: true,
        info: true,
        haveAccess: true,
      },
    })

    useRoomWinnersChatMsgsStore.getState().reset()
  },

  setImNotGuessed: () => {
    set({
      value: { isOpen: false, haveAccess: false },
    })

    useRoomWinnersChatMsgsStore.getState().reset()
  },

  setIGuessed: () => {
    set({
      value: {
        isOpen: false,
        haveAccess: true,
        input: true,
        change: true,
        info: true,
      },
    })

    useRoomWinnersChatMsgsStore.getState().reset()
  },

  reset: () => set(initValue),
}))
