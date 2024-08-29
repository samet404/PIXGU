import type { IntRange } from '@/types/intRange'
import { create } from 'zustand'

type Value =
  | {
      status: 'currentPainter'
      amIPainter: boolean
      painterID: string
    }
  | {
      status: 'thereIsNoPainter'
    }

type State = {
  value: Value
}
type Action = {
  setCurrentPainter: (input: { amIPainter: boolean; painterID: string }) => void
  isPainter: (userID: string) => boolean
  reset: () => void
}

const initValue: State = {
  value: {
    status: 'thereIsNoPainter',
  },
}

export const useWhoIsPainterClient = create<State & Action>((set, get) => ({
  ...initValue,

  setCurrentPainter: ({ amIPainter, painterID }) =>
    set({
      value: {
        status: 'currentPainter',
        amIPainter,
        painterID,
      },
    }),

  isPainter: (ID) => {
    const value = get().value
    if (value.status === 'currentPainter') {
      return value.painterID === ID
    } else {
      console.error('No painter')
      return false
    }
  },

  reset: () => set(initValue),
}))
