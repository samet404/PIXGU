import { create } from 'zustand'

type Value = {
  status: 'thereIsNoPainter' | 'selectingTheme' | 'selectedTheme' | 'painterSelected'
  painterID: string | null
  nextPainterI: number | null
}


type State = {
  value: Value
}
type Action = {
  painterSelected: (input: {
    painterID: string
    nextPainterI: number | null
  }) => void
  selectedTheme: () => void
  selectingTheme: () => void
  isPainter: (userID: string) => boolean
  reset: () => void
}

const initValue: State = {
  value: {
    status: 'thereIsNoPainter',
    painterID: null,
    nextPainterI: null,
  },
}

export const useWhoIsPainter = create<State & Action>((set, get) => ({
  ...initValue,

  painterSelected: ({ nextPainterI, painterID }) =>
    set({
      value: {
        status: 'painterSelected',
        nextPainterI,
        painterID,
      },
    }),

  selectedTheme: () => set({
    value: {
      ...get().value,
      status: 'selectedTheme',
    },
  }),
  selectingTheme: () => set({
    value: {
      ...get().value,
      status: 'selectingTheme',
    },
  }),

  isPainter: (ID) => {
    const value = get().value
    if (value.status === 'painterSelected') return value.painterID === ID
    return false
  },

  reset: () => set(initValue),
}))
