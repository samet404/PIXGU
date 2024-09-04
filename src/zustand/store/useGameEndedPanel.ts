import type { GameEnded } from '@/types/webRTCConnData'
import { create } from 'zustand'

type State = {
  value:
    | ({
        isOpen: true
      } & GameEnded['data'])
    | {
        isOpen: false
      }
}

type Action = {
  open: (input: GameEnded['data']) => void
  close: () => void
  reset: () => void
}

const initState: State = {
  value: {
    isOpen: false,
  },
}

export const useGameEndedPanel = create<State & Action>((set, get) => ({
  ...initState,

  open: (input) =>
    set({
      value: {
        isOpen: true,
        ...input,
      },
    }),

  close: () =>
    set({
      value: {
        isOpen: false,
      },
    }),

  reset: () => set(initState),
}))
