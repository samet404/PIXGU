import { MATCH_TIME_SECONDS } from '@/constants'
import { create } from 'zustand'

type State = {
  theme: string | null
  status: 'waitingForThemes' | 'init' | 'started'
  isFirstMatch: boolean
  matchCount: number
  remainSeconds: number | null
  passedSeconds: number | null
  lastMatchStartedAt: number | null
}

type Action = {
  setTheme: (theme: string) => void
  clearTheme: () => void
  startMatch: () => void
  clearMatch: () => void
  waitingForThemes: () => void
  decreaseRemainSeconds: () => void
  reset: () => void
}

const initValue: State = {
  theme: null,
  passedSeconds: null,
  remainSeconds: null,
  status: 'init',
  isFirstMatch: true,
  matchCount: 0,
  lastMatchStartedAt: null,
}

export const useMatchStatusClient = create<State & Action>((set, get) => ({
  ...initValue,

  decreaseRemainSeconds: () =>
    set({
      ...get(),
      remainSeconds: get().remainSeconds! - 1,
      passedSeconds: get().passedSeconds! + 1
    }),

  startMatch: () => {

    set({
      remainSeconds: MATCH_TIME_SECONDS,
      passedSeconds: 0,
      status: 'started',
      matchCount: get().matchCount + 1,
      isFirstMatch: false,
      lastMatchStartedAt: Date.now(),
    })
  },

  setTheme: (theme) =>
    set({
      ...get(),
      theme
    }),

  clearTheme: () =>
    set({
      ...get(),
      theme: null
    }),

  clearMatch: () =>

    set({
      remainSeconds: null,
      passedSeconds: null,
      status: 'waitingForThemes',
      matchCount: get().matchCount - 1 < 0 ? 0 : get().matchCount - 1,
      isFirstMatch: get().matchCount - 1 <= 0,
      lastMatchStartedAt: get().lastMatchStartedAt,
    }),

  waitingForThemes: () =>
    set({
      remainSeconds: null,
      passedSeconds: null,
      status: 'waitingForThemes',
      matchCount: get().matchCount,
      isFirstMatch: get().matchCount - 1 <= 0,
      lastMatchStartedAt: get().lastMatchStartedAt,
    }),
  reset: () =>
    set(initValue),
}))
