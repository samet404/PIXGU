import { create } from 'zustand'

const initValue: State = {
  value: {
    status: 'thereIsNoPainter',
    amIPainter: null,
    painterID: null,
  },
}

export const useWhoIsPainterClient = create<State & Action>((set, get) => ({
  ...initValue,

  selectingTheme: () => set({
    value: {
      ...get().value,
      status: 'selectingTheme'
    }
  }),

  setPainterSelected: ({ amIPainter, painterID }) =>
    set({
      value: {
        status: 'painterSelected',
        amIPainter,
        painterID,
      },
    }),

  isPainter: (ID) => {
    const value = get().value
    if (value.status === 'selectedTheme') {
      return value.painterID === ID
    } else {
      console.log('No painter')
      return false
    }
  },

  selectedTheme: () => set({
    value: {
      ...get().value,
      status: 'selectedTheme',
    }
  }),

  reset: () => set(initValue),
}))

type Value = {
  status: 'thereIsNoPainter' | 'selectingTheme' | 'selectedTheme' | 'painterSelected'
  amIPainter: boolean | null
  painterID: string | null
}

type State = {
  value: Value
}
type Action = {
  setPainterSelected: (input: { amIPainter: boolean; painterID: string }) => void
  selectingTheme: () => void
  selectedTheme: () => void
  isPainter: (userID: string) => boolean
  reset: () => void
}