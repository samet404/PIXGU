import { create } from 'zustand'

type Value =
  | {
      isOpen: true
      status: 'waitingForThemes'
    }
  | {
      isOpen: true
      status: 'selectingTheme'
      themes: [string, string]
    }
  | {
      isOpen: false
      status: 'selectedTheme'
      theme?: string
    }
  | {
      isOpen: false
    }

type State = {
  value: Value
}

type Action = {
  open: () => void
  close: () => void
  selectTheme: (input: { theme: string }) => void
  setSelectingTheme: (input: { themes: [string, string] }) => void
  reset: () => void
}

const initValue: State = {
  value: {
    isOpen: false,
  },
}

export const useSelectThemePanel = create<State & Action>((set, get) => ({
  ...initValue,

  selectTheme: ({ theme }) =>
    set({
      value: {
        theme,
        status: 'selectedTheme',
        isOpen: false,
      },
    }),

  open: () =>
    set({
      value: {
        status: 'waitingForThemes',
        isOpen: true,
      },
    }),

  close: () =>
    set({
      value: {
        isOpen: false,
      },
    }),

  setSelectingTheme: ({ themes }) =>
    set({
      value: {
        status: 'selectingTheme',
        isOpen: true,
        themes,
      },
    }),

  reset: () => set(initValue),
}))
