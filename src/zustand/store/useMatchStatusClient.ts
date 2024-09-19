import { create } from 'zustand'

type State = {
  // matchInterval: ReturnType<typeof setInterval> | null
  status: 'waitingForThemes' | 'init' | 'started'
  isFirstMatch: boolean
  matchCount: number
  lastMatchStartedAt: number | null
}

type Action = {
  newMatch: () // interval: ReturnType<typeof setInterval>

  => void
  clearMatch: () => void
  waitingForThemes: () => void
  reset: () => void
}

const initValue: State = {
  // matchInterval: null,
  status: 'init',
  isFirstMatch: true,
  matchCount: 0,
  lastMatchStartedAt: null,
}

export const useMatchStatusClient = create<State & Action>((set, get) => ({
  ...initValue,

  newMatch: () => {
    // const matchInterval = get().matchInterval
    // if (matchInterval) clearInterval(matchInterval)

    set({
      status: 'started',
      matchCount: get().matchCount + 1,
      // matchInterval: interval,
      isFirstMatch: false,
      lastMatchStartedAt: Date.now(),
    })
  },

  clearMatch: () =>
    // const matchInterval = get().matchInterval
    // if (matchInterval) clearInterval(matchInterval)

    set({
      status: 'waitingForThemes',
      matchCount: get().matchCount - 1 < 0 ? 0 : get().matchCount - 1,
      // matchInterval: null,
      isFirstMatch: get().matchCount - 1 <= 0,
      lastMatchStartedAt: get().lastMatchStartedAt,
    }),

  waitingForThemes: () =>
    set({
      status: 'waitingForThemes',
      matchCount: get().matchCount,
      // matchInterval: null,
      isFirstMatch: get().matchCount - 1 <= 0,
      lastMatchStartedAt: get().lastMatchStartedAt,
    }),
  reset: () =>
    // const matchInterval = get().matchInterval
    // if (matchInterval) clearInterval(matchInterval)
    set(initValue),
}))
