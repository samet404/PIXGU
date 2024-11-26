import type { GameEnded } from '@/types/webRTCConnData'
import { percentageOf } from '@/utils/percentageOf'
import { create } from 'zustand'

type State = {
  value: {
    isOpen: boolean
    timerPassedMs: number
    timerPassedMsWithPercent: number
    coins: GameEnded['data']['coins'] | null
  }
}

type Action = {
  open: (input: GameEnded['data']) => void
  add50msToTimer: () => void
  close: () => void
  reset: () => void
}

const initState: State = {
  value: {
    isOpen: false,
    timerPassedMs: 0,
    timerPassedMsWithPercent: 0,
    coins: null
  },
}

export const useGameEndedPanel = create<State & Action>((set, get) => ({
  ...initState,

  open: (input) => {
    set({
      value: {
        timerPassedMs: 0,
        timerPassedMsWithPercent: 0,
        isOpen: true,
        coins: input.coins
      },
    })

  },

  add50msToTimer: () =>
    set({
      value: {
        ...get().value,
        timerPassedMs: get().value.timerPassedMs + 50,
        timerPassedMsWithPercent: percentageOf(get().value.timerPassedMs, 20000)
      }
    }),

  close: () =>
    set({
      value: {
        isOpen: false,
        timerPassedMs: 0,
        timerPassedMsWithPercent: 0,
        coins: null
      },
    }),

  reset: () => set({ ...initState }),
}))
