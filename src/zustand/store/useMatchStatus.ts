import { MATCH_TIME_SECONDS } from '@/constants'
import { create } from 'zustand'

type State = {
  value: {
    passedSeconds: number | null
    remainSeconds: number | null
    isFirstMatch: boolean
    matchCount: number
    startedAt: number | null
  }
}
type Action = {
  timeoutStarted: (roomID: string) => void
  timeoutCancelled: () => void
  cancelMatch: () => void
  decreaseRemainSeconds: () => void
  reset: () => void
}

const initValue: State = {
  value: {
    remainSeconds: null,
    passedSeconds: null,
    isFirstMatch: true,
    matchCount: 0,
    startedAt: null,
  },
}


export const useMatchStatus = create<State & Action>((set, get) => ({
  ...initValue,
  decreaseRemainSeconds: () => {
    set({
      value: {
        ...get().value,
        remainSeconds: get().value.remainSeconds! - 1,
        passedSeconds: get().value.passedSeconds! + 1
      }
    })
  },

  cancelMatch: () =>
    set({
      value: {
        matchCount: Math.max(0, get().value.matchCount - 1),
        isFirstMatch: Math.max(0, get().value.matchCount - 1) === 0,
        passedSeconds: null,
        remainSeconds: null,
        startedAt: null,
      }
    }),

  timeoutStarted: () => {
    set({
      value: {
        passedSeconds: 0,
        startedAt: Date.now(),
        remainSeconds: MATCH_TIME_SECONDS,
        matchCount: get().value.matchCount + 1,
        isFirstMatch: false,
      },
    })
  },

  timeoutCancelled: () => {
    set({
      value: {
        ...get().value,
        passedSeconds: null,
        remainSeconds: null,
        startedAt: null,
      },
    })
  },

  reset: () => set({ ...initValue }),
}))
