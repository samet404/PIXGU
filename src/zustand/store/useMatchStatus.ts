import { create } from 'zustand'

type State = {
  value: {
    matchInterval: ReturnType<typeof setInterval> | null
    isFirstMatch: boolean
    matchCount: number
    lastMatchStartedAt: number | null
  }
}
type Action = {
  newMatch: (interval: ReturnType<typeof setInterval>) => void
  cancel: () => void
  reset: () => void
}

const initValue: State = {
  value: {
    matchInterval: null,
    isFirstMatch: true,
    matchCount: 1,
    lastMatchStartedAt: null,
  },
}

export const useMatchStatus = create<State & Action>((set, get) => ({
  ...initValue,

  newMatch: (interval) => {
    clearInterval(get().value.matchInterval!)

    set({
      value: {
        matchCount: get().value.matchCount + 1,
        matchInterval: interval,
        isFirstMatch: false,
        lastMatchStartedAt: Date.now(),
      },
    })
  },
  cancel: () => {
    const matchInterval = get().value.matchInterval
    if (matchInterval) clearInterval(matchInterval)
    set({
      value: {
        matchCount:
          get().value.matchCount !== 0 ? get().value.matchCount - 1 : 0,
        matchInterval: null,
        isFirstMatch: get().value.matchCount === 1,
        lastMatchStartedAt: get().value.lastMatchStartedAt,
      },
    })
  },

  get: () => get(),
  reset: () => {
    const matchInterval = get().value.matchInterval
    if (matchInterval) clearInterval(matchInterval)
    set(initValue)
  },
}))
