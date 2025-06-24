import { create } from 'zustand'

type State = {
  value: {
    isOpen: boolean
    painterID?: string
    status?: 'selectingTheme' | 'waitingForThemes'
  }
}

type Action = {
  open: (input: { painterID: string }) => void
  close: () => void
  setSelectingTheme: () => void
  reset: () => void
}

const initValue: State = {
  value: {
    isOpen: false,
  },
}

export const useNewPainterPanel = create<State & Action>((set, get) => ({
  ...initValue,

  open: ({ painterID }) =>
    set({
      value: {
        isOpen: true,
        status: 'waitingForThemes',
        painterID,
      },
    }),

  close: () => set({ value: { isOpen: false } }),
  setSelectingTheme: () =>
    set({
      value: {
        ...get().value,
        status: 'selectingTheme',
      },
    }),
  reset: () => set(initValue),
}))
