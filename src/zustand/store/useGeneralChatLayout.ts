import { create } from 'zustand'
// import { useRoomGeneralChatMsgsStore } from './useRoomGeneralChatMsgs'

type Value =
  {
    haveAccess: false
    isOpen: false
  }
  |
  {
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
  setNotAvailable: () => void
  setAvailable: () => void
  close: () => void
  open: () => void
  reset: () => void
}

const initValue: State = {
  value: { isOpen: false, haveAccess: false },
}

export const useGeneralChatLayout = create<State & Action>((set, get) => ({
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
        input: true,
        change: true,
        info: true,
        haveAccess: true,
      },
    })

  },

  setNotAvailable: () => {
    set({
      value: { isOpen: false, haveAccess: false },
    })

  },

  setAvailable: () => {
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
