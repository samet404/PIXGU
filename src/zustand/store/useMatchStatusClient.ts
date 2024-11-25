import { create } from 'zustand'

type State = {
  status: 'waitingForThemes' | 'init' | 'started'
  isFirstMatch: boolean
  matchCount: number
  lastMatchStartedAt: number | null
}

type Action = {
  startInterval: ()

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

  startInterval: () => {

    set({
      status: 'started',
      matchCount: get().matchCount + 1,
      isFirstMatch: false,
      lastMatchStartedAt: Date.now(),
    })
  },

  clearMatch: () =>

    set({
      status: 'waitingForThemes',
      matchCount: get().matchCount - 1 < 0 ? 0 : get().matchCount - 1,
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
    set(initValue),
}))
