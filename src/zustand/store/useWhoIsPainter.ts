import { create } from 'zustand'

type Value =
  | {
    status: 'currentPainter' | 'thereIsNoPainter'
    amIPainter: boolean | null
    painterID: string | null
    nextPainterI: number | null
  }


type State = {
  value: Value
}
type Action = {
  setCurrentPainter: (input: {
    amIPainter: boolean
    painterID: string
    nextPainterI: number
  }) => void
  isPainter: (userID: string) => boolean
  reset: () => void
}

const initValue: State = {
  value: {
    status: 'thereIsNoPainter',
    amIPainter: null,
    painterID: null,
    nextPainterI: null,

  },
}

export const useWhoIsPainter = create<State & Action>((set, get) => ({
  ...initValue,

  setCurrentPainter: ({ amIPainter, nextPainterI, painterID }) =>
    set({
      value: {
        status: 'currentPainter',
        amIPainter,
        nextPainterI,
        painterID,
      },
    }),

  isPainter: (ID) => {
    const value = get().value
    if (value.status === 'currentPainter') {
      return value.painterID === ID
    }

    return false
  },

  reset: () => set(initValue),
}))
