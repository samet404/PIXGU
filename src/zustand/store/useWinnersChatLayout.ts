import { create } from 'zustand'
// import { useRoomWinnersChatMsgsStore } from './useRoomWinnersChatMsgs'

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
  setSpectatorLayout: () => void
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

  setSpectatorLayout: () =>
    set({
      value: {
        isOpen: false,
        haveAccess: true,
        input: false,
        change: true,
        info: false,
      },
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

  },

  setImNotGuessed: () => {
    set({
      value: { isOpen: false, haveAccess: false },
    })

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

  },

  reset: () => set(initValue),
}))
